import { PencilLineIcon, BookOpenText } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import ModelSetting from "@/components/setting";

type Props = {}

export default function Navbar({ }: Props) {
    return (
        <nav className="navbar flex flex-col gap-4 items-center p-3">
            <NavLink to={"/"} className="navbar-brand">
                <PencilLineIcon size={20} />
            </NavLink>
            <NavLink to={"reading"} className="navbar-brand">
                <BookOpenText size={20} />
            </NavLink>
            <ModelSetting />
        </nav>
    )
}