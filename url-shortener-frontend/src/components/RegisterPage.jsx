import { useState } from "react";
import { useForm } from "react-hook-form";
import TextField from "./TextField";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import toast from "react-hot-toast";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onTouched",
  });

  const registerHandler = async (data) => {
    setLoader(true);
    try {
      await api.post("/api/auth/public/register", data);
      reset();
      navigate("/login");
      toast.success("Registration Successful!");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Registration Failed! Please try again later.");
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex justify-center items-center">
      <form
        onSubmit={handleSubmit(registerHandler)}
        className="sm:w-112.5 w-90 py-8 sm:px-8 px-4"
      >
        <h1 className="font-serif font-bold lg:text-3xl text-2xl">
          Register Here
        </h1>

        <hr className="mt-2 mb-5 text-black" />

        <div className="flex flex-col gap-3">

          <TextField
            label="Email :"
            required
            id="email"
            type="email"
            message="*Email is required"
            placeholder="Type your email"
            register={register}
            errors={errors}
          />

          <TextField
            label="Password :"
            required
            id="password"
            type="password"
            message="*Password is required"
            placeholder="Type your password"
            register={register}
            min={6}
            errors={errors}
          />
        </div>

        <button
          disabled={loader}
          type="submit"
          className="font-semibold w-full py-2 cursor-pointer rounded-md bg-amber-300 hover:bg-amber-400 shadow-md shadow-slate-500 text-slate-900 my-3 transition-colors"
        >
          {loader ? "Loading..." : "Register"}
        </button>

        <p className="text-center text-sm mt-2">
          Already have an account ? &nbsp;
          <Link className="font-semibold hover:underline" to="/login">
            <span className="">Login</span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
