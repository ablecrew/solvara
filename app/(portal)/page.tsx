import type { Metadata } from "next";
import PortalLoginClient from "./PortalLoginClient";

export const metadata: Metadata = {
    title: "Client Portal | Solvara Solutions",
    description: "Access your Solvara project dashboard, track progress, view files and communicate with the team.",
    robots: { index: false, follow: false },
};

export default function PortalPage() {
    return <PortalLoginClient />;
}