const Appointment = require('../models/Appointment');

exports.createAppointment = async (req, res) => {
    try {
        const { date, time } = req.body;
        
            const appointment = await Appointment.create({
                date,
                time,
                patientId: req.user.id,
                doctorId: null,
            })
            
            res.json(appointment); //resposta à consulta do paciente, mas pro front, não pro termiinal do servidor

        } catch (error) {

            if (error.name === 'ValidationError') {
                return res.status(400).json({ error: "Dados inválidos para o agendamento." });
            }
            console.error("Erro ao criar agendamento:", error);
            res.status(500).json({ 
                error: "Erro interno do servidor." });
        }
    };
    
    exports.list = async (req, res) => {
        try {
            const appointments = await Appointment.find()
                .populate('patientId', 'name email')
                .populate('doctorId', 'name specialty');

            res.json(appointments);
            
        } catch (error) {
            console.error("Erro ao listar agendamentos:", error);
            res.status(500).json({ error: "Erro ao listar agendamentos." });
        }
    };