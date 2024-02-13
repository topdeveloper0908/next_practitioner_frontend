"use client";
import { Inter } from "next/font/google";
import "./globals.css";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.css";
import Head from "next/head";

const theme = createTheme({
  palette: {
    primary: {
      light: "#8bc34a",
      main: "#67bc46",
      dark: "#558b2f",
      contrastText: "#fff",
    },
  },
  typography: {
    // In Chinese and Japanese the characters are usually larger,
    // so a smaller fontsize may be appropriate.
    fontFamily: "Open Sans",
  },
});

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <html lang="en">
          <head>
            <meta
              name="viewport"
              content="initial-scale=1, width=device-width"
            />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link
              rel="preconnect"
              href="https://fonts.gstatic.com"
              crossOrigin="true"
            />
            <link
              href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap"
              rel="stylesheet"
            />
            <link
              href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css"
              rel="stylesheet"
              integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl"
              crossOrigin="anonymous"
            />
            <link
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.1/css/bootstrap-select.css"
            />
          </head>
          <body className={inter.className}>
            <ToastContainer />
            {children}
            <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.1/js/bootstrap-select.min.js"></script>
          </body>
        </html>
      </CssBaseline>
    </ThemeProvider>
  );
}
