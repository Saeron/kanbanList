const mongoose = require('mongoose');
const ticketSchema = require('./ticket');

const { Schema } = mongoose;

const listType = {
    type: [ticketSchema],
    default: []
};

const boardScheme = new Schema(
    {
        uuid: {
            type: String,
            index: true,
            unique: true,
            required: true
        },
        list1: listType,
        list2: listType,
        list3: listType
    }
);

const BoardEntry = mongoose.model("BoardEntry", boardScheme);

module.exports = BoardEntry;