(function() {
  const STORAGE_KEY = 'fuel-economy-demo-state-v1';
  function loadState() { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || { fleet: [] }; } catch { return { fleet: [] }; } }

  const state = loadState();
  const grid = document.getElementById('fleet-grid');

  grid.innerHTML = '';
  state.fleet.forEach(ship => {
    const { riskPct, dueService, totalEng } = calcRisk(ship);
    const card = document.createElement('a');
    card.className = 'ship-card';
    card.href = `ship.html?ship=${ship.id}`;
    card.innerHTML = `
      <div class="ship-card-header">
        <img src="${ship.logo || ''}" alt="logo" class="ship-logo" onerror="this.style.display='none'" />
        <div>
          <div class="ship-name">${ship.name}</div>
          <div class="ship-class">${ship.class || 'Class'}</div>
        </div>
      </div>
      <div class="ship-meta">Built ${ship.buildYear || '—'} · Engines ${ship.engines.length}</div>
      <div class="ship-bars">
        <div class="kpi-bar">
          <div class="kpi-bar-label">Service Due</div>
          <div class="bar"><span style="width:${pct(dueService, totalEng)}%"></span></div>
          <div class="kpi-bar-meta">${dueService} / ${totalEng}</div>
        </div>
        <div class="kpi-bar">
          <div class="kpi-bar-label">Overall Risk</div>
          <div class="bar warn"><span style="width:${riskPct}%"></span></div>
          <div class="kpi-bar-meta">${riskPct}%</div>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });

  function calcRisk(ship) {
    const totalEng = ship.engines.length || 1;
    let dueService = 0, vibHigh = 0, dtHigh = 0;
    ship.engines.forEach(e => {
      const since = Math.max(0, e.hours - e.lastServiceHours);
      if (since >= 500) dueService++;
      if (e.vibrationRms > 3.0) vibHigh++;
      if (e.exhaustDeltaT > 100) dtHigh++;
    });
    const riskPct = Math.round(((dueService + vibHigh + dtHigh) / (totalEng * 3)) * 100);
    return { riskPct, dueService, totalEng };
  }

  function pct(n, d) { return Math.round((n / Math.max(1, d)) * 100); }
})();


