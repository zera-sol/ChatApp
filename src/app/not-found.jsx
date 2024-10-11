import Link from "next/link";

export default function NotFound(){
    return(
        <div>
            <h1>The page not found </h1>
            <p>Sorry, The page you are looking for does not exist</p>
            <Link href='/'>Return Home</Link>
        </div>
    )
}