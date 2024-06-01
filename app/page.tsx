import { Button } from "@/components/ui/button";
import { CategoryFilter } from "./_components";

const Home = () => (
  <div className="container mx-auto px-5 lg:px-10">
    <h1 className="text-2xl">Hello, Next 14 + Tailwind CSS!</h1>
    <CategoryFilter />
    <Button>Click Me</Button>
  </div>
);

export default Home;
