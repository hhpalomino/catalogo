import Link from "next/link";
import Image from "next/image";
import AuthButton from "@/components/AuthButton";
import { isAuthenticated } from "@/lib/auth";

export default async function Header() {
  const isAdmin = await isAuthenticated();

  return (
    <header className="bg-white dark:bg-[#2E2E2E] border-b-2 border-[#DADADA] dark:border-[#415543] sticky top-0 z-40 shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 w-fit hover:opacity-80 transition-opacity">
            {/* Logo Icon - SVG de Garage Market */}
            <Image
              src="/logos/gm-icon-light.svg"
              alt="Garage Market"
              width={40}
              height={40}
              priority
              className="!block dark:!hidden"
            />
            <Image
              src="/logos/gm-icon-dark.svg"
              alt="Garage Market"
              width={40}
              height={40}
              priority
              className="!hidden dark:!block"
            />
            
            {/* Brand Name */}
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-[#4F6F52] dark:text-white leading-tight">
                Garage Market
              </h1>
            </div>
          </Link>

          {/* Auth Button */}
          <AuthButton initialIsAdmin={isAdmin} />
        </div>
      </div>
    </header>
  );
}
