const express = require(`express`);
const app = express();

const ProductRoutes = require(`./router/product`);
const ContainerRoutes = require(`./router/container`);
const AdminRoutes = require(`./router/admin`);
const CustomerRoutes = require(`./router/customer`);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/products", ProductRoutes);
app.use("/container", ContainerRoutes);
app.use("/admin", AdminRoutes);
app.use("/customer", CustomerRoutes);

// server Listening...
app.listen(5000, () => {
  console.log("server is listening...");
});
