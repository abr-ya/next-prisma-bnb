import UserMenu from "./UserMenu";
import SearchDialog from "./Dialogs/SearchDialog";
import ImgLinks from "./ImgLinks";

const BnbNavbar = () => (
  <nav className="w-full border-b">
    <div className="flex items-center justify-between container mx-auto px-5 lg:px-10 py-5">
      <ImgLinks />
      <SearchDialog />
      <UserMenu />
    </div>
  </nav>
);

export default BnbNavbar;
