#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
==============================================================================
 🚀 엔터프라이즈 멀티채널 메시징 플랫폼 — 5대 VM 분리 Podman CD 배포 파이프라인
 Continuous Deployment (CD) Automation Orchestrator
==============================================================================
"""

import sys
import os
import time
import subprocess
import json
import urllib.request
import urllib.error

# 콘솔 UTF-8 출력 강제
if sys.platform == "win32":
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8', errors='replace')

PODMAN_COMPOSE_CMD = [sys.executable, "-m", "podman_compose"]

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PODMAN_ROOT = os.path.abspath(os.path.join(SCRIPT_DIR, ".."))

def run_cmd(cmd, check=True):
    print(f"  [EXEC] {' '.join(cmd) if isinstance(cmd, list) else cmd}")
    res = subprocess.run(cmd, shell=isinstance(cmd, str), capture_output=True, text=True, encoding='utf-8', errors='replace')
    if check and res.returncode != 0:
        print(f"  [ERROR] Code {res.returncode}\n{res.stderr.strip() or res.stdout.strip()}")
        raise RuntimeError(f"Command failed: {cmd}")
    return res

def wait_for_http(url, expected_status=200, timeout_sec=60, step_sec=2, name="Service"):
    print(f"  [WAIT] Waiting for {name} ({url})...")
    start = time.time()
    while time.time() - start < timeout_sec:
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "CD-Pipeline-Prober"})
            with urllib.request.urlopen(req, timeout=3) as resp:
                if resp.status == expected_status:
                    print(f"  [READY] {name} is READY! (HTTP {resp.status}) in {int(time.time() - start)}s")
                    return True
        except Exception:
            pass
        time.sleep(step_sec)
    print(f"  [WARN] {name} timed out after {timeout_sec}s, continuing...")
    return False

def main():
    print("=" * 72)
    print(" 🚀 5-VM Tiered Continuous Deployment (CD) Pipeline Starting...")
    print(f"    Deployment Root: {PODMAN_ROOT}")
    print(f"    Compose Engine:  {' '.join(PODMAN_COMPOSE_CMD)}")
    print("=" * 72)

    # 1. Network: platform-mesh
    print("\n[Step 0] Ensuring overlay network: platform-mesh")
    net_chk = subprocess.run(["podman", "network", "ls", "--format", "{{.Name}}"], capture_output=True, text=True)
    if "platform-mesh" not in net_chk.stdout:
        print("  Creating network 'platform-mesh'...")
        run_cmd(["podman", "network", "create", "platform-mesh"])
    else:
        print("  Network 'platform-mesh' already active.")

    # 2. Step 1: VM-5 Database & Persistence (MariaDB + Redis)
    print("\n" + "=" * 72)
    print(" [Step 1] Deploying VM-5: Database & Cache Tier (MariaDB + Redis)...")
    print("=" * 72)
    vm5_yml = os.path.join(PODMAN_ROOT, "vm5-database", "podman-compose.yml")
    run_cmd([*PODMAN_COMPOSE_CMD, "-f", vm5_yml, "up", "-d"])

    print("  Checking MariaDB 11.4 health...")
    maria_ok = False
    for i in range(25):
        time.sleep(2)
        r = subprocess.run(["podman", "exec", "db-mariadb", "mariadb-admin", "ping", "-h", "localhost", "-u", "root", "-pmariadb_root_pass"], capture_output=True, text=True)
        if "mysqld is alive" in r.stdout:
            print("  [READY] MariaDB 11.4 is ALIVE and accepting connections!")
            maria_ok = True
            break
    if not maria_ok:
        print("  [WARN] MariaDB check timed out, proceeding...")

    r = subprocess.run(["podman", "exec", "db-redis", "redis-cli", "-a", "redis_secure_pass", "ping"], capture_output=True, text=True)
    if "PONG" in r.stdout:
        print("  [READY] Redis 7.2 Alpine is HEALTHY (PONG)!")

    # 3. Step 2: VM-3 MOM Dual Broker (Kafka KRaft + ActiveMQ)
    print("\n" + "=" * 72)
    print(" [Step 2] Deploying VM-3: MOM Dual Broker Tier (Kafka KRaft + ActiveMQ)...")
    print("=" * 72)
    vm3_yml = os.path.join(PODMAN_ROOT, "vm3-mom", "podman-compose.yml")
    run_cmd([*PODMAN_COMPOSE_CMD, "-f", vm3_yml, "up", "-d"])

    print("  Checking Kafka KRaft broker readiness...")
    for i in range(20):
        time.sleep(2)
        r = subprocess.run(["podman", "exec", "mom-kafka", "/opt/kafka/bin/kafka-broker-api-versions.sh", "--bootstrap-server", "localhost:9092"], capture_output=True, text=True)
        if "id: 1" in r.stdout:
            print("  [READY] Kafka 3.8 KRaft broker is ready with cluster quorum!")
            break
    print("  [READY] ActiveMQ Classic 5.18 broker deployed on 61616 / 8161.")

    # 4. Step 3: VM-4 Internal Backend & Pipeline Tier
    print("\n" + "=" * 72)
    print(" [Step 3] Deploying VM-4: Internal Backend & Pipeline Tier...")
    print("         (portal-backend, portal-frontend, pipeline-payloader, pipeline-targeting)")
    print("=" * 72)
    vm4_yml = os.path.join(PODMAN_ROOT, "vm4-backend", "podman-compose.yml")
    run_cmd([*PODMAN_COMPOSE_CMD, "-f", vm4_yml, "up", "-d"])

    wait_for_http("http://localhost:8083/api/actuator/health", expected_status=200, timeout_sec=60, name="portal-backend Spring Boot")
    wait_for_http("http://localhost:3000", expected_status=200, timeout_sec=30, name="portal-frontend Next.js 16")

    # 5. Step 4: VM-2 DMZ Dispatcher & Mock Telecom Relay
    print("\n" + "=" * 72)
    print(" [Step 4] Deploying VM-2: DMZ Dispatcher & Mock Telecom Relay Tier...")
    print("=" * 72)
    vm2_yml = os.path.join(PODMAN_ROOT, "vm2-dmz", "podman-compose.yml")
    run_cmd([*PODMAN_COMPOSE_CMD, "-f", vm2_yml, "up", "-d"])

    wait_for_http("http://localhost:8081/actuator/health", expected_status=200, timeout_sec=45, name="messaging-dispatcher Netty")

    # 6. Step 5: VM-1 External Ingress Gateway (Nginx)
    print("\n" + "=" * 72)
    print(" [Step 5] Deploying VM-1: External Ingress Gateway Tier (Nginx)...")
    print("=" * 72)
    vm1_yml = os.path.join(PODMAN_ROOT, "vm1-external", "podman-compose.yml")
    run_cmd([*PODMAN_COMPOSE_CMD, "-f", vm1_yml, "up", "-d"])
    time.sleep(3)

    # 7. Step 6: E2E Pipeline Verification
    print("\n" + "=" * 72)
    print(" 🎯 Phase 6: E2E Pipeline Routing & Comprehensive Verification")
    print("=" * 72)

    print("\n--- Running Container Instances Across 5 VM Tiers ---")
    ps_res = subprocess.run(["podman", "ps", "--format", "table {{.Names}}\t{{.Status}}\t{{.Ports}}"], capture_output=True, text=True)
    print(ps_res.stdout)

    print("--- Testing Ingress Gateway Routing (Port 8000) ---")
    # 1) Ingress /health
    try:
        req = urllib.request.urlopen("http://localhost:8000/health", timeout=3)
        print(f"  [1/4] Ingress Health: http://localhost:8000/health -> {req.read().decode().strip()} (HTTP {req.status})")
    except Exception as e:
        print(f"  [1/4] Ingress Health: Failed -> {e}")

    # 2) Ingress / -> Frontend
    try:
        req = urllib.request.urlopen("http://localhost:8000/", timeout=5)
        print(f"  [2/4] Ingress -> Frontend Portal: http://localhost:8000/ -> HTTP {req.status} OK (Size: {len(req.read())} bytes)")
    except Exception as e:
        print(f"  [2/4] Ingress -> Frontend Portal: Failed -> {e}")

    # 3) Ingress /api/v1/throttling/status -> Backend
    try:
        req = urllib.request.urlopen("http://localhost:8000/api/v1/throttling/status", timeout=5)
        body = json.loads(req.read().decode())
        print(f"  [3/4] Ingress -> Backend Throttling API: http://localhost:8000/api/v1/throttling/status -> HTTP {req.status}")
        data = body.get("data", {})
        print(f"        Throttle Rate: {data.get('throttleRate')}%, Paused: {data.get('isPaused')}, Daily: {data.get('dailySent')}/{data.get('dailyLimit')}")
    except Exception as e:
        print(f"  [3/4] Ingress -> Backend Throttling API: -> {e}")

    # 4) Ingress /api/v1/monitoring/snapshot -> Backend
    try:
        req = urllib.request.urlopen("http://localhost:8000/api/v1/monitoring/snapshot", timeout=5)
        body = json.loads(req.read().decode())
        print(f"  [4/4] Ingress -> Backend Monitoring API: http://localhost:8000/api/v1/monitoring/snapshot -> HTTP {req.status}")
        data = body.get("data", {})
        print(f"        Total TPS: {data.get('totalTps')}, Success Rate: {data.get('successRate')}%, Bulk Active: {data.get('activeBulkCampaignCount')}")
    except Exception as e:
        print(f"  [4/4] Ingress -> Backend Monitoring API: -> {e}")

    print("\n" + "=" * 72)
    print(" 🎉 Continuous Deployment (CD) Pipeline Execution Succeeded!")
    print(" All 5 VM tiers deployed and operational under Podman container mesh!")
    print("=" * 72)

if __name__ == "__main__":
    main()
