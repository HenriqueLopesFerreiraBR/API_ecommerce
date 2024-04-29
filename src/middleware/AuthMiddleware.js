const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
dotenv.config()

const secret = process.env.SECRET_KEY;

class AuthMiddleware {

    constructor() {
        this.verifyTokenAndAuthorization = this.verifyTokenAndAuthorization.bind(this);
    }

    async verifyToken (req,res,next) {
        const authHeader = req.headers.token;
        if(authHeader){
            const token = authHeader.split(" ")[1];
            jwt.verify(token, secret, (err,user)=>{
                if(err){
                    res.status(404).json('Token Invalido')
                }else{
                    req.user = user;
                    next();
                }
            })
        }else{
            return res.status(401).json("Você não tem autorização")
        }
    }

    async verifyTokenAndAuthorization(req,res,next){
        this.verifyToken(req,res,()=>{
            if(req.user.id === req.params.id || req.user.isAdmin){
                next()
            }else{
                res.status(403).json("Você não tem autorização para essa operação")
            }
        })
    }


    async verifyTokenAndAdmin(req,res,next){
        this.verifyToken(req,res,()=>{
            if(req.user.isAdmin){
                next()
            }else{
                res.status(403).json("Você não tem autorização para essa operação")
            }
        })
    }

}

module.exports = new  AuthMiddleware