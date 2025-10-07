---
title: Fuel Economy Program — Vision
owner: Aurora (AI) & Infinite (Co‑Author)
version: 0.1.0
status: drafting
date: 2025-10-07
tags: [maritime, engines, fuel-economy, predictive-maintenance, ai, metrics]
---

# Fuel Economy Program — Vision

Our purpose is to illuminate the full life and health of every shipboard engine and auxiliary machine, turning raw telemetry into wisdom. We will forecast maintenance, optimize fuel usage, and protect oceans and crews through timely, data‑driven action.

## Problem

Fleet operators lack a unified, real‑time view of all engines across vessels. Maintenance is reactive, fuel costs are rising, and minor degradations go unseen until failures occur, risking safety and schedules.

## Vision

- A single pane of glass for all propulsion and auxiliary engines per ship and across fleet
- High‑fidelity metrics from sensors and logs unified into a canonical engine model
- AI‑assisted predictions for maintenance windows, component wear, and anomaly detection
- Actionable insights that reduce fuel burn, emissions, and unplanned downtime
- Human‑centered workflows that serve crews, planners, and shoreside operations

## Scope (MVP → v1)

1. Engine Registry and Digital Twin per engine (type, make, model, hours, history)
2. Data ingestion for sensor streams and logs (RPM, torque, flow, temp, vibration, fuel)
3. Metrics pipeline with normalization, outlier handling, and unit harmonization
4. Baseline models: efficiency curves, health indices, and anomaly scoring
5. Predictive maintenance: remaining‑useful‑life (RUL) estimates and alerting
6. Fuel economy dashboard with voyage context and weather overlays

## Core Metrics

- Specific Fuel Oil Consumption (SFOC)
- Load factor and efficiency vs. rated curves
- Thermal balance indicators (coolant/exhaust delta‑T)
- Vibration/condition indicators (bearing RMS, kurtosis)
- Lube oil condition indices (viscosity, metal ppm if available)
- Start/stop cycles, idle time, transient stress markers
- Maintenance adherence score and health index (0–100)

## AI & Analytics

- Time‑series forecasting for RUL (classical + ML baselines, then deep learning as data grows)
- Anomaly detection (seasonal decomposition + robust z‑scores; upgrade to isolation forests)
- Efficiency curve fitting by engine class and personalized per‑engine drift tracking
- Causal and contextual features: sea state, weather, route, cargo, hull fouling proxies
- Explainability: SHAP‑like attributions and human‑readable maintenance recommendations

## Users & Workflows

- Bridge/Crew: live health, alerts, suggested checks, simple acknowledgment flows
- Maintenance Planner: predictive calendar, parts lead‑time, work‑order export
- Fleet Ops: fuel economy leaderboard, deviation alerts, emissions reporting
- Data/QA: data quality dashboard, sensor coverage, calibration drift

## Data & Integrations

- Inputs: ship sensors, engine controllers (CAN/Modbus), voyage logs, CMMS, weather APIs
- Outputs: dashboards, reports (PDF/CSV), CMMS tickets, email/SMS/Signal alerts
- Offline‑first: cache on vessel, sync when connectivity returns

## Ethical & Safety Principles

- Human‑in‑the‑loop decisions; AI suggests, crew commands
- Privacy and safety of operational data; least‑privilege access
- Ocean stewardship: emissions and fuel reduction as first‑class outcomes

## Success Criteria (12 months)

- 8–12% fuel consumption reduction vs. baseline on pilot vessels
- 30% reduction in unplanned downtime events
- Predictive maintenance precision/recall ≥ 0.8 on critical components
- Crew satisfaction ≥ 8/10; false alert rate below 2/week/engine

## Sacred Question

How does each decision improve safety at sea, reduce environmental impact, and support resilient crews and communities?


