"use client";

import type { IResponse } from "@/app/api/db";
import { axiosInstance, getErrorMessage } from "@/utils/shared/axiosInstance";
import type { IHospitalResponse } from "@/utils/types";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const [hospitals, setHospitals] = useState<IHospitalResponse[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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

  useEffect(() => {
    fetchHospitals();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="">
      <h1>ADMIN DASHBOARD</h1>
      <div className="">
        <h2>All Hospitals</h2>
        <div className="">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Location</th>
              </tr>
            </thead>
            {hospitals && hospitals.length > 0 ? (
              <tbody>
                {hospitals.map((hospital, idx) => (
                  <tr key={hospital.id}>
                    <td>{idx + 1}</td>
                    <td>{hospital.user.names}</td>
                    <td>{hospital.user.email}</td>
                    <td>{hospital.user.location}</td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td colSpan={4}>No hospitals found</td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
        <Link href={"/"} className="mx-auto text-blue-500 underline">
          BACK TO HOME
        </Link>
      </div>
    </div>
  );
}
