Environment variables required by the backend
--------------------------------------------

Copy the block below into a `.env` file in `Backend/` and adjust values:

```
MONGO_URI=mongodb://127.0.0.1:27017/hospital
PORT=5000
FRONTEND_ORIGIN=http://localhost:5173

# JWT for auth tokens
JWT_SECRET=supersecretjwtkey

# Optional seed admin overrides
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=ChangeMe123!
ADMIN_NAME=Super Admin

# Optional seed doctor overrides
DOCTOR_EMAIL=doctor@example.com
DOCTOR_PASSWORD=DoctorPass123!
DOCTOR_NAME=Demo Doctor
```

Notes
- `MONGO_URI` is required. If omitted, the server falls back to a local MongoDB at `mongodb://127.0.0.1:27017/hospital`.
- Ensure MongoDB is running locally or update `MONGO_URI` to your hosted cluster string.
- After creating the `.env`, restart the backend server.

