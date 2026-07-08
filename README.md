# Employee Form using JsonPowerDB (JPDB)

## Description
This is a micro-project built as part of the **Introduction to JsonPowerDB - V2.0** course by Login2Xplore. It is a simple, dynamic Employee Management form built using **HTML, CSS (Bootstrap), and JavaScript (jQuery)**, powered entirely by **JsonPowerDB (JPDB)** — a real-time, schema-free, serverless multi-mode database accessed via REST API.

The form allows a user to:
- Enter an Employee ID and automatically check if that employee already exists in the database.
- If the ID is new, fill in the remaining details and **Save** (insert) a new employee record.
- If the ID already exists, the form auto-populates with the existing data, allowing the user to **Change** (update) that employee's details.
- **Reset** the form at any time to start fresh.

All database operations (PUT, UPDATE, GET_BY_KEY) are performed asynchronously via AJAX calls directly to the JsonPowerDB REST API — no traditional backend server or database setup required.

## Benefits of Using JsonPowerDB
- **Schema-free** — no need to define tables or columns in advance; the database structure is created automatically from the JSON data.
- **Serverless & Lightweight** — no server-side code needed; the frontend communicates directly with JPDB over REST API.
- **Fast development** — CRUD operations can be implemented with just a few lines of JavaScript.
- **Multi-mode database** — supports Document DB, Key-Value DB, RDBMS-style queries, GeoSpatial, and Time Series data all through one unified API.
- **Real-time performance** — built on JPDB's PowerIndex engine for high-speed indexing and retrieval.

## Tech Stack
- HTML5, CSS3, Bootstrap 3.4.1
- JavaScript (jQuery 3.5.1)
- JsonPowerDB REST API (JPDB)

## How It Works
1. On page load, only the **Employee ID** field is active; all other fields and buttons are disabled.
2. When the user enters an Employee ID and moves focus away, a `GET_BY_KEY` request checks JPDB for that ID.
3. **If the ID does not exist:** the remaining fields are enabled (empty) and the **Save** + **Reset** buttons are activated. Filling the form and clicking **Save** sends a `PUT` request to insert the new record.
4. **If the ID exists:** the form auto-fills with the employee's current data, the ID field is locked, and **Change** + **Reset** buttons are activated. Editing the fields and clicking **Change** sends an `UPDATE` request.

## Project Structure
```
├── index.html   # Employee form UI
├── index.js     # Form logic + JPDB API calls
└── README.md
```

## Release History
- **v1.0** (2026) — Initial release: Employee Form with Save/Change/Reset functionality integrated with JsonPowerDB, built as part of Login2Xplore's JsonPowerDB course.

## Author
Penkey Sri Vasu — B.Tech CSE, Parul University
GitHub: [pvasu9055-hash](https://github.com/pvasu9055-hash)
