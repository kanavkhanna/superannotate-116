"use client"

import type React from "react"

import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

interface SavedProfilesProps {
  savedProfiles: string[]
  loadSavedProfile: (profileName: string) => void
  removeProfile: (profileName: string) => void
}

export function SavedProfiles({ savedProfiles, loadSavedProfile, removeProfile }: SavedProfilesProps) {
  if (savedProfiles.length === 0) return null

  const handleBadgeClick = (profile: string) => {
    loadSavedProfile(profile)
  }

  const handleBadgeRightClick = (e: React.MouseEvent, profile: string) => {
    e.preventDefault() // Prevent the browser context menu
    removeProfile(profile)
    return false
  }

  return (
    <div className="mt-10">
      <Separator className="my-4 bg-primary/20" />
      <h2 className="text-xl font-semibold mb-4 text-black">Saved Profiles</h2>
      <div className="flex flex-wrap gap-2">
        {savedProfiles.map((profile) => (
          <Badge
            key={profile}
            className="cursor-pointer bg-primary/10 hover:bg-primary/20 text-foreground transition-colors duration-200"
            onClick={() => handleBadgeClick(profile)}
            onContextMenu={(e) => handleBadgeRightClick(e, profile)}
            title="Click to load profile, right-click to remove"
          >
            {profile}
          </Badge>
        ))}
      </div>
      <p className="text-xs text-muted-foreground mt-2">Click to load profile, right-click to remove</p>
    </div>
  )
}

