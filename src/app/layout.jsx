"use client"
import { Inter } from "next/font/google";
import "./globals.css";

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    primary: {
      light: '#8bc34a',
      main: '#67bc46',
      dark: '#558b2f',
      contrastText: '#fff',
    }
  },
});

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <html lang="en">
          <body className={inter.className}>{children}</body>
        </html>
      </CssBaseline>
    </ThemeProvider>
  );
}
