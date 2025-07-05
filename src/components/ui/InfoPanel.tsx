import { useState } from "react"
// import { X, ChevronDown, Database } from "lucide-react"
import { } from "lucide-react"
import { BIGQUERY_CONFIG, SNOWFLAKE_CONFIG } from "../config_db_details"
import DropdownPanel from "./DropDownPanel"
import socket from "@/utils/node_update"
import NodeInfoDetailsPanel from "./NodeInfoDetail"
import { Node } from "reactflow"
// import CustomNode from "./CustomNode"

interface InfoPanelProps {
  onClose: () => void
  selectedNode: Node
}

export default function InfoPanel({ onClose, selectedNode }: InfoPanelProps) {
  const [sourceDb, setSourceDb] = useState<object>(SNOWFLAKE_CONFIG)
  const [targetDb, setTargetDb] = useState<object>(BIGQUERY_CONFIG)

  const [sourceExpanded, setSourceExpanded] = useState(false)
  const [targetExpanded, setTargetExpanded] = useState(false)

  const [activeTab, setActiveTab] = useState("details");

  // Sample data - in a real implementation, this would come from nodeData
  const snowflakeData = SNOWFLAKE_CONFIG
  const bigqueryData = BIGQUERY_CONFIG

  // const [count, setCount] = useState<number>(3);

  const onContinue = () => {
    socket.emit("continue_process", { node: "migration_create_plan" });
    console.log(`Emitted: continue_process for node: migration_create_plan}`);
    return 
  }

  const getPanelContent = (nodeId: string) => {
    switch (nodeId) {
      case "chatbot_agent":
        return (
          <>
            <h2 className="text-xl font-semibold mb-4"> {selectedNode.data.title} </h2>
            <DropdownPanel name="Snowflake" type="Source DB" data={{...snowflakeData}} />
            <DropdownPanel name="BigQuery" type="Target DB" data={{...bigqueryData}} />
          </>
        );
      default:
        return null; // or some default content
    }
  };


  return (
    <NodeInfoDetailsPanel
      onClose={onClose}
      onContinue={onContinue}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      panelContent={getPanelContent(selectedNode.id)}
      count={3}
    />
  )
  

}
