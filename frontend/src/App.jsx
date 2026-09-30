import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

// Public Pages
import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import About from "./pages/About";

// Protected Pages
import RoomDetails from "./pages/RoomDetails";
import AddRoom from "./pages/AddRoom";
import MyListings from "./pages/MyListings";
import EditRoom from "./pages/EditRoom";
import BookingPage from "./pages/BookingPage";
import MyBookings from "./pages/MyBookings";

// Authentication Pages
import Register from "./pages/Register";
import Login from "./pages/Login";
import AuthCallback from "./pages/AuthCallback";

// Protected Route
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Layout */}
        <Route element={<MainLayout />}>

          {/* =========================
              PUBLIC PAGES
          ========================== */}

          {/* Home */}
          <Route
            path="/"
            element={<Home />}
          />

          {/* Rooms */}
          <Route
            path="/rooms"
            element={<Rooms />}
          />

          {/* About */}
          <Route
            path="/about"
            element={<About />}
          />

          {/* =========================
              PROTECTED PAGES
          ========================== */}

          {/* Room Details */}
          <Route
            path="/rooms/:id"
            element={
              <ProtectedRoute>
                <RoomDetails />
              </ProtectedRoute>
            }
          />

          {/* Booking */}
          <Route
            path="/rooms/:id/book"
            element={
              <ProtectedRoute>
                <BookingPage />
              </ProtectedRoute>
            }
          />

          {/* Add Room */}
          <Route
            path="/add-room"
            element={
              <ProtectedRoute>
                <AddRoom />
              </ProtectedRoute>
            }
          />

          {/* My Listings */}
          <Route
            path="/my-listings"
            element={
              <ProtectedRoute>
                <MyListings />
              </ProtectedRoute>
            }
          />

          {/* Edit Room */}
          <Route
            path="/rooms/:id/edit"
            element={
              <ProtectedRoute>
                <EditRoom />
              </ProtectedRoute>
            }
          />

          {/* My Bookings */}
          <Route
            path="/my-bookings"
            element={
              <ProtectedRoute>
                <MyBookings />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* =========================
            AUTHENTICATION
        ========================== */}

        {/* Register */}
        <Route
          path="/register"
          element={<Register />}
        />

        {/* Login */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* Google Auth Callback */}
        <Route
          path="/auth/callback"
          element={<AuthCallback />}
        />

        {/* =========================
            404
        ========================== */}

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;