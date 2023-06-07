const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const router = require("./routes/");

dotenv.config();

app.use(cors({ origin: 'localhost' }));
app.use(express.json());
app.use(cookieParser())
// handle route
app.use(router)
// handle route error 
app.use((req, res, next) => {
	res.status(404).json({ message: "upps.., route tidak di temukan" })
});
// handle server error
app.use((err, req, res, next) => {
	console.log(err)
	res.status(500).json({ message: "maaf, server sedang error" })
})


app.listen(process.env.PORT, () => console.log("server berjalan di port 5000"))