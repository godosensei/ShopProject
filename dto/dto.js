// Container

class ContainerEntity {
  constructor(data) {
    // this.number_of_products = data. data.numberOfProducts
    this.number_of_products = data.numberOfProducts;
    this.container_number = data.containerNumber;
    this.dilivered_from = data.diliveredFrom;
    this.dilivered_at = data.diliveredAt;
    this.means_of_transport = data.meansOfTransport;
    this.deleted_at = data.deletedAt;
  }
}

// Product
class ProductEntity {
  constructor(data) {
    // this.number_of_products = data. data.numberOfProducts
    this.product_type = data.productType;
    this.current_products = data.currentProducts;
    this.total_products = data.totalProducts;
    this.container_id = data.containerId;
    this.deleted_at = data.deletedAt;
  }
}

// Admin
class AdminEntity {
  constructor(data) {
    this.name = data.name;
    this.password = data.password;
    this.email = data.email;
    this.role = data.role;
  }
}

// Customer
class CustomerEntity {
  constructor(data) {
    this.name = data.name;
    this.password = data.password;
    this.email = data.email;
    this.role = data.role;
    this.deleted_at = data.deletedAt;
  }
}

module.exports = {
  ContainerEntity,
  ProductEntity,
  AdminEntity,
  CustomerEntity,
};
