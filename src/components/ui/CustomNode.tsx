import { Box, XCircle, Circle, Loader, Bot, CircleCheck } from "lucide-react";
import { NodeProps, Handle, Position } from "reactflow";
import React, { useEffect, useState } from "react";

export interface CustomNodeData {
  title: string;
  status: "not_active" | "active" | "success" | "error";
  type: string;
  description: unknown;
  visible: boolean;
}

export interface CustomNodeProps extends NodeProps<CustomNodeData> {}

export default function CustomNode({ id, data, selected }: CustomNodeProps) {
  const { title, status, type, description, visible } = data;

  // Add useEffect for fade-in animation
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Delay to allow the DOM to update before starting the transition
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  if (visible === false) {
    return null;
  }

  const getStatusIcon = () => {
    switch (status) {
      case "not_active":
        return <Circle className="text-gray-400 w-5 h-5" />;
      case "active":
        return <Loader className="text-[#2962F6] w-5 h-5 animate-spin" style={{ animationDuration: '8s' }} />;
      case "success":
        return <CircleCheck className="text-[#64D99B] w-5 h-5" />;
      case "error":
        return <XCircle className="text-red-500 w-5 h-5" />;
      default:
        return <Circle className="text-gray-400 w-5 h-5" />;
    }
  };

  return (

    <div className="flex items-center p-4 bg-white border border-gray-300 rounded-xl shadow-md w-60">
      {/* Handles for edges */}
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />

      {/* Left Icon */}
      <div className="w-8 h-8 rounded-full flex flex-shrink-0 items-center justify-center mr-4" style={{ borderWidth: '0.5px' }}>
        {type === "agent" ? (
          <Bot className="w-4 h-4 text-gray-500" />
        ) : (
          <Box className="w-4 h-4 text-gray-500" />
        )}
      </div>

      {/* Node Content */}
      <div className="flex-grow">
        <div className="font-bold text-gray-700 leading-tight">{title}</div>
        <div className="text-sm text-gray-500 leading-tight">{type}</div>
      </div>

      {/* Status Indicator */}
      <div className="ml-1">{getStatusIcon()}</div>
    </div>

  );
}