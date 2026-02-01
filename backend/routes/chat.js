const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const Chat = require("../models/chat.js");

const ADMIN_EMAIL = process.env.ADMIN;

function isAdminReq(req) {
  return String(req.header("x-user-email") || "").toLowerCase() === String(ADMIN_EMAIL || "").toLowerCase();
}

router.get("/seen/:id", async (req, res) => {
	try{
		const {id} = req.params;
		if(!id) return res.status(400).json({msg:"id not found"});
		const adminUser = await User.findOne({ email: ADMIN_EMAIL }).select("_id");
    	if (!adminUser) return res.status(500).json({ ok: false });
		const result = await Chat.updateMany(
			{
				userId: id,
				developerId: adminUser._id,
				sender: "user",
				seen: false,
			},	
			{ $set: { seen: true } }
		);
	} catch (err) {
		console.log(err.message);
	}
})

router.get("/getUser", async (req, res) => {
  try {
    if (!isAdminReq(req)) return res.status(403).json({ ok: false });
    const users = await User.find().select("name email").sort({ updatedAt: -1 });;
	const chats = await Chat.find({ seen: false, sender: "user" })
      .select("userId")
      .lean();

	const countMap = new Map();
    for (const c of chats) {
      const id = String(c.userId);
      countMap.set(id, (countMap.get(id) || 0) + 1);
    }

    const data = users.map((u) => ({
      _id: u._id,
      name: u.name,
      email: u.email,
      unseen: countMap.get(String(u._id)) || 0,
    }));

    const totalUnseen = chats.length;
    res.json({ users: data, totalUnseen });
  } catch (e) {
    res.status(500).json({ ok: false });
  }
});

router.get("/chat/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const requesterId = String(req.header("x-user-id") || "");
    const admin = isAdminReq(req);

    if (!admin && requesterId !== String(userId)) return res.status(403).json({ ok: false });

    const userExists = await User.exists({ _id: userId });
    if (!userExists) return res.status(404).json({ ok: false });

    const ad = await User.findOne({ email: ADMIN_EMAIL }).select("_id");
    if (!ad) return res.status(500).json({ ok: false });

    const chats = await Chat.find({ userId, developerId: ad._id })
      .sort({ createdAt: 1 })
      .select("sender message userId developerId seen createdAt updatedAt");

    res.json(chats);
  } catch (e) {
    res.status(500).json({ ok: false });
  }
});

router.post("/chat/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const requesterId = String(req.header("x-user-id") || "");
    const { message } = req.body || {};
    const admin = isAdminReq(req);

    const t = String(message || "").trim();
    if (!t) return res.status(400).json({ ok: false });

    if (!admin && requesterId !== String(userId)) return res.status(403).json({ ok: false });

    const userExists = await User.exists({ _id: userId });
    if (!userExists) return res.status(404).json({ ok: false });

    const ad = await User.findOne({ email: ADMIN_EMAIL }).select("_id");
    if (!ad) return res.status(500).json({ ok: false });
	console.log(admin);
    const doc = await Chat.create({
      userId,
      developerId: ad._id,
      sender: admin ? "bot" : "user",
      message: t,
      seen: false,
    });

	await User.updateOne(
		{ _id: userId },
		{ $set: { updatedAt: new Date() } }
	);

    res.json(doc);
  } catch (e) {
    res.status(500).json({ ok: false });
  }
});

module.exports = router;
