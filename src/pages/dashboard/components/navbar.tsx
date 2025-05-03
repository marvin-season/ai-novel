import { PencilLineIcon, BookOpenText } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import ModelSetting from "@/components/setting";
import { IconSizeMiddle } from '@/constants';

type Props = {}

export default function Navbar({ }: Props) {
    return (
        <nav className="navbar flex flex-col gap-4 items-center p-3">
            <NavLink to={"/"} className="navbar-brand">
                <PencilLineIcon size={IconSizeMiddle} />
            </NavLink>
            <NavLink to={"reading"} className="navbar-brand">
                <BookOpenText size={IconSizeMiddle} />
            </NavLink>
            <ModelSetting />
        </nav>
    )
}