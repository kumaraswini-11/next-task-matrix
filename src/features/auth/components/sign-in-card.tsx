import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { FcGoogle } from "react-icons/fc";
// import { FaGithub } from "react-icons/fa6";

import { DottedSeparator } from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1).max(256),
});

export const SignInCard = () => {
  const signInForm = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof signInSchema>) => {
    console.log({ values });
  };

  return (
    <Card className="h-full w-full border-none shadow-none md:w-[487px]">
      <CardHeader>
        <CardTitle>Welcome back!</CardTitle>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>

      <CardContent className="p-7">
        <Form {...signInForm}>
          <form
            onSubmit={signInForm.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              name="email"
              control={signInForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Enter email address"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={signInForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Enter password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={false} size="lg" className="w-full">
              Login
            </Button>
          </form>
        </Form>
      </CardContent>

      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="flex flex-col gap-y-4 p-7">
        <Button disabled={false} variant="secondary" size="lg">
          {/* <FcGoogle className="mr-2 size-5" /> */}
          Login with Google
        </Button>

        <Button disabled={false} variant="secondary" size="lg">
          {/* <FaGithub className="mr-2 size-5" /> */}
          Login with Github
        </Button>
      </CardContent>

      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="flex items-center justify-center p-7">
        <p>
          Don&apos;t have an account?{" "}
          <Link href="/sign-up">
            <span className="text-blue-700">Sign Up</span>
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};
