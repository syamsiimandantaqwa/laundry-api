const Logs = require("../models").log_activity;
const jwt = require("jsonwebtoken");

const getActivities = async (req, res) => {

	let userId = "";

	const token = req.cookies["access_token"];
	jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
		if(err) return res.sendStatus(403);

		userId = decoded.userId;
	})

	try {
		const data = await Logs.findAll({
			attributes: ["tanggal", "aktivitas"],
			where: {
				id_user: userId
			}
		});
		res.status(200).json({
			success: true,
			message: "berhasil mendapatkan semua log aktivitas",
			data 
		})
		return;
	} catch (err) {
		res.status(404).json({
			success: false,
			message: "log aktivitas tidak di temukan"
		})
		console.log(err)
	}
}

module.exports = {
	getActivities
}