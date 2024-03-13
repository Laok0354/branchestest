import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="w-screen h-screen">
      <head>
        <title>StartApp</title>
      </head>
      <body className="flex h-[full] w-screen bg-gradient-to-br from-primaryv to-80% to-black text-white flex-col overflow-x-hidden">
        <header>

        </header>
        {children}
      </body>
    </html>
  );
}
