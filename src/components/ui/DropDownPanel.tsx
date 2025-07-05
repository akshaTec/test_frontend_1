import { useState } from "react"
import Image from "next/image"
import { ChevronDown } from "lucide-react"

interface DropdownPanelProps {
    name: string
    type: string
    data: Record<string, unknown>
}

export default function DropdownPanel({ name,type, data }: DropdownPanelProps) {
    const [expanded, setExpanded] = useState(true);

    return (
        <div className="mb-4 border border-gray-200 rounded-lg bg-gray-50">
            <div
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100 transition"
                onClick={() => setExpanded(!expanded)}
            >
                <div className="flex items-center">
                    <div className="bg-blue-50 p-2 rounded-md mr-3">
                        <Image src={`/icons/${name}.png`} className="h-5 w-5 text-blue-500" alt={name} width={20} height={20} />
                    </div>
                    <div>
                        <div className="font-medium capitalize">{name}</div>
                        <div className="text-sm text-gray-500">{type}</div>
                    </div>
                </div>
                <ChevronDown className={`h-5 w-5 transition-transform ${expanded ? "rotate-180" : ""}`} />
            </div>
            {expanded && (
                <div className="p-4 pt-0 border-t border-gray-200 overflow-y-auto max-h-40">
                    {Object.entries(data).map(([key, value]) => (
                        <div key={key} className="py-2 flex justify-between">
                            <span className="text-gray-600 text-sm">{key}:</span>
                            <span className="font-medium text-sm">{typeof value === 'string' || typeof value === 'number' ? value : JSON.stringify(value)}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
