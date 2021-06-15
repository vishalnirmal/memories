import {config} from 'dotenv';
import Image from '../models/Image.js';
config();

export const addImage = async (data) => {
    try {
        const image = new Image(data);
        const savedImage = await image.save();
            return `${process.env.API_URL}/images/${savedImage._id}`;
    } catch (error) {
        return;
    }
}

export const getImage = async (req, res) => {
    const id = req.params.id;
    try {
        const image = await Image.findById(id);
        if (!image)
            return res.status(404).json({
                message: "No Image found"
            });
        res.status(200).json(image.data);
    } catch (error) {
        res.status(501).json({
            message: error.message
        });
    }
}

export const deleteImage = async (id) => {
    try {
        await Image.findByIdAndDelete(id);
        return true;
    } catch (error) {
        return false;
    }
}