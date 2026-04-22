export interface Panel {
  id: string
  title: string
  icon: React.ComponentType<{ className?: string }>
  isOpen: boolean
}
