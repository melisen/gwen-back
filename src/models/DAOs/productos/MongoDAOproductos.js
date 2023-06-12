const logger = require("../../../logger/winston-logger");
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const ProductoSchema = new mongoose.Schema({
  title: { type: String, required: true, max: 100 },
  category: { type: String, required: true, max: 100 },
  price: { type: Number, required: true },
  thumbnail: { type: String, required: true },
  description: { type: String, required: true },
  stock: { type: Number, required: true },
});

const ProdModel = mongoose.model("productos", ProductoSchema);

class MongoDAOproductos {
  constructor(modeloProd) {
    this.modeloProd = modeloProd;
  }

  async getAll() {
    const productos = await this.modeloProd.find({});
    const todosProd = productos.map((item) => ({
      _id: item._id,
      title: item.title,
      category: item.category,
      price: item.price,
      thumbnail: item.thumbnail,
      description: item.description,
      stock: item.stock,
    }));
    return todosProd;
  }

  async listCategory(categorySelect) {
    const categoryProductos = await this.modeloProd
      .find({ category: categorySelect })
      .exec();
    return categoryProductos;
  }

  async findById(id) {
    const prod = this.modeloProd.findOne({ _id: id });
    return prod;
  }
  async saveNew(objProd) {
    const nuevoProd = new this.modeloProd({
      _id: objProd._id,
      title: objProd.title,
      category: objProd.category,
      price: objProd.price,
      thumbnail: objProd.thumbnail,
      description: objProd.description,
      stock: objProd.stock,
    });
    const prodGuardado = await nuevoProd.save();
    logger.log("info", "nuevo producto guardado");
  }

  async findProdUpdate(obj) {
    const modificarProdDB = this.modeloProd.findOneAndUpdate(
      { _id: obj.idprod },
      {
        title: obj.title,
        category: obj.category,
        price: obj.price,
        thumbnail: obj.thumbnail,
        description: obj.description,
        stock: obj.stock,
      }
    );
    return modificarProdDB;
  }

  async deleteById(idprod) {
    const delProd = await this.modeloProd.deleteOne({ _id: idprod });
    return "producto eliminado";
  }
}

module.exports = { MongoDAOproductos, ProdModel };
