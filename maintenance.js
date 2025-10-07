(function() {
  const STORAGE_KEY = 'fuel-economy-demo-state-v1';

  function loadState() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || { fleet: [] }; }
    catch { return { fleet: [] }; }
  }

  function getParam(name) { return new URLSearchParams(location.search).get(name); }

  const els = {
    title: document.getElementById('title'),
    metrics: document.getElementById('metrics'),
    actions: document.getElementById('actions'),
    notes: document.getElementById('notes'),
    saveNotes: document.getElementById('save-notes'),
    ackBtn: document.getElementById('ack-btn')
  };

  const state = loadState();
  const shipId = getParam('ship');
  const engineId = getParam('engine');
  const ship = state.fleet.find(s => s.id === shipId);
  const engine = ship?.engines.find(e => e.id === engineId);

  if (!ship || !engine) {
    els.title.textContent = 'Not Found';
    els.metrics.textContent = 'Engine not found. Return to fleet.';
    els.actions.innerHTML = '';
    els.notes.disabled = true;
    els.saveNotes.disabled = true;
    return;
  }

  els.title.textContent = `${ship.name} — ${engine.name}`;
  els.metrics.innerHTML = `
    <div>Type: <b>${engine.type}</b></div>
    <div>Hours: <b>${engine.hours}</b> | Last Service: <b>${engine.lastServiceHours}</b> (Δ ${Math.max(0, engine.hours - engine.lastServiceHours)}h)</div>
    <div>Fuel Flow: <b>${engine.fuelFlow}</b> kg/h</div>
    <div>Vibration RMS: <b>${engine.vibrationRms}</b></div>
    <div>Exhaust ΔT: <b>${engine.exhaustDeltaT}</b> °C</div>
  `;

  const actions = buildActions(engine);
  els.actions.innerHTML = '';
  actions.forEach(a => {
    const li = document.createElement('li');
    li.textContent = a;
    els.actions.appendChild(li);
  });

  // Notes persistence per engine
  const noteKey = `notes-${ship.id}-${engine.id}`;
  els.notes.value = localStorage.getItem(noteKey) || '';
  els.saveNotes.addEventListener('click', () => {
    localStorage.setItem(noteKey, els.notes.value);
    alert('Notes saved');
  });

  els.ackBtn.addEventListener('click', () => {
    alert('Acknowledged. This would sync to CMMS in a real system.');
  });

  function buildActions(engine) {
    const acts = [];
    const since = Math.max(0, engine.hours - engine.lastServiceHours);
    if (since >= 500) acts.push('Schedule routine service (oil, filters, inspection)');
    if (engine.vibrationRms > 3.0) acts.push('Inspect bearings and alignment; perform vibration analysis');
    if (engine.exhaustDeltaT > 100) acts.push('Check injectors/turbo; clean and calibrate as needed');
    const sfocProxy = engine.fuelFlow / Math.max(1, engine.hours % 100);
    if (sfocProxy > 15) acts.push('Investigate fuel efficiency drift; consider hull/prop cleaning, tuning');
    if (!acts.length) acts.push('No immediate actions required. Monitor routinely.');
    return acts;
  }
})();


