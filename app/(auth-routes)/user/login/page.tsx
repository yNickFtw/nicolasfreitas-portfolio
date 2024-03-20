"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";

interface UserData {
  email: string;
  password: string;
}

export default function Login() {
  const [userData, setUserData] = useState<UserData>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);

    const response = await signIn("credentials", {
      email: userData.email,
      password: userData.password,
      redirect: false,
    });

    if (response?.error) {
      toast({
        title: response.error,
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    router.replace("/dashboard/overview");
  };

  return (
    <Card className="max-w-[500px] m-auto flex flex-col justify-center mt-[10em]">
      <CardHeader>
        <CardTitle>Faça login</CardTitle>
        <CardDescription>Entre e gerencie seus projetos.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <Input
            placeholder="Digite seu email aqui: "
            value={userData.email}
            onChange={(e) =>
              setUserData({
                email: e.target.value,
                password: userData.password,
              })
            }
          />
          <Input
            placeholder="Digite sua senha aqui:"
            type="password"
            value={userData.password}
            onChange={(e) =>
              setUserData({ email: userData.email, password: e.target.value })
            }
          />

          <Button type="submit" disabled={loading}>
            Entrar
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
