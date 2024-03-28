const User = require("../models/User");

class UserController {
    //Listar todos os usuarios
    async getAll(req, res) {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (error) {
            res.status(401).json(error);
        }
    }

    //Buscar por ID
    async getById(req, res) {
        try {
            const id = req.params.id;
            const user = await User.findById(id);
            res.status(200).json(user);
        } catch (error) {
            res.status(401).json(error);
        }
    }

    //Buscar por E-mail
    async getByEmail(req, res) {
        try {
            const email = req.body;
            const user = await User.findOne({ email: email });
            if (!user) {
                res.status(400).json("E-mail não existe");
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(401).json(error);
        }
    }

    //Buscar por username
    async getByUsername(req, res) {
        try {
            const username = req.body;
            const user = await User.findOne({ username: username });
            if (!user) {
                res.status(400).json("Usuário não existe");
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(401).json(error);
        }
    }

    //ATUALIZAR O CADASTRO DO USUARIO
    async update(req, res) {
        try {
            const id = req.params.id;
            const { username, email, password, isAdmin } = req.body;
            const userUpdated = {
                username: username,
                email: email,
                password: password,
                isAdmin: isAdmin,
            };
            const updated = await User.findByIdAndUpdate(id, userUpdated, {
                force: true,
            });

            res.status(200).json(userUpdated);
        } catch (error) {
            res.status(401).json(error);
        }
    }

    //DELETAR USUARIO
    async delete(req, res) {
        const id = req.params.id;
        const updated = await User.findByIdAndDelete(id);

        res.status(200).json(userUpdated);
    }
    catch(error) {
        res.status(401).json(error);
    }
}

module.exports = new UserController;
