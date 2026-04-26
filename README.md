# Serexa Dashboard

Welcome to the Serexa  User Dashboard project. This documentation provides information on how to set up and use the application.

## 6. Start Backend Server

```bash
npm run dev
```

The backend will run on [http://localhost:5000](http://localhost:5000)

## 7. Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on [http://localhost:5173](http://localhost:5173)

---

## Login Credentials

### Admin Account
- **Email:** admin@example.com
- **Password:** password

### Sample User Accounts (if seeded)
- **Email:** john@example.com | **Password:** password123
- **Email:** jane@example.com | **Password:** password123
- **Email:** bob@example.com | **Password:** password123

---

## Available Scripts

### Backend
- `npm run dev` # Start dev server
- `npm run start` # Start production server
- `npm run seed:admin` # Create admin account
- `npm run seed:sample` # Create sample user accounts

### Frontend
- `npm run dev` # Start dev server
- `npm run build` # Build for production
- `npm run preview` # Preview production build

---

## MongoDB Collections

No manual collection creation required! Collections are automatically created by Mongoose when data is inserted.

The following collections will be created automatically:
- `users` - User accounts
- `events` - Event listings
- `messages` - Contact messages
- `settings` - System settings

---

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user

### Users
- `GET /api/users` - Get all users
- `POST /api/users` - Create user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user
- `PATCH /api/users/:id/block` - Block user
- `PATCH /api/users/:id/unblock` - Unblock user

### Events
- `GET /api/events` - Get all events
- `POST /api/events` - Create event (multipart/form-data)
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event
- `PATCH /api/events/:id/approve` - Approve event
- `PATCH /api/events/:id/reject` - Reject event

### Messages
- `GET /api/messages` - Get all messages
- `PATCH /api/messages/:id/read` - Mark as read
- `DELETE /api/messages/:id` - Delete message

### Reports
- `GET /api/reports/summary` - Dashboard summary
- `GET /api/reports/recent-activity` - Recent activity
- `GET /api/reports/event-status` - Event statistics
- `GET /api/reports/monthly-users` - Monthly user stats

### Settings
- `GET /api/settings` - Get settings
- `PUT /api/settings` - Update settings
- `POST /api/settings/upload-logo` - Upload logo (multipart/form-data)

---

## Icons

The project uses **Lucide React** for icons, providing a consistent and modern visual language across the dashboard and navigation components.

---

## Project Structure

```text
.
├──  backend/           # Express.js backend
│   ├── controllers/    # API controllers
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   └── server.js       # Backend entry point
├── frontend/           # Next.js frontend
│   ├── app/            # Next.js app directory
│   ├── public/         # Static assets
│   ├── services/       # API services
│   └── next.config.ts  # Next.js configuration
└── README.md           # Project documentation
```
