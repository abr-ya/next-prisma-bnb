import { Separator } from "@/components/ui/separator";
import { Heading, PageSection } from "../_components";
import { distributeProducts, getArrSum, packsToUsers } from "./utils";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FoodPage = () => {
  // todo: => file
  const DESC = (a: number, b: number) => b - a;

  const itemsByDays: number[][] = [
    [360, 430, 400, 250, 100, 540, 575, 100, 420, 180, 290],
    [500, 260, 245, 290, 100, 400, 400, 80, 250, 100, 430, 610, 100, 40, 180, 485],
    [410, 200, 470, 120, 100, 400, 80, 630, 375, 290, 400, 100, 570, 40, 180, 240],
    [430, 100, 410, 245, 250, 400, 130, 470, 740, 330, 400, 390, 100, 40, 180, 290],
  ];

  const numUsers = 5;

  const packsByDays: Array<number[][]> = itemsByDays.map((day) => distributeProducts(day, numUsers));
  console.log(packsByDays);

  const packsSumByDays: Array<number[]> = packsByDays.map((dayPacks) => dayPacks.map((el) => getArrSum(el)).sort(DESC));

  const usersBags = packsToUsers(packsSumByDays);
  console.log(usersBags);

  return (
    <PageSection title="Food planning">
      <Heading title="Set init data:" size="xl" />
      <ul>
        {itemsByDays.map((day, i) => (
          <li key={`day-${i}`}>
            day {i + 1} == {getArrSum(day)}: {day.join(" + ")}
          </li>
        ))}
        <li>users: {numUsers}</li>
      </ul>
      <Separator className="my-5" />
      <Heading title="Create daily packs:" size="xl" />
      <Accordion type="single" collapsible>
        {itemsByDays.map((day, i) => (
          <AccordionItem value={`item-${i}`} key={`day-${i}`}>
            <AccordionTrigger>
              day {i + 1} == {getArrSum(day)}: {packsSumByDays[i].join(" + ")} == click for details
            </AccordionTrigger>
            <AccordionContent>
              {packsByDays[i].map((pack, i) => (
                <p key={`pack-${i}`}>
                  {getArrSum(pack)}: {pack.join(" + ")}
                </p>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <ul></ul>
      <Separator className="my-5" />
      <Heading title="Distribute daily packs to users:" size="xl" />
      <ul>
        {usersBags.map((user, i) => (
          <li key={`user-${i}`}>
            {user.join(" + ")} == {getArrSum(user)}
          </li>
        ))}
      </ul>
    </PageSection>
  );
};

export default FoodPage;
