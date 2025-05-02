import RichViewer from "@/components/rich-viewer";
import { UseCompletionHelpers } from "@ai-sdk/react";
import { useEffect, useMemo } from "react";
import Loading from "./loading";



type CommandType = 'eng' | 'translate'

interface AnswerProps extends Partial<UseCompletionHelpers> {
    onCommand: (command: CommandType) => void
}

const Completion = ({ onCommand, completion, isLoading, ...completionProps }: AnswerProps) => {
    const commands = useMemo(() => {
        return [
            {
                id: 1,
                command: 'eng' as const,
                label: 'Simplify English'
            }
        ]
    }, [])

    return (
        <>
            {
                !isLoading && <ul className="border-b p-2">
                    {
                        commands.map(item => {
                            return <li className="text-sm cursor-pointer hover:text-blue-500" key={item.id} onClick={() => {
                                onCommand(item.command)
                            }}>{item.label}</li>
                        })
                    }
                </ul>
            }
            {
                completion!.trim()!.length > 0 ? <RichViewer content={completion} /> : isLoading ? <Loading /> : <></>
            }

        </>
    )
}

export default Completion