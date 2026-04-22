'use client'

import React, { useState } from 'react'
import {
  MapIcon,
  MusicalNoteIcon,
  ChatBubbleBottomCenterIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable'
import SortableItem from '@/components/SortableItem'
import { Panel } from '@/types'

const initialPanels: Panel[] = [
  { id: '1', title: 'Map', icon: MapIcon, isOpen: true },
  { id: '2', title: 'Music', icon: MusicalNoteIcon, isOpen: true },
  { id: '3', title: 'Chat', icon: ChatBubbleBottomCenterIcon, isOpen: false },
]

export default function Home() {
  const [panels, setPanels] = useState<Panel[]>(initialPanels)
  const [activeId, setActiveId] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveId(null)

    if (over && active.id !== over.id) {
      setPanels((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  const togglePanel = (id: string) => {
    setPanels((prev) =>
      prev.map((panel) =>
        panel.id === id ? { ...panel, isOpen: !panel.isOpen } : panel
      )
    )
  }

  const openPanel = (id: string) => {
    setPanels((prev) =>
      prev.map((panel) =>
        panel.id === id ? { ...panel, isOpen: true } : panel
      )
    )
  }

  return (
    <main className="flex min-h-screen bg-white">
      {/* 左侧固定图标栏 */}
      <aside className="w-16 bg-white border-r border-gray-200 flex flex-col items-center py-4 gap-6 fixed left-0 top-0 bottom-0 z-10">
        {panels.map((panel) => (
          <button
            key={panel.id}
            onClick={() => (panel.isOpen ? togglePanel(panel.id) : openPanel(panel.id))}
            className={`flex flex-col items-center gap-1 transition-opacity duration-200 ${
              panel.isOpen ? 'opacity-100' : 'opacity-30'
            }`}
            title={panel.title}
          >
            <panel.icon className="w-6 h-6 text-gray-800" />
            <span className="text-xs text-gray-600">{panel.title}</span>
          </button>
        ))}
      </aside>

      {/* 右侧面板区域 */}
      <div className="flex-1 ml-16 overflow-x-auto">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={panels.map((p) => p.id)}
            strategy={horizontalListSortingStrategy}
          >
            <div className="flex min-w-max">
              {panels.map((panel) => (
                <SortableItem
                  key={panel.id}
                  panel={panel}
                  isDragging={activeId === panel.id}
                  onClose={() => togglePanel(panel.id)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </main>
  )
}
