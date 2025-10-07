# Fuel Economy Program

This project provides a unified view of ship engines, predictive maintenance, and fuel optimization.

- See `VISION.md` for the why and what
- See `IMPLEMENTATION_PLAN.md` for the how and when

## Demo (Local Browser)

Location: `Projects/FuelEconomy/demo/`

How to run:
- Option 1: Open `index.html` directly in your browser (Chrome/Edge/Firefox)
- Option 2: Serve locally for best results:
  - PowerShell: `Start-Process powershell -Verb runAs` then `cd Projects/FuelEconomy/demo; python -m http.server 5500`
  - Node: `npx http-server -p 5500`

What you can do:
- Manage a fleet: add/rename/delete ships (left sidebar)
- Manage engines per ship: add/delete and edit metrics inline
- Load sample fleet data (button in empty state)
- Simulate metrics changes to see updated recommendations
- Data persists via localStorage (Reset clears demo data)

