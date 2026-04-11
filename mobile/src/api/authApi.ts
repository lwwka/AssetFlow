import { Platform } from "react-native";
import type {
  AuthSession,
  AuthSource,
  AuthUser,
  LoginPayload,
  RegisterPayload
} from "../types/auth";

type AuthApiResponse = {
  userId: number;
  email: string;
  fullName: string;
  token: string;
};

const API_BASE_URL =
  Platform.OS === "android" ? "http://10.0.2.2:8080" : "http://localhost:8080";
const ENABLE_OFFLINE_FALLBACK = true;

function isNetworkError(error: unknown) {
  return error instanceof TypeError;
}

async function parseError(response: Response) {
  try {
    const data = await response.json();

    if (typeof data?.message === "string" && data.message.trim()) {
      return data.message;
    }

    if (typeof data?.error === "string" && data.error.trim()) {
      return data.error;
    }
  } catch {
    return `Request failed with status ${response.status}.`;
  }

  return `Request failed with status ${response.status}.`;
}

function toAuthUser(response: AuthApiResponse): AuthUser {
  return {
    id: response.userId,
    name: response.fullName,
    email: response.email
  };
}

function toAuthSession(response: AuthApiResponse, source: AuthSource): AuthSession {
  return {
    user: toAuthUser(response),
    token: response.token,
    source
  };
}

export async function fetchCurrentUser(token: string): Promise<AuthUser> {
  const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  const data = (await response.json()) as Omit<AuthApiResponse, "token">;
  return toAuthUser({
    ...data,
    token
  });
}

export async function loginWithEmail({
  email,
  password
}: LoginPayload): Promise<AuthSession> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    if (!response.ok) {
      throw new Error(await parseError(response));
    }

    const data = (await response.json()) as AuthApiResponse;
    return toAuthSession(data, "live");
  } catch (error) {
    if (ENABLE_OFFLINE_FALLBACK && isNetworkError(error)) {
      if (!email.toLowerCase().includes("@")) {
        throw new Error("Please enter a valid email address.");
      }

      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters.");
      }

      return {
        user: {
          id: 1,
          name: "Demo User",
          email
        },
        token: null,
        source: "offline"
      };
    }

    throw error;
  }
}

export async function registerWithEmail({
  name,
  email,
  password
}: RegisterPayload): Promise<AuthSession> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        fullName: name,
        email,
        password
      })
    });

    if (!response.ok) {
      throw new Error(await parseError(response));
    }

    const data = (await response.json()) as AuthApiResponse;
    return toAuthSession(data, "live");
  } catch (error) {
    if (ENABLE_OFFLINE_FALLBACK && isNetworkError(error)) {
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
        user: {
          id: 2,
          name: name.trim(),
          email
        },
        token: null,
        source: "offline"
      };
    }

    throw error;
  }
}
