"use client"

import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import type { GitHubUser, GitHubRepo } from "@/types/github"
import { fetchGitHubUser, searchGitHubUsers } from "@/services/github-service"
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
  const [popularProfiles, setPopularProfiles] = useState<GitHubUser[]>([])
  const { toast } = useToast()

  // Load saved profiles from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem("savedGithubProfiles")
    if (saved) {
      setSavedProfiles(JSON.parse(saved))
    }

    // Load some popular profiles for the empty state
    loadPopularProfiles()
  }, [])

  const loadPopularProfiles = async () => {
    try {
      // Get a few popular profiles to display
      const profiles = await searchGitHubUsers("")
      setPopularProfiles(profiles.slice(0, 6))
    } catch (error) {
      console.error("Failed to load popular profiles", error)
    }
  }

  const clearResults = () => {
    setUser(null)
    setRepos([])
  }

  const searchUser = async (searchUsername?: string) => {
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

    setLoading(true)
    setHasSearched(true)

    // Always clear previous results when starting a new search
    clearResults()

    try {
      // Fetch user data from the GitHub service
      const { user, repos } = await fetchGitHubUser(usernameToSearch)

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
    } catch (err) {
      // Handle errors
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred"
      setError(errorMessage)
      clearResults()
    } finally {
      setLoading(false)
    }
  }

  // Update the confirmRemoveProfile function to properly remove the profile
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

  // Make sure the toggleSaveProfile function is correctly implemented
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

  const isProfileSaved = (username: string) => {
    return savedProfiles.includes(username)
  }

  // Load a saved profile
  const loadSavedProfile = (profileName: string) => {
    searchUser(profileName)
  }

  // Update the SearchBar component usage to include the clearSearch function
  const clearSearch = () => {
    setUsername("")
    clearResults()
    setError(null)
    setHasSearched(false)
  }

  // Function to handle removing a profile
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
        searchUser={() => searchUser()}
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
            !error &&
            !hasSearched && (
              <EmptyState popularProfiles={popularProfiles} onProfileClick={(username) => searchUser(username)} />
            )
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

