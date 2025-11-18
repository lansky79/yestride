'use client'

import { useEffect, useRef, useState } from 'react'

const features = [
  {
    number: '01',
    title: '创新驱动',
    description: '以前沿技术为核心，不断创新产品和解决方案，超越行业标准。'
  },
  {
    number: '02',
    title: '精准交付',
    description: '严谨的项目管理体系，确保每一个项目都按时保质完成交付。'
  },
  {
    number: '03',
    title: '客户至上',
    description: '深入理解客户需求，提供定制化解决方案和专业的持续支持。'
  },
  {
    number: '04',
    title: '技术卓越',
    description: '汇聚行业顶尖人才，掌握最新技术栈，保持竞争优势。'
  }
]

export function Features() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0')
            setVisibleItems(prev => [...new Set([...prev, index])])
          }
        })
      },
      { threshold: 0.1 }
    )

    const items = sectionRef.current?.querySelectorAll('[data-index]')
    items?.forEach(item => observer.observe(item))

    return () => observer.disconnect()
  }, [])

  return (
    <section id="features" ref={sectionRef} className="relative py-20 md:py-32 px-6 md:px-12 bg-secondary">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-2xl mb-16 md:mb-24">
          <span className="text-xs font-mono tracking-widest text-muted-foreground uppercase">核心优势</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 text-balance">
            为什么选择 YESTRIDE
          </h2>
          <p className="text-lg text-muted-foreground mt-4">
            我们提供业界领先的技术服务和解决方案
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {features.map((feature, index) => (
            <div
              key={index}
              data-index={index}
              className={`group p-8 md:p-10 border border-border rounded-xl hover:border-primary/50 transition-all duration-500 transform ${
                visibleItems.includes(index) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="flex items-start gap-4 md:gap-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-16 w-16 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors text-2xl font-bold text-muted-foreground">
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-mono text-muted-foreground mb-2">STEP {feature.number}</div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
