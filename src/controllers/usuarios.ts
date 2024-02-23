import { Request, Response } from "express"
import { encrypt } from "../helpers/encrypt"
import User from "../models/user"

const getUsuarios = async (req: Request, res: Response) => {
  const { limit = 10, from = 0 } = req.query
  const [total, users] = await Promise.all([
    User.countDocuments({ state: true }),
    User.find({ state: true }).limit(Number(limit)).skip(Number(from)),
  ])
  res.json({
    total,
    users,
  })
}

const getUsuario = async (req: Request, res: Response) => {
  const { id } = req.params
  const user = await User.find({ _id: id, state: true })
  res.json({
    user,
  })
}

const postUsuario = async (req: Request, res: Response) => {
  const { name, email, password, img, role, state } = req.body
  const user = new User({ name, email, password, img, role, state })

  // encrypt password
  user.password = encrypt(password)

  await user.save()
  res.json({
    msg: "post done",
    user,
  })
}

const putUsuario = async (req: Request, res: Response) => {
  const { id } = req.params
  const { password, google, email, ...rest } = req.body
  if (password) {
    rest.password = encrypt(password)
  }

  const user = await User.findByIdAndUpdate(id, rest)

  res.json({
    msg: "put done",
    user,
  })
}

const deleteUsuario = async (req: Request, res: Response) => {
  const { id } = req.params
  const user = await User.findByIdAndUpdate(id, { state: false })
  res.json({
    user,
  })
}

export { getUsuarios, getUsuario, postUsuario, putUsuario, deleteUsuario }
