"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const uri = 'mongodb://localhost:27017/my_database';
(0, mongoose_1.connect)(uri).then(() => {
    console.log('Connected to the database');
}, (err) => {
    console.log(err.reason);
});
