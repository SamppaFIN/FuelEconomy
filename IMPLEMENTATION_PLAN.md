---
title: Fuel Economy Program — Implementation Plan
version: 0.1.0
status: drafting
date: 2025-10-07
owner: Sage (Project), Nova (Arch), Codex (Dev), Metrics (Analytics)
---

# Implementation Plan

## Phase 0 — Discovery & Grounding (1–2 weeks)
- Confirm engine classes and data availability per vessel
- Define canonical Engine Digital Twin schema
- Agree on KPI glossary (SFOC, health index, RUL, etc.)
- Security review and data governance checklist

Deliverables:
- Data inventory and connectivity map
- Engine twin schema v0.1
- KPI definitions sheet

## Phase 1 — Data & Metrics Foundation (3–4 weeks)
- Build ingestion adapters (CAN/Modbus → broker → store)
- Implement metrics pipeline (validation, normalization, resampling)
- Compute baseline KPIs and health index v0

Deliverables:
- Ingestion service with sample vessel data
- Metrics pipeline with unit tests
- KPI dashboard v0 (static charts)

## Phase 2 — Predictive Maintenance MVP (4–5 weeks)
- Anomaly detection baselines (seasonal+robust; isolation forest option)
- RUL estimation for selected components with confidence bands
- Alerting with human‑in‑the‑loop acknowledgment

Deliverables:
- PM MVP with 2–3 component models per engine class
- Alerting service and audit log
- Evaluation report (precision/recall on historical)

## Phase 3 — Fuel Economy Dashboard (3–4 weeks)
- Voyage‑aware fuel and efficiency views (per engine, per leg)
- Leaderboards and deviation detection
- Weather/sea state overlays (API integration)

Deliverables:
- Interactive dashboard v1
- Fleet summary and emissions report export

## Phase 4 — Integrations & Ops (3–4 weeks)
- CMMS integration (create/update work orders)
- Offline‑first vessel cache and sync
- Role‑based access control and audit

Deliverables:
- CMMS connector
- Sync agent and conflict policy
- RBAC policy and security review

## Architecture Sketch
- Edge/vessel: lightweight collector → message broker (MQTT/NATS)
- Shore/cloud: ingestion API → stream store (e.g., Timescale/Influx) + object store
- Services: metrics engine, anomaly/RUL service, alerts, reporting
- UI: web dashboard + mobile‑friendly crew views

## Data Model (High‑Level)
- EngineTwin: id, vesselId, class, make, model, ratedCurves, hours, maintenanceHistory
- Telemetry: engineId, ts, rpm, torque, fuelFlow, temps, vibration, pressures
- DerivedMetrics: engineId, ts, sfoc, efficiency, healthIndex, anomalies
- Alerts: id, engineId, type, severity, message, state, ackBy, ackAt

## Testing Strategy (BRDC + TDD)
- Treat each KPI and model as a ticket with red→green→refactor tests
- Golden datasets for regression
- Synthetic data generators for edge cases

## Risks & Mitigations
- Data quality/coverage → DQ dashboard, sensor fallback, imputations
- Model drift → weekly retraining and drift monitors
- Crew overload → rate‑limited, explainable alerts with clear actions

## Success Metrics
- Fuel reduction, downtime reduction, model precision/recall, user satisfaction


