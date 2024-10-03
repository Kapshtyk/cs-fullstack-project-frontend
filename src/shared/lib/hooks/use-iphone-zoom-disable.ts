"use client";

import { useEffect } from "react";

export const useIPhoneZoomDisable = () => {
  useEffect(() => {
    if (navigator.userAgent.indexOf("iPhone") !== -1) {
      document
        .querySelector("meta[name=viewport]")
        ?.setAttribute(
          "content",
          "width=device-width, initial-scale=1.0, maximum-scale=1.0",
        );
    }
  }, []);
};
