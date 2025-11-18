import { Todo } from '../models/Todo.js';

// Create a new todo    
export const createTodo = async (req, res) => {
    try {
        const { title, discription } = req.body;
        console.log('====================================');
        console.log(title,discription);
        console.log('====================================');


        if (discription !== undefined && (typeof discription !== "string" || discription.trim() === "")) {
    return res.status(400).json({message: "Description must be a non-empty string"});
}

        if (title !== undefined && (typeof title !== "string" || title.trim() === "")) {
    return res.status(400).json({message: "title must be a non-empty string"});
}

        const newTodo = await Todo.create({ title, discription });
        res.status(201).json({message: "Todo created successfully",data: newTodo});
    } catch (error) {
        res.status(500).json({message: "Failed to create todo",error: error.message });
    }
};


export const getAllTodos = async (req, res) => {
    try {
        let { page = 1, limit = 10 } = req.query; 
        page = parseInt(page);
        limit = parseInt(limit);
        const skip = (page - 1) * limit;
        const todos = await Todo.find({ isDeleted: false }).skip(skip).limit(limit).sort({ createdAt: -1 });
        const total = await Todo.countDocuments({ isDeleted: false });
        res.json({
            page,
            total,
            totalPages: Math.ceil(total / limit),
            todos,
        });
    } catch (error) {
        res.status(500).json({message: "Failed to fetch todos",error: error.message});
    }
};

export const getTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await Todo.findById(id);
        if (!todo) return res.status(404).json({message: "Todo not found"});
        
        res.json({data: todo});
    } catch (error) {
        res.status(500).json({message: "Failed to fetch todo", error: error.message});
    }
};

export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, discription, status } = req.body;

    console.log("Update Data:", title, discription, status);

    const todo = await Todo.findById(id);
    if (!todo)
      return res.status(404).json({ message: "Todo not found" });

    if (todo.isDeleted)
      return res.status(400).json({ message: "Cannot update a deleted todo" });

    // If all fields are missing (undefined)
    if (
      title === undefined &&
      discription === undefined &&
      status === undefined
    ) {
      return res.status(400).json({
        success: false,
        message:
          "At least one field (title, discription, status) must be provided",
      });
    }

    // Update only fields that are provided (even empty string allowed)
    if (title !== undefined) todo.title = title;
    if (discription !== undefined) todo.discription = discription;
    if (status !== undefined) todo.status = status;

    await todo.save();

    res.json({
      message: "Todo updated successfully",
      data: todo,
    });
  } catch (error) {
    console.log("Update Error:", error);
    res.status(500).json({
      message: "Failed to update todo",
      error: error.message,
    });
  }
};


export const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;

    const deletedTodo = await Todo.findByIdAndUpdate(id,{ isDeleted: true },{ new: true } );
 
     if (!deletedTodo) {
            return res.status(404).json({
            message:"Todo not found"
            });
        }
        res.json({
            message: "Todo deleted successfully"
        });
    }catch (error) {
            res.status(500).json({
            message: "Failed to delete todo",
            error: error.message
        });
    }

};
