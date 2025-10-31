import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "AI Agent Forge",
  description: "Co-create, train, and deploy personalized AI agents for Farcaster",
  openGraph: {
    title: "AI Agent Forge",
    description: "Co-create, train, and deploy personalized AI agents for Farcaster",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
