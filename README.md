# M16 — TCS Meeting Module

## Overview
The M16 module enables tracking, viewing, and administering meetings and interactions with TCS representatives within the `isep-batch1` portal.

## Files Created / Modified
- `server/models/TCSMeeting.js` (M1 Dependency Schema)
- `server/routes/tcsMeetings.js` (REST API endpoints)
- `client/src/pages/TCSMeetings.jsx` (Main page)
- `client/src/components/TCSMeetingCard.jsx` (Display card component)
- `client/src/components/TCSMeetingForm.jsx` (Admin create/edit modal form)
- `server/server.js` (Route registration)
- `client/src/App.jsx` (Route registration)

## API Endpoints
- `GET /api/tcs-meetings` — Retrieve all meetings (Authenticated)
- `GET /api/tcs-meetings/:id` — Retrieve single meeting by ID (Authenticated)
- `POST /api/tcs-meetings` — Create new meeting (Admin only)
- `PUT /api/tcs-meetings/:id` — Update existing meeting (Admin only)
- `DELETE /api/tcs-meetings/:id` — Delete meeting (Admin only)

## Authentication & Authorization
- Uses existing JWT authentication cookies/headers via project Axios setup.
- Enforces server-side checks using `roleCheck('admin')`.
- Hides administrative CRUD buttons on the frontend for normal users via `AuthContext`.

## Image Upload Integration
- Reuses M11 component (`ImageUpload.jsx`) to seamlessly attach multi-photo galleries to meetings.
