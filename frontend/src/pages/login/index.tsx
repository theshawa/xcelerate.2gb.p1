import { useMutation } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { authAtom } from "../../atoms";
import { axiosClient, getErrorMessage } from "../../backend/axios";
import { Alert } from "../../components/alert";
import { CapslockWarning } from "../../components/capslock-warning";
import { FormButton } from "../../components/form-button";
import { Logo } from "../../components/logo";
import { TextField } from "../../components/text-field";

type LoginFormInputs = {
  username: string;
  password: string;
};

const loginAction = async (data: { username: string; password: string }) => {
  return axiosClient.post("/login", data);
};

export const LoginPage: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<LoginFormInputs>();

  const navigate = useNavigate();
  const [auth, updateAtom] = useAtom(authAtom);

  const username = watch("username");

  const { mutate, isPending, error } = useMutation({
    mutationFn: loginAction,
    onSuccess: ({ data }) => {
      updateAtom({
        username: username,
        token: data.token,
      });
      navigate("/");
    },
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => mutate(data);

  if (auth) {
    return (
      <div className="form-container text-center">
        <p>You have already logged in.</p>
        <Link to="/" className="link mt-3">
          Go to home
        </Link>
      </div>
    );
  }

  return (
    <div className="form-container">
      <Logo className="mb-2 w-36 text-violet-500" />
      <h1 className="h4">Sign in</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mt-4">
        <TextField
          label="Username"
          className="mb-2.5"
          inputProps={{
            type: "text",
            id: "username",
            autoComplete: "username",
            placeholder: "Enter your username",
            ...register("username", {
              minLength: {
                value: 8,
                message: "Username should be at least 8 characters long",
              },
              required: {
                message: "Username is required",
                value: true,
              },
            }),
          }}
          error={errors.username && errors.username.message}
        />
        <TextField
          label="Password"
          inputProps={{
            type: "password",
            id: "password",
            autoComplete: "password",
            placeholder: "Enter your password",
            ...register("password", {
              required: {
                message: "Password is required",
                value: true,
              },
              validate: (value) =>
                (value.length >= 8 &&
                  /[a-z]/.test(value) &&
                  /[A-Z]/.test(value) &&
                  /[0-9!@#$%^&*]/.test(value)) ||
                "Make sure your password meets the requirements",
            }),
          }}
          error={errors.password && errors.password.message}
        />
        <CapslockWarning />
        {error && (
          <Alert className="mt-5" type="error">
            {getErrorMessage(error)}
          </Alert>
        )}
        <FormButton loading={isPending}>Login</FormButton>
      </form>
      <p className="text-zinc-400 mt-3">
        Not a member?{" "}
        <Link to="/register" className="link">
          Register
        </Link>
      </p>
    </div>
  );
};
