import { isMobileDevice } from "@/utils";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function MobileDetector({ children }: { children: React.ReactNode }) {

    useEffect(() => {
        if (isMobileDevice(navigator.userAgent)) {
            toast.warning("请在 PC 端打开本页面, 当前页面暂不适配移动设备浏览")
        }

    }, []);

    return children;
}