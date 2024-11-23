import JsonWebTokenError from "jsonwebtoken";
import userModal from "../models/user.js";
import Todo from "../models/todo.js";
import bcryptjs from "bcryptjs"

const register = async(req, res)=>{
    try {
        const {name, email, password} = req.body;
        const existingUser = await userModal.findOne({email});
        if(existingUser) return res.status(400).json({msg: "User already exists"})
        const hashPassword = await bcryptjs.hash(password, 10)
        const newUser = new userModal({name, email, password: hashPassword});
        await newUser.save();
        res.status(200).json({success: true, msg: "User registered successfully", user: newUser})
    } catch (error) {
        console.log(error)
    }    
} 
const login = async(req, res)=>{
    try {
        const {email, password} = req.body;
        const user = await userModal.findOne({email});
        if(!user) return res.status(400).json({success: false, msg: "Email not found"})
        const isMatch = await bcryptjs.compare(password, user.password);
        if(!isMatch) return res.status(400).json({success: false, msg: "Password is already exist"})
        const token = JsonWebTokenError.sign({id: user._id}, process.env.SECRET_KEY, {expiresIn: "3d"})
        res.status(200).json({success: true, msg: "User Logged In successfully", data: {user, token}})
    } catch (error) {
        console.log(error)       
    } 
}

const addTodo = async(req, res)=>{
    try {
        const {Name, FatherName, Phone, Description} = req.body;
        const newTodo = new Todo({Name, FatherName, Phone, Description});
        await newTodo.save();
        res.status(200).json({success: true, msg: "Todo added successfully", todo: newTodo})
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, msg: "Internal server error"})
    }
}

const getTodo = async(req, res)=>{
    try {
        const todo = await Todo.find()
        if(!todo) return res.status(400).json({success: true, msg: "Todo not found"})
        res.status(200).json({success: true, todo})
} catch (error) {
    console.log(error)
    res.status(500).json({success: false, msg: "Internal server error"})
}
}

const updateTodo = async (req, res) => {
    try {
      const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(200).json({ success: true, msg: "Todo updated successfully", updatedTodo });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, msg: "Internal server error" });
    }
  };

  
const DeleteTodo = async(req, res)=>{
    try {
        const User_Id = req.params.id;
        const deleteUser = await Todo.findByIdAndDelete(User_Id)
        if(!deleteUser) return res.status(404).json({success: true, msg: "User not found"})
        res.status(200).json({success: true, msg: "User deleted successfully"})
} catch (error) {
    console.log("Error deleting user:", error)
    res.status(500).json({success: false, message: "Internal server error"}) 
    }
}

export {register, login, addTodo, getTodo, updateTodo, DeleteTodo}