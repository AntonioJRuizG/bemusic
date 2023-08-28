export type UserProps = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type UserResponseBody = {
  token: string;
  user: UserProps | null;
};
