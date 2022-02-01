const router = require("express").Router()
const jwt = require("jsonwebtoken")
const { User } = require("../models/user")
const bcrypt = require("bcrypt")
const Joi = require("joi")


router.patch("/add/:email", async (req, res) => {
    const user = await User.findOne({ email: req.params.email });

    const ToDoTask = {
        name: jwt.sign("pop", 'shhhhh'),
        ...req.body.todo,
    }
    user.todo = { [req.body.todo.id]: { ...req.body.todo }, ...user.todo };

    await user.save();
    res.status(200).send({ data: ToDoTask, message: "Task added" })
});


router.patch("/edit/:email/:id", async (req, res) => {
    const user = await User.findOne({ email: req.params.email });

    const ToDoTask = user.todo[req.params.id]
    user.set({ todo: {...user.todo, [req.params.id]: { ...ToDoTask, text: req.body.newTodo } } });

    await user.save();
    res.status(200).send({ data: user, message: "Task edited" })
});


router.patch("/comlete/:email/:id", async (req, res) => {
    const user = await User.findOne({ email: req.params.email });

    const ToDoTask = user.todo[req.params.id]
    user.set({ todo: {...user.todo, [req.params.id]: { ...ToDoTask, complete: req.body.complete } } });

    await user.save();
    res.status(200).send({ data: user, message: "Task completed" })
}); 


router.patch("/delete/:email/:id", async (req, res) => {
    const user = await User.findOne({ email: req.params.email });

    let test = {};
    for (const key in user.todo) {
        if(key != req.params.id)
            test[key] = user.todo[key];
    }

    user.set({ todo: { ...test } });

    await user.save();
    res.status(200).send({ data: user, message: "Task deleted" })
});


router.get("/:email", async (req, res) => {
    const user = await User.findOne({ email: req.params.email });
    try {
        res.status(200).send({ data: user.todo })
    }
    catch {
        return 0;
        res.status(200).send({ data: "" })
    }
})

module.exports = router
