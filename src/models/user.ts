import { Schema, model, Types } from 'mongoose'

interface IUser {
  name: string
  email: string
  avatar?: string
  posts: Types.ObjectId[]
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  avatar: String,
  posts: [
    { type: Types.ObjectId, ref:'Post' }
  ],
})

export const User = model<IUser>('User', userSchema)
