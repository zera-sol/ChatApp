import { Post } from "@/lib/models";
import { connectoDb } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const givenId = params.id;  // Correctly extract the ID from params
  try {
    await connectoDb();
    
    const post = await Post.findById(givenId);  // Fetch the post from the database
    
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post);  // Return the fetched post
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json({ error: "Error fetching post" }, { status: 500 });
  }
};
