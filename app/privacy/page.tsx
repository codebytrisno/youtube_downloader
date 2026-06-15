import type { Metadata } from "next";
import { PrivacyContent } from "./privacy-content";

export const metadata: Metadata = {
  title: "Privacy Policy - YT-MP3",
};

export default function PrivacyPage() {
  return <PrivacyContent />;
}
