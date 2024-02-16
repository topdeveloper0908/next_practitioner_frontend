"use client";
import Dashboard from "@/components/Dashboard";
import React from "react";
import Cookies from "js-cookie";
import { useSearchParams } from "next/navigation";

export default function User() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  if (token) {
    Cookies.set("token", token);
  }
  return <Dashboard isUser />;
}
