"use client"

import type React from "react"

import { useState } from "react"
import { X, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface SavedProfilesProps {
  savedProfiles: string[]
  loadSavedProfile: (profileName: string) => void
  removeProfile: (profileName: string) => void
}

export function SavedProfiles({ savedProfiles, loadSavedProfile, removeProfile }: SavedProfilesProps) {
  const [profileToDelete, setProfileToDelete] = useState<string | null>(null)

  const handleDeleteClick = (profile: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setProfileToDelete(profile)
  }

  const handleConfirmDelete = () => {
    if (profileToDelete) {
      removeProfile(profileToDelete)
      setProfileToDelete(null)
    }
  }

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-sm font-medium text-muted-foreground">Saved:</span>
      </div>

      {savedProfiles.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {savedProfiles.map((profile) => (
            <Badge
              key={profile}
              className="cursor-pointer bg-primary/10 hover:bg-primary/20 text-foreground transition-colors duration-200 flex items-center gap-1 pl-3 pr-2 py-1"
            >
              <span onClick={() => loadSavedProfile(profile)}>{profile}</span>
              <button
                onClick={(e) => handleDeleteClick(profile, e)}
                className="text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-primary/10 p-0.5"
                aria-label={`Remove ${profile}`}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      ) : (
        <div className="flex items-center gap-2 text-sm text-muted-foreground italic">
          <AlertCircle className="h-3 w-3" />
          <span>No saved profiles yet. Search for a profile and save it to see it here.</span>
        </div>
      )}

      {/* Confirmation Dialog */}
      <AlertDialog open={!!profileToDelete} onOpenChange={(open) => !open && setProfileToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Saved Profile</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove "{profileToDelete}" from your saved profiles?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

