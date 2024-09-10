### E-commerce Server API
Este repositorio contiene el código de un servidor para gestionar productos y carritos de compra en un e-commerce, desarrollado en Node.js y Express. El servidor proporciona endpoints para interactuar con productos y carritos de manera sencilla, con persistencia de datos en archivos JSON utilizando el sistema de archivos.

### ESTRUCTURA DE CARPETAS

/ecommerce-api
│
├── /routes
│   ├── products.js
│   └── carts.js
├── /data
│   ├── products.json
│   └── carts.json
├── app.js
└── package.json


### Endpoints
Productos (/api/products/)
Este grupo de rutas permite gestionar los productos en la base de datos. Los productos contienen información como título, descripción, código, precio, y más.

GET /: Lista todos los productos. Incluye soporte para la limitación de resultados con el parámetro ?limit.
GET /:pid: Obtiene un producto específico por su id.
POST /: Agrega un nuevo producto. Campos requeridos:
-id: Autogenerado (nunca se repite).
-title: String.
-description: String.
-code: String.
-price: Number.
-status: Boolean (por defecto true).
-stock: Number.
-category: String.
-thumbnails: Array de Strings (opcional).

PUT /:pid: Actualiza un producto por su id. No se permite modificar el campo id.
DELETE /:pid: Elimina un producto por su id.
Carritos (/api/carts/)
Este grupo de rutas permite gestionar los carritos de compra y los productos que contienen.

POST /: Crea un nuevo carrito. Estructura del carrito:
id: Autogenerado.
products: Array de productos (inicialmente vacío).
GET /:cid: Lista los productos del carrito con el id especificado.
POST /:cid/product/:pid: Agrega un producto al carrito seleccionado. Si el producto ya existe en el carrito, incrementa su cantidad en uno.
Persistencia
La información de productos y carritos se almacena en archivos JSON:

productos.json
carrito.json

### Instalación
Clona el repositorio:

bash
Copiar código
git clone https://github.com/Luz-Torres/Backend_1_Entregas.git
cd Backend_1_Entregas
Instala las dependencias:

bash
Copiar código
npm install
Ejecuta el servidor:

bash
Copiar código
node index.js

El servidor estará disponible en http://localhost:8080