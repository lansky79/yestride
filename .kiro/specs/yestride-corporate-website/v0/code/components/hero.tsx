'use client'

import { useEffect, useState } from 'react'

export function Hero() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(90deg, currentColor 1px, transparent 1px), linear-gradient(0deg, currentColor 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Animated Background Orbs */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-64 h-64 bg-secondary/5 rounded-full blur-3xl"></div>

      {/* Version Badge */}
      <div className="absolute top-32 right-6 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-mono font-bold">
        v4 UPDATED
      </div>

      <div className="relative max-w-5xl mx-auto px-6 md:px-12 text-center">
        <div 
          className={`space-y-6 transform transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          {/* Tagline */}
          <div className="inline-block">
            <span className="text-xs md:text-sm font-mono tracking-widest text-muted-foreground uppercase">
             YES!STRIDE WITH AI
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-balance">
            <span className="text-red-600 font-bold">YES!STRIDE WITH AI</span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed text-balance">
            YESTRIDE 源踔科技 - 成都领先的科技创新公司，致力于用前沿技术赋能企业，每一步都迈向卓越。
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300">
              开始探索
            </button>
            <button className="px-8 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300">
              了解更多
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 pt-12 md:pt-16 border-t border-border">
            <div>
              <div className="text-3xl md:text-4xl font-bold">50+</div>
              <div className="text-sm text-muted-foreground">成功案例</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold">100+</div>
              <div className="text-sm text-muted-foreground">满意客户</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold">10+</div>
              <div className="text-sm text-muted-foreground">行业经验</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
