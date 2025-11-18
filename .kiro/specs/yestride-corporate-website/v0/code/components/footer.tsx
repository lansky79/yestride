import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-secondary border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">Y</span>
              </div>
              <div>
                <div className="font-bold text-sm">YESTRIDE</div>
                <div className="text-xs text-muted-foreground">源踔科技</div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              成都领先的科技创新公司，为您的业务赋能。
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-bold mb-4">产品</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-primary transition-colors">解决方案</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">技术栈</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">定价</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">案例研究</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold mb-4">公司</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-primary transition-colors">关于我们</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">团队</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">博客</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">新闻</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">联系</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="mailto:hello@yestride.com" className="hover:text-primary transition-colors">hello@yestride.com</Link></li>
              <li><Link href="tel:+86-28-xxxx-xxxx" className="hover:text-primary transition-colors">+86-28-xxxx-xxxx</Link></li>
              <li><span>成都市高新区</span></li>
              <li><span>中国</span></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border my-8"></div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
          <div>© 2025 YESTRIDE (源踔科技). All rights reserved.</div>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-primary transition-colors">隐私政策</Link>
            <Link href="#" className="hover:text-primary transition-colors">服务条款</Link>
            <Link href="#" className="hover:text-primary transition-colors">COOKIES</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
