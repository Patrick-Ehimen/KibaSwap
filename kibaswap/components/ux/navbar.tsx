"use client";

import React from "react";
import Image from "next/image";

import { rubik } from "@/fonts/font";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  Link,
} from "@nextui-org/react";
import { Logo } from "@/public";
import { menuItems } from "@/constants";

import { ThemeToggle } from "../theme-toggle";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

import CloseIcon from "@/public/assets/js/closeIcon";

export default function Navbarr() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleCloseDrawer = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <Navbar>
        <NavbarContent justify="start">
          <NavbarBrand className="mr-4">
            <Image src={Logo} alt="logo-img" width={50} height={50} />
            <p
              className={`font-bold text-[24px] text-inherit ml-1 ${rubik.className}`}
            >
              KIBA
            </p>
          </NavbarBrand>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
            icon={<CloseIcon />}
            onPress={() => setIsMenuOpen(!isMenuOpen)}
          />

          <NavbarContent className="hidden sm:flex gap-4">
            {menuItems.map((item) => (
              <NavbarItem key={item.id}>
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Link color="foreground" href={item.link}>
                      {item.title}
                    </Link>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-fit mt-2 bg-[#3B3C4E]">
                    <div className="grid grid-cols-1 gap-1">
                      {item.hoverContents.map((content, index) => (
                        <div
                          key={index}
                          className="flex space-x-4 py-2 px-3 cursor-pointer rounded-md hover:bg-[#35354690] bg-[#353546]"
                        >
                          <Link href={content.link}>
                            <Image
                              src={
                                content.avatarSrc ||
                                "https://github.com/vercel.png"
                              }
                              alt={`${item.title} ${index + 1}`}
                              width={30}
                              height={30}
                            />

                            <div className="space-y-1">
                              <p className="text-sm mt-[5px] ml-1 pr-10">
                                {content.description}
                              </p>
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </NavbarItem>
            ))}
          </NavbarContent>
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem>
            <ThemeToggle />
          </NavbarItem>
          <NavbarItem>
            <ConnectButton
              accountStatus={{
                smallScreen: "avatar",
                largeScreen: "full",
              }}
            />
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      <Drawer open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Menu</DrawerTitle>
            </DrawerHeader>
            <div className="p-4">
              {menuItems.map((item) => (
                <div key={item.id} className="mb-4">
                  <Link
                    color="foreground"
                    href={item.link}
                    className="block py-2 font-semibold"
                    onClick={handleCloseDrawer}
                  >
                    {item.title}
                  </Link>
                  <div className="ml-4">
                    {item.hoverContents.map((content, index) => (
                      <Link
                        key={index}
                        color="foreground"
                        href={content.link}
                        className="block py-1 text-sm"
                        onClick={handleCloseDrawer}
                      >
                        <div className="flex items-center">
                          <Image
                            src={
                              content.avatarSrc ||
                              "https://github.com/vercel.png"
                            }
                            alt={`${item.title} ${index + 1}`}
                            width={20}
                            height={20}
                            className="mr-2"
                          />
                          {content.description}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline" onClick={handleCloseDrawer}>
                  Close
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
