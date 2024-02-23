import express, { Application } from "express"
import cors from "cors"
import { dbConnection } from "../database/config"
import userRoutes from "../routers/usuario"

class Server {
  private app: Application
  private port: string
  private paths = {
    usuarios: "/api/usuarios",
  }

  constructor() {
    this.app = express()
    this.port = process.env.PORT ?? "8000"
    this.dbConnect()
    this.middlewares()
    this.routes()
  }

  async dbConnect() {
    await dbConnection()
  }

  middlewares() {
    this.app.use(cors())
    this.app.use(express.json())
    this.app.use(express.static("src/public"))
  }

  routes() {
    this.app.use(this.paths.usuarios, userRoutes)
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server up at ${this.port}`)
    })
  }
}

export default Server
