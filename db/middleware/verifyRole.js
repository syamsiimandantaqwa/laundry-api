const User = require("../models").user;
const jwt = require("jsonwebtoken");


const isAdmin = async (req, res, next) => {
	const token = req.cookies["access_token"];

	jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
		if(err) return res.sendStatus(401);

		if(decoded.role !== "admin"){
			res.sendStatus(403);
			return;
		}

		next();
	})
}

const isAdminOrEmployee = async (req, res, next) => {
	const token = req.cookies["access_token"];

	jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
		if(err) return res.sendStatus(401);

		if(decoded.role == "pelanggan"){
			res.sendStatus(403);
			return;
		}

		next();
	})
}

const isCustomer = async (req, res, next) => {
	const token = req.cookies["access_token"];

	jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
		if(err) return res.sendStatus(401);

		if(decoded.role !== "pelanggan"){
			res.sendStatus(403);
			return;
		}

		next();
	})
}


module.exports = {
	isAdmin,
	isAdminOrEmployee,
	isCustomer
}