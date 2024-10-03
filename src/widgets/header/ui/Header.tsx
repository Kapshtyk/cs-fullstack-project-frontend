"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { CartButton, useCartQuery } from "@/features/cart-item/get-cart";
import { useCurrentUserQuery } from "@/features/user/get-me";

import { getAbsoluteUrl } from "@/shared/lib";

import "./Header.scss";

const MobileMenu = dynamic(() => import("./MobileMenu"), {
  ssr: false,
});

export const Header = () => {
  const { data: user } = useCurrentUserQuery();

  const { data: cartItems = [] } = useCartQuery({
    page: 1,
    perPage: 10,
    userId: user?.id,
  });

  return (
    <header className="header">
      <Link href="#main" className="visually-hidden">
        Skip to main content
      </Link>
      <Link href="/" className="header__logo">
        Crazy Shop
      </Link>
      <div className="header__user-actions">
        {user && user.avatar && (
          <Link href="/profile" className="header__user-actions-avatar">
            <Image
              src={getAbsoluteUrl(user.avatar)}
              alt={user.firstName || "user avatar"}
              sizes="10vw"
              width={100}
              height={100}
            />
            <p className="visually-hidden">User profile</p>
          </Link>
        )}
        {user && <CartButton cartItems={cartItems} />}
        {<MobileMenu />}
      </div>
    </header>
  );
};
