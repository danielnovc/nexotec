import * as React from "react"
import { cva } from "class-variance-authority"

const TabsContext = React.createContext<{
  value: string
  setValue: (value: string) => void
} | null>(null)

export function Tabs({ value, onValueChange, children, className }: {
  value: string
  onValueChange: (value: string) => void
  children: React.ReactNode
  className?: string
}) {
  return (
    <TabsContext.Provider value={{ value, setValue: onValueChange }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  )
}

export function TabsList({ children, className }: { children: React.ReactNode, className?: string }) {
  return <div className={"inline-flex rounded-md bg-muted p-1 " + (className || "")}>{children}</div>
}

export function TabsTrigger({ value, children, className }: { value: string, children: React.ReactNode, className?: string }) {
  const ctx = React.useContext(TabsContext)
  if (!ctx) throw new Error("TabsTrigger must be used within Tabs")
  const isActive = ctx.value === value
  return (
    <button
      type="button"
      className={
        "px-3 py-1.5 text-sm font-medium rounded-md transition-colors " +
        (isActive ? "bg-background text-foreground shadow" : "text-muted-foreground hover:text-foreground") +
        (className ? " " + className : "")
      }
      onClick={() => ctx.setValue(value)}
      aria-selected={isActive}
      tabIndex={isActive ? 0 : -1}
    >
      {children}
    </button>
  )
}

export function TabsContent({ value, children, className }: { value: string, children: React.ReactNode, className?: string }) {
  const ctx = React.useContext(TabsContext)
  if (!ctx) throw new Error("TabsContent must be used within Tabs")
  if (ctx.value !== value) return null
  return <div className={className}>{children}</div>
} 