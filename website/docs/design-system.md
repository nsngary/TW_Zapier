# TW_Zapier 設計系統規範

## 🎨 色彩系統

### 主色調 (Primary Colors)
基於台灣在地化的溫暖色調，營造親切可信的品牌形象。

```css
--primary-50: #f7f5f3   /* 極淺背景 */
--primary-100: #ede8e3  /* 淺背景 */
--primary-200: #ddd4ca  /* 邊框、分隔線 */
--primary-300: #c7b8a8  /* 禁用狀態 */
--primary-400: #b09a85  /* 次要文字 */
--primary-500: #86735E  /* 主品牌色 */
--primary-600: #7a6654  /* 懸停狀態 */
--primary-700: #665548  /* 按下狀態 */
--primary-800: #54463d  /* 深色文字 */
--primary-900: #463a33  /* 最深文字 */
```

### 輔助色調 (Accent Colors)
豐富的輔助色彩，用於強調、狀態指示和視覺層次。

```css
--accent-red: #C2474A      /* 錯誤、警告 */
--accent-orange: #C07F56   /* 警告、提醒 */
--accent-crimson: #C23928  /* 重要操作 */
--accent-tan: #D19872      /* 溫暖強調 */
--accent-pink: #EC7687     /* 友善提示 */
--accent-brown: #662D10    /* 深色強調 */
--accent-olive: #644F29    /* 自然色調 */
--accent-gray: #6C604D     /* 中性強調 */
--accent-amber: #A86F4B    /* 金色強調 */
```

### 中性色 (Neutral Colors)
用於文字、背景和界面元素的中性色彩。

```css
--neutral-50: #fafaf9   /* 最淺背景 */
--neutral-100: #f5f5f4  /* 淺背景 */
--neutral-200: #e7e5e4  /* 邊框 */
--neutral-300: #d6d3d1  /* 分隔線 */
--neutral-400: #a8a29e  /* 佔位符 */
--neutral-500: #78716c  /* 次要文字 */
--neutral-600: #57534e  /* 主要文字 */
--neutral-700: #44403c  /* 標題文字 */
--neutral-800: #292524  /* 深色文字 */
--neutral-900: #1c1917  /* 最深文字 */
```

## 📝 字體系統

### 字體族
- **主字體**: Noto Sans TC (繁體中文優化)
- **英文字體**: Inter (現代無襯線)
- **系統後備**: system-ui, sans-serif

### 字體大小階層
```css
/* 標題字體 */
--text-xs: 0.75rem     /* 12px */
--text-sm: 0.875rem    /* 14px */
--text-base: 1rem      /* 16px */
--text-lg: 1.125rem    /* 18px */
--text-xl: 1.25rem     /* 20px */
--text-2xl: 1.5rem     /* 24px */
--text-3xl: 1.875rem   /* 30px */
--text-4xl: 2.25rem    /* 36px */
--text-5xl: 3rem       /* 48px */
--text-6xl: 3.75rem    /* 60px */
--text-7xl: 4.5rem     /* 72px */
--text-8xl: 6rem       /* 96px */
--text-9xl: 8rem       /* 128px */
```

### 字重 (Font Weight)
```css
--font-thin: 100
--font-light: 300
--font-normal: 400
--font-medium: 500
--font-semibold: 600
--font-bold: 700
--font-extrabold: 800
--font-black: 900
```

### 行高 (Line Height)
```css
--leading-none: 1
--leading-tight: 1.25
--leading-snug: 1.375
--leading-normal: 1.5
--leading-relaxed: 1.625
--leading-loose: 2
```

## 📏 間距系統

### 基礎間距 (基於 4px 網格)
```css
--spacing-0: 0
--spacing-1: 0.25rem   /* 4px */
--spacing-2: 0.5rem    /* 8px */
--spacing-3: 0.75rem   /* 12px */
--spacing-4: 1rem      /* 16px */
--spacing-5: 1.25rem   /* 20px */
--spacing-6: 1.5rem    /* 24px */
--spacing-8: 2rem      /* 32px */
--spacing-10: 2.5rem   /* 40px */
--spacing-12: 3rem     /* 48px */
--spacing-16: 4rem     /* 64px */
--spacing-20: 5rem     /* 80px */
--spacing-24: 6rem     /* 96px */
--spacing-32: 8rem     /* 128px */
```

### 特殊間距
```css
--spacing-18: 4.5rem   /* 72px - 特殊用途 */
--spacing-88: 22rem    /* 352px - 大區塊 */
--spacing-128: 32rem   /* 512px - 超大區塊 */
```

## 🔘 圓角系統

