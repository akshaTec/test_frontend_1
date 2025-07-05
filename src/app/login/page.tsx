import google_logo from "../../../public/icons8-google.svg"
import searce_logo from "../../../public/searce_logo.png"
import Image from "next/image";
import {ngrok} from "@/components/input_nodes_edge"


export default function Login() {

  // const handleGoogleSignIn = () => {
  //   window.location.href = ngrok+"/login";
  // };

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const res = await fetch("http://localhost:5000/auth/callback", { credentials: "include" });
  //     const data = await res.json();

  //     if (data.user) {
  //       setUser(data.user);
  //       router.push("/landing"); 
  //     }
  //   };

  //   fetchUser();
  // }, []); 

  return (
    <main className="relative w-screen h-screen grid grid-cols-2">
        <div className="flex flex-col justify-center items-center space-y-4">
            <div className="text-black-100">Enter your credentials to access your account</div>
            <button className="flex items-center justify-center h-12 space-x-5 w-96 border border-gray-400 p-4 rounded-full">
                <Image src={google_logo} alt="Google Logo" width={20} height={20} />
                <span>Login with Google</span>
            </button>
        </div>
        <div className="w-full bg-black flex items-center">
            <Image src={searce_logo} alt="Your SVG"/>
        </div>
    </main>
  )
}
