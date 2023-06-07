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
app.use(router)


app.listen(process.env.PORT, () => console.log("server berjalan di port 5000"))