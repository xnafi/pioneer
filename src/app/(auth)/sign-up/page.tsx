"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema, signUpSchema } from "../../../schemas/signUpSchema";
import signUpImage from "../../../assets/signUp.svg";
import Toast from "@/components/Toast";

export default function SignUp() {
  const router = useRouter();
  const [toastMsg, setToastMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: SignUpSchema) => {
    if (data.password !== data.confirmPassword) {
      <Toast message="Password and Confirm Password do not match" />;

      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/signup/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: data.first_name,
            lastName: data.last_name,
            email: data.email,
            password: data.password,
          }),
        }
      );

      const result = await res.json();

      if (!res.ok) {
        setToastMsg(result.detail || "Login failed!");
        return;
      }

      // Save token
      localStorage.setItem("auth_token", result.access);
      setToastMsg("Registration Successful! Login to continue.");

      setTimeout(() => {
        router.push("/sign-in");
      }, 3000);
    } catch (error) {
      console.error(error);
      setToastMsg("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-white flex-col lg:flex-row mx-auto">
      {/* show toast message */}
      {toastMsg && <Toast message={toastMsg} />}

      {/* Left Side Illustration */}
      <div className="w-full md:w-[600px] bg-secondary items-center justify-center flex container">
        <Image
          src={signUpImage}
          alt="Sign Up Illustration"
          width={600}
          height={600}
        />
      </div>

      {/* Right Side Form */}
      <div className="w-full max-w-md mx-auto flex flex-col justify-center p-4">
        <h2 className="text-3xl font-bold text-black mb-2 text-center">
          Create your account
        </h2>
        <p className="text-gray mb-8 text-center">
          Start managing your tasks efficiently
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* First Name & Last Name */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                {...register("first_name")}
                placeholder="John"
                className={`mt-1 block w-full px-3 py-2 border placeholder-[#8CA3CD] ${
                  errors.first_name ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              />
              {errors.first_name && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.first_name.message}
                </p>
              )}
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                {...register("last_name")}
                placeholder="Doe"
                className={`mt-1 block w-full px-3 py-2 border placeholder-[#8CA3CD] ${
                  errors.last_name ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              />
              {errors.last_name && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.last_name.message}
                </p>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              {...register("email")}
              placeholder="you@example.com"
              className={`mt-1 block w-full px-3 py-2 border placeholder-[#8CA3CD] ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className={`mt-1 block w-full px-3 py-2 border placeholder-[#8CA3CD] ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <div className="relative">
              <input
                {...register("confirmPassword")}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                className={`mt-1 block w-full px-3 py-2 border placeholder-[#8CA3CD] ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || isSubmitting}
            className={`w-full py-2 px-4 text-white bg-primary hover:bg-primary-dark rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-60`}
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        {/* Login Redirect */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
