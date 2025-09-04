"use client";
import { setUser } from "@/store/userSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useState } from "react";

import "./style.css";

function Page() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register: login,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({ mode: "onChange" });

  const email = watch("email");
  const password = watch("password");

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError("");

    try {
      // Step 1: Login API call
      const loginRes = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!loginRes.ok) {
        const errorData = await loginRes.json();
        throw new Error(errorData.error || "Login failed");
      }

      // Step 2: Get user info
      const userRes = await fetch("/api/user");

      if (!userRes.ok) {
        if (userRes.status === 401) {
          // Token expired or invalid, stay on login page
          setError("Authentication failed. Please try again.");
          return;
        }
        throw new Error("Failed to get user info");
      }

      const userData = await userRes.json();

      // Store user data in Redux
      dispatch(setUser(userData));

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (error) {
      setError(error.message || "An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  // Check if login button should be disabled
  const isLoginDisabled = !email || !password || !isValid || isLoading;

  return (
    <div
      className="flex flex-col-reverse lg:flex-row px-2 mx-auto rounded-xl overflow-hidden    
     bg-[#e4ebf3]   
    background"
    >
      {/* Left: Login Card */}
      <div className="lg:w-1/3 w-full px-10 flex flex-col justify-center text-center">
        <h1 className="text-4xl lg:text-5xl font-bold mb-2 leading-tight">
          Welcome back
        </h1>
        <p className="text-gray-600 font-[400] text-l mb-8 text-wrap text-center">
          Step into our shopping metaverse for an unforgettable shopping
          experience
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="relative">
            <input
              type="email"
              {...login("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Enter a valid email address",
                },
              })}
              placeholder="Email"
              className="w-full pl-10 pr-4 py-2 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
              </svg>
            </span>
          </div>
          {errors.email && (
            <span className="text-red-500 text-sm mt-1 inline-block">
              {errors.email.message}
            </span>
          )}

          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M8 0a4 4 0 0 1 4 4v2.05a2.5 2.5 0 0 1 2 2.45v5a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 2 13.5v-5a2.5 2.5 0 0 1 2-2.45V4a4 4 0 0 1 4-4M4.5 7A1.5 1.5 0 0 0 3 8.5v5A1.5 1.5 0 0 0 4.5 15h7A1.5 1.5 0 0 0 11.5 13.5v-5A1.5 1.5 0 0 0 11.5 7zM8 1a3 3 0 0 0-3 3v2h6V4a3 3 0 0 0-3-3"
                />
              </svg>
            </span>
            <input
              type="password"
              placeholder="Password"
              {...login("password", {
                required: "Password is required",
                minLength: { value: 6, message: "At least 6 chars" },
              })}
              className="w-full pl-10 pr-4 py-2 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
          {errors.password && (
            <span className="text-red-500 text-sm mt-1 inline-block">
              {errors.password.message}
            </span>
          )}

          <button
            type="submit"
            disabled={isLoginDisabled}
            className="w-full py-2 rounded-md bg-purple-600 text-white font-semibold hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-500 text-sm">
          Don&apos;t have an account?
          <a href="/dashboard" className="text-purple-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>

      {/* Right: Branding */}
      <div className="lg:w-2/3 gap-0 w-full lg:h-screen pt-5 flex flex-col items-center justify-center">
        <Image
          className=""
          width={500}
          height={500}
          alt="Hero"
          src="/image.png"
        />
      </div>
    </div>
  );
}

export default Page;
