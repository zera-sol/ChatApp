import { User } from "@/lib/models";
import { connectoDb } from "@/lib/utils";
import bcrypt from "bcryptjs";
import cloudinary from "@/lib/cloudinary";
import { Readable } from "stream"; // To handle stream for buffer
import { Promise } from "mongoose";

export async function POST(req) {
    try {
        const body = await req.formData(); // Parse the incoming data

        const username = body.get('username');
        const email = body.get('email');
        const password = body.get('password');
        const repeatPassword = body.get('repeatPassword');
        const img = body.get('img'); // Get the uploaded image
        const isAdmin = body.get('isAdmin');

        // Connect to the database
        await connectoDb();

        // Check if passwords match
        if (password !== repeatPassword) {
            return new Response(JSON.stringify({ message: "Passwords do not match" }), {
                status: 400,
            });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return new Response(JSON.stringify({ message: "User already exists" }), {
                status: 400,
            });
        }

        // Hash the password before saving the user
        const hashedPassword = await bcrypt.hash(password, 10);

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
        // Create and save the new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            img: imageUrl, // Save the image URL if available
            isAdmin,
        });

        await newUser.save();

        // Return a success message
        return new Response(JSON.stringify({ message: "User registered successfully" }), {
            status: 201,
        });
    } catch (error) {
        console.error("Registration error:", error);
        return new Response(JSON.stringify({ message: "Server error" }), {
            status: 500,
        });
    }
}

//connection timed out

//what could be the case for this error in my server side when I tried to login using creadentials 