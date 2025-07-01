import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    username: String,
    message: String,
    timestamp: {type: Date, default: Date.now}
})

const model = mongoose.model('Message', schema);

export default model;