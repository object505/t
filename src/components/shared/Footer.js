import React from 'react'
import { TOOLS } from '@/lib/toolsData'
import Image from 'next/image'

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-[1400px] px-4 py-6 lg:px-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <Image
              src="/toolzone-logo.svg"
              alt="ToolZone"
              width={100}
              height={30}
              priority
              loading='eager'
              className='dark:hidden'
            />
            <Image
              src="/toolzone-logo-dark.svg"
              alt="ToolZone"
              width={100}
              height={30}
              priority
              loading='eager'
              className='hidden dark:block'
            />
          </div>
          <p className="text-xs text-muted-foreground">
            {TOOLS.length}+ free online tools · All processing happens in your browser
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer