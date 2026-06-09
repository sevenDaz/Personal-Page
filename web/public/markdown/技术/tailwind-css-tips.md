---
title: Tailwind CSS 实用技巧
date: 2024-01-20
tags: ['CSS', '前端', '工具']
---

# Tailwind CSS 实用技巧

## 简介

Tailwind CSS 是一个功能类优先的 CSS 框架，可以快速构建自定义 designs。

## 常用技巧

### 1. 自定义主题

```css
/* tailwind.config.js */
module.exports = {
  theme: {
    extend: {
      colors: {
        'brand': {
          '50': '#eff6ff',
          '100': '#dbeafe',
          // ...
        }
      }
    }
  }
}
```

### 2. 响应式设计

```html
<div class="w-full md:w-1/2 lg:w-1/3">
  <!-- 响应式宽度 -->
</div>
```

### 3. 状态变体

```html
<button class="bg-blue-500 hover:bg-blue-600 active:bg-blue-700">
  点击我
</button>
```

## 高级用法

### 1. 插件系统

```javascript
// tailwind.config.js
module.exports = {
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ]
}
```

### 2. JIT 模式

```javascript
// tailwind.config.js
module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.html', './src/**/*.vue']
}
```

## 性能优化

1. 使用 JIT 模式减少 CSS 文件大小
2. 合理配置 purge 选项
3. 避免过度使用 utility classes

## 总结

Tailwind CSS 提供了强大的工具集，合理使用可以大大提高开发效率。