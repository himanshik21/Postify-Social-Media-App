import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import Loader from "@/components/shared/Loader";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

import { useUserContext } from "@/context/AuthContext";
import { useSignInAccount } from "@/lib/react-query/queriesAndMutations";
import { SigninValidation } from "@/lib/validation";

const SigninForm = () => {
  const { toast } = useToast();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();      // Destructure checkAuthUser function to verify user authentication status and isLoading for loading state
  const navigate = useNavigate();


  const { mutateAsync: signInAccount } = useSignInAccount();               // Destructure mutateAsync function to trigger sign-in mutation


  // 1. Define your form.
  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: '',
      password: '',
    },
  });


  async function onSubmit(values: z.infer<typeof SigninValidation>) {
    console.log('We are here');
    const session = await signInAccount({
      email: values.email,
      password: values.password,
    })

    // console.log(session);

    if (!session) {
      return toast({ title: 'Something went wrong. Please login you new account', });
    }

    const isLoggedIn = await checkAuthUser();

    // console.log({isLoggedIn});

    if (isLoggedIn) {
      form.reset();
      // console.log('Navigated');
      navigate("/");
    }
    else {
      return toast({ title: 'Login failed. Please try again.' });
    }
  }

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img src="/assets/images/logo.svg" alt="logo" />
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Log in to your account
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          Welcome back! Please enter your details
        </p>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full mt-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="shad-button_primary" type="submit">
            {isUserLoading ? (
              <div className="flex-center gap-2">
                <Loader />
                Loading
              </div>
            ) : (
              "Sign in"
            )}
          </Button>
          <p className="text-small-regular text-light-2 text-center mt-2">
            Dont't have an account?
            <Link
              to="/sign-up"
              className="text-primary-500 text-small-semibold ml-1 underline"
            >Sign up
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};
export default SigninForm;
