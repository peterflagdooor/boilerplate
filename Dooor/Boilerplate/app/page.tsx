export default function HomePage() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2">
      <div className="text-2xl font-medium">Select an item</div>
      <div className="text-sm text-muted-foreground">
        No item is selected. Please select one from the sidebar.
      </div>
    </div>
  )
}

