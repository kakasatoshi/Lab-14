const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const User = require('./models/user');

const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// Middleware để parse JSON (thay vì chỉ parse `urlencoded` cho React frontend)
app.use(bodyParser.json());

// Middleware để phục vụ các file tĩnh, ví dụ ảnh, CSS
app.use(express.static(path.join(__dirname, 'public')));

// Thêm user vào request để có thể truy cập trong controller
app.use((req, res, next) => {
  User.findById('5bab316ce0a7c75f783cb8a8')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

// Routes cho API
app.use('/admin', adminRoutes);
app.use('/shop', shopRoutes);

// Route 404 cho API không tồn tại
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Kết nối MongoDB và khởi chạy server
mongoose
  .connect(
    'mongodb+srv://maximilian:9u4biljMQc4jjqbe@cluster0-ntrwp.mongodb.net/shop?retryWrites=true'
  )
  .then(result => {
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: 'Max',
          email: 'max@test.com',
          cart: {
            items: []
          }
        });
        user.save();
      }
    });
    app.listen(5000, () => {
      console.log('Server is running on http://localhost:5000');
    });
  })
  .catch(err => {
    console.log(err);
  });
