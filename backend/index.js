const express = require("express");
const mongo = require("mongoose");
const cors = require("cors");

const Task = require("./models/Task");
const T = require("./Routes/TaskRoutes");
const { default: mongoose } = require("mongoose");
  
require("dotenv").config();

const app = express();

// CORS configuration
const allowedOrigins = [
  "http://localhost:5173",  // Local development frontend
  "https://new-task-management-system-frontend.vercel.app"  // Deployed frontend
];

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.options("*", cors()); // Handles preflight requests

app.use(express.json());
app.use("/api/TaskRoutes", T);

mongoose.connect(process.env.MONGO_URI)
  .then(() => { console.log("Connected to MongoDB"); })
  .catch((error) => { console.log("Error connecting to MongoDB", error); });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
