const OrderBook = require("../models").order_book;
const Service = require("../models").service;
const User = require("../models").user;
const TransactionDetail = require("../models").transaction_detail;

const { transactionDetail } = require("./transaction_detail.controller.js");

const jwt = require("jsonwebtoken");

const addOrder = async (req, res) => {
	const { id_layanan, total } = req.body;
	let userId = "";

	const token = req.cookies["access_token"];
	jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
		if(err) return res.sendStatus(403);

		userId = decoded.userId;
	})

	try {
		const order = await OrderBook.create({
			id_layanan,
			total,
			tgl_transaksi: new Date(),
			id_user: userId,
		});

		await transactionDetail(req, order.id_pesanan);

		res.status(201).json({
			success: true,
			message: "berhasil memproses pesanan anda",
		})

		return;

	} catch (err) {
		res.status(400).json({
			success: false,
			message: "gagal memproses pesanan"
		});

		console.log(err)
	}
}


const getAllOrders = async (req, res) => {
	const { status } = req.query;
	
	try {
		const data = await OrderBook.findAll({
			attributes: ["total", "tgl_transaksi"],
			include: [
			{
				attributes: ["nama_layanan", "harga"],
				model: Service,
				as: "layanan"
			},
			{
				attributes: ["nama", "email"],
				model: User,
				as: "pengguna"
			},
			{
				attributes: { exclude: ["id_pesanan"] },
				model: TransactionDetail,
				as: "detail_transaksi",
				where: { status: status || "di proses" }
			}
			],
		});

		res.status(200).json({
			success: true,
			message: "berhasil mendapatkan seluruh data pesanan",
			data,
		});

		return;
	} catch (err) {
		res.status(400).json({
			success: false,
			message: "gagal mendapatkan seluruh data pesanan"
		});

		console.log(err)
	}
}


const getOrderByUserId = async (req, res) => {
	const { userId } = req.params;

	try {
		const pesanan = await User.findOne({
			attributes: ["nama", "email"],
			where: {
				id_user: userId
			},
			include: { 
				attributes: { exclude: ["id_user", "id_layanan", "keterangan"] },
				all: true, 
				nested: true,
				as: "pesanan"
			},
		});

		res.status(200).json(pesanan);
		return;
	} catch (err) {
		res.status(400).json({
			success: false,
			message: "gagal mendapatkan data pesanan",
		});
		console.log(err)
	}
}


const orderConfirm = async (req, res) => {
	const { orderId } = req.params;
	try {
		await TransactionDetail.update({ status: 'selesai' },{
			where: { id_pesanan: orderId }
		});

		res.status(200).json({
			success: true,
			message: "berhasil konfirmasi pesanan"
		});
		return;
	} catch (err) {
		res.status(400).json({
			success: false,
			message: "gagal konfirmasi pesanan"
		});

	}
}


module.exports = {
	addOrder,
	getOrderByUserId,
	getAllOrders,
	orderConfirm
}

