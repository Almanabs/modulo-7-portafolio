const express = require('express');
const router = express.Router();
const CartItem = require('./models/CartItem.js');

// Ruta para agregar un producto al carrito
router.post('/api/cart/:cartId/add/:productId', async (req, res) => {
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
router.delete('/api/cart/:cartId/remove/:productId', async (req, res) => {
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
