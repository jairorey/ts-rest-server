import { Schema, model } from "mongoose"

// Role interface
interface Role {
  role: string
}

const RoleSchema = new Schema<Role>({
  role: {
    type: String,
    required: [true, "rol is mandatory"],
  },
})

export default model("Role", RoleSchema)
