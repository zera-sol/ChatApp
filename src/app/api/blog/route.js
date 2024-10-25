import { Post } from "@/lib/models";
import { connectoDb } from "@/lib/utils";
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
         // Upload image to Cloudinary
         let imageUrl = '';
         if (img) {
             const buffer = Buffer.from(await img.arrayBuffer());
             
             // Convert buffer to base64 format for upload
             const base64Image = `data:${img.type};base64,${buffer.toString('base64')}`;
 
             // Upload to Cloudinary
             const result = await cloudinary.uploader.upload(base64Image, {
                 folder: 'zeraNext_users',
                 resource_type: 'image', 
             });
 
             imageUrl = result.secure_url;
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
