import Link from "next/link";

import { Button, Input } from "@/components";

const Homepage = () => {
  return (
    <div className="w-screen h-screen grid place-items-center">
      <h1 className="text-5xl font-semibold">Hello from RDS 👋</h1>

      <div className="w-sm space-y-4">
        <Button asChild>
          <Link href="/login">
            Login
          </Link>
        </Button>

        <Input />
      </div>
    </div>
  );
};

export default Homepage;
