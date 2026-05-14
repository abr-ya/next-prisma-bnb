import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ImgLinks from "./ImgLinks";

describe("ImgLinks", () => {
  it("renders home link with correct href", () => {
    render(<ImgLinks />);
    const homeLinks = screen.getAllByRole("link", { name: /logo/i });
    expect(homeLinks[0]).toHaveAttribute("href", "/");
  });

  it("renders trips link with correct href", () => {
    render(<ImgLinks />);
    const tripsLink = screen.getByRole("link", { name: /trips/i });
    expect(tripsLink).toHaveAttribute("href", "/trips");
  });

  it("renders resumes link with correct href", () => {
    render(<ImgLinks />);
    const resumesLink = screen.getByRole("link", { name: /resumes/i });
    expect(resumesLink).toHaveAttribute("href", "/resumes");
  });

  it("renders desktop logo with correct src", () => {
    render(<ImgLinks />);
    const desktopLogo = screen.getByAltText("Desktop Logo");
    expect(desktopLogo).toHaveAttribute("src", expect.stringContaining("airbnb-desktop.png"));
  });

  it("renders mobile logo with correct src", () => {
    render(<ImgLinks />);
    const mobileLogo = screen.getByAltText("Mobile Logo");
    expect(mobileLogo).toHaveAttribute("src", expect.stringContaining("airbnb-mobile.webp"));
  });

  it("renders trips image with correct src", () => {
    render(<ImgLinks />);
    const tripsImage = screen.getByAltText("Trips");
    expect(tripsImage).toHaveAttribute("src", expect.stringContaining("trips-desktop.jpg"));
  });

  it("renders resumes image with correct src", () => {
    render(<ImgLinks />);
    const resumesImage = screen.getByAltText("Resumes");
    expect(resumesImage).toHaveAttribute("src", expect.stringContaining("resume-desktop.png"));
  });

  it("renders all three navigation links", () => {
    render(<ImgLinks />);
    const links = screen.getAllByRole("link");
    // Home, Trips, Resumes = 3 links total
    expect(links).toHaveLength(3);
  });
});
