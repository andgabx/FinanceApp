import Image from "next/image";
import { Button } from "../_components/ui/button";
import { LogInIcon } from "lucide-react";

const LoginPage = () => {
  return (
    <div className="grid h-full grid-cols-2">
      <div className="flex flex-col h-full justify-center p-8 max-w-[550px] mx-auto">
        <Image
          src="/LogoLogin.svg"
          width={173}
          height={39}
          alt="Finance AI"
          className="mb-8"
        />
        <h1 className="text-4xl font-bold mb-3 text-white">Bem vindo</h1>
        <p className="text-muted-foreground mb-8">
          A Finance AI é uma plataforma de gestão financeira que utiliza IA para
          monitorar suas movimentações, e oferecer insights personalizados,
          facilitando o controle do seu orçamento.
        </p>
        <Button variant="secondary" className="">
          <LogInIcon className="mr-3" />
          Login or Create Account
        </Button>
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
