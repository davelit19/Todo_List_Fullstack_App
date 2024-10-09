const express = require("express");
const app = express();
const port = 3003;
const mongoose = require("mongoose");
const cors = require("cors");
const TodoModel = require("./Model/model.js");

app.use(cors());
app.use(express.json());

const main = async () => {
    await mongoose.connect("mongodb://127.0.0.1:27017/test");
};

main().catch((err) => console.log(err));
//  mongoose.connect('mongodb://127.0.0.1:27017/test');

app.post("/add", (req, res) => {
    const { task } = req.body;

    if (!task) {
        res.status(400).json({ error: "Task is required" });
    }

    TodoModel.create({
        task: task,
    })
        .then((result) => res.json(result))
        .catch((err) => console.log(err));
});

app.get("/all-tasks", (req, res) => {
    TodoModel.find()
        .then((result) => res.json(result))
        .catch((err) => console.log(err));
});

app.put("/update-task/:id", (req, res) => {
    const { id } = req.params;
    const { done } = req.body;
    TodoModel.findByIdAndUpdate(id, { done: done })
        .then((result) => res.json(result))
        .catch((err) => console.log(err));
});

app.delete('/delete-task/:id', (req, res) => {
    const {id} = req.params;

    TodoModel.deleteOne({
        _id: id
    }).then(result => res.json(result))
    .catch(err => console.log(err));
})

/* TodoModel.deleteMany({})
.then(result => console.log(result.data))
.catch(err => console.log(err)) */

app.listen(port, () => {
    console.log("Server is running on port 3003");
});
