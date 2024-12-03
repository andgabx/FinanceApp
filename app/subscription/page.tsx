
import { redirect } from "next/navigation";
import Navbar from "../_components/ui/navbar";
import { auth } from "@clerk/nextjs/server";

const subscription = async() => {
    
    const { userId } = await auth();
    if (userId) {
      redirect("/");
    }
    
    return ( 
    <Navbar/>
  );
}
 
export default subscription;