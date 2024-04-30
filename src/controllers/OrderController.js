const Order = require('../models/Order')

class OrderController{
    async create(req, res) {
        try {
            const { userId, productId, quandtity,amount, address,status } = req.body;

            //CRIA UM NOVO ORDER
            const newOrder = await Order({
                userId: userId,
                products: [
                    {
                        productId: productId,
                        quandtity: quandtity,
                    },
                ],
                amount: amount,
                address: address,
                status: status
            });
            //SALVA O ORDER
            await newOrder.save();
            res.status(201).json(newOrder);
        } catch (error) {
            res.status(433).json(error);
        }
    }

    async getAll(req, res) {
        try {
            const orders = await Order.find();
            res.status(200).json(orders);
        } catch (error) {
            res.status(401).json(error);
        }
    }

    //Buscar por ID
    async getById(req, res) {
        try {
            const id = req.params.id;
            const order = await Order.findById(id);
            res.status(200).json(order);
        } catch (error) {
            res.status(401).json(error);
        }
    }

    async getUserId(req, res) {
        try {
            const userId = req.params.userId;
            const order = await Order.findOne({userId:userId});
            res.status(200).json(order);
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

    //ATUALIZAR O CADASTRO DA ORDER
    async update(req, res) {
        try {
            const id = req.params.id;
            const { userId, productId, quandtity,amount, address,status   } = req.body;
            const orderUpdated = {
                userId: userId,
                products: [
                    {
                        productId: productId,
                        quandtity: quandtity,
                    },
                ],
                amount: amount,
                address: address,
                status: status
            };
            const updated = await Order.findByIdAndUpdate(
                id,
                orderUpdated,
                {
                    force: true,
                }
            );

            res.status(200).json(orderUpdated);
        } catch (error) {
            res.status(401).json(error);
        }
    }

    //DELETAR ORDER
    async delete(req, res) {
        const id = req.params.id;
        const cart = await Cart.findById(id);

        if (!cart) {
            return res.status(404).json("A Ordem não existe");
        }

        const updated = await Cart.findByIdAndDelete(id);

        res.status(200).json("Ordem deletada");
    }

}

module.exports = new OrderController