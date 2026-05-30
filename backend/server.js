const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const db = require('./db');

// 菜单相关 API
app.get('/api/menu', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM menu_items ORDER BY category, name');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/menu', async (req, res) => {
  try {
    const { name, description, price, image, category } = req.body;
    const [result] = await db.query(
      'INSERT INTO menu_items (name, description, price, image, category) VALUES (?, ?, ?, ?, ?)',
      [name, description, price, image, category]
    );
    res.json({ id: result.insertId, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/menu/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, image, category } = req.body;
    await db.query(
      'UPDATE menu_items SET name = ?, description = ?, price = ?, image = ?, category = ? WHERE id = ?',
      [name, description, price, image, category, id]
    );
    res.json({ id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/menu/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM menu_items WHERE id = ?', [id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 订单相关 API
app.get('/api/orders', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM orders ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/orders', async (req, res) => {
  try {
    const { items, total_price } = req.body;
    const order_number = 'ORD-' + Date.now();
    const [result] = await db.query(
      'INSERT INTO orders (order_number, items, total_price) VALUES (?, ?, ?)',
      [order_number, JSON.stringify(items), total_price]
    );
    res.json({ id: result.insertId, order_number, items, total_price });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/orders/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM orders WHERE id = ?', [id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
