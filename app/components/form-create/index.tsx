"use client";

import UserService from "@/app/services/user";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const FormCreate = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const { toast } = useToast();

  const { register, handleSubmit } = useForm<Inputs>();

  const router = useRouter();

  const userService = new UserService();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);

    const response = await userService.create(data);

    if (response.statusCode === 400) {
      toast({
        title: response.data.message,
        variant: "destructive",
      });
    }

    if (response.statusCode === 201) {
      toast({
        title: response.data.message,
        description: "Você será redirecionado em alguns instantes",
        variant: "default",
      });

      router.replace("/user/login");
    }

    setLoading(false);
  };

  return (
    <Card className="max-w-96 m-auto flex flex-col justify-center mt-[10em]">
      <CardHeader>
        <CardTitle>Criar usuário</CardTitle>
        <CardDescription>Crie seu usuário</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <Input
            placeholder="Digite o nome aqui: "
            {...register("name")}
            autoComplete="off"
          />
          <Input
            placeholder="Digite seu email aqui: "
            {...register("email")}
            autoComplete="off"
          />
          <Input
            placeholder="Digite sua senha aqui:"
            type="password"
            {...register("password")}
          />
          <Input
            placeholder="Confirme sua senha aqui:"
            type="password"
            {...register("confirmPassword")}
          />

          <Button type="submit" disabled={loading}>
            Criar usuário
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
