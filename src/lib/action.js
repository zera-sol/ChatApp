import { User } from "./models";
import {connectoDb} from "./utils"

export const registerNewUser = async (formData) => {
    const {username, email, password, passwordRepeat, img} = Object.fromEntries(formData);
     
    if(password !== passwordRepeat){
        return " Passoword doesn't match!"
    }

    try {
        await connectoDb();
    const user = await User.findOne({email})

    if(user){
        return "User already exist!"
    }
      const newUser = await new User({
        username,
        email,
        password,
        img,
      })
      
      await newUser.save()
      console.log('saved to db', newUser)
    
    } catch (error) {
        console.log(error)
        return  {err: "Some thing went wrong!", error }
    }
}