import mongoose from 'mongoose';
const { Schema } = mongoose;

const todoSchema = new Schema({
    Name: {
        type: String,
        required: true
    },
    FatherName: {
        type: String,
        required: true
    },
    Phone: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
}, {timestamps: true});

const Todo = mongoose.model("Todo", todoSchema);
export default Todo;
