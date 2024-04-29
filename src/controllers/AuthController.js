const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
dotenv.config()

    const secret = process.env.SECRET_KEY;

class AuthController {

    //REGISTER
    async register(req, res) {
        try {
            const { username, email, password, passwordConfirm, isAdmin } =
                req.body;

            if (password !== passwordConfirm) {
                return res.status(433).json("As senhas não conferem");
            }

            //CRIPTOGRAFA A SENHA
            const saltRounds = 10;
            const salt = await bcrypt.genSaltSync(saltRounds)
            const hash = await bcrypt.hashSync(password,salt)

            //CRIA UM NOVO USUARIO
            const newUser = await User({
                username: username,
                email: email,
                password: hash,
                isAdmin: isAdmin,
            });
            //SALVA O USUARIO
            await newUser.save();
            res.status(201).json(newUser);
        } catch (error) {
            res.status(433).json(error);
        }
    }

    // LOGIN
    async login(req, res) {
        try {
            const { username, email, password } = req.body;

            //VALIDANDO E-MAIL
            const user = await User.findOne({ email: email });
            if (!user) {
                return res.status(433).json("O email não foi cadastrado");
            }

            //Descriptografando a Senha 
            const testPassword = await bcrypt.compareSync(password,user.password); 

            if (!testPassword) {
                return res.status(433).json("Senha invalida");
            }

         
            const acessToken = jwt.sign({
                id: user._id,
                isAdmin: user.isAdmin
            }, secret, 
            {expiresIn:"3d"});   
            
            res.status(200).json({user,acessToken})
        } catch (error) {
            res.status(433).json(error);
        }
    }
}

module.exports = new AuthController();
