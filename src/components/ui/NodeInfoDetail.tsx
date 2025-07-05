import { X } from "lucide-react";

interface NodeInfoDetailsPanelProps {
    onClose: () => void;
    onContinue: () => void;
    activeTab: string;
    setActiveTab: (tab: string) => void;
    count: number;
    panelContent: React.ReactNode; // Allows dynamic content
  }
  
  export default function NodeInfoDetailsPanel({
    onClose,
    onContinue,
    activeTab,
    setActiveTab,
    count,
    panelContent,
  }: NodeInfoDetailsPanelProps) {
  
    return (
      <div className="relative flex flex-col h-[80vh] border rounded-lg shadow-lg w-[70vh] bg-white overflow-hidden">
        {/* Close Button */}
        <button className="absolute top-2 right-2 p-2" onClick={onClose}>
          <X className="h-4 w-4" />
        </button>
  
        {/* Tab Navigation */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
          <div className="grid grid-cols-2 w-full text-center">
            <button
              className={`py-2 ${activeTab === "details" ? "border-b-2 border-black font-semibold" : "text-gray-500"}`}
              onClick={() => setActiveTab("details")}
            >
              Details
            </button>
            <button
              className={`py-2 ${activeTab === "logs" ? "border-b-2 border-black font-semibold" : "text-gray-500"}`}
              onClick={() => setActiveTab("logs")}
            >
              Logs {count}
            </button>
          </div>
        </div>
  
        {/* Content based on active tab */}
        {activeTab === "details" ? (
          <div className="p-4 overflow-y-auto flex-grow max-h-[calc(80vh-9rem)]">
            {/* Reuseable content */}
            {panelContent}
          </div>
        ) : (
          <div className="p-4 bg-gray-50 rounded-lg overflow-y-auto flex-grow">
            <p className="text-gray-600">Log entries will appear here...</p>
          </div>
        )}
  
        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50 mt-auto">
          <button onClick={onContinue} className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800">
            Continue <span className="ml-2">→</span>
          </button>
        </div>
      </div>
    );
  }
  