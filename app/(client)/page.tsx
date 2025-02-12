"use client";

import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import type { IHospitalResponse } from "@/utils/types";
import { axiosInstance, getErrorMessage } from "@/utils/shared/axiosInstance";
import type { IResponse } from "../api/db";

export default function Home() {
  const { data: session, status } = useSession();
  const [hospitals, setHospitals] = useState<IHospitalResponse[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (status === "authenticated") {
      fetchHospitals();
    }
  }, [status]);

  const fetchHospitals = async () => {
    try {
      setIsLoading(true);
      const response =
        await axiosInstance.get<IResponse<IHospitalResponse[]>>(
          "/api/hospital",
        );
      setHospitals(response.data.data);
    } catch (error) {
      alert(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  const renderUserInfo = () => {
    if (status === "loading") {
      return <div>Loading...</div>;
    }

    if (status === "unauthenticated") {
      return (
        <div className="mb-4">
          <p>You are not signed in</p>
          <button
            type="button"
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={(e) => { e.preventDefault(); signIn(); }}
          >
            Sign in
          </button>
        </div>
      );
    }

    return (
      <div className="mb-4">
        {session && (
          <>
            <p>Name: {session.user.names}</p>
            <p>Email: {session.user.email}</p>
            <p>Role: {session.user.role}</p>
            <p>ID: {session.user.id}</p>
          </>
        )}

        <button
          type="button"
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </div>
    );
  };

  const renderHospitals = () => {
    if (isLoading) return <div>Loading hospitals...</div>;
    if (!hospitals || hospitals.length === 0)
      return <div>No hospitals found.</div>;

    return hospitals.map((hospital) => (
      <div key={hospital.id} className="mb-4 p-4 border rounded">
        <h2 className="text-xl font-bold">{hospital.user.names}</h2>
        <p>{hospital.user.email}</p>
        <p>{hospital.user.location}</p>
      </div>
    ));
  };

  return (
    <div>
      <div className="">
        <Image src="/home/logo.png" width={100} height={200} alt="logo" />
      </div>

      {renderUserInfo()}

      {status === "authenticated" && (
        <>
          <h1 className="text-2xl font-semibold mb-4">All Hospitals</h1>
          {renderHospitals()}
        </>
      )}
    </div>
  );
}
