<!-- 核心优势区域 -->
<section id="features" class="relative py-24 md:py-40 px-6 md:px-12 bg-white">
    <div class="max-w-7xl mx-auto">
        <!-- Section Header -->
        <div class="max-w-3xl mb-20 md:mb-32">
            <span class="text-xs font-mono tracking-widest text-gray-500 uppercase">Our Expertise</span>
            <h2 class="text-5xl md:text-7xl font-bold mt-4 mb-6 leading-tight">
                What Sets Us Apart
            </h2>
            <p class="text-lg text-gray-600">我们提供业界领先的解决方案，驱动您的业务增长</p>
        </div>

        <!-- Features Grid - 改为左右分列布局 -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20">
            <?php
            $features = [
                [
                    'title' => 'Innovation & Technology',
                    'description' => '前沿技术驱动，持续创新产品与方案，超越行业标准。我们采用最新的AI、云计算等技术。',
                    'icon' => 'icon-placeholder-1'
                ],
                [
                    'title' => 'Precision & Quality',
                    'description' => '严谨的项目管理，确保每个交付都超出预期。完美的代码质量和性能优化。',
                    'icon' => 'icon-placeholder-2'
                ],
                [
                    'title' => 'Expertise',
                    'description' => '行业顶尖人才汇聚，掌握最新技术栈。10+ 年的深厚行业经验。',
                    'icon' => 'icon-placeholder-3'
                ],
                [
                    'title' => 'Partnership',
                    'description' => '深入理解需求，提供定制化解决方案与持续支持。您的成功就是我们的目标。',
                    'icon' => 'icon-placeholder-4'
                ]
            ];

            foreach ($features as $index => $feature):
            ?>
            <div class="group feature-card" data-index="<?php echo $index; ?>" style="opacity: 0; transform: translateY(30px);">
                <!-- 改为图标占位符，用户可自定义SVG或图片 -->
                <div class="mb-8">
                    <div class="w-16 h-16 rounded-xl bg-gray-100 group-hover:bg-gray-200 transition-all duration-300 flex items-center justify-center">
                        <!-- 预留图标位置 -->
                        <div class="text-gray-400 text-2xl font-light">[<?php echo $index + 1; ?>]</div>
                    </div>
                </div>
                
                <h3 class="text-2xl md:text-3xl font-bold mb-4 group-hover:text-black transition-colors">
                    <?php echo $feature['title']; ?>
                </h3>
                <p class="text-gray-600 text-base md:text-lg leading-relaxed">
                    <?php echo $feature['description']; ?>
                </p>
                
                <!-- 底部虚线分隔 -->
                <div class="h-px bg-gradient-to-r from-gray-200 to-transparent mt-8"></div>
            </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>
