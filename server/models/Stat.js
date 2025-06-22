import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    userId : { type: mongoose.Schema.Types.ObjectId, ref: 'User' , required: true },
    title: { type: String, required: true },
    value: { type: Number, required: true },
    date: {type: Date, default: Date.now}
})

const Stat = mongoose.model('Stat', userSchema);
export default Stat;