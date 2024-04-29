const Cart = require("../models/Cart");
const User = require("../models/User")

class CartController {
    async create(req, res) {
        try {
            const { userId, productId, quandtity } = req.body;

            //CRIA UM NOVO Carrinho
            const newCart = await Cart({
                userId: userId,
                products: [
                    {
                        productId: productId,
                        quandtity: quandtity,
                    },
                ],
            });
            //SALVA O CARRINHO
            await newCart.save();
            res.status(201).json(newCart);
        } catch (error) {
            res.status(433).json(error);
        }
    }

    async getAll(req, res) {
        try {
            const carts = await Cart.find();
            res.status(200).json(carts);
        } catch (error) {
            res.status(401).json(error);
        }
    }

    //Buscar por ID
    async getById(req, res) {
        try {
            const id = req.params.id;
            const cart = await Cart.findById(id);
            res.status(200).json(cart);
        } catch (error) {
            res.status(401).json(error);
        }
    }

    async getUserId(req, res) {
        try {
            const id = req.params.userId;
            const cart = await Cart.findOne({userId:userId});
            res.status(200).json(cart);
        } catch (error) {
            res.status(401).json(error);
        }
    }

    //Buscar por Productname
    // async getByname(req, res) {
    //     try {
    //         const title = req.body.title;
    //         const cart = await Cart.findOne({ title: title });
    //         if (!cart) {
    //             res.status(400).json("Produto não existe");
    //         }
    //         res.status(200).json(cart);
    //     } catch (error) {
    //         res.status(401).json(error);
    //     }
    // }

    //ATUALIZAR O CADASTRO DO USUARIO
    async update(req, res) {
        try {
            const id = req.params.id;
            const { userId, productId, quandtity  } = req.body;
            const cartUpdated = {
                userId: userId,
                products: [
                    {
                        productId: productId,
                        quandtity: quandtity,
                    },
                ],
            };
            const updated = await Cart.findByIdAndUpdate(
                id,
                cartUpdated,
                {
                    force: true,
                }
            );

            res.status(200).json(cartUpdated);
        } catch (error) {
            res.status(401).json(error);
        }
    }

    //DELETAR Cart
    async delete(req, res) {
        const id = req.params.id;
        const cart = await Cart.findById(id);

        if (!cart) {
            return res.status(404).json("O produto não existe");
        }

        const updated = await Cart.findByIdAndDelete(id);

        res.status(200).json("Carrinho deletado");
    }
}

module.exports =  new CartController;
