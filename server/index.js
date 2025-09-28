const express = require("express");
require("dotenv").config();
require("./config/dbConnect");
const cors = require("cors");
const contactRoutes = require("./routes/contactRoutes");

const app = express();

// Middleware
app.use(express.json());

// ✅ Allowed Origins (Dev + Prod)
const allowedOrigins = [
    "https://kundan-portfolio-1viy.vercel.app",

];

// ✅ CORS setup
app.use(
    cors({
        origin: function (origin, callback) {
            // Allow requests with no origin (like Postman, curl)
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
    })
);

// Routes
app.use("/api/contacts", contactRoutes);

// Server listener
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
