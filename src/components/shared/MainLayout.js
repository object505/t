'use client'
import React, { useState } from 'react'
import Header from '@/components/shared/Header'
import Sidebar from '@/components/shared/Sidebar'
import CommandPalette from '@/components/shared/CommandPalette'
import Footer from '@/components/shared/Footer'

const MainLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [paletteOpen, setPaletteOpen] = useState(false)

  const closeSidebar = () => setSidebarOpen(false)

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header
        setSidebarOpen={setSidebarOpen}
        setPaletteOpen={setPaletteOpen}
      />

      <div className="mx-auto flex max-w-[1600px]">
        {/* Sidebar */}
        <Sidebar
          closeSidebar={closeSidebar}
          sidebarOpen={sidebarOpen}
        />

        {/* Main */}
        <main className="min-w-0 flex flex-col flex-1">
          <div className='grow'>
            {children}
          </div>

          <Footer />
        </main>
      </div>

      <CommandPalette open={paletteOpen} setOpen={setPaletteOpen} />
    </div>
  )
}

export default MainLayout