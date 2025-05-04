import Tippy from "@tippyjs/react";
import Navbar from "../../components/navbar";
import { useState } from "react";
import 'tippy.js/animations/shift-away.css';
import { IconSizeMiddle } from "@/constants";
import { SettingsIcon } from "lucide-react";

export default function FloatHandle() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="fixed bottom-4 left-4 z-50">
            <Tippy
                animation='shift-away'
                visible={isOpen}
                content={<Navbar />}
                interactive
                onClickOutside={() => setIsOpen(false)}
            >
                <SettingsIcon
                    size={IconSizeMiddle}
                    onClick={() => setIsOpen(!isOpen)}
                    className={`transition-all duration-500 ${isOpen ? "rotate-0" : "rotate-45"}`}
                />
            </Tippy>
        </div>
    )
}
