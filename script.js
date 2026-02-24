// ═══════════════ 1. LENIS SMOOTH SCROLL ═══════════════
const lenis = new Lenis({
    duration: 1.4,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    smooth: true,
    smoothTouch: false,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// ═══════════════ 2. GSAP SETUP ═══════════════
gsap.registerPlugin(ScrollTrigger);

// Connect Lenis scroll to ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => { lenis.raf(time * 1000); });
gsap.ticker.lagSmoothing(0);

// ═══════════════ 3. PROGRESS BAR ═══════════════
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
});

// ═══════════════ 4. NAVBAR SCROLL EFFECT ═══════════════
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ═══════════════ 5. HERO ANIMATIONS ═══════════════
const tlHero = gsap.timeline({ delay: 0.3 });

tlHero
    .fromTo(".hero-eyebrow",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    )
    .fromTo(".hero-title .reveal-text",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out" },
        "-=0.4"
    )
    .fromTo(".hero-subtitle",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.5"
    )
    .fromTo(".hero-stats",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.4"
    )
    .fromTo(".scroll-indicator",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        "-=0.3"
    );

// ═══════════════ 6. GENERIC SCROLL REVEAL ═══════════════
function createScrollReveal(selector, options = {}) {
    const defaults = {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        start: "top 80%",
    };
    const cfg = { ...defaults, ...options };

    gsap.from(selector, {
        scrollTrigger: {
            trigger: typeof selector === 'string' ? selector : options.trigger,
            start: cfg.start,
        },
        y: cfg.y,
        opacity: cfg.opacity,
        duration: cfg.duration,
        stagger: cfg.stagger,
        ease: cfg.ease,
    });
}

// ═══════════════ 7. ROI SECTION ═══════════════
// Section header reveal
createScrollReveal(".roi-section .section-label, .roi-section .section-title, .roi-section .section-desc");

// Cards reveal
createScrollReveal(".roi-card", { stagger: 0.2 });

// Number counter animation
ScrollTrigger.create({
    trigger: ".roi-section",
    start: "top 55%",
    onEnter: () => {
        // Traditional cost counter
        const tradTarget = { val: 0 };
        gsap.to(tradTarget, {
            val: 65000,
            duration: 2,
            ease: "power2.out",
            onUpdate: function () {
                document.getElementById("trad-cost-counter").innerHTML =
                    Math.floor(this.targets()[0].val).toLocaleString();
            }
        });

        // AI cost counter
        const aiTarget = { val: 0 };
        gsap.to(aiTarget, {
            val: 1065,
            duration: 2.5,
            ease: "power2.out",
            onUpdate: function () {
                document.getElementById("ai-cost-counter").innerHTML =
                    Math.floor(this.targets()[0].val).toLocaleString();
            }
        });

        // Bar animations
        gsap.to(".traditional-bar", { width: "100%", duration: 2, ease: "power2.out" });
        gsap.to(".ai-bar", { width: "2%", duration: 2.5, ease: "power2.out" });
    },
    once: true
});

// Bottom line reveal
createScrollReveal(".roi-bottom-line");

// ═══════════════ 8. CREATIVE SECTION ═══════════════
createScrollReveal(".creative-section .section-label");
createScrollReveal(".creative-text > *", { stagger: 0.15 });
createScrollReveal(".showcase-card", { stagger: 0.1, y: 30 });

// Comparison timeline bars
ScrollTrigger.create({
    trigger: ".creative-comparison",
    start: "top 75%",
    onEnter: () => {
        gsap.fromTo(".slow-bar", { width: "0%" }, { width: "100%", duration: 2, ease: "power2.out" });
        gsap.fromTo(".fast-bar", { width: "0%" }, { width: "25%", duration: 1.5, ease: "power2.out", delay: 0.3 });
    },
    once: true
});

createScrollReveal(".comparison-item", { stagger: 0.2 });

// ═══════════════ 9. VIDEO PIPELINE ═══════════════
createScrollReveal(".pipeline-section .section-label");
createScrollReveal(".pipeline-content .pinned-text > *", { stagger: 0.1 });

// Node-by-node reveal on scroll
const nodes = gsap.utils.toArray('.node');
nodes.forEach((node, i) => {
    gsap.to(node, {
        scrollTrigger: {
            trigger: ".pipeline-visualization",
            start: "top 75%",
            end: "bottom 40%",
            scrub: 0.8,
            onUpdate: self => {
                const progress = self.progress;
                const threshold = i / nodes.length;
                if (progress > threshold) {
                    gsap.to(node, { opacity: 1, duration: 0.5 });
                }
            }
        }
    });
});

// ═══════════════ 10. VIBE CODING ═══════════════
createScrollReveal(".vibe-section .section-label, .vibe-section .section-title, .vibe-section .section-desc");
createScrollReveal(".vibe-card", { stagger: 0.1, y: 30 });

// ═══════════════ 11. COMPLIANCE ═══════════════
createScrollReveal(".compliance-section .section-label");
createScrollReveal(".compliance-text > *", { stagger: 0.12 });
createScrollReveal(".safeguard-card", { x: 40, y: 0, stagger: 0.2 });

// ═══════════════ 12. ARCHITECTURE ═══════════════
createScrollReveal(".architecture-section .section-label, .architecture-section .section-title, .architecture-section .section-desc");

gsap.from(".hub-core", {
    scrollTrigger: { trigger: ".architecture-diagram", start: "top 65%" },
    scale: 0.6,
    opacity: 0,
    duration: 1,
    ease: "back.out(1.5)"
});

gsap.from(".satellite", {
    scrollTrigger: { trigger: ".architecture-diagram", start: "top 55%" },
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: "power3.out"
});

gsap.from(".svg-line", {
    scrollTrigger: { trigger: ".architecture-diagram", start: "top 60%" },
    opacity: 0,
    duration: 1.5,
    stagger: 0.2,
    ease: "power2.out"
});

// ═══════════════ 13. FOOTER ═══════════════
createScrollReveal(".footer .footer-label, .footer .cta-text, .footer .signature, .footer .footer-note", {
    stagger: 0.15
});

// ═══════════════ 14. SMOOTH NAV SCROLL ═══════════════
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            lenis.scrollTo(target, { offset: -80 });
        }
    });
});

// ═══════════════ 15. CARD CLICK INTERACTIONS (RADIO SELECT) ═══════════════
// Helper: radio-select within a group
function setupRadioSelect(selector, activeClass) {
    const items = document.querySelectorAll(selector);
    items.forEach(item => {
        item.addEventListener('click', () => {
            const wasActive = item.classList.contains(activeClass);
            // Deactivate all siblings first
            items.forEach(sib => sib.classList.remove(activeClass));
            // Toggle: if it was already active, leave all off; otherwise activate clicked
            if (!wasActive) {
                item.classList.add(activeClass);
            }
        });
    });
}

// Pipeline nodes — radio-select with opacity boost
const pipelineNodes = document.querySelectorAll('.node');
pipelineNodes.forEach(node => {
    node.addEventListener('click', () => {
        const wasActive = node.classList.contains('node-active');
        pipelineNodes.forEach(sib => sib.classList.remove('node-active'));
        if (!wasActive) {
            node.classList.add('node-active');
            gsap.to(node, { opacity: 1, duration: 0.3 });
        }
    });
});

// Cards — each group is independent radio-select
setupRadioSelect('.showcase-card', 'card-active');
setupRadioSelect('.vibe-card', 'card-active');
setupRadioSelect('.safeguard-card', 'card-active');
