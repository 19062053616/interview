import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '拖拽排序面板组件',
  description: '基于 Next.js + DNDKit 的水平拖拽排序面板',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  )
}
