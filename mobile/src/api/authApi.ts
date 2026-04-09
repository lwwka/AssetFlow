import type { AuthUser, LoginPayload, RegisterPayload } from "../types/auth";

const delay = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export async function loginWithEmail({
  email,
  password
}: LoginPayload): Promise<AuthUser> {
  await delay(600);

  if (!email.toLowerCase().includes("@")) {
    throw new Error("Please enter a valid email address.");
  }

  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters.");
  }

  return {
    id: 1,
    name: "Lawrence",
    email
  };
}

export async function registerWithEmail({
  name,
  email,
  password
}: RegisterPayload): Promise<AuthUser> {
  await delay(700);

  if (name.trim().length < 2) {
    throw new Error("Full name must be at least 2 characters.");
  }

  if (!email.toLowerCase().includes("@")) {
    throw new Error("Please enter a valid email address.");
  }

  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters.");
  }

  return {
    id: 2,
    name: name.trim(),
    email
  };
}
