import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signupSchema, signupSchemaType } from "../schema/auth.schema";
import { useAuthStore } from "../store/auth.store";
import AuthImagePattern from "./../Components/authImagePattern";
import { Key, Loader2, Mail, MessageSquare, User } from "lucide-react";
import FormItem from "../Components/form-item";
import { Link } from "react-router-dom";

const SignUpPage: React.FC = () => {
  const form = useForm<signupSchemaType>({
    resolver: zodResolver(signupSchema),
  });

  const { signup, isSigningUp } = useAuthStore();

  const submitHandler = async (data: signupSchemaType) => {
    signup(data)
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="flex flex-1 justify-center items-center">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex justify-center items-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-base-content/60">
                Get starter with your free account.
              </p>
            </div>
          </div>
          <form
            onSubmit={form.handleSubmit(submitHandler)}
            className="space-y-3"
          >
            <FormItem<signupSchemaType>
              InputType="text"
              label="Full Name"
              name="fullName"
              register={form.register}
              errors={form.formState.errors}
              placeholder="John Doe"
              Icon={User}
            />
            <FormItem<signupSchemaType>
              InputType="email"
              label="Email"
              name="email"
              register={form.register}
              errors={form.formState.errors}
              placeholder="example@mail.com"
              Icon={Mail}
            />
            <FormItem<signupSchemaType>
              InputType="password"
              label="Password"
              name="password"
              register={form.register}
              errors={form.formState.errors}
              placeholder="********"
              Icon={Key}
            />

            <button className="btn btn-primary w-full" disabled={isSigningUp}>
              {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  loading...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>
          <div className="text-center">
            <p className="text-base-content/60">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      />
    </div>
  );
};
export default SignUpPage;
