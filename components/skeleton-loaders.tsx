import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export function ProfileSkeleton() {
  return (
    <Card className="border-primary/20">
      <CardHeader className="flex flex-row items-center gap-4">
        <Skeleton className="h-20 w-20 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <div className="flex gap-4">
          <Skeleton className="h-4 w-24" />
          <div>·</div>
          <Skeleton className="h-4 w-24" />
          <div>·</div>
          <Skeleton className="h-4 w-24" />
        </div>
      </CardContent>
    </Card>
  )
}

export function RepositorySkeleton() {
  return (
    <div>
      <Skeleton className="h-6 w-40 mb-4" />
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="border-primary/20">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <Skeleton className="h-5 w-1/3" />
                <Skeleton className="h-4 w-16" />
              </div>
              <Skeleton className="h-4 w-2/3 mt-2" />
            </CardHeader>
            <CardFooter className="pt-2">
              <Skeleton className="h-6 w-20" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

