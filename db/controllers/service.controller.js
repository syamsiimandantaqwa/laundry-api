const Service = require("../models").service;

const getServices = async (req, res) => {
	try {
		const services  = await Service.findAll();

		res.status(200).json({
			success: true,
			message: "semua layanan berhasil di tampilkan",
			data: services
		});
		return;
	} catch (err) {
		res.status(400).json({
			success: false,
			message: "gagal mengambil data layanan"
		})
	}
}


const addService = async (req, res) => {
	try {
		const service  = await Service.create(req.body);

		res.status(200).json({
			success: true,
			message: "berhasil menambahkan layanan baru",
			data: req.body
		});
		return;
	} catch (err) {
		res.status(400).json({
			success: false,
			message: "gagal menambahkan layanan baru"
		})
	}
}


const updateService = async (req, res) => {
	const { serviceId } = req.params;

	try {
		const service  = await Service.update(req.body, {
			where: { id_layanan: serviceId }
		});

		res.status(200).json({
			success: true,
			message: "berhasil mengubah layanan",
			data: req.body
		});
		return;
	} catch (err) {
		res.status(400).json({
			success: false,
			message: "gagal mengubah data layanan"
		})
	}
}


const deleteService = async (req, res) => {
	const { serviceId } = req.params;

	try {
		await Service.destroy({
			where: { id_layanan: serviceId }
		});

		res.status(200).json({
			success: true,
			message: "berhasil menghapus layanan",
		});
		return;
	} catch (err) {
		res.status(404).json({
			success: false,
			message: "gagal menghapus data layanan, layanan tidak di temukan"
		})
	}
}



module.exports = { getServices, addService, updateService, deleteService };
