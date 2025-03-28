"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { cn } from "@/lib/utils";
import { categories } from "../_tempData/categories";

const CategoryFilter = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("category");
  const pathname = usePathname();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  return (
    <div className="flex gap-x-10 mt-5 w-full overflow-x-scroll no-scrollbar">
      {categories.map((cat) => (
        <Link
          key={cat.id}
          href={pathname + "?" + createQueryString("category", cat.name)}
          className={cn(
            search === cat.name ? "border-b-2 border-black pb-2 flex-shrink-0" : "opacity-70 flex-shrink-0",
            "flex flex-col gap-y-3 items-center",
          )}
        >
          <div className="relative w-6 h-6">
            <Image src={cat.imageUrl} alt="Category image" className="w-6 h-6" width={24} height={24} />
          </div>
          <p className="text-xs font-medium">{cat.title}</p>
        </Link>
      ))}
    </div>
  );
};

export default CategoryFilter;
