# StudyNook – Library Study Room Booking

🔗 **Live Site:** [https://study-look.vercel.app](https://study-look.vercel.app)

StudyNook is a full-stack web application where students and library users can list the study rooms they control, and any registered user can browse, search, filter and book those rooms for a specific date and time slot. The platform prevents double-booking automatically and gives every user a dashboard to manage their rooms and bookings.

## Key Features

- **Secure authentication** – JWT stored in HTTP-only cookies, with email/password and Google login
- **Room listings (CRUD)** – add, edit and delete your own study rooms; ownership is verified on the server
- **Search and filters** – search rooms by name and filter by amenities, hourly rate and floor
- **Smart booking system** – pick a date and hourly time slot, see the total cost update live, and get blocked automatically if the slot is already taken
- **Booking dashboard** – view every booking with a status badge and cancel upcoming bookings after confirmation
- **Latest rooms on the home page** – the six newest rooms are loaded straight from MongoDB
- **Responsive design** – works smoothly on mobile, tablet and desktop
- **Friendly user experience** – toast notifications, loading spinners, dynamic page titles and a custom 404 page

## Tech Stack

**Client:** React, Vite, React Router, Tailwind CSS, Framer Motion, React Hot Toast, Axios

**Server:** Node.js, Express, MongoDB, Mongoose, JSON Web Token, Better Auth

**Deployment:** Vercel

## Run Locally

1. Clone the repository and install dependencies

```bash
   cd frontend
   npm install
   npm run dev
```

2. Start the server in a second terminal

```bash
   cd backend
   npm install
   npm run dev
```

3. Create a `.env` file inside `backend` with the following variables

```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   BETTER_AUTH_URL=http://localhost:5173
   CLIENT_URL=http://localhost:5173
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
```

## Pages

| Route | Access | Description |
|---|---|---|
| `/` | Public | Home page with the latest rooms |
| `/rooms` | Public | All rooms with search and filters |
| `/rooms/:id` | Public | Room details and booking entry point |
| `/login`, `/register` | Public | Authentication |
| `/add-room` | Private | Add a new study room |
| `/my-listings` | Private | Manage your rooms |
| `/my-bookings` | Private | View and cancel your bookings |