export function CTA() {
  return (
    <section id="contact" className="relative py-20 md:py-32 px-6 md:px-12 bg-primary text-primary-foreground overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(90deg, currentColor 1px, transparent 1px), linear-gradient(0deg, currentColor 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
          准备好迈向卓越了吗？
        </h2>
        <p className="text-lg md:text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto leading-relaxed text-balance">
          让我们携手打造下一代产品，为你的业务带来革命性的变化。
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-4 bg-primary-foreground text-primary rounded-lg font-bold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
            立即联系
          </button>
          <button className="px-8 py-4 border-2 border-primary-foreground text-primary-foreground rounded-lg font-bold text-lg hover:bg-primary-foreground/10 transition-all duration-300">
            预约演示
          </button>
        </div>

        {/* Trust Badge */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20">
          <p className="text-sm text-primary-foreground/70 mb-4">受信于</p>
          <div className="flex justify-center gap-6 md:gap-12 flex-wrap">
            <div className="text-primary-foreground/50 font-semibold">FORTUNE 500</div>
            <div className="text-primary-foreground/50 font-semibold">TECH STARTUPS</div>
            <div className="text-primary-foreground/50 font-semibold">GLOBAL PARTNERS</div>
          </div>
        </div>
      </div>
    </section>
  )
}
