import "@/app/globals.css";
import { base, title } from './fonts'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${base.variable} ${title.variable}`}>
      <body>{children}</body>
    </html>
  );
}
