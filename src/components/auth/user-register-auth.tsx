"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useStore } from '@/store/user.store'; 
import { User } from "@/lib/definitions";
import { validateUser } from "@/lib/auth/user.auth";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}


export function UserRegisterForm({ className, ...props }: UserAuthFormProps) {

  const { toast } = useToast();
  const {user ,verifyUser, postUser } = useStore(); 
  const router = useRouter();
  const [errors, setErrors] = useState<string[]>([]);

  const [data, setData] = useState<User>({
    name: "",
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);


  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    const error = validateUser(data);
    if (error) {
        setErrors([error]);
        setIsLoading(false);
        return;
    }

    const response = await postUser(data);

    if (!response.ok) {
        const errorData = await response.json();
        setIsLoading(false);
      toast({
        title: "Oooops...",
        description: errorData.error,
        variant: "destructive",
        action: (
          <ToastAction altText="Tente Novamente">Try again</ToastAction>
        ),
      });
    } else {
      const user = await response.json();
    if(user.id){
      await verifyUser(user.id);
      const name = user?.name.replace(/\s+/g, '');
      router.push(`/verification/${name}`);
    }
    }

    setData({
      name: "",
      email: "",
      password: "",
    });
    setIsLoading(false);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  return (
        <div className={cn("grid gap-6", className)} {...props}>
        {/* {JSON.stringify(data)} */}
        <form onSubmit={onSubmit}>
            <div className="grid gap-2">
            <div className="grid gap-1">
                <Label className="sr-only" htmlFor="email">
                Name
                </Label>
                <Input
                id="name"
                placeholder="nome"
                type="text"
                autoCapitalize="none"
                autoCorrect="off"
                disabled={isLoading}
                name="name"
                value={data.name}
                onChange={handleChange}
                />
            </div>
            <div className="grid gap-1">
                <Label className="sr-only" htmlFor="email">
                Email
                </Label>
                <Input
                id="email"
                placeholder="name@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
                name="email"
                value={data.email}
                onChange={handleChange}
                />
            </div>
            <div className="grid gap-1">
                <Label className="sr-only" htmlFor="password">
                Password
                </Label>
                <Input
                id="password"
                placeholder="senha"
                type="password"
                autoCapitalize="none"
                autoCorrect="off"
                disabled={isLoading}
                name="password"
                value={data.password}
                onChange={handleChange}
                />
            </div>
            <Button disabled={isLoading}>
                {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Register
            </Button>
            </div>
        </form>
        {errors.length > 0 && (
        <div className="flex justify-center items-center mt-2">
          <ul className="mb-0 text-red-500">
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}
        <div className="relative">
            <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
                Or continue with
            </span>
            </div>
        </div>
        <Button
            onClick={() => signIn("google", { callbackUrl: "/home" })}
            variant="outline"
            type="button"
            disabled={isLoading}
        >
            {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
            <Icons.google className="mr-2 h-4 w-4" />
            )}{" "}
            Google
        </Button>
        </div>
  );
}