(function() {
  const STORAGE_KEY = 'fuel-economy-demo-state-v1';

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { fleet: [] };
      return JSON.parse(raw);
    } catch (e) {
      console.warn('Failed to load state', e);
      return { fleet: [] };
    }
  }

  function saveState(state) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function uid(prefix) { return prefix + '-' + Math.random().toString(36).slice(2, 8); }

  const els = {
    shipList: document.getElementById('ship-list'),
    addShipBtn: document.getElementById('add-ship-btn'),
    resetDemoBtn: document.getElementById('reset-demo-btn'),
    loadSampleBtn: document.getElementById('load-sample-btn'),
    shipSection: document.getElementById('ship-section'),
    emptyState: document.getElementById('empty-state'),
    shipName: document.getElementById('ship-name'),
    renameShipBtn: document.getElementById('rename-ship-btn'),
    deleteShipBtn: document.getElementById('delete-ship-btn'),
    addEngineBtn: document.getElementById('add-engine-btn'),
    enginesBody: document.getElementById('engines-body'),
    engineRowTemplate: document.getElementById('engine-row-template'),
    simulateBtn: document.getElementById('simulate-btn'),
    recommendations: document.getElementById('recommendations')
  };

  let state = loadState();
  let selectedShipId = null;

  function selectShip(id) {
    selectedShipId = id;
    renderFleet();
    renderShipPanel();
  }

  function addShip() {
    const name = prompt('Ship name?');
    if (!name) return;
    const ship = { id: uid('ship'), name, engines: [] };
    state.fleet.push(ship);
    saveState(state);
    selectShip(ship.id);
  }

  function deleteShip() {
    if (!selectedShipId) return;
    const ship = state.fleet.find(s => s.id === selectedShipId);
    if (!ship) return;
    if (!confirm(`Delete ${ship.name}?`)) return;
    state.fleet = state.fleet.filter(s => s.id !== selectedShipId);
    saveState(state);
    selectedShipId = state.fleet[0]?.id || null;
    renderFleet();
    renderShipPanel();
  }

  function renameShip() {
    if (!selectedShipId) return;
    const ship = state.fleet.find(s => s.id === selectedShipId);
    if (!ship) return;
    const name = prompt('New name:', ship.name);
    if (!name) return;
    ship.name = name;
    saveState(state);
    renderFleet();
    renderShipPanel();
  }

  function addEngine() {
    if (!selectedShipId) return;
    const ship = state.fleet.find(s => s.id === selectedShipId);
    if (!ship) return;
    const eng = {
      id: uid('eng'),
      name: `Engine ${ship.engines.length + 1}`,
      type: 'main',
      hours: 0,
      lastServiceHours: 0,
      fuelFlow: 0,
      vibrationRms: 0,
      exhaustDeltaT: 0
    };
    ship.engines.push(eng);
    saveState(state);
    renderShipPanel();
  }

  function deleteEngine(id) {
    const ship = state.fleet.find(s => s.id === selectedShipId);
    if (!ship) return;
    ship.engines = ship.engines.filter(e => e.id !== id);
    saveState(state);
    renderShipPanel();
  }

  function loadSample() {
    if (!window.FuelDemoSample) return;
    state = JSON.parse(JSON.stringify(window.FuelDemoSample));
    saveState(state);
    selectedShipId = state.fleet[0]?.id || null;
    renderFleet();
    renderShipPanel();
  }

  function resetDemo() {
    if (!confirm('Reset demo? This clears local data.')) return;
    localStorage.removeItem(STORAGE_KEY);
    state = { fleet: [] };
    selectedShipId = null;
    renderFleet();
    renderShipPanel();
  }

  function renderFleet() {
    els.shipList.innerHTML = '';
    state.fleet.forEach(ship => {
      const li = document.createElement('li');
      li.textContent = ship.name;
      if (ship.id === selectedShipId) li.classList.add('active');
      li.addEventListener('click', () => selectShip(ship.id));
      els.shipList.appendChild(li);
    });
  }

  function renderShipPanel() {
    const ship = state.fleet.find(s => s.id === selectedShipId);
    if (!ship) {
      els.shipSection.classList.add('hidden');
      els.emptyState.classList.remove('hidden');
      return;
    }
    els.emptyState.classList.add('hidden');
    els.shipSection.classList.remove('hidden');
    els.shipName.textContent = ship.name;

    els.enginesBody.innerHTML = '';
    ship.engines.forEach(engine => {
      const row = els.engineRowTemplate.content.firstElementChild.cloneNode(true);
      const name = row.querySelector('.eng-name');
      const type = row.querySelector('.eng-type');
      const hours = row.querySelector('.eng-hours');
      const lastService = row.querySelector('.eng-last-service');
      const fuelFlow = row.querySelector('.eng-fuelflow');
      const vibration = row.querySelector('.eng-vibration');
      const exhaustDt = row.querySelector('.eng-exhaust-dt');
      const delBtn = row.querySelector('.delete-engine');

      name.value = engine.name;
      type.value = engine.type;
      hours.value = engine.hours;
      lastService.value = engine.lastServiceHours;
      fuelFlow.value = engine.fuelFlow;
      vibration.value = engine.vibrationRms;
      exhaustDt.value = engine.exhaustDeltaT;

      function update() {
        engine.name = name.value;
        engine.type = type.value;
        engine.hours = toNum(hours.value);
        engine.lastServiceHours = toNum(lastService.value);
        engine.fuelFlow = toNum(fuelFlow.value);
        engine.vibrationRms = toNum(vibration.value);
        engine.exhaustDeltaT = toNum(exhaustDt.value);
        saveState(state);
      }
      [name, type, hours, lastService, fuelFlow, vibration, exhaustDt].forEach(el => el.addEventListener('change', update));
      delBtn.addEventListener('click', () => deleteEngine(engine.id));

      els.enginesBody.appendChild(row);
    });

    renderRecommendations(ship);
  }

  function toNum(v) { const n = Number(v); return Number.isFinite(n) ? n : 0; }

  // Simple rule-based recommendations
  function analyzeEngine(engine) {
    const recs = [];
    const sinceService = Math.max(0, engine.hours - engine.lastServiceHours);

    if (sinceService >= 500) {
      recs.push({
        title: 'Schedule routine service',
        message: `Last service ${sinceService}h ago. Target interval ~500h.`,
        severity: 'warn'
      });
    } else {
      recs.push({
        title: 'Service interval OK',
        message: `Next routine due in ~${Math.max(0, 500 - sinceService)}h.`,
        severity: 'ok'
      });
    }

    if (engine.vibrationRms > 3.0) {
      recs.push({
        title: 'High vibration detected',
        message: `RMS ${engine.vibrationRms.toFixed(2)} > 3.0; check bearings/alignment.`,
        severity: 'warn'
      });
    }

    if (engine.exhaustDeltaT > 100) {
      recs.push({
        title: 'Elevated exhaust ΔT',
        message: `ΔT ${engine.exhaustDeltaT.toFixed(1)}°C > 100°C; inspect injectors/turbo fouling.`,
        severity: 'warn'
      });
    }

    const sfocProxy = engine.fuelFlow / Math.max(1, engine.hours % 100); // toy proxy for demo
    if (sfocProxy > 15) {
      recs.push({
        title: 'Fuel efficiency degradation',
        message: `Proxy SFOC ${sfocProxy.toFixed(1)} suggests efficiency drift; plan cleaning/calibration.`,
        severity: 'warn'
      });
    }

    if (recs.length === 0) {
      recs.push({ title: 'All good', message: 'No issues detected from current metrics.', severity: 'ok' });
    }
    return recs;
  }

  function renderRecommendations(ship) {
    els.recommendations.innerHTML = '';
    if (!ship.engines.length) {
      const div = document.createElement('div');
      div.className = 'rec-item';
      div.innerHTML = '<div class="title">Add engines to see recommendations</div>';
      els.recommendations.appendChild(div);
      return;
    }
    ship.engines.forEach(engine => {
      const recs = analyzeEngine(engine);
      recs.forEach(r => {
        const item = document.createElement('div');
        item.className = 'rec-item';
        item.innerHTML = `
          <div class="title">
            <a href="maintenance.html?ship=${ship.id}&engine=${engine.id}" style="text-decoration:none;color:inherit;">
              ${engine.name} — ${r.title}
            </a>
            <span class="badge ${r.severity === 'warn' ? 'warn' : 'ok'}">${r.severity.toUpperCase()}</span>
          </div>
          <div>${r.message}</div>
          <div class="meta">Type: ${engine.type} · Hours: ${engine.hours} · LastSvc: ${engine.lastServiceHours} · FuelFlow: ${engine.fuelFlow} · Vib: ${engine.vibrationRms} · ΔT: ${engine.exhaustDeltaT}</div>
        `;
        els.recommendations.appendChild(item);
      });
    });
  }

  function simulateMetrics() {
    const ship = state.fleet.find(s => s.id === selectedShipId);
    if (!ship) return;
    ship.engines.forEach(e => {
      e.hours += Math.floor(10 + Math.random() * 40);
      e.fuelFlow = Math.max(50, e.fuelFlow + (Math.random() * 40 - 20));
      e.vibrationRms = Math.max(0.5, e.vibrationRms + (Math.random() * 0.6 - 0.2));
      e.exhaustDeltaT = Math.max(20, e.exhaustDeltaT + (Math.random() * 10 - 3));
    });
    saveState(state);
    renderShipPanel();
  }

  // Events
  els.addShipBtn.addEventListener('click', addShip);
  els.deleteShipBtn.addEventListener('click', deleteShip);
  els.renameShipBtn.addEventListener('click', renameShip);
  els.addEngineBtn.addEventListener('click', addEngine);
  els.simulateBtn.addEventListener('click', simulateMetrics);
  els.resetDemoBtn.addEventListener('click', resetDemo);
  els.loadSampleBtn.addEventListener('click', loadSample);

  // Init
  if (!state.fleet.length) {
    els.shipSection.classList.add('hidden');
    els.emptyState.classList.remove('hidden');
  } else {
    selectedShipId = state.fleet[0].id;
  }
  renderFleet();
  renderShipPanel();
})();


