const express = require('express');
const router = express.Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// Crear un nuevo carrito
router.post('/', (req, res) => {
    const carts = JSON.parse(fs.readFileSync('./data/carts.json'));
    const newCart = {
        id: uuidv4(),
        products: []
    };
    carts.push(newCart);
    fs.writeFileSync('./data/carts.json', JSON.stringify(carts, null, 2));
    res.status(201).json(newCart);
});

// Listar productos en un carrito por su ID
router.get('/:cid', (req, res) => {
    const carts = JSON.parse(fs.readFileSync('./data/carts.json'));
    const cart = carts.find(c => c.id === req.params.cid);
    if (!cart) {
        return res.status(404).json({ error: 'Carrito no encontrado' });
    }
    res.json(cart.products);
});

// Agregar un producto a un carrito
router.post('/:cid/product/:pid', (req, res) => {
    const carts = JSON.parse(fs.readFileSync('./data/carts.json'));
    const products = JSON.parse(fs.readFileSync('./data/products.json'));
    
    const cart = carts.find(c => c.id === req.params.cid);
    const product = products.find(p => p.id === req.params.pid);

    if (!cart) {
        return res.status(404).json({ error: 'Carrito no encontrado' });
    }
    if (!product) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }

    const productInCart = cart.products.find(p => p.product === req.params.pid);
    
    if (productInCart) {
        productInCart.quantity += 1;
    } else {
        cart.products.push({ product: req.params.pid, quantity: 1 });
    }

    fs.writeFileSync('./data/carts.json', JSON.stringify(carts, null, 2));
    res.json(cart);
});

module.exports = router;
