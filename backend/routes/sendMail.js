const {Router} = require("express");
const nodemailer = require("nodemailer");

const router = Router();

const transporter = nodemailer.createTransport({
	host: process.env.SMTP_HOST,
	port: Number(process.env.SMTP_PORT || 587),
	secure: process.env.SMTP_SECURE === "true",
	auth: {
		user: process.env.SMTP_USER,
		pass: process.env.SMTP_PASS,
	},
});

router.post("/sendmail", async (req, res) => {
	try {
		const { name, email, message } = req.body || {};

		if (!name || !email || !message) {
			return res.status(400).json({ ok: false, error: "name, email, message required" });
		}

		if (!process.env.TO_EMAIL) {
			return res.status(500).json({ ok: false, error: "TO_EMAIL not set" });
		}

		await transporter.sendMail({
			from: process.env.FROM_EMAIL || process.env.SMTP_USER,
			to: process.env.TO_EMAIL,
			subject: `Contact Form: ${name}`,
			replyTo: email,
			text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
		});

		res.json({ ok: true });
	} catch (e) {
		res.status(500).json({ ok: false, error: "failed" });
	}
});

module.exports = router;
