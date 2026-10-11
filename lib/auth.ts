import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "test-rise-lms-super-secret-jwt-key-2026"
);

export const COOKIE_NAME = "lms_session";

export interface DecodedSession {
  email: string;
  fullName: string;
  role: "student" | "mentor" | "admin";
  courseAssigned: string;
  rollNumber?: number;
}

/**
 * Creates and sets the JWT session cookie (7 days duration)
 */
export async function createSession(user: {
  email: string;
  fullName: string;
  role: "student" | "mentor" | "admin";
  courseAssigned: string;
  rollNumber?: number;
}): Promise<string> {
  const token = await new SignJWT({
    email: user.email.toLowerCase().trim(),
    fullName: user.fullName,
    role: user.role,
    courseAssigned: user.courseAssigned || "1",
    rollNumber: user.rollNumber,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(JWT_SECRET);

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return token;
}

/**
 * Retrieves and verifies the session from cookie
 */
export async function getSession(): Promise<DecodedSession | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return null;

    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as DecodedSession;
  } catch {
    return null;
  }
}

/**
 * Clears the session cookie
 */
export async function clearSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
