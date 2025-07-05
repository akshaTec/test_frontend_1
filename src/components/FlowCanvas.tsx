'use client';

import React from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Node ,
  Edge,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import CustomNode, { CustomNodeData, CustomNodeProps } from '@/components/ui/CustomNode';
import { initialNodes, initialEdges } from '@/components/input_nodes_edge';
import socket from '@/utils/node_update';
import InfoPanel from './ui/InfoPanel';

const nodeTypes = { customNode: CustomNode };

interface FlowCanvasProps  {
  selectedSource: string,
  setSelectedSource: (source: string) => void,
  selectedTarget: string,
  setSelectedTarget: (target: string) => void
}


export default function FlowCanvas({selectedSource, selectedTarget, setSelectedSource, setSelectedTarget} : FlowCanvasProps) {

  const [nodes, setNodes, onNodesChange] =  useNodesState<Node>(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>(initialEdges)

  const [selectedNode, setSelectedNode] = React.useState<Node | null>(null);
  
  React.useEffect(() => {
    const handleNodeUpdate = (data: unknown) => {
      console.log("📩 Active Node Update:", data);
      const newNodeId = (data as any).node;
  
      setNodes((nds) =>
        nds.map((node: Node) => {
          if (node.id === newNodeId) {
            return { ...node, data: { ...node.data, status: "active" , visible: true} };
          } else if (node.data.status === "active") {
            return { ...node, data: { ...node.data, status: "success" } };
          }
          return node;
        })
      );
    };
  
    socket.on("node_update", handleNodeUpdate);
  
    return () => {
      socket.off("node_update", handleNodeUpdate);
    };
  }, []);

  const handleNodeClick = (event: React.MouseEvent, node: Node) =>{
    setSelectedNode(node);
  }
  const onDetailsClose = () =>{
    setSelectedNode(null);
  }

  return (
    <div className="relative h-full flex flex-row w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={handleNodeClick}
        nodeTypes={nodeTypes}
        // onInit={onInit}
        fitView={false}
        selectNodesOnDrag={false}
        elementsSelectable={true}
        onPaneClick={() => setSelectedNode(null)}
        nodesDraggable={false}
      >
        <Background />
        <MiniMap />
        <Controls />
      </ReactFlow>

      { selectedNode &&
      <InfoPanel onClose = {onDetailsClose} selectedNode = {selectedNode}/>}
      

    </div>
  );
}

