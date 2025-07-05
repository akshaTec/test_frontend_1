import React from "react";
import { Bot, User, Paperclip, Send } from "lucide-react";
import { ngrok } from "@/components/input_nodes_edge";
import Image from "next/image";
import io from "socket.io-client";

import { CONFIG_MAP, SNOWFLAKE_CONFIG, ORACLE_CONFIG, BIGQUERY_CONFIG, CLOUDSQL_CONFIG, MYSQL_CONFIG, HIVE_CONFIG } from "./config_db_details";

type DatabaseConfigType =
  | "snowflake"
  | "bigquery"
  | "hive"
  | "mysql"
  | "oracle"
  | "cloudsql";

interface Message {
  text: string;
  sender: "user" | "ai";
  type?: "config";
  configType?: DatabaseConfigType;
}

interface ChatPanelProps  {
  selectedSource: string,
  setSelectedSource: (source: string) => void,
  selectedTarget: string,
  setSelectedTarget: (target: string) => void
}

export default function ChatPanel({selectedSource, setSelectedSource, selectedTarget, setSelectedTarget}: ChatPanelProps) {

  const [messages, setMessages] = React.useState<Message[]>([
    {
      text: "Hello! How can I assist you today?",
      sender: "ai",
    },
  ]);
  const [input, setInput] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [showConfigOptions, setShowConfigOptions] =
    React.useState<boolean>(false);
  const [migrationInProgress, setMigrationInProgress] =
    React.useState<boolean>(false);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const messagesEndRef = React.useRef<HTMLDivElement | null>(null);
  const configOptionsRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const socket = io(ngrok);
    socket.on("migration_status", (data: unknown) => {
      if (typeof data === 'object' && data !== null && 'status' in data) {
        const status = (data as { status: string }).status;
        if (status === "complete") {
          setMigrationInProgress(false);
          sendMessageToFlask("Get migration result");
        } else if (status === "in_progress") {
          setMigrationInProgress(true);
        }
      }
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        configOptionsRef.current &&
        !configOptionsRef.current.contains(event.target as Node)
      ) {
        setShowConfigOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessageToFlask = async (userMessage: string) => {
    try {
      const response = await fetch(ngrok + "/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
        }),
      });

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error("Error in fetching:", error);
      throw error;
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading || migrationInProgress) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { text: userMessage, sender: "user" }]);
    setInput("");
    setIsLoading(true);

    try {
      const botResponse = await sendMessageToFlask(userMessage);
      setMessages((prev) => [...prev, { text: botResponse, sender: "ai" }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          text: "Sorry, I couldn't process your request. Please try again.",
          sender: "ai",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(ngrok + "/chat", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      alert("File uploaded successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      alert("File upload failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSend();
    }
  };

  const handleUploadDocClick = () => {
    setShowConfigOptions(!showConfigOptions);
  };

  const handleConfigFileSelect = async (configType: DatabaseConfigType, sourceOrTarget: string) => {

    if(sourceOrTarget === "source"){
      setSelectedSource(configType)
    } else {
      setSelectedTarget(configType)
    }
    setShowConfigOptions(false);

    const configMessage = {
      text: `Selected ${configType} configuration`,
      sender: "user" as const,
      type: "config" as const,
      configType,
    };

    setMessages((prev) => [...prev, configMessage]);

    try {

      setIsLoading(true);

      const config = CONFIG_MAP[configType] || {};
      const configString = JSON.stringify(config);

      const botResponse = await sendMessageToFlask(configString);
      setMessages((prev) => [...prev, { text: botResponse, sender: "ai" }]);
    } catch (error) {
      console.error("Error sending config:", error);
      setMessages((prev) => [
        ...prev,
        {
          text: "Failed to process configuration. Please try again.",
          sender: "ai",
        },
      ]);
    } finally {

      setIsLoading(false);
    }
  };

  const renderMessage = (msg: Message) => {
    if (msg.type === "config" && msg.configType) {
      const dbConfigs = {
        snowflake: {
          config: SNOWFLAKE_CONFIG,
          icon: "/icons/snowflake.png",
          name: "Snowflake Config",
        },
        bigquery: {
          config: BIGQUERY_CONFIG,
          icon: "/icons/bigquery.png",
          name: "BigQuery Config",
        },
        hive: {
          config: HIVE_CONFIG,
          icon: "/icons/hive.png",
          name: "Hive Config",
        },
        mysql: {
          config: MYSQL_CONFIG,
          icon: "/icons/mysql.png",
          name: "MySQL Config",
        },
        oracle: {
          config: ORACLE_CONFIG,
          icon: "/icons/oracle.png",
          name: "Oracle Config",
        },
        cloudsql: {
          config: CLOUDSQL_CONFIG,
          icon: "/icons/cloudsql.png",
          name: "CloudSQL Config",
        },
      };

      const currentConfig = dbConfigs[msg.configType];

      return (
        <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-200">
          <Image
            src={currentConfig.icon}
            alt={currentConfig.name}
            width={24}
            height={24}
            className="flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="font-medium text-base text-gray-900 mb-3">
              {currentConfig.name}
            </div>
            <div className="space-y-2">
              {Object.entries(currentConfig.config).map(([key, value]) => (
                <div key={key} className="flex items-center gap-3">
                  <span className="font-medium text-sm text-gray-700 min-w-[120px] flex-shrink-0 capitalize">
                    {key.replace(/_/g, " ")}:
                  </span>
                  <span className="text-sm text-gray-600 truncate">
                    {typeof value === "boolean" ? value.toString() : value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }
    return msg.text;
  };

  return (
    <div className="flex flex-col h-[80vh] border rounded-lg shadow-lg w-96 bg-white">
      <div className="flex-1 overflow-y-auto p-4 min-h-0">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex items-start mb-4 ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.sender === "ai" && (
              <Bot className="mr-2 w-5 h-5 text-gray-500 mt-1" />
            )}
            <div
              className={`inline-block rounded-lg ${
                msg.type === "config" ? "w-full" : "p-2 bg-zinc-100"
              }`}
            >
              {renderMessage(msg)}
            </div>
            {msg.sender === "user" && (
              <User className="ml-2 w-5 h-5 text-teal-500 mt-1" />
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center mb-4 justify-start">
            <Bot className="mr-2 w-5 h-5 text-gray-500" />
            <div className="inline-block p-2 rounded-lg bg-zinc-200">
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-.3s]" />
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-.5s]" />
              </div>
            </div>
          </div>
        )}
        {migrationInProgress && (
          <div className="text-center text-sm text-gray-500 my-2">
            Migration in progress... Please wait.
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 p-2 border rounded"
            placeholder="Type your message..."
            disabled={isLoading || migrationInProgress}
          />
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />
          <div className="relative" ref={configOptionsRef}>
            <button
              onClick={handleUploadDocClick}
              className={`px-1 py-2 ${
                isLoading || migrationInProgress
                  ? "opacity-65 cursor-not-allowed"
                  : "hover:opacity-80"
              }`}
              disabled={isLoading || migrationInProgress}
            >
              <Paperclip />
            </button>
            {showConfigOptions && (
              <div className="absolute bottom-full right-0 mb-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <div className="px-4 py-2 text-sm text-gray-500 border-b border-gray-100">
                  Config File
                </div>
                <div className="px-4 py-2 text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Source
                </div>
                <button
                  onClick={() => handleConfigFileSelect("snowflake", "source")}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                >
                  <Image
                    src="/icons/snowflake.png"
                    alt="Snowflake"
                    width={16}
                    height={16}
                    className="text-blue-500"
                  />
                  snowflake.config
                </button>
                <button
                  onClick={() => handleConfigFileSelect("oracle", "source")}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                >
                  <Image
                    src="/icons/oracle.png"
                    alt="Oracle"
                    width={16}
                    height={16}
                    className="text-blue-500"
                  />
                  oracle.config
                </button>
                <button
                  onClick={() => handleConfigFileSelect("mysql", "source")}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                >
                  <Image
                    src="/icons/mysql.png"
                    alt="MySQL"
                    width={16}
                    height={16}
                    className="text-blue-500"
                  />
                  mysql.config
                </button>
                <div className="px-4 py-2 text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Target
                </div>
                <button
                  onClick={() => handleConfigFileSelect("bigquery", "target")}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                >
                  <Image
                    src="/icons/bigquery.png"
                    alt="BigQuery"
                    width={16}
                    height={16}
                    className="text-blue-500"
                  />
                  bigquery.config
                </button>
                <button
                  onClick={() => handleConfigFileSelect("cloudsql", "target")}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                >
                  <Image
                    src="/icons/cloudsql.png"
                    alt="CloudSQL"
                    width={16}
                    height={16}
                    className="text-blue-500"
                  />
                  cloudsql.config
                </button>
              </div>
            )}
          </div>
          <button
            onClick={handleSend}
            className={`px-2 py-2 bg-black text-white rounded ${
              isLoading || migrationInProgress
                ? "opacity-50 cursor-not-allowed"
                : "hover:opacity-80"
            }`}
            disabled={isLoading || migrationInProgress}
          >
            <Send />
          </button>
        </div>
      </div>
    </div>
  );
}
