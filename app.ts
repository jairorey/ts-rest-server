import dotenv from "dotenv"
import Server from "./src/models/server"
dotenv.config()

const main = () => {
  const server = new Server()

  server.listen()
  const num = [1, 2, 3, 4]
  console.log(num.join(" * "))
  console.log(typeof num)
}

main()
