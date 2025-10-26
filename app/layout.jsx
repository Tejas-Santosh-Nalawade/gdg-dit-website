import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import ScrollToTop from "@/components/common/ScrollToTop";
import ScrollbarColorChanger from "./components/ScrollbarColorChanger";
import SelectionColorChanger from "./components/SelectionColorChanger";
import { siteConfig, generatePageMetadata, generateOrganizationSchema } from "@/lib/seo";
import Script from "next/script";

// Using Product Sans (Google's brand font, essentially Google Sans)
const googleSans = localFont({
  src: [
    { path: "../public/fonts/ProductSans-Regular.ttf", weight: "400", style: "normal" },
    { path: "../public/fonts/ProductSans-Medium.ttf", weight: "500", style: "normal" },
    { path: "../public/fonts/ProductSans-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-google-sans",
  display: "swap",
  fallback: ["system-ui", "-apple-system", "sans-serif"],
});

// For monospace, we'll use system fonts as fallback until Google Sans Mono is added
const googleSansMono = localFont({
  src: [
    { path: "../public/fonts/ProductSans-Regular.ttf", weight: "400", style: "normal" },
  ],
  variable: "--font-google-sans-mono",
  display: "swap",
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
});

export const metadata = {
  ...generatePageMetadata({
    title: siteConfig.title,
    description: siteConfig.description,
    path: ""
  }),
  icons: {
    icon: "/GDSC-logo.svg",
    apple: "/GDSC-logo.svg",
    shortcut: "/GDSC-logo.svg"
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "GDG-DIT"
  },
  formatDetection: {
    telephone: false
  }
};

export default function RootLayout({ children }) {
  const organizationSchema = generateOrganizationSchema();

  return (
    <html lang="en" className={`${googleSans.variable} ${googleSansMono.variable}`}>
      <head>
        {/* Structured Data */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema)
          }}
        />
      </head>
      <body className="antialiased">
        <ScrollbarColorChanger />
        <SelectionColorChanger />
        <Navbar />
        {children}
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
