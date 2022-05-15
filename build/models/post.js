"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const mongoose_1 = require("mongoose");
const postSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'User' },
    title: { type: String, required: true },
    body: { type: String, required: true },
});
exports.Post = (0, mongoose_1.model)('Post', postSchema);
