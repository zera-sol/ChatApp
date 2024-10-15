'use client'
import { usePathname, useRouter } from "next/navigation"

export default function Test(){
    const router = useRouter()
    const path =  usePathname()
    const redirect = () => {
        console.log(path);
        router.push('contact')
    }
    return(
        <div>
           <button onClick={redirect}>Click here</button>
        </div>
    )
}