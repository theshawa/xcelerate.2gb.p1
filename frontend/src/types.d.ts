export type AuthData = {
  username: string;
  token: string;
};

export type ErrorData = {
  message: string;
  status: number;
  data?: any;
};
