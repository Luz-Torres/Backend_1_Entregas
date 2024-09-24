import { Router } from 'express';
const router = Router();
import products from '../data/products.json'; // Asegúrate de que el archivo existe y está bien estructurado

// Ruta para la vista de Handlebars (GET)
router.get('/', (_req, res) => {
    res.render('home', { products });
});

// Ruta para la vista con Websockets (GET)
router.get('/realtimeproducts', (_req, res) => {
    res.render('realTimeProducts');
});

export default router;
