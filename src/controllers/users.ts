import { Request, Response, NextFunction } from 'express'
import { User, UserProps } from '../models/user'

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  let users = await User.find({})
  return res.status(200).json({
    message: users,
  })
}
const getUser = async (req: Request, res: Response, next: NextFunction) => {
  const id: string = req.params.id

  const user = await User.findById(id)
  return res.status(200).json({
    message: user,
  })
}

const updateUser = async (req: Request, res: Response, next: NextFunction) => {}
const deleteUser = async (req: Request, res: Response, next: NextFunction) => {}
const addUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email }: UserProps = req.body

  User.create(
    {
      name: name,
      email: email,
    },
    async function (err, user) {
      if (err) {
        console.log('Error creating User: ', err)
        res.status(400).json(err)
      } else {
        console.log('User Created: ', user)
        res.status(201).json(user)
      }
    }
  )
}

export default { getUsers, getUser, updateUser, deleteUser, addUser }
