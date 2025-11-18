<!-- 导航栏 -->
<header class="fixed top-0 w-full bg-white/95 backdrop-blur border-b border-gray-200 z-50" style="background: rgba(255, 255, 255, 0.95);">
    <nav class="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
        <!-- Logo -->
        <a href="/" class="flex items-center gap-2 group">
            <div class="w-8 h-8 bg-black rounded-sm flex items-center justify-center">
                <span class="text-white font-bold text-lg">Y</span>
            </div>
            <div class="flex flex-col">
                <span class="font-bold text-sm">yestride</span>
                <span class="text-xs text-gray-500">源踔科技</span>
            </div>
        </a>

        <!-- Desktop Nav -->
        <div class="hidden md:flex items-center gap-8">
            <a href="#features" class="text-sm hover:text-black transition-colors text-gray-700">产品</a>
            <a href="#showcase" class="text-sm hover:text-black transition-colors text-gray-700">案例</a>
            <a href="#contact" class="text-sm hover:text-black transition-colors text-gray-700">关于</a>
        </div>

        <!-- CTA Button -->
        <div class="hidden md:flex gap-3">
            <button class="px-6 py-2 rounded-lg border border-black text-black hover:bg-black hover:text-white transition-colors text-sm font-medium">
                联系我们
            </button>
        </div>

        <!-- Mobile Menu Button -->
        <button class="md:hidden w-6 h-6 flex flex-col justify-center gap-1.5 menu-toggle">
            <span class="w-full h-0.5 bg-black transition-all"></span>
            <span class="w-full h-0.5 bg-black transition-all"></span>
            <span class="w-full h-0.5 bg-black transition-all"></span>
        </button>

        <!-- Mobile Menu -->
        <div class="absolute top-full left-0 right-0 bg-white border-b border-gray-200 md:hidden mobile-menu hidden">
            <div class="px-6 py-4 flex flex-col gap-4">
                <a href="#features" class="text-sm hover:text-black transition-colors text-gray-700">产品</a>
                <a href="#showcase" class="text-sm hover:text-black transition-colors text-gray-700">案例</a>
                <a href="#contact" class="text-sm hover:text-black transition-colors text-gray-700">关于</a>
                <button class="px-6 py-2 rounded-lg bg-black text-white font-medium text-sm w-full">
                    联系我们
                </button>
            </div>
        </div>
    </nav>
</header>
