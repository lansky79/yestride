const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// 中间件
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.static(__dirname));

// 读取配置
app.get('/api/config', (req, res) => {
    try {
        const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
        res.json(config);
    } catch (error) {
        res.status(500).json({ error: '读取配置失败' });
    }
});

// 保存配置
app.post('/api/config', (req, res) => {
    try {
        fs.writeFileSync('config.json', JSON.stringify(req.body, null, 2));
        res.json({ success: true, message: '配置保存成功' });
    } catch (error) {
        res.status(500).json({ error: '保存配置失败' });
    }
});

// 生成网站
app.post('/api/generate', (req, res) => {
    try {
        const config = req.body;
        const html = generateHTML(config);
        
        // 创建output目录
        const outputDir = path.join(__dirname, 'output');
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir);
        }
        
        // 保存HTML文件
        fs.writeFileSync(path.join(outputDir, 'index.html'), html);
        
        // 复制CSS和JS文件
        const cssDir = path.join(outputDir, 'css');
        const jsDir = path.join(outputDir, 'js');
        if (!fs.existsSync(cssDir)) fs.mkdirSync(cssDir);
        if (!fs.existsSync(jsDir)) fs.mkdirSync(jsDir);
        
        res.json({ 
            success: true, 
            message: '网站生成成功！文件保存在 output 文件夹',
            path: path.join(outputDir, 'index.html')
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: '生成网站失败: ' + error.message });
    }
});

