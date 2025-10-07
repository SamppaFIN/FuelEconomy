(function() {
  const STORAGE_KEY = 'fuel-economy-demo-state-v1';
  function loadState() { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || { fleet: [] }; } catch { return { fleet: [] }; } }
  function getParam(n) { return new URLSearchParams(location.search).get(n); }

  const els = {
    title: document.getElementById('ship-title'),
    shipCard: document.getElementById('ship-card'),
    summary: document.getElementById('summary'),
    engines: document.getElementById('engine-list')
  };

  const state = loadState();
  const shipId = getParam('ship');
  const ship = state.fleet.find(s => s.id === shipId);
  if (!ship) {
    els.title.textContent = 'Not Found';
    els.shipCard.textContent = 'Ship not found.';
    return;
  }

  els.title.textContent = ship.name;
  els.shipCard.innerHTML = `
    <div class="ship-card-header">
      <img src="${ship.logo || ''}" alt="logo" class="ship-logo" onerror="this.style.display='none'" />
      <div>
        <div class="ship-name">${ship.name}</div>
        <div class="ship-class">${ship.class || ''}</div>
      </div>
    </div>
    <div class="ship-meta">Built ${ship.buildYear || '—'} · Engines ${ship.engines.length}</div>
  `;

  const totals = summarize(ship);
  els.summary.innerHTML = `
    <div>Due Service: <b>${totals.dueService}/${totals.total}</b></div>
    <div>High Vibration: <b>${totals.vib}/${totals.total}</b></div>
    <div>Elevated ΔT: <b>${totals.dt}/${totals.total}</b></div>
    <div>Overall Risk: <b>${totals.risk}%</b></div>
  `;

  els.engines.innerHTML = '';
  ship.engines.forEach(e => {
    const since = Math.max(0, e.hours - e.lastServiceHours);
    const a = document.createElement('a');
    a.href = `maintenance.html?ship=${ship.id}&engine=${e.id}`;
    a.className = 'rec-item';
    a.innerHTML = `
      <div class="title">${e.name}<span class="badge">${e.type}</span></div>
      <div>Hours ${e.hours} · LastSvc ${e.lastServiceHours} (Δ ${since}h) · Fuel ${e.fuelFlow} · Vib ${e.vibrationRms} · ΔT ${e.exhaustDeltaT}</div>
    `;
    els.engines.appendChild(a);
  });

  function summarize(ship) {
    const total = ship.engines.length || 1;
    let dueService = 0, vib = 0, dt = 0;
    ship.engines.forEach(e => {
      const since = Math.max(0, e.hours - e.lastServiceHours);
      if (since >= 500) dueService++;
      if (e.vibrationRms > 3.0) vib++;
      if (e.exhaustDeltaT > 100) dt++;
    });
    const risk = Math.round(((dueService + vib + dt) / (total * 3)) * 100);
    return { total, dueService, vib, dt, risk };
  }
})();


