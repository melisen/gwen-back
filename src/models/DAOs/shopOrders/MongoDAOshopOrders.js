const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const OrdersSchema = new mongoose.Schema({
  items: { type: Array, required: true },
  nroOrden: { type: Number, required: true },
  fecha: { type: String, required: true },
  estado: { type: String, required: true },
  emailUsuario: { type: String, required: true, max: 100 },
});
const Orders = mongoose.model("ordenes", OrdersSchema);

class MongoOrders {
  constructor(modelo) {
    this.modelo = modelo;
  }

  async findByUsername(username) {
    const user = await this.modelo.findOne({ emailUsuario: username });
    return user;
  }

  async saveNew(obj) {
    const newOrder = await this.modelo.create(obj);
    return newOrder;
  }

  async getOrderNumber() {
    const ordersLength = await this.modelo.find({}).count();
    const orderNumber = ordersLength + 1;
    return orderNumber;
  }
}

module.exports = {
  MongoOrders,
  Orders,
};