// HTML生成函数（支持模块配置）
function generateHTML(config) {
    // 检查模块是否启用
    const isModuleEnabled = (moduleName) => {
        return !config.modules || !config.modules[moduleName] || config.modules[moduleName].enabled !== false;
    };
    
    const isHeroFeatureEnabled = (feature) => {
        return !config.modules || !config.modules.hero || config.modules.hero[feature] !== false;
    };
    
    const servicesHTML = (config.services || []).map((service) => {
        const colors = {
            orange: 'icon-bg-orange',
            blue: 'icon-bg-blue',
            purple: 'icon-bg-purple',
            green: 'icon-bg-green'
        };
        const colorClass = colors[service.color] || colors.orange;
        
        return `
            <div class="card">
                <div class="${colorClass} w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                    </svg>
                </div>
                <h3 class="font-bold text-lg mb-3">${service.title}</h3>
                <p class="text-gray-600 text-sm mb-4">${service.description}</p>
                <div class="text-sm text-gray-500">${service.features}</div>
            </div>
        `;
    }).join('');

    return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="${config.company.description}">
    <title>${config.company.name} - ${config.company.slogan}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        body {
            background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAyMCAwIEwgMCAwIDAgMjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2YwZjBmMCIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+');
            background-color: #ffffff;
            font-family: 'Inter', sans-serif;
        }
        html { scroll-behavior: smooth; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
        .btn-primary { background-color: #FF6B00; color: white; padding: 0.75rem 1.5rem; border-radius: 6px; font-weight: 500; transition: 0.3s; display: inline-block; text-decoration: none; }
        .btn-primary:hover { background-color: #E05E00; }
        .btn-secondary { background-color: white; color: #333; padding: 0.75rem 1.5rem; border-radius: 6px; font-weight: 500; border: 1px solid #E0E0E0; transition: 0.3s; display: inline-block; text-decoration: none; }
        .btn-secondary:hover { background-color: #F8F8F8; }
        .card { background: white; border-radius: 8px; padding: 2rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); transition: 0.3s; }
        .card:hover { box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .icon-bg-orange { background-color: #FFF4E6; color: #FF6B00; }
        .icon-bg-blue { background-color: #EFF6FF; color: #3B82F6; }
        .icon-bg-green { background-color: #F0FDF4; color: #10B981; }
        .icon-bg-purple { background-color: #F5F3FF; color: #8B5CF6; }
        .header-shadow { box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
        @media (max-width: 768px) { h1 { font-size: 2rem !important; } h2 { font-size: 1.75rem !important; } }
    </style>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: { orange: { 500: '#FF6B00', 600: '#E05E00' } },
                    fontFamily: { 'inter': ['Inter', 'sans-serif'] }
                }
            }
        }
    </script>
</head>
<body class="font-inter">
    <header class="bg-white border-b border-gray-200 sticky top-0 z-50" id="header">
        <div class="container mx-auto px-4 py-3 flex justify-between items-center">
            <div class="flex items-center">
                <a href="#" class="text-orange-500 font-bold text-xl">${config.company.name}</a>
                <span class="ml-2 text-gray-600 text-sm hidden md:inline">${config.company.nameCn}</span>
            </div>
            <nav class="hidden md:flex space-x-6">
                <a href="#home" class="text-gray-700 hover:text-orange-500 transition">首页</a>
                <a href="#services" class="text-gray-700 hover:text-orange-500 transition">业务服务</a>
                <a href="#about" class="text-gray-700 hover:text-orange-500 transition">关于我们</a>
                <a href="#contact" class="text-gray-700 hover:text-orange-500 transition">联系我们</a>
            </nav>
            <div class="flex items-center space-x-3">
                <a href="#contact" class="btn-primary hidden md:inline-block">立即咨询</a>
                <button id="mobile-menu-btn" class="md:hidden text-gray-700">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            </div>
        </div>
        <div id="mobile-menu" class="hidden md:hidden bg-white border-t border-gray-200">
            <nav class="container mx-auto px-4 py-4 flex flex-col space-y-3">
                <a href="#home" class="text-gray-700">首页</a>
                <a href="#services" class="text-gray-700">业务服务</a>
                <a href="#about" class="text-gray-700">关于我们</a>
                <a href="#contact" class="text-gray-700">联系我们</a>
                <a href="#contact" class="btn-primary text-center">立即咨询</a>
            </nav>
        </div>
    </header>

    ${isModuleEnabled('hero') ? `
    <section id="home" class="py-12 md:py-20">
        <div class="container mx-auto px-4 text-center">
            ${isHeroFeatureEnabled('showBadge') ? `
            <div class="inline-flex items-center bg-orange-500 text-white text-xs px-3 py-1 rounded-full mb-4">
                <span class="font-medium">NEW</span>
                <span class="ml-2">${config.hero?.badge || ''}</span>
            </div>` : ''}
            <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">${config.hero?.title || ''}</h1>
            <p class="text-gray-600 max-w-2xl mx-auto mb-8 text-lg">${config.hero?.subtitle || ''}</p>
            ${isHeroFeatureEnabled('showCTAButtons') ? `
            <div class="flex flex-col md:flex-row justify-center gap-4 mb-8">
                <a href="#contact" class="btn-primary">立即咨询</a>
                <a href="#services" class="btn-secondary">了解更多</a>
            </div>` : ''}
            ${isHeroFeatureEnabled('showSocialProof') || isHeroFeatureEnabled('showClientStats') || isHeroFeatureEnabled('showRatings') ? `
            <div class="flex flex-col items-center mb-8">
                ${isHeroFeatureEnabled('showClientStats') ? `<p class="text-sm text-gray-500 mb-3">已服务 ${config.hero?.stats?.clients || ''} ${config.hero?.stats?.clientsLabel || ''}</p>` : ''}
                ${isHeroFeatureEnabled('showSocialProof') ? `
                <div class="flex -space-x-2 mb-4">
                    <div class="w-10 h-10 rounded-full bg-orange-200 border-2 border-white"></div>
                    <div class="w-10 h-10 rounded-full bg-blue-200 border-2 border-white"></div>
                    <div class="w-10 h-10 rounded-full bg-green-200 border-2 border-white"></div>
                    <div class="w-10 h-10 rounded-full bg-purple-200 border-2 border-white"></div>
                    <div class="w-10 h-10 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs text-gray-600 font-medium">+46</div>
                </div>` : ''}
                ${isHeroFeatureEnabled('showRatings') ? `
                <div class="flex items-center">
                    <div class="flex text-yellow-400">
                        ${'<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>'.repeat(5)}
                    </div>
                    <span class="ml-2 text-sm text-gray-600">5.0 (50+ 评价)</span>
                </div>` : ''}
            </div>` : ''}
        </div>
    </section>` : ''}

    ${isModuleEnabled('techStack') && config.techStack && config.techStack.length > 0 ? `
    <section class="py-8 bg-gray-50">
        <div class="container mx-auto px-4">
            <div class="flex flex-wrap justify-center items-center gap-8 md:gap-12">
                ${config.techStack.map(tech => `
                    <div class="flex items-center">
                        <div class="w-3 h-3 bg-${tech.color}-500 rounded-full mr-2"></div>
                        <span class="text-gray-700 font-medium">${tech.name}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>` : ''}

    ${isModuleEnabled('services') && config.services && config.services.length > 0 ? `
    <section id="services" class="py-16">
        <div class="container mx-auto px-4">
            <h2 class="text-3xl font-bold text-center mb-4">${config.company?.name || ''} 核心业务</h2>
            <p class="text-gray-600 text-center mb-12">为政企客户提供全方位AI解决方案</p>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                ${servicesHTML}
            </div>
        </div>
    </section>` : ''}

    ${isModuleEnabled('cases') && config.cases && config.cases.length > 0 ? `
    <section id="cases" class="py-16 bg-white">
        <div class="container mx-auto px-4">
            <h2 class="text-3xl font-bold text-center mb-4">成功案例</h2>
            <p class="text-gray-600 text-center mb-12">我们为客户创造的价值</p>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                ${(config.cases || []).map(caseItem => `
                    <div class="card">
                        ${caseItem.image ? `<img src="${caseItem.image}" alt="${caseItem.title}" class="w-full h-48 object-cover rounded-lg mb-4" onerror="this.style.display='none'">` : ''}
                        <div class="inline-block bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded mb-3">${caseItem.category}</div>
                        <h3 class="font-bold text-lg mb-3">${caseItem.title}</h3>
                        <p class="text-gray-600 text-sm mb-4">${caseItem.description}</p>
                        ${caseItem.tags && caseItem.tags.length > 0 ? `
                        <div class="flex flex-wrap gap-2 mb-4">
                            ${caseItem.tags.map(tag => `<span class="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">${tag}</span>`).join('')}
                        </div>` : ''}
                        ${caseItem.highlights && caseItem.highlights.length > 0 ? `
                        <div class="border-t pt-4">
                            <p class="text-sm font-bold mb-2">项目亮点：</p>
                            <ul class="text-sm text-gray-600 space-y-1">
                                ${caseItem.highlights.map(h => `<li>• ${h}</li>`).join('')}
                            </ul>
                        </div>` : ''}
                    </div>
                `).join('')}
            </div>
        </div>
    </section>` : ''}

    ${isModuleEnabled('advantages') && config.advantages && config.advantages.length > 0 ? `
    <section id="about" class="py-16 bg-gray-50">
        <div class="container mx-auto px-4">
            <h2 class="text-3xl font-bold text-center mb-12">为什么选择${config.company?.name || ''}</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                ${(config.advantages || []).map(adv => `
                    <div class="text-center">
                        <div class="icon-bg-${adv.color} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                        <h3 class="font-bold text-lg mb-3">${adv.title}</h3>
                        <p class="text-gray-600 text-sm">${adv.description}</p>
                    </div>
                `).join('')}
            </div>
            ${isModuleEnabled('stats') && config.stats && config.stats.length > 0 ? `
            <div class="text-center mb-16">
                <h2 class="text-2xl font-bold mb-8">客户信赖${config.company?.name || ''}</h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    ${(config.stats || []).map(stat => `
                        <div>
                            <div class="text-4xl font-bold text-orange-500 mb-2">${stat.number}</div>
                            <p class="text-gray-600">${stat.label}</p>
                        </div>
                    `).join('')}
                </div>
            </div>` : ''}
            ${isModuleEnabled('process') && config.process && config.process.length > 0 ? `
            <div>
                <h2 class="text-2xl font-bold text-center mb-12">与${config.company?.name || ''}合作流程</h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    ${(config.process || []).map(step => `
                        <div class="text-center">
                            <div class="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span class="text-orange-500 font-bold">${step.step}</span>
                            </div>
                            <h3 class="font-bold text-lg mb-3">${step.title}</h3>
                            <p class="text-gray-600 text-sm">${step.description}</p>
                        </div>
                    `).join('')}
                </div>
            </div>` : ''}
        </div>
    </section>` : ''}

    ${isModuleEnabled('cta') ? `
    <section id="contact" class="py-16">
        <div class="container mx-auto px-4 text-center">
            <h2 class="text-3xl font-bold mb-4">${config.cta?.title || ''}</h2>
            <p class="text-gray-600 mb-8">${config.cta?.subtitle || ''}</p>
            <div class="flex flex-col md:flex-row justify-center gap-4">
                <a href="tel:${config.contact?.phone || ''}" class="btn-primary">${config.cta?.buttonText || '立即咨询'}</a>
                <a href="mailto:${config.contact?.email || ''}" class="btn-secondary">预约演示</a>
            </div>
        </div>
    </section>` : ''}

    <footer class="bg-gray-900 text-white py-12">
        <div class="container mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                <div>
                    <h3 class="text-orange-500 font-bold text-xl mb-2">${config.company.name}</h3>
                    <p class="text-gray-400 text-sm mb-2">${config.company.nameCn}</p>
                    <p class="text-gray-400 text-sm">${config.company.slogan}</p>
                </div>
                <div>
                    <h4 class="font-bold mb-4">业务服务</h4>
                    <ul class="space-y-2 text-sm text-gray-400">
                        ${config.services.map(s => `<li><a href="#services" class="hover:text-orange-500 transition">${s.title}</a></li>`).join('')}
                    </ul>
                </div>
                <div>
                    <h4 class="font-bold mb-4">关于我们</h4>
                    <ul class="space-y-2 text-sm text-gray-400">
                        <li><a href="#about" class="hover:text-orange-500 transition">公司简介</a></li>
                        <li><a href="#about" class="hover:text-orange-500 transition">团队介绍</a></li>
                        <li><a href="#contact" class="hover:text-orange-500 transition">联系我们</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-bold mb-4">联系方式</h4>
                    <ul class="space-y-2 text-sm text-gray-400">
                        <li>电话：${config.contact.phone}</li>
                        <li>邮箱：${config.contact.email}</li>
                        <li>地址：${config.contact.address}</li>
                    </ul>
                </div>
            </div>
            <div class="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
                <p>${config.footer.copyright} | ${config.footer.icp}</p>
            </div>
        </div>
    </footer>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const mobileMenuBtn = document.getElementById('mobile-menu-btn');
            const mobileMenu = document.getElementById('mobile-menu');
            const header = document.getElementById('header');
            
            if (mobileMenuBtn && mobileMenu) {
                mobileMenuBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
                mobileMenu.querySelectorAll('a').forEach(link => {
                    link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
                });
            }
            
            if (header) {
                window.addEventListener('scroll', () => {
                    header.classList.toggle('header-shadow', window.scrollY > 10);
                });
            }
            
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                });
            });
        });
    </script>
</body>
</html>`;
}

// 提供output目录的静态文件服务
app.use('/output', express.static(path.join(__dirname, 'output')));

app.listen(PORT, () => {
    console.log(`\n🚀 Yestride编辑器已启动！`);
    console.log(`📝 基础版: http://localhost:${PORT}/editor.html`);
    console.log(`📝 强大版: http://localhost:${PORT}/editor-v2.html`);
    console.log(`📝 模块配置版: http://localhost:${PORT}/editor-v3.html\n`);
});
