"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/utils/shared/axiosInstance";
import type { IRegister } from "@/utils/types/auth";
import { UserRoleEnum } from "@prisma/client";
import Link from "next/link";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [credentials, setCredentials] = useState<IRegister>({
    email: "",
    password: "",
    names: "",
    role: UserRoleEnum.RELATIVE,
    location: "",
  });

  async function onSubmit(e: any) {
    e.preventDefault();
    try {
      setLoading(true);
      await axiosInstance.post("/api/user", credentials);
      alert("Registered successfully.");
      router.push("/auth/signin");
    } catch (err: any) {
      alert(err.message || "Error during register, try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col justify-center gap-4 items-center w-[80%] lg:w-[50%] p-6 bg-white shadow-lg rounded-lg">
      <form onSubmit={onSubmit} className="flex flex-col gap-4 w-full">
        <input
          type="text"
          placeholder="Names"
          value={credentials.names}
          onChange={(e) => {
            setCredentials({ ...credentials, names: e.target.value });
          }}
          required
          className="p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
        <input
          type="text"
          placeholder="Location"
          value={credentials.location}
          onChange={(e) => {
            setCredentials({ ...credentials, location: e.target.value });
          }}
          required
          className="p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
        <input
          type="text"
          placeholder="Email"
          value={credentials.email}
          onChange={(e) => {
            setCredentials({ ...credentials, email: e.target.value });
          }}
          required
          className="p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={(e) => {
            setCredentials({ ...credentials, password: e.target.value });
          }}
          required
          className="p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="p-3 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          REGISTER
        </button>
        <Link href={"/auth/signin"} className="mx-auto text-blue-500 underline">
          Login
        </Link>
      </form>
    </div>
  );
}
