const express = require("express");
const cors = require("cors");
const bookingRoutes = require("./routes/bookingRoutes");
const supportRoutes = require('./routes/supportRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = 5000;

// Middleware
app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [""]; // Allow both localhost and 127.0.0.1
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// Routes

app.use('/api/auth', authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use('/api/support', supportRoutes);

// Root
app.get("/", (req, res) => {
  res.send("Flight Booking API is running 🚀");
});

// Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
