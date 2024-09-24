import express, { json, urlencoded } from 'express';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import { join } from 'path';

// Inicializar servidor
const app = express();
const PORT = 8080;

// Configuración de Handlebars
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.set('views', join(process.cwd(), 'src/views'));

// Middleware
app.use(express.static(join(process.cwd(), 'src/public')));
app.use(json());
app.use(urlencoded({ extended: true }));

// Importar rutas
import productRoutes from './routes/productRoutes.js';
app.use('/api/products', productRoutes);

// Configuro el servidor de socket.io
const httpServer = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

const io = new Server(httpServer);

// Websockets
io.on('connection', (socket) => {
    console.log('Cliente conectado');

    // Emitir los productos en tiempo real
    socket.on('newProduct', (product) => {
        io.emit('productListUpdate', product);
    });
});
