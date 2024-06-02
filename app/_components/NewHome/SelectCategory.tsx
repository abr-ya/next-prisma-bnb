"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardHeader } from "@/components/ui/card";
import { categories } from "@/app/_tempData/categories";

const SelectCategory = () => {
  const [selectedCategory, setSelectredCategory] = useState<string>("");

  return (
    <div className="grid grid-cols-4 gap-8 mt-10 w-3/5 mx-auto mb-36">
      <input type="hidden" name="categoryName" value={selectedCategory as string} />
      {categories.map((item) => (
        <div key={item.id} className="cursor-pointer">
          <Card
            className={selectedCategory === item.name ? "border-primary" : ""}
            onClick={() => setSelectredCategory(item.name)}
          >
            <CardHeader>
              <Image src={item.imageUrl} alt={item.name} height={32} width={32} className="w-8 h-8" />
              <h3 className="font-medium">{item.title}</h3>
            </CardHeader>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default SelectCategory;
