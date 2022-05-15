import { Request, Response, NextFunction } from 'express'
import axios, { AxiosResponse } from 'axios'
import { Post, PostProps } from '../models/post'
import { User } from '../models/user'
import { isValidObjectId, Schema, SchemaTypes } from 'mongoose'

const getPosts = async (req: Request, res: Response, next: NextFunction) => {
  let posts = await Post.find({})
  return res.status(200).json({
    message: posts,
  })
}

const getPost = async (req: Request, res: Response, next: NextFunction) => {
  const id: string = req.params.id

  const post = await Post.findById(id)
  return res.status(200).json({
    message: post,
  })
}

// updating a post
const updatePost = async (req: Request, res: Response, next: NextFunction) => {
  // get the post id from the req.params
  let id: string = req.params.id
  // get the data from req.body
  let title: string = req.body.title ?? null
  let body: string = req.body.body ?? null
  // update the post
  let response: AxiosResponse = await axios.put(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
    {
      ...(title && { title }),
      ...(body && { body }),
    }
  )
  // return response
  return res.status(200).json({
    message: response.data,
  })
}

// deleting a post
const deletePost = async (req: Request, res: Response, next: NextFunction) => {
  // get the post id from req.params
  let id: string = req.params.id
  // delete the post
  let response: AxiosResponse = await axios.delete(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  )
  // return response
  return res.status(200).json({
    message: 'post deleted successfully',
  })
}

const addPost = async (req: Request, res: Response, next: NextFunction) => {
  const { userId, title, body }: PostProps = req.body

  // if(!isValidObjectId(userId)) {
  //   return res.status(422).json({
  //     message: "userId is not valid"
  //   })
  // }

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
        if(!user) {
          return
        }
        user.posts.push(post._id)
        console.log('User Created: ', user)
        res.status(201).json(user)
      }
    }
  )
}

export default { getPosts, getPost, updatePost, deletePost, addPost }
