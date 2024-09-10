import { Router } from 'express';
const router = Router();
import { readFileSync, writeFileSync } from 'fs';
import { v4 as uuidv4 } from 'uuid';

// Ruta GET para listar todos los productos
router.get('/', (req, res) => {
    const products = JSON.parse(readFileSync('./data/products.json'));
    const limit = req.query.limit ? parseInt(req.query.limit) : products.length;
    res.json(products.slice(0, limit));
});

// Ruta GET para obtener un producto por su ID
router.get('/:pid', (req, res) => {
    const products = JSON.parse(readFileSync('./data/products.json'));
    const product = products.find(p => p.id === req.params.pid);
    if (!product) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(product);
});

// Ruta POST para agregar un nuevo producto
router.post('/', (req, res) => {
    const { title, description, code, price, status = true, stock, category, thumbnails = [] } = req.body;
    if (!title || !description || !code || !price || !stock || !category) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios, excepto thumbnails.' });
    }

    const products = JSON.parse(readFileSync('./data/products.json'));
    const newProduct = {
        id: uuidv4(),
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails
    };
    products.push(newProduct);
    writeFileSync('./data/products.json', JSON.stringify(products, null, 2));
    res.status(201).json(newProduct);
});

// Ruta PUT para actualizar un producto
router.put('/:pid', (req, res) => {
    const products = JSON.parse(readFileSync('./data/products.json'));
    const productIndex = products.findIndex(p => p.id === req.params.pid);
    if (productIndex === -1) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }

    const { title, description, code, price, status, stock, category, thumbnails } = req.body;
    const updatedProduct = {
        ...products[productIndex],
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails
    };

    products[productIndex] = updatedProduct;
    writeFileSync('./data/products.json', JSON.stringify(products, null, 2));
    res.json(updatedProduct);
});

// Ruta DELETE para eliminar un producto
router.delete('/:pid', (req, res) => {
    let products = JSON.parse(readFileSync('./data/products.json'));
    const productIndex = products.findIndex(p => p.id === req.params.pid);
    if (productIndex === -1) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }
    products = products.filter(p => p.id !== req.params.pid);
    writeFileSync('./data/products.json', JSON.stringify(products, null, 2));
    res.status(204).send();
});

export default router;
