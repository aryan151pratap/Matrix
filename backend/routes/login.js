const {Router} = require("express");
const nodemailer = require("nodemailer");
const User = require("../models/user.js");

const router = Router();

router.get("/getUser/:userId", async (req, res) => {
	try {
		const { userId } = req.params;
		console.log(userId);
		if (!userId) return res.status(400).json({msg: "failed"});

		const user = await User.findOne({
			_id: userId
		});
		if(!user) return res.status(401).json({msg: "user not found"});

		res.json(user);
	} catch (e) {
		res.status(500).json({ ok: false });
	}
});

router.post("/login", async (req, res) => {
	try {
		const { password, email } = req.body || {};
		console.log(email);
		if (!email || !password) return res.status(400).json({msg:"failed"});

		const user = await User.findOne({
			email: email,
			password
		});
		if(!user) return res.status(401).json({msg: "user not found"});

		res.json(user);
	} catch (e) {
		res.status(500).json({ ok: false });
	}
});

router.post("/signup", async (req, res) => {
	try {
		const { name, email, password } = req.body || {};
		console.log(name);
		if (!name || !email || !password) return res.status(400).json({msg:"failed"});

		const user = await User.findOne({email});
		if(user) return res.status(401).json({msg: "user already exists"});
		console.log(user);

		const created = await User.create({ name, email, password });
		console.log(created);
		res.status(201).json(created);
	} catch (e) {
		console.log(e.message);
		res.status(500).json({msg: "server error"});
	}
});

module.exports = router;
