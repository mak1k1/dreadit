import { Schema, model, Types } from 'mongoose'

export interface UserProps {
  name: string
  email: string
  avatar?: string
  posts: Types.ObjectId[]
}

const userSchema = new Schema<UserProps>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  avatar: String,
  posts: [
    { type: Types.ObjectId, ref:'Post' }
  ],
})

export const User = model<UserProps>('User', userSchema)
