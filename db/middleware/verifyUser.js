const User = require("../models").user;



const checkDuplicateUser = async (req, res, next) => {
	// cek apakah email sudah ada
	const user = await User.findOne({
		attributes: { exclude: ["id"] },
		where: { email: req.body.email }
	})
// jika email sudah di gunakan maka tampilkan pesan
	if(user) {
		res.json({
			message: "email sudah di gunakan"
		});
		return;
	}

	next()
}


module.exports = {
	checkDuplicateUser,
}