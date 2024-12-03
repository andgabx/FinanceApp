import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Navbar from "./_components/ui/navbar";

const Home = async () => {
  const {userId} = await auth();
  if (!userId) {
    redirect('/login')
  }
  return <div className="">
    <Navbar/>
  </div>
}
 
export default Home;