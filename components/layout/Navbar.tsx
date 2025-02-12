import Link from "next/link";

export default function Navbar() {
  return (
    <div className="sticky top-0 z-30">
      <div className="flex gap-20">
        <Link href={"/admin"} className="mx-auto text-blue-500 underline">
          ADMIN
        </Link>
        <Link href={"/hospital"} className="mx-auto text-blue-500 underline">
          HOSPITAL
        </Link>
      </div>
    </div>
  );
}
