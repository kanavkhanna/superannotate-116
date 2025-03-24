"use client"

import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import type { GitHubUser, GitHubRepo } from "@/types/github"
import { fetchGitHubUser } from "@/services/github-service"
import { SearchBar } from "@/components/search-bar"
import { ProfileCard } from "@/components/profile-card"
import { RepositoryList } from "@/components/repository-list"
import { SavedProfiles } from "@/components/saved-profiles"
import { EmptyState } from "@/components/empty-state"
import { ProfileSkeleton, RepositorySkeleton } from "@/components/skeleton-loaders"
import { ConfirmationDialog } from "@/components/confirmation-dialog"

export default function Home() {
  const [username, setUsername] = useState("")
  const [user, setUser] = useState<GitHubUser | null>(null)
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [savedProfiles, setSavedProfiles] = useState<string[]>([])
  const [hasSearched, setHasSearched] = useState(false)
  const [profileToRemove, setProfileToRemove] = useState<string | null>(null)
  const { toast } = useToast()

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

  // Clear search results
  const clearResults = () => {
    setUser(null)
    setRepos([])
  }

  // Search for a GitHub user - updated to ensure the username parameter is properly handled
  const searchUser = (searchUsername?: string) => {
    // Use the provided username or fall back to the state value
    const usernameToSearch = searchUsername || username

    // For debugging
    console.log("Searching for user:", usernameToSearch)

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
        toast({
          title: "Profile loaded",
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

  // Confirm removal of a saved profile
  const confirmRemoveProfile = () => {
    if (profileToRemove) {
      const newSavedProfiles = savedProfiles.filter((profile) => profile !== profileToRemove)
      setSavedProfiles(newSavedProfiles)
      localStorage.setItem("savedGithubProfiles", JSON.stringify(newSavedProfiles))

      toast({
        title: "Profile removed",
        description: `${profileToRemove} has been removed from your saved profiles`,
        variant: "destructive",
      })

      setProfileToRemove(null)
    }
  }

  // Toggle saving a profile
  const toggleSaveProfile = (username: string) => {
    if (savedProfiles.includes(username)) {
      setProfileToRemove(username)
    } else {
      const newSavedProfiles = [...savedProfiles, username]
      setSavedProfiles(newSavedProfiles)
      localStorage.setItem("savedGithubProfiles", JSON.stringify(newSavedProfiles))

      toast({
        title: "Profile saved",
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

  // Remove a profile from saved profiles
  const removeFromSavedProfiles = (username: string) => {
    setProfileToRemove(username)
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

      <SavedProfiles
        savedProfiles={savedProfiles}
        loadSavedProfile={loadSavedProfile}
        removeProfile={removeFromSavedProfiles}
      />

      <ConfirmationDialog
        isOpen={!!profileToRemove}
        onClose={() => setProfileToRemove(null)}
        onConfirm={confirmRemoveProfile}
        title="Remove Saved Profile"
        description={`Are you sure you want to remove "${profileToRemove}" from your saved profiles?`}
        confirmText="Remove"
        cancelText="Cancel"
      />
    </main>
  )
}

