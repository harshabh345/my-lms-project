const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");
const examRoutes = require('./routes/examRoutes');
const connectDB = require("./config/db");
const contactRoutes = require('./routes/contactRoutes');
const adminRoutes = require("./routes/adminRoutes");  // Add this line



dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static("public"));

// Default Root Route
app.get("/", (req, res) => {
  res.send("API is running...");
});


const allowedOrigins = [
  "http://localhost:5173",
  "https://my-lms-project-roan.vercel.app",
  "https://my-lms-project-silk.vercel.app"
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.options("*", cors()); // Handle preflight requests globally
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Authorization, Content-Type");
  next();
});

connectDB();

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use('/api/exams', examRoutes);
app.use('/api/contact', contactRoutes);
// Add Admin Routes
app.use("/api/admin", adminRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
