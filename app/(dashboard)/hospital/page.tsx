"use client";

import type { IResponse } from "@/app/api/db";
import { axiosInstance, getErrorMessage } from "@/utils/shared/axiosInstance";
import type { IMortalityResponse } from "@/utils/types";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HospitalPage() {
  const [mortalities, setMortalities] = useState<IMortalityResponse[] | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchMortalities = async () => {
    try {
      setIsLoading(true);
      const response =
        await axiosInstance.get<IResponse<IMortalityResponse[]>>(
          "/api/mortality",
        );
      setMortalities(response.data.data);
    } catch (error) {
      alert(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMortalities();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="">
      <h1>HOSPIALS DASHBOARD</h1>
      <div className="">
        <h2>All Mortalities</h2>
        <div className="">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>FirstName</th>
                <th>LastName</th>
                <th>Location</th>
                <th>Date-of-Birth</th>
                <th>Registered-On</th>
                <th>Status</th>
                <th>Claimed-By</th>
              </tr>
            </thead>
            {mortalities && mortalities.length > 0 ? (
              <tbody>
                {mortalities.map((mortality, idx) => (
                  <tr key={mortality.id}>
                    <td>{idx + 1}</td>
                    <td>{mortality.firstName}</td>
                    <td>{mortality.lastName}</td>
                    <td>{mortality.location}</td>
                    <td>
                      {new Date(mortality.dob).toLocaleDateString("en-GB")}
                    </td>
                    <td>
                      {mortality.registeredOn &&
                        new Date(mortality.registeredOn).toLocaleDateString(
                          "en-GB",
                        )}
                    </td>
                    <td>{mortality.status}</td>
                    <td>{mortality.claim?.relative.names}</td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td colSpan={4}>No mortalities found</td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
      </div>
      <Link href={"/"} className="mx-auto text-blue-500 underline">
        BACK TO HOME
      </Link>
    </div>
  );
}
