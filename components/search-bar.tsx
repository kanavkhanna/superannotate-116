"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Search, AlertCircle, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { searchGitHubUsers } from "@/services/github-service"
import type { GitHubUser } from "@/types/github"

interface SearchBarProps {
  username: string
  setUsername: (username: string) => void
  searchUser: (username?: string) => void // Updated to accept a username parameter
  clearSearch: () => void
  loading: boolean
  error: string | null
}

export function SearchBar({ username, setUsername, searchUser, clearSearch, loading, error }: SearchBarProps) {
  const [suggestions, setSuggestions] = useState<GitHubUser[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      setShowSuggestions(false)
      searchUser() // Search with current username from state
    } else if (e.key === "Escape") {
      setShowSuggestions(false)
    }
  }

  const handleInputChange = (value: string) => {
    setUsername(value)

    // Clear previous timeout
    if (searchTimeout) {
      clearTimeout(searchTimeout)
    }

    // Set a new timeout to search after typing stops
    const timeout = setTimeout(() => {
      if (value.trim()) {
        searchGitHubUsers(value)
          .then((results) => {
            setSuggestions(results)
            setShowSuggestions(results.length > 0)
          })
          .catch((error) => {
            console.error("Error fetching suggestions:", error)
            setSuggestions([])
            setShowSuggestions(false)
          })
      } else {
        setSuggestions([])
        setShowSuggestions(false)
      }
    }, 300)

    setSearchTimeout(timeout)
  }

  // Updated to pass the username directly to searchUser
  const handleSuggestionClick = (login: string) => {
    setUsername(login)
    setShowSuggestions(false)
    // Pass the username directly to searchUser to avoid timing issues
    searchUser(login)
  }

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout)
      }
    }
  }, [searchTimeout])

  return (
    <div className="flex flex-col gap-2 mb-8">
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Input
            placeholder="Enter GitHub username"
            value={username}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => username.trim() && suggestions.length > 0 && setShowSuggestions(true)}
            className="flex-1 text-foreground transition-all duration-200 focus:ring-2 focus:ring-primary/50 pr-10"
            aria-label="GitHub username"
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? "username-error" : undefined}
          />
          {username && (
            <button
              onClick={clearSearch}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-200"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}

          {/* Suggestions dropdown */}
          {showSuggestions && (
            <div
              ref={suggestionsRef}
              className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto"
            >
              {suggestions.map((user) => (
                <div
                  key={user.login}
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSuggestionClick(user.login)}
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                    <img
                      src={user.avatar_url || "/placeholder.svg"}
                      alt={user.login}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{user.name || user.login}</p>
                    <p className="text-sm text-gray-500 truncate">@{user.login}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <Button onClick={() => searchUser()} disabled={loading} className="transition-all duration-200 hover:shadow-md">
          {loading ? "Searching..." : "Search"}
          <Search className="ml-2 h-4 w-4" />
        </Button>
      </div>

      {error && (
        <Alert variant="destructive" className="mt-2">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription id="username-error">{error}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}

