import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex justify-center items-center flex-col w-full h-screen">
      <h2>404 - Page Not Found</h2>
      <p>Page you were looking for was not found</p>
      <Link href="/" className="bg-black rounded-md p-2 px-5 text-white">
        Return Home
      </Link>
    </div>
  );
}
