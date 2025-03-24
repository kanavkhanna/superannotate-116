"use client"

import { Star } from "lucide-react"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { GitHubRepo } from "@/types/github"

interface RepositoryListProps {
  repos: GitHubRepo[]
}

export function RepositoryList({ repos }: RepositoryListProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-black">Repositories</h2>
      <div className="space-y-4">
        {repos.length > 0 ? (
          repos.map((repo) => (
            <Card key={repo.id} className="border-primary/20 transition-all duration-200 hover:shadow-md">
              <CardHeader className="pb-2">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
                  <CardTitle className="text-lg text-foreground">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline text-primary/90 hover:text-primary transition-colors duration-200"
                    >
                      {repo.name}
                    </a>
                  </CardTitle>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-warning mr-1" />
                    <span className="text-foreground">{repo.stargazers_count}</span>
                  </div>
                </div>
                {repo.description && (
                  <CardDescription className="text-sm mt-1 text-muted-foreground">{repo.description}</CardDescription>
                )}
              </CardHeader>
              <CardFooter className="pt-2">
                {repo.language && (
                  <Badge variant="outline" className="border-primary/20 text-foreground">
                    {repo.language}
                  </Badge>
                )}
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="text-center py-8 text-muted-foreground border-2 border-dashed border-primary/20 rounded-lg">
            No repositories found for this user.
          </div>
        )}
      </div>
    </div>
  )
}

