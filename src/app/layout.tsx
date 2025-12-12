import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "./components/Nav";
import ServiceWorkerRegister from "./components/ServiceWorkerRegister";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "People's Green Party",
  description: "Membership & elections platform for People's Green Party",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#16a34a",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="min-h-screen flex flex-col">
          <header className="border-b bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="inline-block h-8 w-8 rounded-full bg-green-700" />
                <span className="font-semibold text-lg text-green-800">People's Green Party</span>
              </div>
              <Nav />
            </div>
          </header>
          <main className="flex-1">
            {children}
          </main>
          <footer className="border-t bg-white text-xs text-gray-500">
            <div className="max-w-7xl mx-auto px-6 py-4">
              © {new Date().getFullYear()} People's Green Party. All rights reserved.
            </div>
          </footer>
        </div>
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
