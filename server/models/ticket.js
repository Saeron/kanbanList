const mongoose = require('mongoose');

const { Schema } = mongoose;

const ticketSchema = new Schema(
    {
        text: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 150
        },
        tags: {
            type: [String],
            default: []
        }
    }
);

module.exports = ticketSchema;