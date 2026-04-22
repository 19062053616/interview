'use client'

import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Panel } from '@/types'

interface SortableItemProps {
  panel: Panel
  isDragging: boolean
  onClose: () => void
}

export default function SortableItem({ panel, isDragging, onClose }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: panel.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  if (!panel.isOpen) {
    return null
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`w-80 min-h-screen bg-white border-r border-gray-200 flex-shrink-0 ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      {/* 面板头部 - 可拖拽 */}
      <div className="h-12 flex items-center justify-center relative cursor-grab active:cursor-grabbing border-b border-gray-100">
        <span className="text-gray-800 font-medium text-center">{panel.title}</span>
        <button
          onClick={(e) => {
            e.stopPropagation()
            onClose()
          }}
          onPointerDown={(e) => e.stopPropagation()}
          className="absolute right-2 text-gray-400 hover:text-gray-600 text-lg leading-none w-6 h-6 flex items-center justify-center"
        >
          ×
        </button>
      </div>

      {/* 面板内容 - 空白 */}
      <div className="p-4" />
    </div>
  )
}
