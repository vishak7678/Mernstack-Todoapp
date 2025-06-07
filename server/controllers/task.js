 const authMiddleware = require('../middleware/authMiddleware');
 const { addTask, editTask, getTask, deleteTask } = require('../services/task');
 const express = require('express');
 const router = express.Router();

 router.post("/addTask", authMiddleware, addTask);
 router.put("/editTask/:id", authMiddleware, editTask);
 router.get("/getTask/:id", authMiddleware, getTask);
 router.delete("/deleteTask/:id", authMiddleware, deleteTask);

 module.exports = router;