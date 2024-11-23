import { PropsWithChildren } from "react";

interface IPageSection {
  title: string;
}

const PageSection = ({ children, title }: PropsWithChildren<IPageSection>) => (
  <section className="container mx-auto px-5 lg:px-10 mt-10">
    <h2 className="text-3xl font-semibold tracking-tight">{title}</h2>
    {children}
  </section>
);

export default PageSection;
