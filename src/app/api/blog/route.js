import { Post } from "@/lib/models";
import { connectoDb } from "@/lib/utils";
import {Readable} from "stream"
import cloudinary from "@/lib/cloudinary";

export const GET = async (req) => {
    try {
        await connectoDb()
        const Posts = await Post.find({})
        if(Posts){
        return new Response(JSON.stringify(Posts), {
            status: 200
        })
    }
    } catch (error) {
        return new Response(JSON.stringify({error: error.message}), {
            status: 500
        })
    }
};

export const POST = async (req) => {
    const formData = await req.formData()

    const title = formData.get('title')
    const desc = formData.get('desc')
    const img = formData.get('img')
    const fullText = formData.get('fullText')
    const userId = formData.get("userId")

    try {
        await connectoDb()
        // upload image to cloudinary
        
        let imageUrl = null;
        // If an image is uploaded, upload it to Cloudinary
        if (img) {
            const buffer = Buffer.from(await img.arrayBuffer()); // Convert the img to Buffer

            // Convert the buffer into a readable stream for Cloudinary
            const stream = Readable.from(buffer);
            imageUrl = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        folder: "zeraNext_users", // Adjust the folder name as needed
                    },
                    (error, result) => {
                        if (error) {
                            return reject(new Error("Image upload failed"));
                        }
                        resolve(result.secure_url); // Resolve the URL after successful upload
                    }
                );
                stream.pipe(uploadStream); // Pipe the buffer stream to Cloudinary
            });
        }
        const newPost = await new Post({
            title,
            desc,
            img: imageUrl,
            body: fullText,
            userId,
        })
        await newPost.save()
        return new Response(JSON.stringify({message: "Posted successfully!"}), {
            status: 200
        })
    } catch (error) {
        return new Response(JSON.stringify({error: error.message}), {
            status:500
        })
    }
}
