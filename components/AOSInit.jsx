"use client";
import { useEffect } from "react";
import "aos/dist/aos.css";

export default function AOSInit() {
  useEffect(() => {
    import("aos").then(AOS => {
      AOS.init({ once: false, duration: 1000 });
    });
  }, []);
  return null;
} 