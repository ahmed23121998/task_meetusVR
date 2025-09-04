"use client";
import { useEffect, useState } from "react";
import { clearUser, setUser } from "@/store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id, name } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/user");
        if (res.ok) {
          const data = await res.json();
          dispatch(setUser(data));
        } else if (res.status === 401) {
          // Token expired or invalid, redirect to login
          router.push("/login");
          return;
        } else {
          setError("Failed to fetch user information");
        }
      } catch (error) {
        setError("An error occurred while fetching user information");
      } finally {
        setIsLoading(false);
      }
    }

    fetchUser();
  }, [dispatch, router]);

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", { method: "POST" });
      dispatch(clearUser());
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
      // Even if logout API fails, clear local state and redirect
      dispatch(clearUser());
      router.push("/login");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => router.push("/login")}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p className="text-gray-600">Welcome to your account dashboard</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              User Information
            </h2>
            <div className="space-y-3">
              <div className="flex items-center">
                <span className="font-medium text-gray-700 w-24">ID:</span>
                <span className="text-gray-900">{id || "N/A"}</span>
              </div>
              <div className="flex items-center">
                <span className="font-medium text-gray-700 w-24">Name:</span>
                <span className="text-gray-900">{name || "N/A"}</span>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={handleLogout}
              className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
