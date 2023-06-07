const User = require("../models").user;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require('uuid');


const register = async (req, res) => {
	const { email, nama } = req.body;

	const salt = await bcrypt.genSalt();
	const hashPassword = await bcrypt.hash(req.body.password, salt);

	// masukan data ke tabel users
	try {
		await User.create({
			id_user: uuidv4(),
			nama,
			email,
			password: hashPassword,
			role: "pelanggan"		
		});

		res.status(200).json({
			success: true,
			message: "berhasil melakukan registrasi"
		})
		return;

	} catch (err) {
		res.status(400).json({
			success: false,
			message: "maaf, ada kesalahan"
		})
		console.log(err)
	}

}

const login = async (req, res) => {

	const user = await User.findOne({
		where: { email: req.body.email },
	});
	// jika data tidak ada 
	if(user == null) {
		res.status(404).json({
			success: false,
			message: "email tidak di temukan"
		});
		return;
	}

	// cek password nya
	const match = await bcrypt.compare(req.body.password, user.password);
	if(!match){
		res.json({
			success:false,
			accesToken: null,
			message: "password salah"
		})
		return;
	}

	// jika datanya ada
		const userId = user.id_user;
		const email = user.email;
		const role = user.role;

		const accesToken = jwt.sign({userId, email, role}, process.env.SECRET_KEY, {
			expiresIn: "1d"
		});

		res.cookie("access_token", accesToken, {
			httpOnly: true,
			expires: new Date(Date.now() + 8 * 1000 * 60 * 60) // akan di hapus setelah 8 jam
		});

		res.status(200).json({
			success: true,
			accesToken,
			message: "berhasil masuk"
		})
}

const logout = (req, res) => {
	res.clearCookie("access_token");
	res.json({
		message: "berhasil keluar"
	})
}


const getAllCustomers = async (req, res) => {
	try {
		const users = await User.findAll({
			attributes: ["id_user", "nama", "email"],
			order: [
				["nama", "ASC"],
			],
			where: {
				role: "pelanggan"
			}
		});

		res.status(200).json({
			success: true,
			message: "daftar semua pelanggan",
			data: users
		});

		return;
	}catch (err) {
		res.status(400).json({
			success: false,
			message: "gagal dalam mengambil data pelanggan"
		});
		console.log(err)
	}
}

const addEmployee = async (req, res) => {
	const { email, nama } = req.body;
	try {

		const user = await User.findOne({ where: { email } })

		if(user.role === "pegawai") return res.json({ message: `${user.nama} adalah pegawai` });

		await User.update({ role: 'pegawai', nama }, {
			where: { email }
		})

		res.status(201).json({
			success: true,
			message: `berhasil menjadikan ${nama} sebagai pegawai baru`
		});
		return;

	} catch (err) {
		res.status(400).json({
			success: false,
			message: "email pegawai yang di cari tidak di temukan"
		})
	}
}


const getAllEmployees = async (req, res) => {
	try {
		const users = await User.findAll({
			attributes: ["id_user", "nama", "email"],
			order: [
				["nama", "ASC"],
			],
			where: {
				role: "pegawai"
			}
		});

		res.status(200).json({
			success: true,
			message: "daftar semua pegawai",
			data: users
		});

		return;
	}catch (err) {
		res.status(400).json({
			success: false,
			message: "gagal dalam mengambil data pegawai"
		});
		console.log(err)
	}
}


module.exports = {
	register,
	login,
	logout,
	getAllCustomers,
	addEmployee,
	getAllEmployees
}


// {
// 	"nama": "udin",
// 	"email": "udin@gmail.com",
// 	"password": "hello"
// }

// {
// 	"nama": "jhonDoel",
// 	"email": "jhonDoel@gmail.com"
// }

// {
// 	"nama_layanan": "kiloan",
// 	"harga": "250000",
// 	"keterangan": "untuk harga di sesuaikan per kilo"
// }