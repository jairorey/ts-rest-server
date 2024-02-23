import mongoose, { ConnectOptions } from "mongoose"

export const dbConnection = async () => {
  if (process.env.DB_CONN) {
    try {
      await mongoose.connect(process.env.DB_CONN, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions)
      console.log("Base de datos online")
    } catch (error) {
      console.log(error)
      throw new Error("Error al intentar conetarse a MongoDB")
    }
  } else {
    throw new Error("Variable de ambiente db_connection no esta definida")
  }
}
