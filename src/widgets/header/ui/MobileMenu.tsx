"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import clsx from "clsx";

import { useCurrentUserQuery } from "@/features/user/get-me";
import { LogoutButton } from "@/features/user/logout-user";

import Hamburger from "@/shared/icons/hamburger.svg";
import { Button, Portal } from "@/shared/ui";

import "./MobileMenu.scss";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const { data: user } = useCurrentUserQuery();

  return (
    <div className="mobile-menu">
      <button
        data-testid="mobile-menu-button"
        className={clsx("mobile-menu__button", {
          "mobile-menu__button-open": isOpen,
        })}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Hamburger className="mobile-menu__icon" />
        <span className="visually-hidden">Open menu</span>
      </button>
      <Portal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div
          data-testid="mobile-menu-content"
          className={clsx("mobile-menu__content", {
            "mobile-menu__content-open": isOpen,
          })}
        >
          <ul className="mobile-menu__list">
            <li>
              <Link
                href="/"
                className={clsx("mobile-menu__link", {
                  "mobile-menu__link-active": pathname === "/",
                })}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/products"
                className={clsx("mobile-menu__link", {
                  "mobile-menu__link-active": pathname === "/products",
                })}
              >
                Products
              </Link>
            </li>
            {user && (
              <>
                <li>
                  <Link
                    href="/cart"
                    className={clsx("mobile-menu__link", {
                      "mobile-menu__link-active": pathname === "/cart",
                    })}
                    onClick={() => setIsOpen(false)}
                  >
                    Cart
                  </Link>
                </li>
                <li>
                  <Link
                    href="/profile"
                    className={clsx("mobile-menu__link", {
                      "mobile-menu__link-active": pathname === "/profile",
                    })}
                    onClick={() => setIsOpen(false)}
                  >
                    Profile
                  </Link>
                </li>
              </>
            )}
            {user?.role === "Admin" && (
              <li>
                <Link
                  href="/dashboard"
                  className={clsx("mobile-menu__link", {
                    "mobile-menu__link-active": pathname === "/dashboard",
                  })}
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
              </li>
            )}
          </ul>
          <div className="mobile-menu__divider">
            <hr />
          </div>
          <div className="mobile-menu__buttons">
            {!user && (
              <Button as="a" href="/sign-in">
                Sign In
              </Button>
            )}
            {user && <LogoutButton />}
            <Button
              onClick={() => setIsOpen(false)}
              className="mobile-menu__close-button"
            >
              Close
            </Button>
          </div>
        </div>
      </Portal>
    </div>
  );
};

export default MobileMenu;
