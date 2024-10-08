import express from 'express';
import * as dotenv from 'dotenv';
import OpenAI from 'openai';
import { APIResource } from 'openai/resource.mjs';

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
});

router.route('/').get((req, res) => {
    res.send("Hello from Dall-E!")
})

router.route('/').post(async (req, res) => {
    try {
        const { prompt } = req.body;
        const aiResponse = await openai.images.generate({
            prompt,
            n: 1,
            model: "dall-e-3", // to chnage the model
            size: '1024x1024',
            response_format: 'b64_json',
        });

        const image = aiResponse.data[0].b64_json;  // Access the image data correctly
        
        res.status(200).json({ photo: image });
    } catch (error) {
        console.log(error);
        res.status(500).send(error?.message || 'Something went wrong');
    }
});


export default router;