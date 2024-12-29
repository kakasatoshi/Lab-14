const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoConnect = require("./util/database").mongoConnect;
const User = require("./models/user");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorController = require("./controllers/error");

const app = express();

// Middleware
app.use(bodyParser.json()); // Dùng để xử lý JSON
app.use(cors()); // Cho phép ReactJS truy cập API
app.use((req, res, next) => {
  User.findById("676eb3be829015002764f5b5")
    .then((user) => {
      // console.log(user, "user");
      if (!user) {
        console.error("User not found");
        return next(); // Không có user, nhưng vẫn tiếp tục middleware
      }
      req.user = new User(user.name, user.email, user.cart, user._id);
      next();
    })
    .catch((err) => {
      console.log(err);
      next(err); // Gửi lỗi tới middleware xử lý lỗi
    });
  // next();
});

// Routes
app.use("/admin", adminRoutes);
app.use("/shop", shopRoutes);

// Xử lý lỗi 404
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Kết nối MongoDB và chạy server
mongoConnect(() => {
  app.listen(5000, () => {
    console.log("Server is running on http://localhost:5000");
  });
});
