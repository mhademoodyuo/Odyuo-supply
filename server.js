const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");

const app = express();
const PORT = 3000;

// Middleware to serve static files and parse JSON body
app.use(express.static(path.join(__dirname)));
app.use(express.json());

// Serve signup.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "signup.html"));
});

// Handle signup form submission
app.post("/signup", (req, res) => {
    // Handle form data here
    res.redirect("/index");
});

// Serve index.html
app.get("/index", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Helper function to generate a 10-digit unique ID
function generateUniqueId() {
    return Math.floor(1000000000 + Math.random() * 9000000000);
}

// Route to handle payment confirmation and send email
app.post("/confirm-payment", (req, res) => {
    const { email, productName, totalPrice } = req.body;

    // Validate request body
    if (!email || !productName || !totalPrice) {
        return res.status(400).json({ message: "Missing required fields." });
    }

    const uniqueId = generateUniqueId();

    // Set up Nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "odyuosupply@gmail.com", // Replace with your store Gmail
            pass: "mxhfzojiIkevtwhI", // Replace with your app password
        },
    });

    // Email options
    const mailOptions = {
        from: "odyuosupply@gmail.com", // Sender's email address
        to: email, // Customer's email address
        subject: "Payment Confirmation",
        text: `Thank you for your purchase!\n\nProduct: ${productName}\nTotal Price: ₹${totalPrice}\nOrder ID: ${uniqueId}\n\nKeep this email for your records.`,
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);
            return res.status(500).json({ message: "Failed to send confirmation email." });
        }
        console.log("Email sent:", info.response);
        res.status(200).json({ message: `Payment confirmed. Order ID: ${uniqueId}` });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
