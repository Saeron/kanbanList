const express = require('express');
const morgan = require('morgan');
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");
const mongoose = require('mongoose');
const BoardEntry = require('./models/board');

require("dotenv").config();

mongoose.connect(process.env.DATABASE_URL || "http://localhost:mongodb://localhost:27017/kanban", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN
}));
app.use(express.json());
if (process.env.NODE_ENV === "production") {
    app.use(express.static("./client/dist"));
}
app.use(morgan('dev'));

async function createBoard(req, res, next) {
    req.body.uuid = uuidv4();
    try {
        const boardEntry = new BoardEntry(req.body);
        const createdBoard = await boardEntry.save();
        res.json(boardEntry);
    } catch (error) {
        next(error);
    }
}

app.post('/list', async (req, res, next) => {
    if (!req.body.uuid) {
        createBoard(req, res, next);
    } else {
        try {
            const entry = await BoardEntry.findOne({
                uuid: req.body.uuid
            });
            if (!entry) {
                const error = new Error({
                    message: "Incorrect uuid.",
                    code: 401
                });
                next(error);
            } else {
                res.json(entry);
            }
        } catch (error) {
            next(error);
        }
    }
});

app.post('/updateLists', async (req, res, next) => {
    await BoardEntry.findOneAndUpdate({ uuid: req.body.uuid }, {
        list1: req.body.list1,
        list2: req.body.list2,
        list3: req.body.list3
    }).then(result => {
        res.json(result);
    });
});

app.post('/addTicket', async (req, res, next) => {
    await BoardEntry.findOneAndUpdate(
        { uuid: req.body.uuid }, {
        $push: { list1: req.body.item },
    },
        { new: true }
    ).then(result => res.json(result));
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Running on: http://localhost:${port}`);
});