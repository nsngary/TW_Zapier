/**
 * 浮動動畫效果 - 模擬 js-float-item 的動畫行為
 * 為元素添加平滑的浮動、旋轉和縮放動畫
 */

class FloatAnimation {
    constructor() {
        this.floatItems = [];
        this.animationId = null;
        this.startTime = Date.now();
        
        this.init();
    }

    init() {
        // 找到所有 js-float-item 元素
        const items = document.querySelectorAll('.js-float-item');
        
        items.forEach((item, index) => {
            this.floatItems.push({
                element: item,
                baseX: 0,
                baseY: 0,
                baseRotation: 0,
                baseScale: 1,
                // 為每個元素設置不同的動畫參數
                speedX: 0.5 + Math.random() * 0.5, // X軸移動速度
                speedY: 0.3 + Math.random() * 0.4, // Y軸移動速度
                speedRotation: 0.1 + Math.random() * 0.2, // 旋轉速度
                speedScale: 0.2 + Math.random() * 0.3, // 縮放速度
                amplitudeX: 15 + Math.random() * 10, // X軸移動幅度
                amplitudeY: 20 + Math.random() * 15, // Y軸移動幅度
                amplitudeRotation: 0.3 + Math.random() * 0.4, // 旋轉幅度
                amplitudeScale: 0.02 + Math.random() * 0.03, // 縮放幅度
                phaseX: Math.random() * Math.PI * 2, // X軸相位偏移
                phaseY: Math.random() * Math.PI * 2, // Y軸相位偏移
                phaseRotation: Math.random() * Math.PI * 2, // 旋轉相位偏移
                phaseScale: Math.random() * Math.PI * 2, // 縮放相位偏移
            });
        });

        if (this.floatItems.length > 0) {
            this.startAnimation();
        }
    }

    startAnimation() {
        const animate = () => {
            const currentTime = Date.now();
            const elapsed = (currentTime - this.startTime) / 1000; // 轉換為秒

            this.floatItems.forEach(item => {
                // 計算各種動畫值
                const x = Math.sin(elapsed * item.speedX + item.phaseX) * item.amplitudeX;
                const y = Math.sin(elapsed * item.speedY + item.phaseY) * item.amplitudeY;
                const rotation = Math.sin(elapsed * item.speedRotation + item.phaseRotation) * item.amplitudeRotation;
                const scale = 1 + Math.sin(elapsed * item.speedScale + item.phaseScale) * item.amplitudeScale;

                // 應用變換
                const transform = `translate3d(${x.toFixed(4)}px, ${y.toFixed(4)}px, 0px) rotate(${rotation.toFixed(4)}deg) scale(${scale.toFixed(4)}, ${scale.toFixed(4)})`;
                
                item.element.style.transform = transform;
                item.element.style.opacity = '1';
            });

            this.animationId = requestAnimationFrame(animate);
        };

        animate();
    }

    stopAnimation() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }

    // 重新開始動畫
    restart() {
        this.stopAnimation();
        this.startTime = Date.now();
        this.startAnimation();
    }

    // 暫停/恢復動畫
    toggle() {
        if (this.animationId) {
            this.stopAnimation();
        } else {
            this.startAnimation();
        }
    }
}

// 當DOM載入完成後初始化動畫
document.addEventListener('DOMContentLoaded', () => {
    // 等待一小段時間確保所有元素都已渲染
    setTimeout(() => {
        window.floatAnimation = new FloatAnimation();
        console.log('浮動動畫已初始化');
    }, 100);
});

// 當頁面可見性改變時控制動畫
document.addEventListener('visibilitychange', () => {
    if (window.floatAnimation) {
        if (document.hidden) {
            window.floatAnimation.stopAnimation();
        } else {
            window.floatAnimation.startAnimation();
        }
    }
});

// 導出類別供外部使用
window.FloatAnimation = FloatAnimation;
