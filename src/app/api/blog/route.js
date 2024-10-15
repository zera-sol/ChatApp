import { Post } from "@/lib/models";
import { connectoDb } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async (request) => {
    try {
        await connectoDb();
        
        const posts = await Post.find({});
        
        return NextResponse.json(posts);
    } catch (error) {
        console.error("Error fetching posts:", error);
        return NextResponse.json({ error: "Error fetching posts" }, { status: 500 });
    }
};

export const POST = async (request) => {
    try {
        const {title, body, img} = await request.json()
        await connectoDb();
        const newPost = await Post.create({
            title,
            body,
            img,
            userId : "670e251682e8a09a96e7a66a",
        });
        return NextResponse.json(newPost)
    } catch (error) {
        console.error("Error fetching posts:", error);
        return NextResponse.json({ error: "Error fetching posts" }, { status: 500 });
    }
}
