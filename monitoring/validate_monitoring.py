import json
import os
import sys
import yaml

MONITORING_DIR = r"D:\coding-project\2026-project\messaging-platform-v1\monitoring"

def test_prometheus_yml():
    path = os.path.join(MONITORING_DIR, "prometheus", "prometheus.yml")
    assert os.path.exists(path), f"File missing: {path}"
    with open(path, "r", encoding="utf-8") as f:
        data = yaml.safe_load(f)

    # 1. Global config verification
    assert data["global"]["scrape_interval"] == "5s", f"Expected scrape_interval 5s, got {data['global']['scrape_interval']}"
    assert data["global"]["evaluation_interval"] == "5s", f"Expected evaluation_interval 5s, got {data['global']['evaluation_interval']}"

    # 2. Scrape jobs verification
    jobs = {job["job_name"]: job for job in data["scrape_configs"]}
    required_jobs = ["messaging-dispatcher", "messaging-backend", "messaging-failover", "messaging-payloader"]
    for rj in required_jobs:
        assert rj in jobs, f"Missing required job: {rj}"

    # Check dispatcher
    disp = jobs["messaging-dispatcher"]
    assert disp["metrics_path"] == "/actuator/prometheus"
    disp_targets = [t for sc in disp["static_configs"] for t in sc["targets"]]
    assert any("8081" in t for t in disp_targets), f"Missing 8081 in targets: {disp_targets}"

    # Check backend
    backend = jobs["messaging-backend"]
    assert backend["metrics_path"] == "/api/actuator/prometheus"
    backend_targets = [t for sc in backend["static_configs"] for t in sc["targets"]]
    assert any("8083" in t for t in backend_targets), f"Missing 8083 in targets: {backend_targets}"

    # Check failover
    failover = jobs["messaging-failover"]
    failover_targets = [t for sc in failover["static_configs"] for t in sc["targets"]]
    assert any("8085" in t for t in failover_targets), f"Missing 8085 in targets: {failover_targets}"

    # Check payloader
    payloader = jobs["messaging-payloader"]
    payloader_targets = [t for sc in payloader["static_configs"] for t in sc["targets"]]
    assert any("8084" in t for t in payloader_targets), f"Missing 8084 in targets: {payloader_targets}"

    print("[PASS] prometheus.yml syntax and semantics verified.")

def test_datasource_yml():
    path = os.path.join(MONITORING_DIR, "grafana", "provisioning", "datasources", "datasource.yml")
    assert os.path.exists(path), f"File missing: {path}"
    with open(path, "r", encoding="utf-8") as f:
        data = yaml.safe_load(f)

    assert "datasources" in data and len(data["datasources"]) > 0
    ds = data["datasources"][0]
    assert ds["type"] == "prometheus"
    assert ds["url"] == "http://prometheus:9090"
    assert ds["isDefault"] is True
    print("[PASS] datasource.yml syntax and semantics verified.")

def test_dashboard_provider_yml():
    path = os.path.join(MONITORING_DIR, "grafana", "provisioning", "dashboards", "dashboard-provider.yml")
    assert os.path.exists(path), f"File missing: {path}"
    with open(path, "r", encoding="utf-8") as f:
        data = yaml.safe_load(f)

    assert "providers" in data and len(data["providers"]) > 0
    prov = data["providers"][0]
    assert prov["type"] == "file"
    assert "/etc/grafana/dashboards" in prov["options"]["path"]
    print("[PASS] dashboard-provider.yml syntax and semantics verified.")

def test_dashboard_json():
    path = os.path.join(MONITORING_DIR, "grafana", "dashboards", "messaging-platform-overview.json")
    assert os.path.exists(path), f"File missing: {path}"
    with open(path, "r", encoding="utf-8") as f:
        data = json.load(f)

    assert data["title"] == "메시징 플랫폼 실시간 발송 및 인프라 통합 관제"
    assert data["uid"] == "messaging-platform-overview"

    panels = data["panels"]
    panel_map = {p["id"]: p for p in panels}

    # Verify Panel 1: TPS Timeseries
    p1 = panel_map.get(1)
    assert p1 is not None, "Panel 1 missing"
    assert p1["type"] == "timeseries"
    assert "sum(rate(messaging_dispatch_total[1m])) by (channel)" in p1["targets"][0]["expr"]

    # Verify Panel 2: Piechart
    p2 = panel_map.get(2)
    assert p2 is not None, "Panel 2 missing"
    assert p2["type"] == "piechart"
    assert "sum(increase(messaging_dispatch_total[5m])) by (status)" in p2["targets"][0]["expr"]

    # Verify Panel 3: Barchart
    p3 = panel_map.get(3)
    assert p3 is not None, "Panel 3 missing"
    assert p3["type"] == "barchart"
    assert "sum(increase(messaging_dispatch_total[1h])) by (channel)" in p3["targets"][0]["expr"]

    # Verify Panel 4: Latency 95th Percentile
    p4 = panel_map.get(4)
    assert p4 is not None, "Panel 4 missing"
    assert p4["type"] == "timeseries"
    assert "histogram_quantile(0.95" in p4["targets"][0]["expr"]

    # Verify Panel 5: Night Held Gauge
    p5 = panel_map.get(5)
    assert p5 is not None, "Panel 5 missing"
    assert p5["type"] == "gauge"
    assert "messaging_night_held_current" in p5["targets"][0]["expr"]

    # Verify Panel 6: DLQ Gauge with 100/500 thresholds
    p6 = panel_map.get(6)
    assert p6 is not None, "Panel 6 missing"
    assert p6["type"] == "gauge"
    assert "messaging_dlq_current" in p6["targets"][0]["expr"]
    steps = p6["fieldConfig"]["defaults"]["thresholds"]["steps"]
    threshold_vals = {s.get("value"): s.get("color") for s in steps}
    assert 100 in threshold_vals, "Missing threshold for 100 in DLQ gauge"
    assert 500 in threshold_vals, "Missing threshold for 500 in DLQ gauge"
    # 100 should be orange (#FF9830), 500 should be red (#F2495C)
    assert threshold_vals[100] == "#FF9830", f"Expected #FF9830 for 100, got {threshold_vals[100]}"
    assert threshold_vals[500] == "#F2495C", f"Expected #F2495C for 500, got {threshold_vals[500]}"

    # Verify Panel 7: SMTP active connections stat card
    p7 = panel_map.get(7)
    assert p7 is not None, "Panel 7 missing"
    assert p7["type"] == "stat"
    assert "messaging_smtp_connections_active" in p7["targets"][0]["expr"]

    print("[PASS] messaging-platform-overview.json syntax and semantics verified.")

if __name__ == "__main__":
    test_prometheus_yml()
    test_datasource_yml()
    test_dashboard_provider_yml()
    test_dashboard_json()
    print("\nALL MONITORING & OBSERVABILITY VALIDATION TESTS PASSED (100% SUCCESS)!")
