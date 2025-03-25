"use client"

import { useState, useEffect, useRef } from "react"
import { toast } from "sonner"
import type { GitHubUser, GitHubRepo } from "@/types/github"
import { fetchGitHubUser } from "@/services/github-service"
import { SearchBar } from "@/components/search-bar"
import { ProfileCard } from "@/components/profile-card"
import { RepositoryList } from "@/components/repository-list"
import { SavedProfiles } from "@/components/saved-profiles"
import { EmptyState } from "@/components/empty-state"
import { ProfileSkeleton, RepositorySkeleton } from "@/components/skeleton-loaders"

export default function Home() {
  // Remove the useToast import and usage
  // const { toast: uiToast } = useToast() - REMOVED

  const [username, setUsername] = useState("")
  const [user, setUser] = useState<GitHubUser | null>(null)
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [savedProfiles, setSavedProfiles] = useState<string[]>([])
  const [hasSearched, setHasSearched] = useState(false)

  // Use a ref to track removed profiles for undo functionality
  const removedProfilesRef = useRef<Map<string, number>>(new Map())

  // Load saved profiles on component mount
  useEffect(() => {
    // Load saved profiles from localStorage
    const saved = localStorage.getItem("savedGithubProfiles")
    if (saved) {
      try {
        const parsedProfiles = JSON.parse(saved)
        setSavedProfiles(Array.isArray(parsedProfiles) ? parsedProfiles : [])
      } catch (e) {
        console.error("Error parsing saved profiles:", e)
        setSavedProfiles([])
      }
    }
  }, [])

  // Save profiles to localStorage
  const saveProfilesToStorage = (profiles: string[]) => {
    localStorage.setItem("savedGithubProfiles", JSON.stringify(profiles))
  }

  // Clear search results
  const clearResults = () => {
    setUser(null)
    setRepos([])
  }

  // Search for a GitHub user
  const searchUser = (searchUsername?: string) => {
    // Use the provided username or fall back to the state value
    const usernameToSearch = searchUsername || username

    // Clear previous error
    setError(null)

    // Validate input
    if (!usernameToSearch.trim()) {
      setError("Please enter a GitHub username")
      clearResults()
      return
    }

    // Set loading state and mark as searched
    setLoading(true)
    setHasSearched(true)

    // Clear previous results
    clearResults()

    // Fetch user data
    fetchGitHubUser(usernameToSearch)
      .then(({ user, repos }) => {
        // Update state with the fetched data
        setUser(user)
        setRepos(repos)

        // Update the input field to match the searched username
        if (searchUsername) {
          setUsername(searchUsername)
        }

        // Show success toast
        toast.success("Profile loaded", {
          description: `Successfully loaded profile for ${user.login}`,
        })
      })
      .catch((err) => {
        // Handle errors
        const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred"
        console.error("Search error:", errorMessage)
        setError(errorMessage)
        clearResults()
      })
      .finally(() => {
        // Clear loading state
        setLoading(false)
      })
  }

  // Toggle saving a profile
  const toggleSaveProfile = (username: string) => {
    if (savedProfiles.includes(username)) {
      removeProfile(username)
    } else {
      addProfile(username)
    }
  }

  // Add a profile to saved profiles
  const addProfile = (username: string) => {
    // Only add if it doesn't already exist
    if (!savedProfiles.includes(username)) {
      const newSavedProfiles = [...savedProfiles, username]
      setSavedProfiles(newSavedProfiles)
      saveProfilesToStorage(newSavedProfiles)

      toast.success("Profile saved", {
        description: `${username} has been added to your saved profiles`,
      })
    }
  }

  // Check if a profile is saved
  const isProfileSaved = (username: string) => {
    return savedProfiles.includes(username)
  }

  // Load a saved profile
  const loadSavedProfile = (profileName: string) => {
    searchUser(profileName)
  }

  // Clear the search
  const clearSearch = () => {
    setUsername("")
    clearResults()
    setError(null)
    setHasSearched(false)
  }

  // Remove a profile from saved profiles with undo functionality
  const removeProfile = (username: string) => {
    // Generate a unique ID for this removal action
    const undoId = Date.now()

    // Store the removed profile in our ref for undo functionality
    removedProfilesRef.current.set(username, undoId)

    // Update the saved profiles list
    const newSavedProfiles = savedProfiles.filter((profile) => profile !== username)
    setSavedProfiles(newSavedProfiles)
    saveProfilesToStorage(newSavedProfiles)

    // Show toast with undo button
    toast.error(`Removed ${username} from saved profiles`, {
      duration: 5000,
      action: {
        label: "Undo",
        onClick: () => undoRemoveProfile(username, undoId),
      },
    })
  }

  // Undo the removal of a profile
  const undoRemoveProfile = (username: string, undoId: number) => {
    // Check if this is the most recent removal of this profile
    const storedId = removedProfilesRef.current.get(username)

    if (storedId === undoId) {
      // Add the profile back to the saved list
      setSavedProfiles((currentProfiles) => {
        // Only add if it doesn't already exist
        if (!currentProfiles.includes(username)) {
          const updatedProfiles = [...currentProfiles, username]
          saveProfilesToStorage(updatedProfiles)
          toast.success(`Restored ${username} to saved profiles`)
          return updatedProfiles
        }
        return currentProfiles
      })

      // Remove from our tracking ref
      removedProfilesRef.current.delete(username)
    }
  }

  return (
    <main className="container mx-auto py-8 px-4 max-w-4xl">
      <header className="mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-black">GitHub Profile Search</h1>
        </div>
      </header>

      <SearchBar
        username={username}
        setUsername={setUsername}
        searchUser={searchUser}
        clearSearch={clearSearch}
        loading={loading}
        error={error}
      />

      {/* Saved profiles section moved below search - always show this section */}
      <SavedProfiles savedProfiles={savedProfiles} loadSavedProfile={loadSavedProfile} removeProfile={removeProfile} />

      {loading ? (
        <div className="space-y-6">
          <ProfileSkeleton />
          <RepositorySkeleton />
        </div>
      ) : (
        <>
          {user ? (
            <div className="space-y-6">
              <ProfileCard
                user={user}
                isProfileSaved={isProfileSaved(user.login)}
                toggleSaveProfile={() => toggleSaveProfile(user.login)}
              />

              <RepositoryList repos={repos} />
            </div>
          ) : (
            !error && !hasSearched && <EmptyState />
          )}
        </>
      )}
    </main>
  )
}

