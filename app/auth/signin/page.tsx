"use client";
import { useEffect, useState } from "react";
import { getSession, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { status } = useSession();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  async function onSubmit() {
    try {
      setLoading(true);
      const response = await signIn("credentials", {
        ...credentials,
        redirect: false,
      });
      if (response?.ok) {
        alert("Login successfully.");
      } else {
        alert("Invalid email or password");
      }
    } catch (err: any) {
      alert(err.message || "Error during login, try again later.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const fetchSession = () => {
      router.push("/");
    };
    if (status === "authenticated") fetchSession();
  }, [status, router]);

  return (
    <div className="flex flex-col justify-center gap-4 items-center w-[80%] lg:w-[50%] p-6 bg-white shadow-lg rounded-lg">
      <form onSubmit={(e)=>{e.preventDefault(), onSubmit();}} className="flex flex-col gap-4 w-full">
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
          LOGIN
        </button>
        <Link
          href={"/auth/register"}
          className="mx-auto text-blue-500 underline"
        >
          Register
        </Link>
      </form>
    </div>
  );
}
