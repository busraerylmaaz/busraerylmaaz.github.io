class CursorTrail {
    constructor() {
        this.canvas = document.getElementById('cursorCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.isTouch = 'ontouchstart' in window;
        
        if (!this.isTouch) {
            this.init();
        }
    }

    init() {
        this.resize();
        this.setupEventListeners();
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    setupEventListeners() {
        window.addEventListener('resize', () => this.resize());

        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
            this.createParticle();
        });

        window.addEventListener('click', (e) => {
            this.createBurst(e.clientX, e.clientY);
        });
    }

    createParticle() {
        const colors = [
            '#a855f7',
            '#ec4899',
            '#06b6d4',
            '#c084fc',
            '#f472b6'
        ];

        for (let i = 0; i < 2; i++) {
            this.particles.push({
                x: this.mouse.x + (Math.random() - 0.5) * 10,
                y: this.mouse.y + (Math.random() - 0.5) * 10,
                size: Math.random() * 4 + 2,
                color: colors[Math.floor(Math.random() * colors.length)],
                speedX: (Math.random() - 0.5) * 2,
                speedY: (Math.random() - 0.5) * 2,
                life: 1,
                decay: Math.random() * 0.02 + 0.02,
                type: 'trail'
            });
        }
    }

    createBurst(x, y) {
        const colors = [
            '#a855f7',
            '#ec4899',
            '#06b6d4',
            '#c084fc',
            '#f472b6'
        ];

        for (let i = 0; i < 20; i++) {
            const angle = (Math.PI * 2 / 20) * i;
            const speed = Math.random() * 3 + 2;
            
            this.particles.push({
                x: x,
                y: y,
                size: Math.random() * 5 + 3,
                color: colors[Math.floor(Math.random() * colors.length)],
                speedX: Math.cos(angle) * speed,
                speedY: Math.sin(angle) * speed,
                life: 1,
                decay: Math.random() * 0.02 + 0.01,
                type: 'burst'
            });
        }
    }

    drawStar(x, y, size, color, opacity) {
        this.ctx.save();
        this.ctx.translate(x, y);
        this.ctx.beginPath();
        
        for (let i = 0; i < 4; i++) {
            this.ctx.rotate(Math.PI / 2);
            this.ctx.lineTo(0, size);
            this.ctx.lineTo(size * 0.3, size * 0.3);
        }
        
        this.ctx.closePath();
        this.ctx.fillStyle = color.replace(')', `, ${opacity})`).replace('rgb', 'rgba');
        this.ctx.fill();
        
        this.ctx.beginPath();
        this.ctx.arc(0, 0, size * 0.3, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.8})`;
        this.ctx.fill();
        
        this.ctx.restore();
    }

    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles = this.particles.filter(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            if (particle.type === 'burst') {
                particle.speedY += 0.1;
            }
            
            particle.life -= particle.decay;
            particle.size *= 0.98;

            if (particle.life > 0 && particle.size > 0.5) {
                const rgb = this.hexToRgb(particle.color);
                if (rgb) {
                    const rgbString = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
                    this.drawStar(particle.x, particle.y, particle.size, rgbString, particle.life);
                }
                return true;
            }
            return false;
        });

        requestAnimationFrame(() => this.animate());
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new CursorTrail();
});
