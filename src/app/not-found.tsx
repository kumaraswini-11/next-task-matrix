import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = {
  title: "404 Not Found | TaskMatrix",
};

export default function NotFound() {
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center bg-cover bg-center bg-no-repeat text-center text-black"
      style={{ backgroundImage: "url('/not-found-1024x1024.png')" }}
    >
      <Button variant="destructive" asChild>
        <Link href="/" className="mt-[30rem]">
          Return Home
        </Link>
      </Button>
    </div>
  );
}
