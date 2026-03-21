const Appointment = require('../models/Appointment');
const axios = require('axios');

exports.createAppointment = async (req, res) => {
    try {
        const { date, time, cep } = req.body;

        // Checar horário
        const existing = await Appointment.findOne({ date, time });

        if (existing) {
            return res.status(400).json({ error: 'Horário já ocupado' });
        }

        // CEP
        const cepResponse = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        const address = `${cepResponse.data.logradouro}, ${cepResponse.data.bairro}`;

        // Clima
        const weatherResponse = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=Rio de Janeiro&appid=9b6b4fae75ffc7285c91cb6708090a8a`
        );

        const weatherMain = weatherResponse.data.weather[0].main;

        let weather;

        switch (weatherMain) {
            case 'Rain':
                weather = 'Estará chovendo, não esquece o guarda-chuva! 🌧️';
                break;
            case 'Clear':
                weather = 'Céu limpo ☀️';
                break;
            case 'Clouds':
                weather = 'Nublado ☁️';
                break;
            case 'Drizzle':
                weather = 'Garoa, não esquece o guarda-chuva! 🌦️';
                break;
            case 'Thunderstorm':
                weather = 'Tempestade, tome cuidado! ⛈️';
                break;
            default:
                weather = 'Clima não identificado';
        }

        // Criar
        const appointment = await Appointment.create({
            date,
            time,
            cep,
            address,
            weather,
            patientId: req.userId,
            doctorId: null
        });

        res.json(appointment);

    } catch (error) {
        console.error("Erro ao criar agendamento:", error);
        res.status(500).json({ error: "Erro interno do servidor." });
    }
};


exports.list = async (req, res) => {
    try {
        const appointments = await Appointment.find()
            .populate('patientId', 'name email');

        res.json(appointments);

    } catch (error) {
        console.error("Erro ao listar agendamentos:", error);
        res.status(500).json({ error: "Erro ao listar agendamentos." });
    }
};