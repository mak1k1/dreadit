import { Schema, model, Types } from 'mongoose'

export interface PostProps {
  userId?: Types.ObjectId
  title: string
  body: string
}

const postSchema = new Schema<PostProps>({
  userId: { type: Types.ObjectId, required: true },
  title: { type: String, required: true },
  body: { type: String, required: true },
})

export const Post = model<PostProps>('Post', postSchema)
