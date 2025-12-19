# AHA - A Decentralized Drone Delivery System

A city-scale drone delivery platform that routes fleets without forcing merchants to colocate with droneports. Customers order through the web, drones launch from available ports, and routes are computed in real time while respecting no-fly zones and operational constraints. The Go backend leans on goroutines, worker pools, and synchronized job queues so each delivery runs as an independent parallel job, while grid-based shortest-path routing keeps flight plans safe across multiple ports and regions. The TypeScript frontend shares data models with Convex for live synchronization and geospatial overlays.

Operationally, the system selects ports, merchants, and customer locations on the fly, then assigns drones based on fleet availability. It is tuned to handle dozens of concurrent orders per droneport while keeping routing latency low and to scale naturally as new fleets and regions come online.
