import Tippy from "@tippyjs/react";
import Navbar from "../../components/navbar";
import { useState } from "react";
import "tippy.js/animations/shift-away.css";
import { IconSizeMiddle } from "@/constants";
import { Compass } from "@phosphor-icons/react";
import { Tooltip } from "@/components/tooltip";

export default function FloatHandle() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="fixed bottom-4 left-4 z-50">
      <Tippy
        animation="shift-away"
        visible={isOpen}
        content={<Navbar />}
        interactive
        onClickOutside={() => setIsOpen(false)}
      >
        <Tooltip content="指南">
          <Compass
            size={IconSizeMiddle}
            onClick={() => setIsOpen(!isOpen)}
            className={`transition-all duration-500 ${isOpen ? "rotate-0" : "rotate-45"}`}
          />
        </Tooltip>
      </Tippy>
    </div>
  );
}
