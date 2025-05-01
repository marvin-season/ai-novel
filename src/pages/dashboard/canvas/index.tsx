import EditorContainer from "@/components/page-editor/editor-container";
import { EditorProvider } from "./provider";

export default function Canvas() {
    return <EditorProvider>
        <div className="app">
            <div className="main-content">
                <EditorContainer />
            </div>
        </div>
    </EditorProvider>
}