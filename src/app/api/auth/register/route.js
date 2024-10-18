import { User } from "@/lib/models";
import { connectoDb } from "@/lib/utils";
import bcrypt from "bcryptjs"

// Named export for the POST method (for user registration)
export async function POST(req, res) {
  try {
    const body = await req.json();  // Parse the request body

    const { username, email, password, passwordRepeat, img} = body;

    // Connect to the database
    await connectoDb();

    // Check if passwords match
    if (password !== passwordRepeat) {
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

    // Create and save the new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      img,
    });

    await newUser.save();

    // Return a success message
    return new Response(JSON.stringify({ message: "User registered successfully" }), {
      status: 201,
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error registering user" }), {
      status: 500,
    });
  }
}