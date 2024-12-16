import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Jira | 404 Not Found",
};

export default function NotFound() {
  return (
    <div>
      <h2>404 Not Found</h2>
      <p>Could not find requested resource !</p>
      <Image
        className="m-0 rounded-xl"
        src="/not-found-1024x1024.png"
        width={300}
        height={300}
        sizes="300px"
        alt="Page Not Found"
        priority={true}
        title="Page Not Found"
      />
      <Link href="/">Return Home</Link>
    </div>
  );
}
