"use client";
import { useEffect } from "react";

declare global {
    interface Window {
        $crisp: unknown[];
        CRISP_WEBSITE_ID: string;
    }
}

const CRISP_ID = process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID ?? "";

export default function CrispChat() {
    useEffect(() => {
        if (!CRISP_ID) return;

        // Initialise Crisp
        window.$crisp = [];
        window.CRISP_WEBSITE_ID = CRISP_ID;

        const script       = document.createElement("script");
        script.src         = "https://client.crisp.chat/l.js";
        script.async       = true;
        document.head.appendChild(script);

        // Customise Crisp appearance after it loads
        script.onload = () => {
            // Brand colours
            window.$crisp.push(["config", "color:theme", ["green"]]);
            // Hide the default launcher — we use AIChatWidget as primary
            // Crisp will still be accessible via $crisp.push(["do","chat:open"])
            // Uncomment next line if you want to hide Crisp's own button:
            // window.$crisp.push(["config", "hide:on:mobile", [false]]);
        };

        return () => {
            // Cleanup on unmount
            document.head.removeChild(script);
        };
    }, []);

    return null; // no visible output — Crisp renders its own widget
}