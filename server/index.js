const express = require('express');
const morgan = require('morgan');
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");
const mongoose = require('mongoose');
const BoardEntry = require('./models/board');


mongoose.connect(process.env.DATABASE_URL || "mongodb://localhost:27017/kanban", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


app.get('/', (req, res, next) => {
    res.json({
        message: uuidv4()
    });
});

async function createBoard(req, res, next){
    req.body.uuid = uuidv4();
    try {
        const boardEntry = new BoardEntry(req.body);
        const createdBoard = await boardEntry.save();
        res.json(boardEntry);
    }catch (error){
        next(error);
    }
}

app.post('/list', async(req, res, next) => {
    if(!req.body.uuid){
        createBoard(req, res, next);
    }else {
        try {
            const entry = await BoardEntry.findOne({
                uuid: req.body.uuid
            });
            if (!entry){
                const error = new Error({
                    message: "Incorrect uuid.",
                    code: 401
                });
                next(error);
            }else {
                res.json(entry);
            }
        }catch (error){
            next(error);
        }
    }
});

app.post('/updateLists', async(req, res, next) =>{
    await BoardEntry.updateOne({uuid: req.body.uuid}, {
        list1: req.body.list1,
        list2: req.body.list2,
        list3: req.body.list3
    }).then(result => {
        res.json(result);
    });
});
app.listen(5000);