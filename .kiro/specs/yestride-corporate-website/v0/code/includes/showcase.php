<!-- 成功案例区域 -->
<section id="showcase" class="relative py-24 md:py-40 px-6 md:px-12 bg-white">
    <!-- 改为白色背景，使用深灰卡片创造层级 -->
    <div class="max-w-7xl mx-auto">
        <!-- Section Header -->
        <div class="max-w-3xl mb-20 md:mb-32">
            <span class="text-xs font-mono tracking-widest text-gray-500 uppercase">Our Work</span>
            <h2 class="text-5xl md:text-7xl font-bold mt-4 mb-6 leading-tight">
                Transformative Projects
            </h2>
            <p class="text-lg text-gray-600">看看我们如何帮助企业实现数字化转型和业务增长</p>
        </div>

        <!-- Projects Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <?php
            $projects = [
                [
                    'number' => '01',
                    'title' => 'Enterprise Digitization',
                    'category' => 'Enterprise',
                    'result' => '效率提升 45%',
                    'description' => '为大型制造企业打造完整数字化平台'
                ],
                [
                    'number' => '02',
                    'title' => 'EdTech Platform',
                    'category' => 'Education',
                    'result' => '支持 100K+ 并发',
                    'description' => '交互式学习平台架构设计与优化'
                ],
                [
                    'number' => '03',
                    'title' => 'Supply Chain',
                    'category' => 'Logistics',
                    'result' => '成本降低 30%',
                    'description' => '实时追踪库存管理系统'
                ]
            ];

            foreach ($projects as $index => $project):
            ?>
            <div class="group project-card border border-gray-200 rounded-2xl p-8 md:p-10 hover:border-gray-400 hover:shadow-xl transition-all duration-500" data-index="<?php echo $index; ?>" style="opacity: 0; transform: translateY(30px);">
                <!-- 编号 -->
                <div class="text-6xl font-light text-gray-200 group-hover:text-gray-300 mb-8 transition-colors">
                    <?php echo $project['number']; ?>
                </div>
                
                <div class="mb-6">
                    <span class="text-xs font-mono tracking-widest text-gray-500 uppercase"><?php echo $project['category']; ?></span>
                    <h3 class="text-xl md:text-2xl font-bold mt-3 group-hover:text-black transition-colors">
                        <?php echo $project['title']; ?>
                    </h3>
                </div>
                
                <p class="text-gray-600 text-sm md:text-base leading-relaxed mb-6">
                    <?php echo $project['description']; ?>
                </p>
                
                <!-- 结果指标 -->
                <div class="pt-6 border-t border-gray-200">
                    <span class="inline-block bg-gray-100 text-gray-800 text-xs font-semibold px-4 py-2 rounded-full">
                        <?php echo $project['result']; ?>
                    </span>
                </div>
            </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>
