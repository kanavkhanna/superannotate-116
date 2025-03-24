"use client"

import { Search } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { GitHubUser } from "@/types/github"

interface EmptyStateProps {
  popularProfiles: GitHubUser[]
  onProfileClick: (username: string) => void
}

export function EmptyState({ popularProfiles, onProfileClick }: EmptyStateProps) {
  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center space-y-4 border-2 border-dashed border-primary/20 rounded-lg">
        <div className="bg-primary/10 p-3 rounded-full">
          <Search className="h-6 w-6 text-primary/70" />
        </div>
        <h2 className="text-xl font-semibold text-black">Search for GitHub Profiles</h2>
        <p className="text-muted-foreground max-w-md">
          Enter a GitHub username in the search box above to view their profile information and repositories. You can
          also save profiles for quick access later.
        </p>
      </div>

      {popularProfiles.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4 text-black">Popular Profiles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {popularProfiles.map((profile) => (
              <Card
                key={profile.login}
                className="cursor-pointer hover:shadow-md transition-all duration-200"
                onClick={() => onProfileClick(profile.login)}
              >
                <CardHeader className="flex flex-row items-center gap-3 pb-2">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={profile.avatar_url} alt={profile.login} />
                    <AvatarFallback>{profile.login.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base">{profile.name || profile.login}</CardTitle>
                    <p className="text-sm text-muted-foreground">@{profile.login}</p>
                  </div>
                </CardHeader>
                {profile.bio && (
                  <CardContent className="pt-0">
                    <p className="text-sm line-clamp-2">{profile.bio}</p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

