'use client'

import { useState } from 'react'
import Link from 'next/link'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border z-50">
      <nav className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">Y</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm">YESTRIDE</span>
            <span className="text-xs text-muted-foreground">源踔科技</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-sm hover:text-primary transition-colors">
            产品
          </Link>
          <Link href="#showcase" className="text-sm hover:text-primary transition-colors">
            案例
          </Link>
          <Link href="#contact" className="text-sm hover:text-primary transition-colors">
            关于
          </Link>
        </div>

        {/* CTA Button */}
        <div className="hidden md:flex gap-3">
          <button className="px-6 py-2 rounded-lg border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors text-sm font-medium">
            联系我们
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden w-6 h-6 flex flex-col justify-center gap-1.5"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={`w-full h-0.5 bg-primary transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`w-full h-0.5 bg-primary transition-all ${isOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-full h-0.5 bg-primary transition-all ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 bg-background border-b border-border md:hidden">
            <div className="px-6 py-4 flex flex-col gap-4">
              <Link href="#features" className="text-sm hover:text-primary transition-colors">
                产品
              </Link>
              <Link href="#showcase" className="text-sm hover:text-primary transition-colors">
                案例
              </Link>
              <Link href="#contact" className="text-sm hover:text-primary transition-colors">
                关于
              </Link>
              <button className="px-6 py-2 rounded-lg bg-primary text-primary-foreground font-medium text-sm w-full">
                联系我们
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
