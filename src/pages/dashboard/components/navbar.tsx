import { PencilLineIcon } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import ModelSetting from "@/components/setting";
import { IconSizeMiddle } from '@/constants';
import { ClockClockwise } from '@phosphor-icons/react';

type Props = {}

export default function Navbar({ }: Props) {
    return (
        <nav className="navbar flex flex-col gap-6 items-center p-3 border-r">
            <NavLink to={"/"} className="navbar-brand">
                <PencilLineIcon size={IconSizeMiddle} />
            </NavLink>
            <NavLink to={"recoder"} className="navbar-brand">
                <ClockClockwise size={IconSizeMiddle} />
            </NavLink>
            <ModelSetting />
        </nav>
    )
}