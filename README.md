# SmartBus Udupi — interactive classroom prototype

A mobile-first React/Vite demo based on the supplied 13-screen Figma PDF. Green-and-white design, status bar, and passenger/conductor/admin roles are retained.

## Run

```bash
npm install
npm run dev
```

For production: `npm run build` then deploy the `dist` output to Vercel (Vite preset).

## Implemented

- Passenger journey planning with route matching based on ordered stop data; shows no-results state for unsupported journeys.
- Route comparison, detailed stop sequence, sample fare calculation and simulated successful/failed payment.
- Unique QR ticket, ticket wallet selection, local ticket history and validation state.
- Conductor validation by ticket ID, including invalid, wrong-route, and duplicate rejection.
- Optional camera QR scanner where browser `BarcodeDetector` is supported, with manual entry fallback.
- Simulated moving bus, destination reminder, and completion after ticket validation.
- Administrator overview, ticket records, route/fare editing, add/remove routes, and sample bus/stop/schedule list management.
- Browser localStorage persistence and mobile-responsive layout.

## Important limitations

This is a **prototype**, not an official Udupi bus service. Routes, fares, timetables, and GPS movement are sample data. Payment never charges money. The camera scanner requires HTTPS or localhost and browser support for `BarcodeDetector`. There is no server, authentication, or multi-device synchronization: a conductor on a different phone cannot access a passenger's locally stored ticket. Admin edits to the bus/stop/schedule lists are demo configuration only; real dispatch and geospatial routing are not implemented. The browser may clear local storage.

## Verify before uploading

Run `npm run build`, test all role flows in the same browser, and check mobile display.
