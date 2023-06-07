const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];

	if(!token) return res.sendStatus(401)

	jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
		if(err) return res.sendStatus(403);

		req.email = decoded.email;
		next();
	})
}


module.exports = {
	verifyToken
}