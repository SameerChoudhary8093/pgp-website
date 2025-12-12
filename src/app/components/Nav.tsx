"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "./utils/cn";
import { AdminIcon, DashboardIcon, ElectionsIcon, HomeIcon, UsersIcon, VoteIcon } from "./icons";
import { supabase } from "../../lib/supabaseClient";
const DEV_MODE = process.env.NEXT_PUBLIC_AUTH_DEV_MODE === "true";

const items = [
  { href: "/", label: "Home", Icon: HomeIcon, match: (p: string) => p === "/" },
  { href: "/dashboard", label: "Dashboard", Icon: DashboardIcon, match: (p: string) => p.startsWith("/dashboard") },
  { href: "/elections", label: "Elections", Icon: ElectionsIcon, match: (p: string) => p.startsWith("/elections") && !p.startsWith("/admin") },
  { href: "/admin/elections", label: "Admin", Icon: AdminIcon, match: (p: string) => p.startsWith("/admin/elections") },
  { href: "/admin/committees", label: "Admin Committees", Icon: UsersIcon, match: (p: string) => p.startsWith("/admin/committees") },
  { href: "/vote", label: "Vote", Icon: VoteIcon, match: (p: string) => p.startsWith("/vote") },
  { href: "/cwc/my-team", label: "My Team", Icon: UsersIcon, match: (p: string) => p.startsWith("/cwc/my-team") },
  { href: "/admin/users", label: "Admin Users", Icon: UsersIcon, match: (p: string) => p.startsWith("/admin/users") },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    let mounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (mounted) setAuthed(!!data.session);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthed(!!session);
    });
    if (DEV_MODE && typeof window !== "undefined") {
      const id = window.localStorage.getItem("devUserId");
      if (id) setAuthed(true);
    }
    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const onSignOut = async () => {
    await supabase.auth.signOut();
    if (typeof window !== "undefined") window.localStorage.removeItem("devUserId");
    window.location.href = "/";
  };
  return (
    <nav className="text-sm">
      <div className="sm:hidden">
        <button
          aria-label="Open menu"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded border border-gray-300 text-gray-800 hover:bg-gray-50"
        >
          <ElectionsIcon size={16} />
          Menu
        </button>
      </div>
      <div className={cn("mt-2 sm:mt-0 sm:flex items-center gap-2", open ? "block" : "hidden sm:flex")}>
        {items.map(({ href, label, Icon, match }) => {
          const active = match(pathname || "/");
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-2 rounded transition-colors",
                active ? "bg-green-100 text-green-800" : "text-gray-700 hover:text-green-800 hover:bg-green-50"
              )}
            >
              <Icon size={16} className={cn(active ? "text-green-700" : "text-gray-600")} />
              <span>{label}</span>
            </Link>
          );
        })}
        <span className="inline-block w-px h-5 bg-gray-200 mx-2" />
        {authed ? (
          <button
            onClick={onSignOut}
            className="inline-flex items-center px-3 py-2 rounded border border-gray-300 text-gray-800 hover:bg-gray-50"
          >
            Sign out
          </button>
        ) : (
          <Link
            href="/join"
            onClick={() => setOpen(false)}
            className="inline-flex items-center px-3 py-2 rounded border border-gray-300 text-gray-800 hover:bg-gray-50"
          >
            Sign in
          </Link>
        )}
      </div>
    </nav>
  );
}
