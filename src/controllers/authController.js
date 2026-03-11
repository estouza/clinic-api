const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { name, email, password, cellphone, profile_type } = req.body;

        const password_hash = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            cellphone,
            profile_type,
            password_hash,
            })

            res.json(newUser)
    
        } catch (error) {
            console.error("Erro no registro:", error);

            res.status(500).json({ 
                message: "Algo deu errado. Tente novamente, por favor."});
        }
    }

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }

        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (!isMatch) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao fazer login' });
    }
};