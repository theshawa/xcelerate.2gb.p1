import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useAtomValue } from "jotai";
import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { authAtom } from "../../atoms";
import { axiosClient } from "../../backend/axios";
import { Alert } from "../../components/alert";
import { CapslockWarning } from "../../components/capslock-warning";
import { FormButton } from "../../components/form-button";
import { Logo } from "../../components/logo";
import { TextField } from "../../components/text-field";
import { ErrorData } from "../../types";
import { PasswordStrength } from "./password-strength";

type RegisterFormInputs = {
  username: string;
  password: string;
  cpassword: string;
};

const registerAction = async (data: { username: string; password: string }) => {
  return axiosClient.post("/register", data);
};

export const RegisterPage: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormInputs>();

  const [passwordFieldFocused, setPasswordFieldFocused] = useState(false);

  const password = watch("password");

  const navigate = useNavigate();

  const auth = useAtomValue(authAtom);

  const { mutate, isPending, error, isSuccess } = useMutation({
    mutationFn: registerAction,
    onSuccess: () => {
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    },
  });

  const onSubmit: SubmitHandler<RegisterFormInputs> = (data) => {
    mutate(data);
  };

  if (auth) {
    return (
      <div className="form-container text-center">
        <p>You have logged in already.</p>
        <Link to="/" className="link mt-3">
          Go to home
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="form-container">
        <Logo className="mb-2 w-36 text-violet-500" />
        <h1 className="h4">Sign up</h1>
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
            className="mb-2.5"
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
              onFocus: () => setPasswordFieldFocused(true),
              onBlur: () => setPasswordFieldFocused(false),
            }}
            error={errors.password && errors.password.message}
          />
          {passwordFieldFocused && <PasswordStrength password={password} />}
          <TextField
            label="Confirm Password"
            inputProps={{
              type: "password",
              id: "cpassword",
              autoComplete: "password",
              placeholder: "Re-enter your password",
              ...register("cpassword", {
                required: {
                  message: "Confirmation is required",
                  value: true,
                },
                validate: (value) =>
                  value === password || "Passwords do not match",
              }),
            }}
            error={errors.cpassword && errors.cpassword.message}
          />
          <CapslockWarning />
          {error && (
            <Alert className="mt-5" type="error">
              {(error as AxiosError<ErrorData>).response?.data.message}
            </Alert>
          )}
          {isSuccess && (
            <Alert className="mt-5" type="success">
              Successfully registered! Redirecting...
            </Alert>
          )}
          <FormButton loading={isPending}>Register</FormButton>
        </form>
        <p className="text-zinc-400 mt-3">
          Already a member?{" "}
          <Link to="/login" className="link">
            Login
          </Link>
        </p>
      </div>
    </>
  );
};
