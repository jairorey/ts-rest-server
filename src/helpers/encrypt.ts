import { genSaltSync, hashSync } from "bcryptjs"

export const encrypt = (val: string) => {
  const salt = genSaltSync()
  return hashSync(val, salt)
}
