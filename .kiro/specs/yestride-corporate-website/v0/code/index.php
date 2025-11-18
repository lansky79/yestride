<?php
// yestride 源踔科技官网 - PHP 版本
echo "<!-- VERSION: v4 TEST - 如果你看到这行注释，说明代码已更新 -->";
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Pragma: no-cache");
header("Expires: 0");

$page_title = "yestride - 源踔科技 | yes!stride with AI";
$page_description = "yestride 源踔科技是成都领先的科技创新公司，致力于用前沿技术赋能企业。";
?>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- 添加防缓存meta标签 -->
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Expires" content="0">
    <meta name="description" content="<?php echo $page_description; ?>">
    <title><?php echo $page_title; ?></title>
    <!-- 在CSS和JS后添加版本查询字符串防缓存 -->
    <link rel="stylesheet" href="css/style.css?v=<?php echo time(); ?>">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
</head>
<body>
    <!-- 添加明显的版本号显示在页面顶部 -->
    <div style="position: fixed; top: 0; right: 0; background: #ff0000; color: white; padding: 10px 20px; font-size: 12px; z-index: 9999; font-weight: bold;">v4 TEST - CODE UPDATED</div>
    
    <?php include 'includes/header.php'; ?>
    <?php include 'includes/hero.php'; ?>
    <?php include 'includes/features.php'; ?>
    <?php include 'includes/showcase.php'; ?>
    <?php include 'includes/cta.php'; ?>
    <?php include 'includes/footer.php'; ?>
    
    <script src="js/main.js?v=<?php echo time(); ?>"></script>
</body>
</html>
