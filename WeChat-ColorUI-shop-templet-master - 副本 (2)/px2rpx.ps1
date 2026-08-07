$ErrorActionPreference = "Stop"
$pagesDir = "e:\work\WeChat-ColorUI-shop-templet-master\pages"
$count = 0

$evaluator = [System.Text.RegularExpressions.MatchEvaluator]{
    param($m)
    ([double]$m.Groups[1].Value * 2).ToString() + 'rpx'
}

Get-ChildItem -Path $pagesDir -Include *.wxml,*.wxss -Recurse | ForEach-Object {
    $file = $_.FullName
    $content = [System.IO.File]::ReadAllText($file)
    $original = $content

    # px → rpx（×2），跳过 {{...}} 模板内数值
    $content = [regex]::Replace($content, '(?<!\{)(\d+\.?\d*)px\b', $evaluator)

    if ($content -ne $original) {
        [System.IO.File]::WriteAllText($file, $content, [System.Text.UTF8Encoding]::new($false))
        $count++
        Write-Host ("OK: " + $file.Substring($pagesDir.Length + 1))
    }
}

Write-Host "`nDone! $count files converted."
