import { Request, Response, NextFunction } from 'express'
import { Types } from 'mongoose'
import { Post, PostProps } from '../models/post'
import { User } from '../models/user'

const getPosts = async (req: Request, res: Response, next: NextFunction) => {
  let posts = await Post.find({})
  return res.status(200).json({
    message: posts,
  })
}

const getPost = async (req: Request, res: Response, next: NextFunction) => {
  const id: string = req.params.id
  
  if(!Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      error: 'Post not found'
    })
  }

  const post = await Post.findById(id)

  return res.status(200).json({
    message: post,
  })
}

// updating a post
const updatePost = async (req: Request, res: Response, next: NextFunction) => {
  // get the post id from the req.params
  let id: string = req.params.id

  const updateObj: { [key: string]: string } = req.body

  // update the post
  Post.findByIdAndUpdate(
    id,
    updateObj,
    async (err: NativeError, post: PostProps) => {
      if (err) {
        return res.status(400).json({
          error: err,
        })
      }
      return res.status(200).json({
        message: await Post.findById(id),
      })
    }
  )
}

// deleting a post
const deletePost = async (req: Request, res: Response, next: NextFunction) => {
  // get the post id from req.params
  let id: string = req.params.id
  // delete the post
  Post.findByIdAndDelete(id, (err: NativeError) => {
    if (err) {
      return res.status(400).json({
        error: err,
      })
    }

    return res.status(200).json({
      message: 'Post deleted successfully',
    })
  })
}

const addPost = async (req: Request, res: Response, next: NextFunction) => {
  const { userId, title, body }: PostProps = req.body

  Post.create(
    {
      userId: userId,
      title: title,
      body: body,
    },
    async function (err, post) {
      if (err) {
        console.log('Error creating User: ', err)
        res.status(400).json(err)
      } else {
        const user = await User.findById(userId)
        if (!user) {
          return
        }
        user.posts.push(post._id)
        console.log('Post Created: ', post)
        res.status(201).json(user)
      }
    }
  )
}

export default { getPosts, getPost, updatePost, deletePost, addPost }
