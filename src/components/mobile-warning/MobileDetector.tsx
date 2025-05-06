// components/MobileWarning.tsx
import { isMobileDevice } from "@/utils";
import { useEffect, useState } from "react";

export default function MobileDetector({ children }: { children: React.ReactNode }) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const ua = navigator.userAgent;
        setIsMobile(isMobileDevice(ua));
    }, []);

    if (!isMobile) return children;

    return (
        <div className="flex flex-col justify-center items-center h-dvh">
            <p>
                请在 PC 端打开本页面
            </p>
            <p>当前页面暂不支持移动设备浏览</p>
        </div>
    );
}