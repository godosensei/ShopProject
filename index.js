const express = require(`express`);
const app = express();

const ProductRoutes = require(`./router/product`);
const ContainerRoutes = require(`./router/container`);
const AdminRoutes = require(`./router/admin`);
const CustomerRoutes = require(`./router/customer`);
const globalError = require("./error/globalError");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/products", ProductRoutes);
app.use("/container", ContainerRoutes);
app.use("/admin", AdminRoutes);
app.use("/customer", CustomerRoutes);

// global error handling middleware
app.use((err, req, res, next) => {
  if (err instanceof globalError) {
    console.log(true);
  }
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

// server Listening...
app.listen(5000, () => {
  console.log("server is listening...");
});
