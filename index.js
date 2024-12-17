const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const db = require('./config/db')
const recordRoutes = require("./routes/recordRoutes");
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/", recordRoutes);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
