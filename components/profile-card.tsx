"use client"

import { Users, Bookmark, BookmarkCheck } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import type { GitHubUser } from "@/types/github"

interface ProfileCardProps {
  user: GitHubUser
  isProfileSaved: boolean
  toggleSaveProfile: () => void
}

export function ProfileCard({ user, isProfileSaved, toggleSaveProfile }: ProfileCardProps) {
  return (
    <Card className="border-primary/20 transition-all duration-200 hover:shadow-md">
      <CardHeader className="flex flex-col sm:flex-row items-center gap-4">
        <Avatar className="h-20 w-20 border border-primary/20">
          <AvatarImage src={user.avatar_url} alt={user.login} />
          <AvatarFallback>{user.login.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex-1 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <CardTitle className="text-2xl text-black mb-2 sm:mb-0">{user.name || user.login}</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSaveProfile}
              title={isProfileSaved ? "Remove from saved profiles" : "Save profile"}
              className="hover:bg-primary/10 transition-colors duration-200"
            >
              {isProfileSaved ? (
                <BookmarkCheck className="h-5 w-5 text-primary" />
              ) : (
                <Bookmark className="h-5 w-5 text-primary/70" />
              )}
            </Button>
          </div>
          <CardDescription className="text-base">
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-primary/70 hover:text-primary transition-colors duration-200"
            >
              @{user.login}
            </a>
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        {user.bio && <p className="mb-4 text-foreground">{user.bio}</p>}
        <div className="flex flex-wrap gap-4 text-muted-foreground justify-center sm:justify-start">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{user.followers} followers</span>
          </div>
          <div className="hidden sm:block">·</div>
          <div>{user.following} following</div>
          <div className="hidden sm:block">·</div>
          <div>{user.public_repos} repositories</div>
        </div>
      </CardContent>
    </Card>
  )
}

