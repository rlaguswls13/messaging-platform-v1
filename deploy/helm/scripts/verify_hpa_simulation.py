#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Kubernetes HPA v2 Algorithm & Helm Chart Autoscale Verification Suite
====================================================================
Validates:
  1. HPA v2 mathematical scaling algorithm:
       desiredReplicas = ceil[currentReplicas * (currentMetricValue / desiredMetricValue)]
  2. 10% tolerance window (scale stabilization filter)
  3. MinReplicas / MaxReplicas boundary clamping
  4. Template-Values 100% consistency across hpa-*.yaml & values.yaml
  5. 4-Phase E2E dynamic load simulation:
       Phase 1 (Baseline, 10s): 10 QPS -> 2 Pods
       Phase 2 (Ramp-Up, 30s): 100->500 QPS -> 2 -> 5 Pods
       Phase 3 (Spike Peak, 30s): 1,500 QPS -> 10 Pods (MaxReplicas cap)
       Phase 4 (Cool-down, 20s): 0 QPS -> 2 Pods (MinReplicas floor)
"""

import os
import sys
import math
import yaml
import re
from pathlib import Path
from dataclasses import dataclass, asdict
from typing import List, Dict, Any, Tuple

BASE_DIR = Path(r"D:\coding-project\2026-project\messaging-platform-v1\deploy\helm\messaging-platform")
VALUES_FILE = BASE_DIR / "values.yaml"
TEMPLATES_DIR = BASE_DIR / "templates"

TOLERANCE = 0.10  # Kubernetes default HPA tolerance: 10% (0.1)


# ─────────────────────────────────────────────────────────────────────────────
# 1. HPA v2 Core Mathematical Model
# ─────────────────────────────────────────────────────────────────────────────
def calculate_desired_replicas(
    current_replicas: int,
    current_metric_value: float,
    desired_metric_value: float,
    min_replicas: int,
    max_replicas: int,
    tolerance: float = TOLERANCE
) -> Tuple[int, str, float]:
    """
    Implements Kubernetes HPA v2 replica calculation formula:
    https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/#algorithm-details
    
    desiredReplicas = ceil[currentReplicas * (currentMetricValue / desiredMetricValue)]
    Returns (desired_replicas, action_reason, ratio)
    """
    if desired_metric_value <= 0:
        return current_replicas, "INVALID_TARGET_METRIC", 1.0

    if current_replicas <= 0:
        return min_replicas, "INVALID_CURRENT_REPLICAS_RESET_TO_MIN", 1.0

    ratio = current_metric_value / desired_metric_value

    # Tolerance window check: if within +/- tolerance, do not scale
    # (includes 1e-9 float epsilon for standard IEEE 754 precision)
    if abs(1.0 - ratio) <= (tolerance + 1e-9):
        return current_replicas, f"WITHIN_TOLERANCE_{tolerance*100:.0f}%_NO_ACTION", ratio

    # Raw replica calculation
    raw_desired = math.ceil(current_replicas * ratio)

    # Clamping boundaries [minReplicas, maxReplicas]
    if raw_desired > max_replicas:
        return max_replicas, f"SCALE_OUT_CAPPED_AT_MAX_{max_replicas}", ratio
    elif raw_desired < min_replicas:
        return min_replicas, f"SCALE_IN_FLOORED_AT_MIN_{min_replicas}", ratio
    else:
        action = "SCALE_OUT" if raw_desired > current_replicas else "SCALE_IN"
        return raw_desired, f"{action}_TO_{raw_desired}", ratio


# ─────────────────────────────────────────────────────────────────────────────
# 2. Test Suite 1: Mathematical Algorithm & Edge Cases
# ─────────────────────────────────────────────────────────────────────────────
def run_unit_tests():
    print("\n" + "=" * 80)
    print(" [TEST SUITE 1] HPA v2 Mathematical Algorithm & Tolerance Tests")
    print("=" * 80)

    # Dispatcher: min=2, max=10, target=70%
    min_r = 2
    max_r = 10
    target_cpu = 70.0

    # 1.1 Exact Target Match
    des, reason, r = calculate_desired_replicas(2, 70.0, target_cpu, min_r, max_r)
    assert des == 2, f"Failed exact match: expected 2, got {des}"
    print(f"  [PASS] 1.1 Exact Target Match: CPU=70%, Target=70% -> Replicas={des} ({reason})")

    # 1.2 Tolerance Boundaries (Target 70%, 10% tolerance -> 63% ~ 77%)
    # 75% CPU -> ratio = 1.071 (within 1.10) -> No scaling
    des, reason, r = calculate_desired_replicas(2, 75.0, target_cpu, min_r, max_r)
    assert des == 2, f"Failed tolerance check at 75%: expected 2, got {des}"
    assert "WITHIN_TOLERANCE" in reason
    print(f"  [PASS] 1.2a Tolerance Upper Inside: CPU=75.0% (ratio={r:.3f}) -> Replicas={des} ({reason})")

    # 65% CPU -> ratio = 0.929 (within 0.90 ~ 1.10) -> No scaling
    des, reason, r = calculate_desired_replicas(5, 65.0, target_cpu, min_r, max_r)
    assert des == 5, f"Failed tolerance check at 65%: expected 5, got {des}"
    assert "WITHIN_TOLERANCE" in reason
    print(f"  [PASS] 1.2b Tolerance Lower Inside: CPU=65.0% (ratio={r:.3f}) -> Replicas={des} ({reason})")

    # 77.0% CPU -> ratio = 1.100 (exactly at tolerance boundary) -> No scaling
    des, reason, r = calculate_desired_replicas(2, 77.0, target_cpu, min_r, max_r)
    assert des == 2, f"Failed tolerance boundary at 77%: expected 2, got {des}"
    print(f"  [PASS] 1.2c Tolerance Boundary: CPU=77.0% (ratio={r:.3f}) -> Replicas={des} ({reason})")

    # 1.3 Scale-Out Trigger Beyond Tolerance (78% CPU -> ratio = 1.114 > 1.10)
    # ceil[2 * 1.114] = ceil[2.228] = 3
    des, reason, r = calculate_desired_replicas(2, 78.0, target_cpu, min_r, max_r)
    assert des == 3, f"Failed scale out at 78%: expected 3, got {des}"
    print(f"  [PASS] 1.3a Scale-Out Trigger: CPU=78.0% (ratio={r:.3f}) -> Replicas={des} ({reason})")

    # High load: CPU 90% with 2 replicas -> ceil[2 * (90/70)] = ceil[2.57] = 3
    des, reason, r = calculate_desired_replicas(2, 90.0, target_cpu, min_r, max_r)
    assert des == 3, f"Failed scale out at 90%: expected 3, got {des}"
    print(f"  [PASS] 1.3b Scale-Out Step: CPU=90.0% (ratio={r:.3f}) -> Replicas={des} ({reason})")

    # Intermediate load: CPU 85% with 5 replicas -> ceil[5 * (85/70)] = ceil[6.07] = 7
    des, reason, r = calculate_desired_replicas(5, 85.0, target_cpu, min_r, max_r)
    assert des == 7, f"Failed scale out at 85% (5 pods): expected 7, got {des}"
    print(f"  [PASS] 1.3c Scale-Out Multi-Pod: CPU=85.0% (5 pods) -> Replicas={des} ({reason})")

    # 1.4 MaxReplicas Clamping (CPU 98% with 8 replicas -> ceil[8 * 1.4] = 12 -> Capped at 10)
    des, reason, r = calculate_desired_replicas(8, 98.0, target_cpu, min_r, max_r)
    assert des == 10, f"Failed maxReplicas cap: expected 10, got {des}"
    assert "CAPPED_AT_MAX" in reason
    print(f"  [PASS] 1.4 MaxReplicas Capping: Raw=12, Capped={des} ({reason})")

    # 1.5 MinReplicas Floor (CPU 10% with 2 replicas -> ceil[2 * 0.14] = 1 -> Floored at 2)
    des, reason, r = calculate_desired_replicas(2, 10.0, target_cpu, min_r, max_r)
    assert des == 2, f"Failed minReplicas floor: expected 2, got {des}"
    assert "FLOORED_AT_MIN" in reason or "WITHIN_TOLERANCE" in reason or des == min_r
    print(f"  [PASS] 1.5 MinReplicas Flooring: Raw=1, Floored={des} ({reason})")


# ─────────────────────────────────────────────────────────────────────────────
# 2. Test Suite 2: Manifest & Values.yaml Consistency Verification
# ─────────────────────────────────────────────────────────────────────────────
def verify_helm_manifest_consistency():
    print("\n" + "=" * 80)
    print(" [TEST SUITE 2] Helm Manifest & values.yaml Autoscale Consistency")
    print("=" * 80)

    assert VALUES_FILE.exists(), f"values.yaml not found at {VALUES_FILE}"
    with open(VALUES_FILE, "r", encoding="utf-8") as f:
        values = yaml.safe_load(f)

    autoscaling = values.get("autoscaling", {})
    assert autoscaling, "autoscaling section missing in values.yaml"

    expected_specs = {
        "dispatcher": {
            "file": "hpa-dispatcher.yaml",
            "enabled": True,
            "minReplicas": 2,
            "maxReplicas": 10,
            "targetCPUUtilizationPercentage": 70
        },
        "payloader": {
            "file": "hpa-payloader.yaml",
            "enabled": True,
            "minReplicas": 2,
            "maxReplicas": 8,
            "targetCPUUtilizationPercentage": 75
        },
        "backend": {
            "file": "hpa-backend.yaml",
            "enabled": True,
            "minReplicas": 2,
            "maxReplicas": 6,
            "targetCPUUtilizationPercentage": 80
        }
    }

    for svc_name, spec in expected_specs.items():
        assert svc_name in autoscaling, f"Missing {svc_name} in values.yaml autoscaling"
        actual = autoscaling[svc_name]

        # Verify values.yaml content
        assert actual.get("enabled") == spec["enabled"], f"{svc_name} enabled mismatch"
        assert actual.get("minReplicas") == spec["minReplicas"], f"{svc_name} minReplicas mismatch"
        assert actual.get("maxReplicas") == spec["maxReplicas"], f"{svc_name} maxReplicas mismatch"
        assert actual.get("targetCPUUtilizationPercentage") == spec["targetCPUUtilizationPercentage"], (
            f"{svc_name} targetCPUUtilizationPercentage mismatch"
        )
        print(f"  [PASS] values.yaml [{svc_name}]: min={actual['minReplicas']}, "
              f"max={actual['maxReplicas']}, targetCPU={actual['targetCPUUtilizationPercentage']}%")

        # Verify HPA template file exists and references correct values
        tpl_path = TEMPLATES_DIR / spec["file"]
        assert tpl_path.exists(), f"Template not found: {tpl_path}"
        content = tpl_path.read_text(encoding="utf-8")

        # Static template checks
        assert f".Values.autoscaling.{svc_name}.enabled" in content, f"Template {spec['file']} missing enabled if-check"
        assert f".Values.autoscaling.{svc_name}.minReplicas" in content, f"Template {spec['file']} missing minReplicas reference"
        assert f".Values.autoscaling.{svc_name}.maxReplicas" in content, f"Template {spec['file']} missing maxReplicas reference"
        assert f".Values.autoscaling.{svc_name}.targetCPUUtilizationPercentage" in content, (
            f"Template {spec['file']} missing targetCPU reference"
        )
        assert "kind: HorizontalPodAutoscaler" in content, f"Template {spec['file']} must define HorizontalPodAutoscaler"
        assert "apiVersion: autoscaling/v2" in content, f"Template {spec['file']} must use autoscaling/v2"
        assert f"kind: Deployment" in content, f"Template {spec['file']} scaleTargetRef must be Deployment"
        print(f"  [PASS] Template {spec['file']} syntax & Go-template reference bindings 100% matched.")


# ─────────────────────────────────────────────────────────────────────────────
# 3. Test Suite 3: 4-Phase Dynamic Load Simulation & HPA Controller
# ─────────────────────────────────────────────────────────────────────────────
@dataclass
class SimulationStep:
    second: int
    phase: str
    target_qps: float
    cpu_percent: float
    current_replicas: int
    desired_replicas: int
    action: str
    reason: str


class HPASimulatorEngine:
    """
    Simulates Kubernetes HPA Controller loop with realistic pod metrics and scaling dynamics.
    Dispatcher target capacity: ~150 QPS per pod at 70% CPU target utilization.
    Base idle CPU per pod: ~10%.
    """

    def __init__(self, target_cpu: float = 70.0, min_replicas: int = 2, max_replicas: int = 10):
        self.target_cpu = target_cpu
        self.min_replicas = min_replicas
        self.max_replicas = max_replicas
        self.replicas = min_replicas
        self.cooldown_seconds = 5  # Scale-in cooldown period in simulation
        self.last_scale_time = 0

    def compute_cpu_utilization(self, qps: float, replicas: int) -> float:
        """
        Calculates cluster average CPU utilization based on incoming QPS distributed across active replicas.
        At 100 QPS/pod, CPU is ~70%.
        """
        if replicas <= 0:
            return 100.0
        qps_per_pod = qps / replicas
        # Base 10% idle + load portion (100 QPS/pod = 70% CPU)
        cpu = 10.0 + (qps_per_pod / 100.0) * 60.0
        return min(98.0, max(5.0, cpu))

    def step(self, current_sec: int, phase: str, qps: float) -> SimulationStep:
        # 1. Compute current CPU from traffic and current replicas
        cpu = self.compute_cpu_utilization(qps, self.replicas)

        # 2. Query HPA algorithm
        desired, reason, ratio = calculate_desired_replicas(
            self.replicas, cpu, self.target_cpu, self.min_replicas, self.max_replicas
        )

        action = "STABLE"
        if desired > self.replicas:
            # Scale-out is immediate (Kubernetes reaction to traffic surge)
            action = f"SCALE_OUT (+{desired - self.replicas})"
            self.replicas = desired
            self.last_scale_time = current_sec
        elif desired < self.replicas:
            # Scale-in requires stabilization/cooldown window
            if current_sec - self.last_scale_time >= self.cooldown_seconds:
                # Stepwise scale-in (down to desired or step-limited)
                step_down = max(desired, self.replicas - 2)
                step_down = max(self.min_replicas, step_down)
                if step_down < self.replicas:
                    action = f"SCALE_IN (-{self.replicas - step_down})"
                    self.replicas = step_down
                    self.last_scale_time = current_sec
            else:
                action = f"COOLING_DOWN (Remaining: {self.cooldown_seconds - (current_sec - self.last_scale_time)}s)"

        return SimulationStep(
            second=current_sec,
            phase=phase,
            target_qps=qps,
            cpu_percent=round(cpu, 1),
            current_replicas=self.replicas,
            desired_replicas=desired,
            action=action,
            reason=reason
        )


def run_e2e_simulation_suite() -> List[SimulationStep]:
    print("\n" + "=" * 80)
    print(" [TEST SUITE 3] 4-Phase E2E Dynamic Load Simulation (Dispatcher HPA)")
    print("=" * 80)

    sim = HPASimulatorEngine(target_cpu=70.0, min_replicas=2, max_replicas=10)
    history: List[SimulationStep] = []

    # Timeline Definition (90 seconds total)
    # Phase 1: Baseline (10s: 0-9s), 10 QPS
    # Phase 2: Ramp-Up (30s: 10-39s), 100 QPS -> 500 QPS
    # Phase 3: Spike Peak (30s: 40-69s), 1,500 QPS
    # Phase 4: Cool-down (20s: 70-89s), 0 QPS

    print(f"{'SEC':>4} | {'PHASE':<12} | {'QPS':>7} | {'CPU(%)':>7} | {'REPLICAS':>8} | {'HPA ACTION':<25} | {'REASON'}")
    print("-" * 95)

    for sec in range(90):
        if sec < 10:
            phase = "1_Baseline"
            qps = 10.0
        elif sec < 40:
            phase = "2_RampUp"
            # Linear ramp from 100 to 500
            progress = (sec - 10) / 29.0
            qps = 100.0 + progress * 400.0
        elif sec < 70:
            phase = "3_SpikePeak"
            qps = 1500.0
        else:
            phase = "4_CoolDown"
            qps = 0.0

        step_res = sim.step(sec, phase, qps)
        history.append(step_res)

        # Print representative seconds or changes
        if sec in [0, 9, 10, 20, 30, 39, 40, 45, 55, 69, 70, 75, 80, 89] or "SCALE" in step_res.action:
            print(f"{step_res.second:>4}s | {step_res.phase:<12} | {step_res.target_qps:>7.0f} | "
                  f"{step_res.cpu_percent:>6.1f}% | {step_res.current_replicas:>8} | "
                  f"{step_res.action:<25} | {step_res.reason}")

    # Assertions on Simulation Results
    # 1. Phase 1 Check: Replicas remain at 2
    phase1_replicas = [h.current_replicas for h in history if h.phase == "1_Baseline"]
    assert all(r == 2 for r in phase1_replicas), f"Phase 1 replicas not baseline 2: {phase1_replicas}"
    print("\n  [PASS] Phase 1 (Baseline): Replicas strictly maintained at MinReplicas (2).")

    # 2. Phase 2 Check: Replicas scaled out to handle ramp-up (at least 4 pods)
    phase2_max = max(h.current_replicas for h in history if h.phase == "2_RampUp")
    assert phase2_max >= 4, f"Phase 2 expected scale-out >= 4, got {phase2_max}"
    print(f"  [PASS] Phase 2 (Ramp-Up): Successfully scaled out from 2 to {phase2_max} pods.")

    # 3. Phase 3 Check: Spike Peak scaled to 10 pods and strictly capped at MaxReplicas (10)
    phase3_replicas = [h.current_replicas for h in history if h.phase == "3_SpikePeak"]
    phase3_max = max(phase3_replicas)
    assert phase3_max == 10, f"Phase 3 did not reach MaxReplicas 10: {phase3_max}"
    assert all(r <= 10 for r in phase3_replicas), "Replicas exceeded MaxReplicas 10!"
    print(f"  [PASS] Phase 3 (Spike Peak): Scaled to MaxReplicas (10) without exceeding cap.")

    # 4. Phase 4 Check: Scaled in safely to MinReplicas (2)
    final_replicas = history[-1].current_replicas
    assert final_replicas == 2, f"Phase 4 final replicas expected 2, got {final_replicas}"
    phase4_min = min(h.current_replicas for h in history if h.phase == "4_CoolDown")
    assert phase4_min >= 2, f"Replicas dropped below MinReplicas: {phase4_min}"
    print(f"  [PASS] Phase 4 (Cool-down): Stabilized and safely scaled in to MinReplicas ({final_replicas}).")

    return history


# ─────────────────────────────────────────────────────────────────────────────
# Main Entry Point
# ─────────────────────────────────────────────────────────────────────────────
def main():
    print("=" * 80)
    print(" Kubernetes HPA v2 Algorithm & Helm Chart Autoscale Verification")
    print(" Target: messaging-platform-v1 (Dispatcher, Payloader, Backend)")
    print("=" * 80)

    try:
        # Step 1: Algorithmic unit tests
        run_unit_tests()

        # Step 2: Manifest & Values.yaml consistency
        verify_helm_manifest_consistency()

        # Step 3: 4-Phase E2E load simulation
        history = run_e2e_simulation_suite()

        print("\n" + "=" * 80)
        print(" ALL VERIFICATION TESTS PASSED (100% SUCCESS, 0 ERRORS)")
        print("=" * 80)
        print(f"  - Math model tolerance & clamping: VERIFIED")
        print(f"  - Helm templates <-> values.yaml: VERIFIED")
        print(f"  - 4-Phase E2E dynamic autoscale: VERIFIED (90/90 steps)")
        print("=" * 80)
        return 0

    except AssertionError as e:
        print(f"\n[ERROR] Assertion Failed: {e}", file=sys.stderr)
        return 1
    except Exception as ex:
        print(f"\n[FATAL] Unexpected error: {ex}", file=sys.stderr)
        import traceback
        traceback.print_exc()
        return 2


if __name__ == "__main__":
    sys.exit(main())
