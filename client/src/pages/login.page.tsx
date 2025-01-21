import { Key, Loader2, Mail, MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { loginSchema, loginSchemaType } from "../schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "../store/auth.store";
import FormItem from "../Components/form-item";
import { Link } from "react-router-dom";
import AuthImagePattern from "../Components/authImagePattern";

const LoginPage: React.FC = () => {
  const form = useForm<loginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  const { login, isLoggingIn } = useAuthStore();

  const submitHandler = async (data: loginSchemaType) => {
    login(data);
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
              <h1 className="text-2xl font-bold mt-2">Welcome back</h1>
              <p className="text-base-content/60">Sign in to your account</p>
            </div>
          </div>
          <form
            onSubmit={form.handleSubmit(submitHandler)}
            className="space-y-3"
          >
            <FormItem<loginSchemaType>
              InputType="email"
              label="Email"
              name="identifier"
              register={form.register}
              errors={form.formState.errors}
              placeholder="example@mail.com"
              Icon={Mail}
            />
            <FormItem<loginSchemaType>
              InputType="password"
              label="Password"
              name="password"
              register={form.register}
              errors={form.formState.errors}
              placeholder="********"
              Icon={Key}
            />

            <button className="btn btn-primary w-full" disabled={isLoggingIn}>
              {isLoggingIn ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  loading...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>
          <div className="text-center">
            <p className="text-base-content/60">
              If not any account yet?{" "}
              <Link to="/signup" className="link link-primary">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
      <AuthImagePattern
        title={"Welcome back!"}
        subtitle={
          "Sign in to continue your conversations and catch up with your messages."
        }
      />
    </div>
  );
};
export default LoginPage;
