import Image from "next/image";
import Link from "next/link";

import UserMenu from "./UserMenu";
import SearchDialog from "./Dialogs/SearchDialog";

const Navbar = () => (
  <nav className="w-full border-b">
    <div className="flex items-center justify-between container mx-auto px-5 lg:px-10 py-5">
      <Link href="/">
        <Image
          src="/airbnb-desktop.png"
          alt="Desktop Logo"
          className="w-32 hidden md:block"
          width={1000}
          height={300}
          placeholder="blur"
          blurDataURL="/airbnb-desktop.png"
        />
        <Image src="/airbnb-mobile.webp" alt="Mobile Logo" className="block md:hidden w-12" width={1000} height={300} />
      </Link>
      <SearchDialog />
      <UserMenu />
    </div>
  </nav>
);

export default Navbar;
