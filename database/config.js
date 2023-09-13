const mongoose = require("mongoose");

//Configuraciones de Mongoose
const dbMongoose = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Base de datos Online");
  } catch (error) {
    console.log(error);
    throw new Error("Error al inicializar la base de datos");
  }
};

module.exports = {
  dbMongoose,
};
