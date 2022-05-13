import { Schema, model, ObjectId } from 'mongoose'

interface IPost {
  userId: ObjectId
  title: string
  body: string
}

const postSchema = new Schema<IPost>({
  userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  title: { type: String, required: true },
  body: { type: String, required: true },
})

export const Post = model<IPost>('Post', postSchema)
