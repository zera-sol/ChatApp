import { User } from "@/lib/models";
import { connectoDb } from "@/lib/utils";


export const GET = async (req, res) => {
    try {
        //connect first with the db
        await connectoDb()

        //fetch all users in a database.
        const users = await User.find({});
        if(users){
            return new Response(JSON.stringify(users), {
                status: 200,
              });
        }
    } catch (error) {
        return new Response(JSON.stringify({ message: "Error fetching users" }), {
            status: 404});
    }
}

export const POST = (req, res) => {
    
}