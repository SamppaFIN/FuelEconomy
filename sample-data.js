window.FuelDemoSample = {
  fleet: [
    {
      id: 'vessel-aurora',
      name: 'MV Aurora',
      class: 'Aurora-Class',
      logo: 'assets/aurora-class.svg',
      buildYear: 2016,
      engines: [
        // Healthy vessel — all metrics within normal ranges
        { id: 'E1', name: 'Main Engine 1', type: 'main', hours: 18250, lastServiceHours: 17900, fuelFlow: 880, vibrationRms: 2.1, exhaustDeltaT: 85 },
        { id: 'E2', name: 'Main Engine 2', type: 'main', hours: 18110, lastServiceHours: 17650, fuelFlow: 860, vibrationRms: 2.4, exhaustDeltaT: 90 },
        { id: 'G1', name: 'Generator 1', type: 'generator', hours: 8200, lastServiceHours: 8000, fuelFlow: 130, vibrationRms: 1.3, exhaustDeltaT: 45 }
      ]
    },
    {
      id: 'vessel-infinite',
      name: 'MV Infinite',
      class: 'Infinite-Class',
      logo: 'assets/infinite-class.svg',
      buildYear: 2012,
      engines: [
        // Needs maintenance — vibration and ΔT elevated; service overdue
        { id: 'E1', name: 'Main Engine', type: 'main', hours: 12650, lastServiceHours: 12000, fuelFlow: 820, vibrationRms: 3.4, exhaustDeltaT: 118 },
        { id: 'A1', name: 'Aux Engine', type: 'aux', hours: 6400, lastServiceHours: 5850, fuelFlow: 240, vibrationRms: 3.1, exhaustDeltaT: 108 }
      ]
    },
    {
      id: 'vessel-elysium',
      name: 'MV Elysium',
      class: 'Elysium-Class',
      logo: 'assets/elysium-class.svg',
      buildYear: 2019,
      engines: [
        // Mixed — one healthy, one approaching service
        { id: 'E1', name: 'Main Engine', type: 'main', hours: 9100, lastServiceHours: 8650, fuelFlow: 700, vibrationRms: 2.2, exhaustDeltaT: 88 },
        { id: 'G1', name: 'Generator', type: 'generator', hours: 4550, lastServiceHours: 4000, fuelFlow: 150, vibrationRms: 2.0, exhaustDeltaT: 60 }
      ]
    }
  ]
};


