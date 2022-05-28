"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const posts_1 = __importDefault(require("../controllers/posts"));
const router = express_1.default.Router();
router.get('/', posts_1.default.getPosts);
router.get('/:id', posts_1.default.getPost);
router.put('/:id', posts_1.default.updatePost);
router.delete('/:id', posts_1.default.deletePost);
router.post('/', posts_1.default.addPost);
exports.default = router;
