export type AuthUser = {
  id: number;
  name: string;
  email: string;
};

export type AuthSource = "live" | "offline";

export type AuthSession = {
  user: AuthUser;
  token: string | null;
  source: AuthSource;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};
