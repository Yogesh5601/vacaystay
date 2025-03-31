// app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full text-center px-4">
      <div className="space-y-6">
        <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          404
        </h1>
        <h2 className="text-3xl font-semibold">Page Not Found</h2>
        <p className="text-lg text-gray-600 max-w-md">
          Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="pt-6">
          <Link
            href="/"
            className="px-6 py-3 rounded-lg bg-black text-white hover:bg-gray-800 transition-colors duration-200 font-medium"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}