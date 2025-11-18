'use client'

import { useEffect, useRef, useState } from 'react'

const projects = [
  {
    title: '企业数字化转型',
    category: '企业方案',
    description: '为大型制造企业打造完整的数字化平台，提升效率 45%',
    image: 'url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 300%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22400%22 height=%22300%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 fontSize=%2224%22 fontWeight=%22bold%22 textAnchor=%22middle%22 dominantBaseline=%22middle%22 fill=%22%23666%22%3E企业数字化%3C/text%3E%3C/svg%3E")'
  },
  {
    title: '在线教育平台',
    category: '教育科技',
    description: '打造交互式学习平台，支持 10 万+ 并发用户',
    image: 'url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 300%22%3E%3Crect fill=%22%23ececec%22 width=%22400%22 height=%22300%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 fontSize=%2224%22 fontWeight=%22bold%22 textAnchor=%22middle%22 dominantBaseline=%22middle%22 fill=%22%23555%22%3E在线教育%3C/text%3E%3C/svg%3E")'
  },
  {
    title: '生鲜供应链系统',
    category: '物流供应链',
    description: '实时追踪和库存管理系统，减少损耗 30%',
    image: 'url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 300%22%3E%3Crect fill=%22%23e8e8e8%22 width=%22400%22 height=%22300%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 fontSize=%2224%22 fontWeight=%22bold%22 textAnchor=%22middle%22 dominantBaseline=%22middle%22 fill=%22%23444%22%3E供应链系统%3C/text%3E%3C/svg%3E")'
  }
]

export function Showcase() {
  const [visibleProjects, setVisibleProjects] = useState<number[]>([])
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0')
            setVisibleProjects(prev => [...new Set([...prev, index])])
          }
        })
      },
      { threshold: 0.1 }
    )

    const items = sectionRef.current?.querySelectorAll('[data-project-index]')
    items?.forEach(item => observer.observe(item))

    return () => observer.disconnect()
  }, [])

  return (
    <section id="showcase" ref={sectionRef} className="relative py-20 md:py-32 px-6 md:px-12 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-2xl mb-16 md:mb-24">
          <span className="text-xs font-mono tracking-widest text-muted-foreground uppercase">成功案例</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 text-balance">
            打造卓越的数字体验
          </h2>
          <p className="text-lg text-muted-foreground mt-4">
            我们的项目为客户创造了显著的商业价值
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              data-project-index={index}
              className={`group overflow-hidden rounded-xl border border-border hover:border-primary/50 transition-all duration-500 transform ${
                visibleProjects.includes(index)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
            >
              {/* Image */}
              <div 
                className="h-48 md:h-56 bg-cover bg-center group-hover:scale-110 transition-transform duration-500 relative overflow-hidden"
                style={{backgroundImage: project.image}}
              >
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all"></div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <div className="text-xs font-mono tracking-widest text-muted-foreground uppercase mb-2">
                  {project.category}
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-4 transition-all">
                  查看详情
                  <span className="text-lg">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
