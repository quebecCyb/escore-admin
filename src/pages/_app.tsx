import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { RequiredReportProvider } from '@/contexts/ReportContext';

export default function App({ Component, pageProps }: AppProps) {
  return <RequiredReportProvider>
    <Component {...pageProps} />
  </RequiredReportProvider>
}
