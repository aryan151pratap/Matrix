require("dotenv").config();
const cors = require("cors");
const express = require("express");
const sendMail = require("./routes/sendMail.js");
const chat = require("./routes/chat.js");
const login = require('./routes/login.js');
const connectDB = require("./db.js");

const app = express();

app.use(express.json());
app.use(cors({
	origin:["http://localhost:5173", "https://app.mediahub.qzz.io"],
	credentials:true
}));
connectDB();

app.get("/", (req, res) => {
	res.send("Server running");
});
app.use("/login", login);
app.use("/api", sendMail);
app.use("/chat", chat);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log("Server started on port " + PORT);
});