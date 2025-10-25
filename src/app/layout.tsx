import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "작업 관리 - Timeline",
  description: "매일, 매주, 매월, 일회성 작업을 효율적으로 관리하세요",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
