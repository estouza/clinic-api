const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Função para registrar um novo usuário
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

            res.status(201).json({
                message: "Usuário registrado com sucesso!",
                user: {}
            });

        } catch (error) {
            console.error("Erro no registro:", error);
            res.status(500).json({ 
                message: "Algo deu errado. Tente novamente, por favor."});
        }
    }

// Função para autenticar um usuário e gerar um token JWT    
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log("BODY:", req.body);

        const user = await User.findOne({ email });
        console.log("USER:", user);

        if (!user) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }

        const isMatch = await bcrypt.compare(password, user.password_hash);
        console.log("MATCH:", isMatch);

        if (!isMatch) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }

        console.log("JWT_SECRET:", process.env.JWT_SECRET);

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token });

    } catch (error) {
        console.error("ERRO REAL:", error); // 👈 ESSA LINHA É A CHAVE
        res.status(500).json({ error: 'Erro ao fazer login' });
    }
};