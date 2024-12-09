import Image from "next/image";
import { Button } from "../_components/ui/button";
import { LogInIcon } from "lucide-react";
import { SignInButton } from "@clerk/nextjs";

const LoginPage = async () => {
  return (
    <div className="grid h-full grid-cols-2">
      <div className="flex flex-col h-full justify-center p-8 max-w-[550px] mx-auto">
        <Image
          src="/logo.svg"
          width={173}
          height={39}
          alt="Finance AI"
          className="mb-8"
        />
        <h1 className="text-4xl font-bold mb-3 text-white">Welcome</h1>
        <p className="text-muted-foreground mb-8">
          Finance AI is a financial management platform that uses AI to monitor
          your transactions and provide personalized insights, making it easier
          to manage your budget.
        </p>
        <SignInButton> 
          <Button
            variant="default"
            className="bg-muted text-primary-foreground hover:bg-opacity-80"
          >
            <LogInIcon className="mr-3" />
            <p className="font-bold">Login or Create Account</p>
          </Button>
        </SignInButton>
      </div>

      <div className="relative h-full w-full">
        <Image
          src="/backgroundlogin.png"
          alt="Login here"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default LoginPage;
