import { Schema, model } from "mongoose"

// User interface
interface User {
  name: string
  email: string
  password: string
  img?: string
  role: string
  state: boolean
  google: boolean
}

// Schema
const UserSchema = new Schema<User>({
  name: {
    type: String,
    required: [true, "name is mandatory"],
  },
  email: {
    type: String,
    required: [true, "email is mandatory"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password is mandatory"],
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    enum: ["USER_ROLE", "ADMIN_ROLE"],
  },
  state: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: true,
  },
})

UserSchema.methods.toJSON = function () {
  const { password, __v, ...user } = this.toObject()
  return user
}

export default model("User", UserSchema)
