"use server";

import Link from "next/link";
import { MenuIcon } from "lucide-react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { LoginLink, LogoutLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createHomeAction } from "../_actions/createHome";
import Avatar from "./Avatar";

const UserMenu = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const userId = user?.id;

  const startHomeCreating = createHomeAction.bind(null, { userId: userId as string });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="rounded-full border px-2 py-2 lg:px-4 lg:py-2 flex items-center gap-x-3">
          <MenuIcon className="w-6 h-6 lg:w-5 lg:h-5" />
          <Avatar img={user?.picture} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        {user ? (
          <>
            <DropdownMenuItem>
              {userId ? (
                <form className="w-full" action={startHomeCreating}>
                  <button type="submit" className="w-full text-start">
                    Airbnb your Home
                  </button>
                </form>
              ) : (
                <>Disabled == not UserID</>
              )}
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/user" className="w-full">
                About Me
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/user/homes" className="w-full">
                My Homes
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/user/favorites" className="w-full">
                My Favorites
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/user/bookings" className="w-full">
                My Bookings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/user/images" className="w-full">
                My Images
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogoutLink className="w-full">Logout</LogoutLink>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem>
              <RegisterLink className="w-full">Register</RegisterLink>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LoginLink className="w-full">Login</LoginLink>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
