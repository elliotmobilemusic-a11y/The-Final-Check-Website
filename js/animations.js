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

  // Default reveal settings - extremely subtle
  const revealDefaults = {
    opacity: 0,
    y: 24,
    duration: 1.6,
    ease: 'power2.out',
    clearProps: 'opacity, transform'
  };

  // Section headers reveal
  gsap.utils.toArray('.section-title, .hero-eyebrow, h2').forEach(element => {
    gsap.from(element, {
      ...revealDefaults,
      y: 16,
      scrollTrigger: {
        trigger: element,
        start: 'top 88%',
        toggleActions: 'play none none reverse'
      }
    });
  });

  // Body text reveal
  gsap.utils.toArray('.lead, .lead-large, p:not(.footer-content p)').forEach(element => {
    gsap.from(element, {
      ...revealDefaults,
      y: 12,
      delay: 0.15,
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    });
  });

  // Value cards staggered reveal
  gsap.utils.toArray('.value-card').forEach((card, i) => {
    gsap.from(card, {
      ...revealDefaults,
      y: 20,
      delay: 0.1 + (i * 0.12),
      scrollTrigger: {
        trigger: card.parentElement,
        start: 'top 82%',
        toggleActions: 'play none none reverse'
      }
    });
  });

  // Service cards staggered reveal
  gsap.utils.toArray('.service-card').forEach((card, i) => {
    gsap.from(card, {
      ...revealDefaults,
      y: 18,
      delay: 0.08 + (i * 0.09),
      scrollTrigger: {
        trigger: card.parentElement,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });
  });

  // Narrative sections gentle fade
  gsap.utils.toArray('.narrative-section').forEach(section => {
    gsap.from(section, {
      opacity: 0,
      duration: 2.2,
      ease: 'power1.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 92%',
        end: 'top 65%',
        scrub: true
      }
    });
  });
}
