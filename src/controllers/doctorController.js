const Doctor = require("../models/Doctor");

exports.createDoctor = async (req, res) => {
  try {
    const { name, specialty } = req.body;

    const doctor = await Doctor.create({
      name,
      specialty
    });

    res.json(doctor);

  } catch (error) {
    console.error("Erro ao criar médico:", error);
    res.status(500).json({ error: "Erro ao criar médico" });
  }
};