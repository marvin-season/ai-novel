import { useToast } from "@/hooks/use-toast";
import { isMobileDevice } from "@/utils";
import { useEffect } from "react";

export default function MobileDetector({ children }: { children: React.ReactNode }) {
    const { toast } = useToast();
    useEffect(() => {
        if (isMobileDevice(navigator.userAgent)) {
            toast({
                title: "提示",
                description: "本站点不支持移动端访问，请使用电脑访问",
            })
        }

    }, []);

    return children;
}