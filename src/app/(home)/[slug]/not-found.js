import React from 'react'
import { ArrowRight, WrenchOff } from 'lucide-react'
import Link from 'next/link'

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50">
        <WrenchOff className="h-8 w-8 text-slate-300" />
      </div>
      <h2 className="text-lg font-semibold text-slate-700">Tool not found</h2>
      <p className="mt-1 max-w-sm text-sm text-slate-400">
        {`The tool you're looking for doesn't exist or may have been moved.`}
      </p>
      <Link
        href="/"
        className="mt-5 inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90"
      >
        Browse all tools <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  )
}

export default NotFound