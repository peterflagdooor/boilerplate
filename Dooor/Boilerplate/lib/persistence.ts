export interface PanelState {
  isOpen: boolean
  width: number
  isPinned: boolean
}

export interface LayoutState {
  globalNav: { isOpen: boolean }
  altMenu: PanelState
  rightSidebar: PanelState
}

const STORAGE_KEY = 'layout-state'

const defaultState: LayoutState = {
  globalNav: { isOpen: true }, // Always visible by default
  altMenu: {
    isOpen: false,
    width: 280,
    isPinned: false,
  },
  rightSidebar: {
    isOpen: false,
    width: 360,
    isPinned: false,
  },
}

export function saveLayoutState(state: LayoutState): void {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch (error) {
      console.warn('Failed to save layout state:', error)
    }
  }
}

export function loadLayoutState(): LayoutState {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        // Merge with defaults to handle missing properties
        return {
          ...defaultState,
          ...parsed,
          altMenu: { ...defaultState.altMenu, ...parsed.altMenu },
          rightSidebar: { ...defaultState.rightSidebar, ...parsed.rightSidebar },
        }
      }
    } catch (error) {
      console.warn('Failed to load layout state:', error)
    }
  }
  return defaultState
}
