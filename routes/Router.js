import express from "express";
const router = express.Router()
import { register, login, addTodo, getTodo, updateTodo, DeleteTodo } from "../controllers/AuthControllers.js";


router.post('/register', register)
router.post('/login', login)

router.post('/addTodo', addTodo)
router.get('/getTodo', getTodo)
router.put('/updateTodo/:id', updateTodo)
router.delete('/deleteTodo/:id', DeleteTodo)


export default router;