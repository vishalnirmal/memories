import mongoose from 'mongoose';

const imageSchema = mongoose.Schema({
    data: String
});

const Image = mongoose.model('Image', imageSchema);

export default Image;