import { useDocStore } from "@/store";
import { useEffect } from "react";
import { doc } from "./mock";
import ReadingENG from "./ReadingENG"

type Props = {}

export default function Reading({ }: Props) {
  const setContent = useDocStore(state => state.setContent)
  useEffect(() => {
    setContent(doc)
  }, []);
  return (
    <div>
      <ReadingENG />
    </div>
  )
}