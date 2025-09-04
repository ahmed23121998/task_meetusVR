import { cookies } from "next/headers";

export async function createSession(token) {
  const cookieStore = await cookies();

  cookieStore.set("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24, // 24 hours
  });
}

export async function getToken() {
  try {
    const cookieStore = await cookies();
    let token = cookieStore.get("auth_token")?.value;
    return token;
  } catch (err) {
    console.error("Failed to get token:", err);
    return null;
  }
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.set("auth_token", "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });
}

// Client-side token check function
export function checkTokenFromCookie() {
  if (typeof document === "undefined") return null;

  const cookies = document.cookie.split(";");
  const authCookie = cookies.find((cookie) =>
    cookie.trim().startsWith("auth_token=")
  );

  if (authCookie) {
    return authCookie.split("=")[1];
  }

  return null;
}
