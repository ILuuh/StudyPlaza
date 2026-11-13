import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import * as UserModel from "../model/usersModel.js";

export const logouf = async (req, res) => {
    return
}

export const register = async (req, res) => {
    try {
        console.log("Body recebido no register:");

        const { name, login, password, tipo_usuario } = req.body;

        if (!name || !login || !password) {
            return res.status(400).json({ 
                message: 'Campos obrigatórios faltando. Envie: name, login e password.' 
            });
        }

        const userExistente = await UserModel.GetByEmail(login);
        console.log("2. Resultado GetByEmail:", userExistente);

        if (userExistente.message === "Success") {
            return res.status(400).json({ message: 'Email/Login já cadastrado' });
        }

        const hashedPassword = await bcrypt.hash(String(password), 10);
        console.log("3. Senha criptografada com sucesso");

        const payload = { name, login, password: hashedPassword };
        if (tipo_usuario !== undefined) {
            payload.tipo_usuario = tipo_usuario;
        }

        const response = await UserModel.Post(payload);
        console.log("4. Resultado UserModel.Post:", response);

        if (response.message === "error") {
            return res.status(400).json({ 
                message: 'Erro ao inserir usuário no banco de dados', 
                erroBanco: response.Error 
            });
        }

        return res.status(201).json(response);

    } catch (error) {
        console.error("ERRO FATAL NO REGISTER:", error);
        return res.status(500).json({ message: 'Erro interno no servidor', erro: error.message });
    }
};

export const login = async (req, res) => {
    try {
        console.log("1. Body recebido no login:", req.body);

        const { login, password } = req.body;

        if (!login || !password) {
            return res.status(400).json({ message: 'Informe login e password' });
        }

        const user = await UserModel.GetByEmail(login);
        if (user.message !== "Success") {
            return res.status(401).json({ message: 'Usuário não encontrado' });
        }

        const responseData = user.data[0];
        const valid = await bcrypt.compare(String(password), responseData.password);

        if (!valid) {
            return res.status(401).json({ message: 'Senha incorreta' });
        }

        const token = jwt.sign(
            { userId: responseData.id, userName: responseData.name },
            process.env.JWT_SECRET || "chave_secreta_temporaria",
            { expiresIn: '1h' }
        );

        return res.json({ 
            message: "success", 
            data: token, 
            user: { id: responseData.id, name: responseData.name, tipo_usuario: responseData.tipo_usuario } 
        });

    } catch (error) {
        console.error("ERRO FATAL NO LOGIN:", error);
        return res.status(500).json({ message: 'Erro interno no servidor', erro: error.message });
    }
};

