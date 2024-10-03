"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import "./Portal.scss";

interface PortalProps {
  children: React.ReactNode;
  onClose?: () => void;
  isOpen: boolean;
}

export const Portal: React.FC<PortalProps> = ({
  children,
  onClose,
  isOpen,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  function openModalAndLockScroll() {
    dialogRef.current?.showModal();
    document.body.style.overflow = "hidden";
  }

  function returnScroll() {
    document.body.style.overflow = "auto";
  }

  const closeModal = useCallback(() => {
    dialogRef.current?.close();
    onClose?.();
  }, [onClose]);

  function closeOnBackDropClick(e: React.MouseEvent<HTMLDialogElement>) {
    if (e.target === dialogRef.current) {
      closeModal();
    }
  }

  useEffect(() => {
    if (isOpen) {
      openModalAndLockScroll();
    } else {
      returnScroll();
      closeModal();
    }

    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      returnScroll();
    };
  }, [closeModal, isOpen]);

  return createPortal(
    <dialog className="dialog" ref={dialogRef} onClick={closeOnBackDropClick}>
      {children}
    </dialog>,
    document.body,
  );
};
