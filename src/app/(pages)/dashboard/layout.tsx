import React from "react";
import Sidebar from '@/components/main compo/dashboard/Sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Fixed 260px sidebar and flexible main container taking up the rest of the screen
    <div className="grid grid-cols-[260px_1fr] h-screen w-screen overflow-hidden">
      {/* Fixed Left Sidebar */}
      <Sidebar/>

      {/* Main Scrollable Content Area */}
      <main className="overflow-y-auto bg-gray-50 p-8">
        {children}
      </main>
    </div>
  );
}