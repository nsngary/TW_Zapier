/**
 * 動畫相關的 Composable
 * 整合 GSAP 和 Lenis，提供統一的動畫接口
 */

import { ref, onMounted, onUnmounted } from 'vue'

// 動態導入 GSAP 和 Lenis (僅在客戶端)
let gsap: any = null
let ScrollTrigger: any = null
let Lenis: any = null

export const useAnimations = () => {
  const lenis = ref<any>(null)
  const isAnimationEnabled = ref(true)

  // 初始化動畫庫
  const initAnimationLibs = async () => {
    if (typeof window !== 'undefined' && !gsap) {
      try {
        const gsapModule = await import('gsap')
        const scrollTriggerModule = await import('gsap/ScrollTrigger')
        const lenisModule = await import('lenis')

        gsap = gsapModule.gsap
        ScrollTrigger = scrollTriggerModule.ScrollTrigger
        Lenis = lenisModule.default

        // 註冊 GSAP 插件
        gsap.registerPlugin(ScrollTrigger)
      } catch (error) {
        console.warn('動畫庫載入失敗:', error)
        isAnimationEnabled.value = false
      }
    }
  }

  /**
   * 初始化平滑滾動
   */
  const initSmoothScroll = async () => {
    if (typeof window === 'undefined') return

    // 先初始化動畫庫
    await initAnimationLibs()

    if (!gsap || !Lenis) return

    // 檢查用戶是否偏好減少動畫
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      isAnimationEnabled.value = false
      return
    }

    lenis.value = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    // 動畫循環
    const raf = (time: number) => {
      lenis.value?.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    // 與 GSAP ScrollTrigger 整合
    lenis.value.on('scroll', ScrollTrigger.update)
  }

  /**
   * Hero 標題打字機動畫
   */
  const animateHeroTitle = async (element: HTMLElement) => {
    if (!isAnimationEnabled.value) return

    // 確保動畫庫已載入
    await initAnimationLibs()
    if (!gsap) return

    const text = element.textContent || ''
    element.innerHTML = ''

    // 創建字符 span
    const chars = text.split('').map(char => {
      const span = document.createElement('span')
      span.textContent = char === ' ' ? '\u00A0' : char
      span.style.opacity = '0'
      span.style.transform = 'translateY(20px)'
      return span
    })

    chars.forEach(char => element.appendChild(char))

    // 動畫序列
    gsap.timeline()
      .to(chars, {
        opacity: 1,
        y: 0,
        duration: 0.05,
        stagger: 0.03,
        ease: 'power2.out'
      })
  }

  /**
   * Hero 副標題淡入動畫
   */
  const animateHeroSubtitle = async (element: HTMLElement) => {
    if (!isAnimationEnabled.value) return

    // 確保動畫庫已載入
    await initAnimationLibs()
    if (!gsap) return

    gsap.fromTo(element,
      {
        opacity: 0,
        y: 30,
        scale: 0.95
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        delay: 1.5,
        ease: 'power2.out'
      }
    )
  }

  /**
   * CTA 按鈕動畫
   */
  const animateCTAButtons = async (container: HTMLElement) => {
    if (!isAnimationEnabled.value) return

    // 確保動畫庫已載入
    await initAnimationLibs()
    if (!gsap) return

    const buttons = container.querySelectorAll('.cta-button')

    gsap.fromTo(buttons,
      {
        opacity: 0,
        y: 40,
        scale: 0.9
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        delay: 2.2,
        stagger: 0.1,
        ease: 'back.out(1.7)'
      }
    )

    // 添加懸停效果
    buttons.forEach(button => {
      const btn = button as HTMLElement

      btn.addEventListener('mouseenter', () => {
        if (!isAnimationEnabled.value || !gsap) return
        gsap.to(btn, {
          scale: 1.05,
          duration: 0.3,
          ease: 'power2.out'
        })
      })

      btn.addEventListener('mouseleave', () => {
        if (!isAnimationEnabled.value || !gsap) return
        gsap.to(btn, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        })
      })
    })
  }

  /**
   * 背景粒子動畫
   */
  const animateBackgroundParticles = async (container: HTMLElement) => {
    if (!isAnimationEnabled.value) return

    // 確保動畫庫已載入
    await initAnimationLibs()
    if (!gsap) return

    // 創建粒子
    const particleCount = 15
    const particles: HTMLElement[] = []

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div')
      particle.className = 'hero-particle'
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 4 + 2}px;
        height: ${Math.random() * 4 + 2}px;
        background: rgba(134, 115, 94, ${Math.random() * 0.3 + 0.1});
        border-radius: 50%;
        pointer-events: none;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
      `

      container.appendChild(particle)
      particles.push(particle)
    }

    // 粒子浮動動畫
    particles.forEach((particle, index) => {
      gsap.to(particle, {
        x: `+=${Math.random() * 50 - 25}`,
        y: `+=${Math.random() * 50 - 25}`,
        duration: Math.random() * 8 + 6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: index * 0.1
      })
    })
  }

  /**
   * 背景裝飾動畫
   */
  const animateBackgroundDecorations = async (decorations: NodeListOf<HTMLElement>) => {
    if (!isAnimationEnabled.value) return

    // 確保動畫庫已載入
    await initAnimationLibs()
    if (!gsap || !ScrollTrigger) return

    decorations.forEach((decoration, index) => {
      // 浮動動畫
      gsap.to(decoration, {
        x: index % 2 === 0 ? 15 : -15,
        duration: 4 + index,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: index * 0.3
      })
    })
  }

  /**
   * 信任指標動畫
   */
  const animateTrustIndicators = async (container: HTMLElement) => {
    if (!isAnimationEnabled.value) return

    // 確保動畫庫已載入
    await initAnimationLibs()
    if (!gsap) return

    const indicators = container.querySelectorAll('.trust-indicator')

    gsap.fromTo(indicators,
      {
        opacity: 0,
        y: 20
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: 2.8,
        stagger: 0.1,
        ease: 'power2.out'
      }
    )
  }

  /**
   * 清理動畫資源
   */
  const cleanup = () => {
    if (lenis.value) {
      lenis.value.destroy()
      lenis.value = null
    }
    if (ScrollTrigger) {
      ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill())
    }
  }

  // 生命週期管理
  onMounted(() => {
    if (typeof window !== 'undefined') {
      initSmoothScroll()
    }
  })

  onUnmounted(() => {
    cleanup()
  })

  return {
    isAnimationEnabled,
    initSmoothScroll,
    animateHeroTitle,
    animateHeroSubtitle,
    animateCTAButtons,
    animateBackgroundParticles,
    animateBackgroundDecorations,
    animateTrustIndicators,
    cleanup
  }
}
