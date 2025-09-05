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
          setError("Authentication failed. Please try again.");
          return;
        }
        throw new Error("Failed to get user info");
      }

      const userData = await userRes.json();

      dispatch(setUser(userData));

      router.push("/dashboard");
    } catch (error) {
      setError(error.message || "An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  const isLoginDisabled = !email || !password || !isValid || isLoading;

  return (
    <div className="h-screen flex flex-col lg:flex-row bg-[#E9ECF2] overflow-hidden">
      {/* Left: Login Card */}
      <div className="lg:w-1/3 w-full px-4 sm:px-6 md:px-8 lg:px-10 py-8 lg:py-0 flex flex-col justify-center text-center">
        <h1
          className="text-center mb-2 text-3xl sm:text-4xl md:text-5xl lg:text-5xl"
          style={{
            fontFamily: "ABeeZee",
            fontWeight: 400,
            lineHeight: "100%",
            letterSpacing: "0%",
            color: "#1A1A1E",
          }}
        >
          Welcome back
        </h1>
        <p
          className="text-[#62626B] font-[400] text-center mb-6 sm:mb-8 text-sm sm:text-base "
          style={{
            fontFamily: "ABeeZee",
            lineHeight: "155%",
            letterSpacing: "0%",
          }}
        >
          Step into our shopping metaverse for an unforgettable shopping
          experience
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-3 sm:space-y-4 max-w-sm mx-auto w-full px-2"
        >
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
              className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm sm:text-base"
            />
            <span className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2">
              <img
                src="./sms.png"
                alt="Email"
                width={18}
                height={18}
                className="sm:w-5 sm:h-5"
              />
            </span>
          </div>
          {errors.email && (
            <span className="text-red-500 text-sm mt-1 inline-block">
              {errors.email.message}
            </span>
          )}

          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              {...login("password", {
                required: "Password is required",
                minLength: { value: 6, message: "At least 6 chars" },
              })}
              className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm sm:text-base"
            />
            <span className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2">
              <img
                src="./lock.png"
                alt="Password"
                width={18}
                height={18}
                className="sm:w-5 sm:h-5"
              />
            </span>
          </div>
          {errors.password && (
            <span className="text-red-500 text-sm mt-1 inline-block">
              {errors.password.message}
            </span>
          )}

          <button
            type="submit"
            disabled={isLoginDisabled}
            className="w-full py-2 sm:py-3 rounded-md bg-purple-600 text-white font-semibold hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
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
          width={744}
          height={523}
          alt="Hero"
          src="/image.png"
        />
      </div>
    </div>
  );
}

export default Page;
