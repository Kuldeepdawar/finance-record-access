// server setup

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const financeRoutes = require("./routes/financeRoutes");

const app = express();

require("dotenv").config();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/finance", financeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