```css
--rounded-none: 0
--rounded-sm: 0.125rem    /* 2px */
--rounded: 0.25rem        /* 4px */
--rounded-md: 0.375rem    /* 6px */
--rounded-lg: 0.5rem      /* 8px */
--rounded-xl: 0.75rem     /* 12px */
--rounded-2xl: 1rem       /* 16px */
--rounded-3xl: 1.5rem     /* 24px */
--rounded-full: 9999px
```

## 🌊 陰影系統

```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05)
--shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)
--shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25)
```

## 📱 響應式斷點

```css
/* 手機版 */
--screen-xs: 475px

/* 平板版 */
--screen-sm: 640px
--screen-md: 768px

/* 桌面版 */
--screen-lg: 1024px
--screen-xl: 1280px
--screen-2xl: 1536px
```

## 🎭 動畫系統

### 緩動函數
```css
--ease-linear: linear
--ease-in: cubic-bezier(0.4, 0, 1, 1)
--ease-out: cubic-bezier(0, 0, 0.2, 1)
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1)
```

### 動畫時長
```css
--duration-75: 75ms
--duration-100: 100ms
--duration-150: 150ms
--duration-200: 200ms
--duration-300: 300ms
--duration-500: 500ms
--duration-700: 700ms
--duration-1000: 1000ms
```

## 🎯 使用原則

### 色彩使用指南
1. **主色調**: 用於品牌識別、主要 CTA 按鈕
2. **輔助色**: 用於狀態指示、次要操作、視覺強調
3. **中性色**: 用於文字、背景、邊框

### 字體使用指南
1. **標題**: 使用 semibold 或 bold 字重
2. **正文**: 使用 normal 字重
3. **強調**: 使用 medium 字重
4. **說明文字**: 使用較小字號和較淺顏色

### 間距使用指南
1. **組件內間距**: 使用 4px 的倍數
2. **組件間間距**: 使用 8px 的倍數
3. **區塊間間距**: 使用 16px 的倍數
4. **頁面區塊**: 使用 32px 或更大間距

## 🧩 組件庫

### 基礎組件
我們提供了一套完整的基礎組件，確保設計一致性：

#### BaseButton
```vue
<BaseButton variant="primary" size="lg">
  主要按鈕
</BaseButton>

<BaseButton variant="secondary" size="base">
  次要按鈕
</BaseButton>

<BaseButton variant="outline" size="sm" :loading="true">
  載入中...
</BaseButton>
```

#### BaseCard
```vue
<BaseCard variant="elevated" title="卡片標題">
  卡片內容
</BaseCard>

<BaseCard variant="interactive" hover>
  <template #header>
    自定義標題
  </template>
  卡片內容
  <template #footer>
    卡片底部
  </template>
</BaseCard>
```

#### BaseInput
```vue
<BaseInput v-model="value" label="輸入標籤" placeholder="請輸入內容" help-text="這是幫助文字" />

<BaseInput v-model="email" type="email" label="電子郵件" :error-message="emailError" required />
```

## 📋 設計檢查清單

### 色彩檢查
- [ ] 是否使用了設計系統中定義的色彩
- [ ] 色彩對比度是否符合 WCAG 2.1 AA 標準
- [ ] 是否正確使用了語義化色彩（成功、警告、錯誤）

### 字體檢查
- [ ] 是否使用了 Noto Sans TC 字體
- [ ] 字體大小是否符合階層系統
- [ ] 行高是否適當（建議 1.5-1.6）
- [ ] 字重是否符合內容層級

### 間距檢查
- [ ] 是否使用了 4px 網格系統
- [ ] 組件間距是否一致
- [ ] 響應式間距是否適當

### 組件檢查
- [ ] 是否使用了基礎組件庫
- [ ] 組件狀態是否完整（默認、懸停、焦點、禁用）
- [ ] 是否支援鍵盤導航
- [ ] 是否有適當的無障礙標籤

## 🔧 開發工具

### CSS 類別命名規範
```css
/* 組件類別 */
.btn-{variant}-{size}
.card-{variant}
.input-{state}

/* 工具類別 */
.text-{color}-{shade}
.bg-{color}-{shade}
.p-{size}
.m-{size}

/* 狀態類別 */
.hover\:
.focus\:
.active\:
.disabled\:
```

### 響應式設計
```css
/* 手機優先設計 */
.class-name          /* 預設 (手機) */
.sm\:class-name      /* 640px+ */
.md\:class-name      /* 768px+ */
.lg\:class-name      /* 1024px+ */
.xl\:class-name      /* 1280px+ */
.2xl\:class-name     /* 1536px+ */
```

### 動畫使用
```css
/* 基礎動畫 */
.animate-fade-in
.animate-slide-up
.animate-scale-in

/* 互動動畫 */
.hover-lift
.hover-scale
.hover-rotate

/* 載入動畫 */
.animate-spin
.animate-pulse
.animate-bounce
```
