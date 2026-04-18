/**
 * Opening Animation Sequence
 * Premium Hospitality Brand Reveal
 */

document.addEventListener('DOMContentLoaded', () => {
  
  // Skip animation for reduced motion users
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    skipIntroAnimation();
    return;
  }
  
  
  // Run opening animation
  runIntroAnimation();
  
  // Allow user to skip on any interaction
  document.addEventListener('click', skipIntroAnimation, { once: true });
  document.addEventListener('keydown', skipIntroAnimation, { once: true });
  document.addEventListener('wheel', skipIntroAnimation, { once: true });
  
});

function runIntroAnimation() {
  
  gsap.set('body', { overflow: 'hidden' });
  
  const tl = gsap.timeline({
    onComplete: () => {
      enableSite();
    }
  });
  
  tl.to('#intro-overlay', {
    opacity: 1,
    duration: 0.8,
    ease: 'power2.out'
  });
  
  tl.from('.intro-divider', {
    scaleX: 0,
    opacity: 0,
    duration: 1.3,
    ease: 'expo.out',
    delay: 0.4
  });
  
  tl.from('.intro-logo', {
    opacity: 0,
    y: 16,
    letterSpacing: '0.55em',
    duration: 1.9,
    ease: 'expo.out'
  }, '-=0.6');
  
  tl.to('.intro-tagline', {
    opacity: 0.65,
    y: 0,
    duration: 1.1,
    ease: 'power2.out'
  }, '-=0.7');
  
  tl.to('.intro-container', {
    y: -50,
    duration: 1.4,
    ease: 'expo.out',
    delay: 0.7
  }, '-=0.2');
  
  tl.to('#intro-overlay', {
    opacity: 0,
    duration: 1.6,
    ease: 'power3.inOut',
    onComplete: () => {
      document.getElementById('intro-overlay').style.display = 'none';
    }
  }, '-=0.3');
}

function skipIntroAnimation() {
  gsap.killTweensOf('*');
  gsap.set('#intro-overlay', { opacity: 0, display: 'none' });
  gsap.set('.intro-divider, .intro-logo, .intro-tagline, .intro-container', { clearProps: 'all' });
  enableSite();
}

function enableSite() {
  gsap.set('body', { overflow: 'auto' });
  
  gsap.to('#main-content', {
    opacity: 1,
    y: 0,
    duration: 1.4,
    ease: 'expo.out',
    delay: 0.15
  });
  
  gsap.to('#site-header', {
    y: 0,
    opacity: 1,
    duration: 1.1,
    ease: 'expo.out',
    delay: 0.3
  });
  
  // Initialise premium scroll animations
  initScrollAnimations();
}

/**
 * Premium Scroll Reveal Animations
 * Slow, elegant, restrained motion for luxury hospitality feel
 */
function initScrollAnimations() {

  // Skip for reduced motion users
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  gsap.registerPlugin(ScrollTrigger);

  const revealSelectors = `
    .hero-eyebrow,
    section h2,
    .lead,
    .lead-large,
    .narrative-section p,
    .section-title,
    .value-card,
    .about-portrait,
    .about-content > *,
    .service-card,
    .footer-content > *
  `;

  // Process each section individually with clean isolated timeline
  document.querySelectorAll('.section-1, .section-2, .section-3, .standard-section, #site-footer').forEach(section => {
    
    const targets = section.querySelectorAll(revealSelectors);
    
    if (targets.length === 0) return;

    gsap.fromTo(targets, 
      { 
        autoAlpha: 0, 
        y: 20 
      }, 
      { 
        autoAlpha: 1, 
        y: 0, 
        duration: 0.9, 
        stagger: 0.08, 
        ease: 'power2.out',
        immediateRender: false,
        clearProps: 'opacity, transform',
        scrollTrigger: {
          trigger: section,
          start: 'top 82%',
          once: true,
          toggleActions: 'play none none none'
        }
      }
    );
  });
}
