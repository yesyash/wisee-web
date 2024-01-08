import Link from "next/link";

import { Button } from "@/components";

const Homepage = () => {
  return (
    <div className="w-screen h-screen grid place-items-center">
      <h1 className="text-5xl font-semibold">Hello from RDS 👋</h1>

      <div className="gap-4 flex items-center">
        <Button asChild>
          <Link href="/login">
            Login
          </Link>

        </Button>

        <Button asChild>
          <Link href="/create">Create</Link>
        </Button>
      </div>
    </div>
  );
};

export default Homepage;
