import { User } from "@/lib/models";
import { connectoDb } from "@/lib/utils";

export async function DELETE(req) {
    try {
       // Get the URL from the request object
       const url = req.url; // e.g., "/api/auth/register/6716d4e651191ed09858fa4d"
        
       // Extract the ID from the URL
       const id = url.split("/").pop(); // This gets the last segment of the URL
       
        // Connect to the database
        await connectoDb();

        // Find the user by ID and Delete the user

        const user = await User.findByIdAndDelete(id);
        
        if(!user) {
            return new Response(JSON.stringify({ error: "User not found" }), {
                status: 404,
            });
        }
        // Return a success message
        return new Response(JSON.stringify({ message: "User Dleted successfully" }), {
            status: 201,
        });
    } catch (error) {
        console.error("Deletion error:", error);
        return new Response(JSON.stringify({ error: error.message}), {
            status: 500,
        });
    }
}

export async function GET(req) {
    try {
       // Get the URL from the request object
       const url = req.url; // e.g., "/api/auth/register/6716d4e651191ed09858fa4d"
        
       // Extract the ID from the URL
       const id = url.split("/").pop(); // This gets the last segment of the URL
       
        // Connect to the database
        await connectoDb();

        // Find the user by ID and Delete the user

        const user = await User.findById(id);
        
        if(!user) {
            return new Response(JSON.stringify({ error: "User not found" }), {
                status: 404,
            });
        }
        // Return a success message
        return new Response(JSON.stringify(user), {
            status: 201,
        });
    } catch (error) {
        console.error("Deletion error:", error);
        return new Response(JSON.stringify({ error: error.message}), {
            status: 500,
        });
    }
}
