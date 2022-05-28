"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const post_1 = require("../models/post");
const user_1 = require("../models/user");
const getPosts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let posts = yield post_1.Post.find({});
    return res.status(200).json({
        message: posts,
    });
});
const getPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const post = yield post_1.Post.findById(id);
    return res.status(200).json({
        message: post,
    });
});
// updating a post
const updatePost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // get the post id from the req.params
    let id = req.params.id;
    const updateObj = req.body;
    // update the post
    post_1.Post.findByIdAndUpdate(id, updateObj, (err, post) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            return res.status(400).json({
                error: err,
            });
        }
        return res.status(200).json({
            message: yield post_1.Post.findById(id),
        });
    }));
});
// deleting a post
const deletePost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // get the post id from req.params
    let id = req.params.id;
    // delete the post
    post_1.Post.findByIdAndDelete(id, (err) => {
        if (err) {
            return res.status(400).json({
                error: err,
            });
        }
        return res.status(200).json({
            message: 'Post deleted successfully',
        });
    });
});
const addPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, title, body } = req.body;
    post_1.Post.create({
        userId: userId,
        title: title,
        body: body,
    }, function (err, post) {
        return __awaiter(this, void 0, void 0, function* () {
            if (err) {
                console.log('Error creating User: ', err);
                res.status(400).json(err);
            }
            else {
                const user = yield user_1.User.findById(userId);
                if (!user) {
                    return;
                }
                user.posts.push(post._id);
                console.log('Post Created: ', post);
                res.status(201).json(user);
            }
        });
    });
});
exports.default = { getPosts, getPost, updatePost, deletePost, addPost };
