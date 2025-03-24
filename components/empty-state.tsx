"use client"

import { Search } from "lucide-react"

interface EmptyStateProps {
  onProfileClick?: (username: string) => void
}

export function EmptyState({ onProfileClick }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center space-y-4 border-2 border-dashed border-primary/20 rounded-lg">
      <div className="bg-primary/10 p-3 rounded-full">
        <Search className="h-6 w-6 text-primary/70" />
      </div>
      <h2 className="text-xl font-semibold text-black">Search for GitHub Profiles</h2>
      <p className="text-muted-foreground max-w-md">
        Enter a GitHub username in the search box above to view their profile information and repositories. You can also
        save profiles for quick access later.
      </p>
    </div>
  )
}

