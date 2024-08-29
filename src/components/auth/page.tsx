"use client";

import { Input } from "@/components/Input";
import { useAlert } from "@/hook/use-alert-contex";
import { signIn } from "next-auth/react";
import { useState } from "react";

export function AuthPage() {
  const { sendAlert } = useAlert();

  const [loading, setLoading] = useState(false);

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    const result = await signIn("credentials", {
      redirect: false,
      email: credentials.email,
      password: credentials.password,
    });

    if (result?.error) {
      sendAlert({
        title: "Autenticação",
        variant: "error",
        message: result.error,
      });
    }

    setLoading(false);
  };

  return (
    <div className="w-full h-dvh flex items-center justify-center px-4">
      <form className="w-96  py-12 px-4" onSubmit={handleSubmit}>
        <h1 className="text-3xl font-bold">Sign In</h1>
        <p className="text-sky-900">Please enter your email and password</p>
        <div className="flex flex-col gap-2 py-4">
          <div>
            <Input
              label="Email"
              required
              name="email"
              type="email"
              onChange={handleChange}
            />
            <Input
              label="Password"
              required
              name="password"
              type="password"
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-between">
            <div className="flex gap-1 items-center">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember" className="text-zinc-800">
                Remember-me
              </label>
            </div>
            <a href="#" className="text-sky-400">
              Forgot password?
            </a>
          </div>
          <button
            className="bg-sky-500 text-white h-12 rounded hover:bg-sky-400 flex items-center justify-center"
            type="submit"
            defaultChecked
          >
            {loading ? (
              <div className="p-2 border-2 border-sky-600 rounded-full border-l-sky-100 animate-spin w-2 inline-block"></div>
            ) : (
              "Sign In"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
