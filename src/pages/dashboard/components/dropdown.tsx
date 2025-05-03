import { XIcon } from "lucide-react";
import { useState } from "react";

const Dropdown = ({ children, anchor }: { children: React.ReactNode, anchor?: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className="shadow-lg bg-slate-50 rounded-lg p-2"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
            onClick={() => setIsOpen(!isOpen)}
        >
            {anchor ? anchor : <XIcon size={24} className={`transition-all duration-500 ${isOpen ? "rotate-0" : "rotate-45"}`} />}
            <div
                className={`absolute bg-slate-50 shadow-xl rounded-lg top-12 left-2 transition-all duration-500 ease-in-out ${isOpen
                    ? "opacity-100 translate-y-[12px] visible"
                    : "opacity-0 -translate-y-4 invisible"
                    }`}
            >
                {children}
            </div>
        </div>
    );
};
export default Dropdown;