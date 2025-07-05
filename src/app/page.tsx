'use client';

import React from 'react';
import ChatPanel from '@/components/ChatPanel';
import FlowCanvas from '@/components/FlowCanvas';
import Image from 'next/image';
import { CONFIG_MAP } from '@/components/config_db_details';

export default function Home() {
  const [selectedSource, setSelectedSource] = React.useState<string>("");
  const [selectedTarget, setSelectedTarget] = React.useState<string>("");

  console.log(CONFIG_MAP["snowflake"])
  console.log((CONFIG_MAP["bigquery"]))

  return (
    <main className="flex flex-col h-screen w-full overflow-hidden">
      {/* Navbar */}
      <nav className="w-full h-20 bg-white border-b border-gray-100 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Image
            src="/icons/logo.png"
            alt="Searce Logo"
            width={200}
            height={60}
            className="object-contain"
          />
        </div>
        <div className="flex items-center gap-2">
          {/* <Bot className="h-5 w-5 text-gray-600 hover:text-gray-800 cursor-pointer" /> */}
          <div className="w-[1px] h-5 bg-gray-200"></div>
          <div>Monark Unadkat</div>
        </div>
      </nav>
      {/* Main content */}
      <div className="flex flex-1 p-8">
        <ChatPanel selectedSource={selectedSource} setSelectedSource={setSelectedSource} selectedTarget={selectedTarget} setSelectedTarget={setSelectedTarget} />
        <div className="flex-1 flex-row">
          <FlowCanvas selectedSource={selectedSource} setSelectedSource={setSelectedSource} selectedTarget={selectedTarget} setSelectedTarget={setSelectedTarget} />
        </div>
      </div>
    </main>

  );
}