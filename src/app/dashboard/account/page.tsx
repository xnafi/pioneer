"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  accountInformationSchema,
  AccountInformationSchema,
} from "@/schemas/accountInformationSchema";
import upload from "../../../assets/upload.svg";
import uploadCamera from "../../../assets/camera-icon.svg";
import Image from "next/image";
import { useState } from "react";
import Toast from "@/components/Toast";
import { Camera } from "lucide-react";

export default function AccountSetting() {
  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000); // Hide toast after 3 seconds
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AccountInformationSchema>({
    resolver: zodResolver(accountInformationSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      bio: "",
      contact_number: "",
      birthday: "",
    },
  });

  // image upload handler
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProfilePreview(url);
      setProfileFile(file);
    }
  };

  // form submit handler
  const onSubmit = async (data: AccountInformationSchema) => {
    try {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        showToast("User not authenticated!");
        return;
      }

      // Prepare FormData
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value) formData.append(key, value as string);
      });

      if (profileFile) {
        formData.append("profile_image", profileFile);
      }

      const res = await fetch(
        "https://todo-app.pioneeralpha.com/api/users/me/",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const result = await res.json();

      if (!res.ok) {
        showToast(result.message || "Failed to update");
        return;
      }

      // reset form with updated data
      reset(result.data);
      setProfilePreview(null);
      setProfileFile(null);

      showToast("Profile updated successfully!");
    } catch (error) {
      console.log(error);
      showToast("Something went wrong!");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-4xl font-bold mb-2">Account Information</h1>
      <span className="border-t-2 border-[#5272FF] block mb-6 w-1/5"></span>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Profile Upload */}
        <div className="flex items-center space-x-4">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
            {profilePreview ? (
              <Image
                src={profilePreview}
                alt="profile"
                width={96}
                height={96}
              />
            ) : (
                <div className="bg-blue-400 p-1 rounded-full top-8 relative left-8">
                 <Camera className="text-white" /> 
                </div>
            )}
          </div>

          <label className="flex bg-primary px-4 py-2 rounded-md hover:bg-blue-800 text-white cursor-pointer space-x-2 w-[200px]">
            <Image src={upload} width={16} height={16} alt="upload-icon" />
            <span>Upload New Photo</span>

            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </label>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              {...register("first_name")}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
            {errors.first_name && (
              <p className="text-red-500 text-xs mt-1">
                {errors.first_name.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              {...register("last_name")}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
            {errors.last_name && (
              <p className="text-red-500 text-xs mt-1">
                {errors.last_name.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            {...register("email")}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              {...register("bio")}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
            {errors.bio && (
              <p className="text-red-500 text-xs mt-1">{errors.bio.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contact Number
            </label>
            <input
              type="text"
              {...register("contact_number")}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
            {errors.contact_number && (
              <p className="text-red-500 text-xs mt-1">
                {errors.contact_number.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Birthday
          </label>
          <input
            type="date"
            {...register("birthday")}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
          {errors.birthday && (
            <p className="text-red-500 text-xs mt-1">
              {errors.birthday.message}
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-center space-x-4">
          <button
            type="submit"
            className="px-6 py-2 bg-primary text-white rounded-md hover:bg-blue-700"
          >
            Save Changes
          </button>

          <button
            type="button"
            onClick={() => reset()} // reset to empty fields
            className="px-6 py-2 bg-[#8ba2cc] rounded-md hover:bg-gray-400 text-white"
          >
            Cancel
          </button>
        </div>
      </form>
      {toastMessage && <Toast message={toastMessage} />}
    </div>
  );
}
