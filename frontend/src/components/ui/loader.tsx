import { cn } from "@/lib/utils"

interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg"
  color?: string
}

export function Loader({ className, size = "md", color = "#000", ...props }: LoaderProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8"
  }

  return (
    <div 
      className={cn(
        "loader",
        sizeClasses[size],
        className
      )}
      style={{ "--loader-color": color } as React.CSSProperties}
      {...props}
    />
  )
} 