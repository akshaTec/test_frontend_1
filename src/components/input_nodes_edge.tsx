import { Node, Edge } from "reactflow";

export const ngrok = "http://127.0.0.1:5009";

const down = 200;
const right = 350;
// const hr = 150;
const hd = 150;
const ix = 0;
const iy = 0;

export const initialNodes: Node[] = [
  {
    id: "chatbot_agent",
    type: "customNode",
    position: { x: ix, y: iy },
    data: {
      title: "Entry Node",
      status: "success",
      type: "agent",
      visible: true,
      description: {
        step: "Agent",
        details: "Handles chatbot-related tasks.",
        source: "NLP model.",
      },
    },
  },
  {
    id: "supervisor_agent",
    type: "customNode",
    position: { x: ix, y: iy + down },
    data: {
      title: "Decision Engine",
      status: "not_active",
      type: "agent",
      visible: true,
      description: {
        step: "Agent",
        details: "Oversees the execution of tasks.",
        source: "Workflow engine.",
      },
    },
  },
  {
    id: "conversational_agent",
    type: "customNode",
    position: { x: ix - right, y: iy + 2 * down },
    data: {
      title: "Conversational",
      status: "not_active",
      type: "agent",
      visible: true,
      description: {
        step: "Agent",
        details: "Manages natural language conversations.",
        source: "Dialogue system.",
      },
    },
  },
  {
    id: "data_migration_agent",
    type: "customNode",
    position: { x: ix + right, y: iy + 2 * down },
    data: {
      title: "Data Migration Agent",
      status: "not_active",
      type: "agent",
      visible: false,
      description: {
        step: "Agent",
        details: "Handles data migration tasks.",
        source: "Cloud services.",
      },
    },
  },
  {
    id: "migration_create_plan",
    type: "customNode",
    position: { x: ix + right, y: iy + 2 * down + hd },
    data: {
      title: "Migration Plan Creation",
      status: "not_active",
      type: "process",
      visible: false,
      description: {
        step: "Step 1",
        details: "Creates a migration plan for data transfer.",
      },
    },
  },
  {
    id: "terraform_script_creation",
    type: "customNode",
    position: { x: ix + right, y: iy + 2 * down + 2 * hd },
    data: {
      title: "Terraform Script Creation",
      status: "not_active",
      type: "process",
      visible: false,
      description: {
        step: "Step 2",
        details: "Creates Terraform scripts for infrastructure.",
      },
    },
  },
  {
    id: "terraform_script_execution",
    type: "customNode",
    position: { x: ix + right, y: iy + 2 * down + 3 * hd },
    data: {
      title: "Terraform Script Execution",
      status: "not_active",
      type: "process",
      visible: false,
      description: {
        step: "Step 3",
        details: "Executes Terraform scripts to provision infrastructure.",
      },
    },
  },
  {
    id: "python_script_creation",
    type: "customNode",
    position: { x: ix + right, y: iy + 2 * down + 4 * hd },
    data: {
      title: "Python Script Creation",
      status: "not_active",
      type: "process",
      visible: false,
      description: {
        step: "Step 4",
        details:
          "Creates Python script to migrate data from Source database to GCS Bucket.",
      },
    },
  },
  {
    id: "source_to_gcs_execution",
    type: "customNode",
    position: { x: ix + right, y: iy + 2 * down + 5 * hd },
    data: {
      title: "Script Execution",
      status: "not_active",
      type: "process",
      visible: false,
      description: {
        step: "Step 5",
        details:
          "Executes Python script to migrate data from Source database to GCS Bucket.",
      },
    },
  },
  {
    id: "bigquery_agent",
    type: "customNode",
    position: { x: ix + right, y: iy + 2 * down + 6 * hd },
    data: {
      title: "BigQuery Agent",
      status: "not_active",
      type: "process",
      visible: false,
      description: {
        step: "Agent",
        details: "Handles BigQuery related tasks.",
      },
    },
  },
  {
    id: "alloydb_agent",
    type: "customNode",
    position: { x: ix , y: iy + 2 * down + 6 * hd},
    data: {
      title: "AlloyDB Agent",
      status: "not_active",
      type: "process",
      visible: false,
      description: {
        step: "Agent",
        details: "Handles AlloyDB related tasks.",
      },
    },
  },
  {
    id: "cloudsql_agent",
    type: "customNode",
    position: { x: ix + 2 * right, y: iy + 2 * down + 6 * hd },
    data: {
      title: "CloudSQL Agent",
      status: "not_active",
      type: "process",
      visible: false,
      description: {
        step: "Agent",
        details: "Handles CloudSQL related tasks.",
      },
    },
  },
  {
    id: "END",
    type: "customNode",
    position: { x: ix + right, y: iy + 2 * down + 7 * hd},
    data: {
      title: "End",
      status: "not_active",
      type: "process",
      visible: false,
      description: {
        step: "End",
        details: "End of migration process.",
      },
    },
  },
];

export const initialEdges: Edge[] = [
  { id: "e1", source: "data_migration_agent", target: "migration_create_plan" },
  {
    id: "e2",
    source: "migration_create_plan",
    target: "terraform_script_creation",
  },
  {
    id: "e3",
    source: "terraform_script_creation",
    target: "terraform_script_execution",
  },
  {
    id: "e4",
    source: "terraform_script_execution",
    target: "python_script_creation",
  },
  {
    id: "e5",
    source: "python_script_creation",
    target: "source_to_gcs_execution",
  },
  {
    id: "e6",
    source: "source_to_gcs_execution",
    target: "bigquery_agent",
  },
  {
    id: "e7",
    source: "source_to_gcs_execution",
    target: "cloudsql_agent",
  },
  {
    id: "e13",
    source: "source_to_gcs_execution",
    target: "alloydb_agent",
  },
  { id: "e8", source: "chatbot_agent", target: "supervisor_agent" },
  { id: "e9", source: "supervisor_agent", target: "data_migration_agent" },
  { id: "e12", source: "supervisor_agent", target: "conversational_agent" },
  { 
    id: "e14",
    source: "bigquery_agent",
    target: "END",
  },
  {
    id: "e15",
    source: "cloudsql_agent",
    target: "END",
  },
  {
    id: "e16",
    source: "alloydb_agent",
    target: "END",
  }
  // Conditional edges will be added dynamically based on next_agent
];

