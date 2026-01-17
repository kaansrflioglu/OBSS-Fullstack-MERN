const express = require("express");
const cors = require("cors");
const path = require("path");
const history = require("connect-history-api-fallback");
require("dotenv").config();

const studentRoutes = require("./routes/student.routes");
const parentRoutes = require("./routes/parent.routes");
const sportsRoutes = require("./routes/sports.routes");
const authRoutes = require("./routes/auth.routes");

const app = express();

app.use(cors({
  origin: [
    "https://obss.kaanatorium.site"
  ],
  credentials: true
}));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/parents", parentRoutes);
app.use("/api/sports", sportsRoutes);

app.use(history());

const buildPath = path.join(__dirname, "../../frontend/dist");
app.use(express.static(buildPath));

module.exports = app;