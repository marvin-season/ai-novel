import Dropdown from "../../components/dropdown";
import Navbar from "../../components/navbar";

export default function FloatHandle() {
    return (
        <div className="fixed top-2 right-2 z-50">
            <Dropdown>
                <Navbar />
            </Dropdown>
        </div>
    )
}
