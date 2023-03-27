const express = require('express');
const app = express();
const hbs = require('./handlebarsConfig.js');
const sequelize = require('./db.js');
const Product = require('./models/Product.js');
app.use(express.static("public"));
const fs = require('fs');
const cartRoutes = require('./cartroutes');
const bodyParser = require('body-parser');
const Cart = require('./models/Cart.js');
const CartItem = require('./models/CartItem.js');

const router = require('./cartroutes'); 

app.use(cartRoutes);
Cart.hasMany(CartItem);
Product.hasMany(CartItem);

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const path = require('path');
const horizontalCard = fs.readFileSync(__dirname + '/views/partials/horizontalCard.handlebars', 'utf8');
hbs.handlebars.registerPartial('horizontalCard', horizontalCard);

app.set('views', path.join(__dirname, 'views'));


app.get('/', (req, res) => {
  res.render('index', { title: 'Página principal' });
});

// Ruta para carrito
app.get('/carrito', (req, res) => {
  res.render('carrito', { title: 'Carrito' });
});

// Ruta para horizontalCard
app.get('/horizontalCard', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.render('horizontalCard', { title: 'Horizontal Card', products });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los productos' });
  }
});

// Ruta para producto
app.get('/producto', (req, res) => {
  res.render('producto', { title: 'Producto' });
});

// Ruta para venta
app.get('/ventas', (req, res) => {
  res.render('ventas', { title: 'Ventas' });
});

app.route("/api/productos")
  .get(async (req, res) => {
    try {
      const products = await Product.findAll();
      res.json({ productos: products });
    } catch (error) {
      console.error("Error en /api/productos GET:", error);
      res.status(500).json({ message: 'Error al obtener los productos' });
    }
  })
  .post(async (req, res) => {
    try {
      const productData = req.body;
      const newProduct = await Product.create(productData);
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json({ message: 'Error al crear el producto' });
    }
  });



const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida');
    await sequelize.sync();
    console.log('Tablas sincronizadas');
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
})();

app.get('/inventario', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.render('inventario', { products }); 
  } catch (error) {
    console.error(`Error en /inventario GET: ${error}`);
    res.status(500).send('Error interno del servidor');
  }
});

// Ruta para detalles de producto
app.get('/productos/:id', async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findByPk(productId);

    if (!product) {
      res.status(404).send('Producto no encontrado');
    } else {
      res.render('producto', { title: 'Detalles del producto', product });
    }
  } catch (error) {
    console.error(`Error en /productos/:id GET: ${error}`);
    res.status(500).send('Error interno del servidor');
  }
});

// Ruta para agregar un producto al carrito
app.post('/api/cart/:cartId/add/:productId', async (req, res) => {
  const cartId = req.params.cartId;
  const productId = req.params.productId;
  const quantity = req.body.quantity;

  try {
    const [cartItem, created] = await CartItem.findOrCreate({
      where: {
        CartId: cartId,
        ProductId: productId
      },
      defaults: {
        quantity
      }
    });

    if (!created) {
      cartItem.quantity += quantity;
      await cartItem.save();
    }

    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({ message: 'Error al agregar el producto al carrito' });
  }
});


// Ruta para eliminar un producto del carrito
app.delete('/api/cart/:cartId/remove/:productId', async (req, res) => {
  const cartId = req.params.cartId;
  const productId = req.params.productId;

  try {
    const cartItem = await CartItem.findOne({
      where: {
        CartId: cartId,
        ProductId: productId
      }
    });

    if (!cartItem) {
      res.status(404).json({ message: 'Producto no encontrado en el carrito' });
    } else {
      await cartItem.destroy();
      res.status(200).json({ message: 'Producto eliminado del carrito' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el producto del carrito' });
  }
});
module.exports = router;


app.get('/api/productos', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM productos');
        res.status(200).json({ productos: result.rows });
    } catch (error) {
        res.status(500).json({ code: 500, message: 'Error al obtener los productos' });
    }
});

// Ruta para agregar un producto
app.post('/api/productos', async (req, res) => {
    // Agregar el producto a la base de datos
    try {
        const { nombre, descripcion, precio, stock, img } = req.body;
        const result = await pool.query(
            'INSERT INTO productos (nombre, descripcion, precio, stock, img) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [nombre, descripcion, precio, stock, img]
        );

        res.status(201).json({ message: 'Producto creado', product: result.rows[0] });
    } catch (error) {
        res.status(500).json({ code: 500, message: 'Error al agregar el producto' });
    }
});

// Ruta para actualizar un producto
app.put('/api/productos', async (req, res) => {
    // Actualizar el producto en la base de datos
    try {
        const { id, nombre, descripcion, precio, stock, img } = req.body;
        const result = await pool.query(
            'UPDATE productos SET nombre = $2, descripcion = $3, precio = $4, stock = $5, img = $6 WHERE id = $1 RETURNING *',
            [id, nombre, descripcion, precio, stock, img]
        );

        res.status(200).json({ message: 'Producto actualizado', product: result.rows[0] });
    } catch (error) {
        res.status(500).json({ code: 500, message: 'Error al actualizar el producto' });
    }
});

// Ruta para eliminar un producto
app.delete('/api/productos', async (req, res) => {
    // Eliminar el producto de la base de datos
    try {
        const { id } = req.query;
        const result = await pool.query('DELETE FROM productos WHERE id = $1 RETURNING *', [id]);

        res.status(200).json({ message: 'Producto eliminado', product: result.rows[0] });
    } catch (error) {
        res.status(500).json({ code: 500, message: 'Error al eliminar el producto' });
    }
});

