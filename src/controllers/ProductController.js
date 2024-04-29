const Product = require("../models/Product");

class ProductController {
    async create(req, res) {
        try {
            const { title, desc, img, categories, size, color, price } =
                req.body;

            //CRIA UM NOVO PRODUTO
            const newProduct = await Product({
                title: title,
                desc: desc,
                img: img,
                categories: categories,
                size: size,
                color: color,
                price: price,
            });
            //SALVA O USUARIO
            await newProduct.save();
            res.status(201).json(newProduct);
        } catch (error) {
            res.status(433).json(error);
        }
    }

    async getAll(req, res) {
        try {
            const products = await Product.find();
            res.status(200).json(products);
        } catch (error) {
            res.status(401).json(error);
        }
    }

    //Buscar por ID
    async getById(req, res) {
        try {
            const id = req.params.id;
            const product = await Product.findById(id);
            res.status(200).json(product);
        } catch (error) {
            res.status(401).json(error);
        }
    }

    //Buscar por Productname
    async getByname(req, res) {
        try {
            const title = req.body.title;
            const product = await Product.findOne({ title: title });
            if (!product) {
                res.status(400).json("Produto não existe");
            }
            res.status(200).json(product);
        } catch (error) {
            res.status(401).json(error);
        }
    }

    //ATUALIZAR O CADASTRO DO USUARIO
    async update(req, res) {
        try {
            const id = req.params.id;
            const { title, desc, img, categories, size, color, price } =
                req.body;
            const productUpdated = {
                title: title,
                desc: desc,
                img: img,
                categories: categories,
                size: size,
                color: color,
                price: price,
            };
            const updated = await Product.findByIdAndUpdate(
                id,
                ProductUpdated,
                {
                    force: true,
                }
            );

            res.status(200).json(productUpdated);
        } catch (error) {
            res.status(401).json(error);
        }
    }

    //DELETAR USUARIO
    async delete(req, res) {
        const id = req.params.id;
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json("O produto não existe");
        }

        const updated = await Product.findByIdAndDelete(id);

        res.status(200).json("Produto deletado");
    }
}

module.exports = new ProductController();
