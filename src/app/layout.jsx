export const metadata = {
  title: "Personal Site",
  description: "Anindya's personal site.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
