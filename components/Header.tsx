import Link from "next/link";
import Image from "next/image";
import AuthButton from "@/components/AuthButton";
import { isAuthenticated } from "@/lib/auth";

export default async function Header() {
  const isAdmin = await isAuthenticated();

  return (
    <header className="bg-white dark:bg-[#1A2233] border-b-2 border-[#E5E7EB] dark:border-[#25304A] sticky top-0 z-40 shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 w-fit hover:opacity-80 transition-opacity">
            {/* Logo PNG actualizado */}
            <Image
              src="/logos/logo-light.png"
              alt="Garage Market"
              width={64}
              height={64}
              priority
              className="!block dark:!hidden"
            />
            <Image
              src="/logos/logo-dark.png"
              alt="Garage Market"
              width={64}
              height={64}
              priority
              className="!hidden dark:!block"
            />
            {/* Brand Name */}
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-[#2563EB] dark:text-[#E88C76] leading-tight">
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
