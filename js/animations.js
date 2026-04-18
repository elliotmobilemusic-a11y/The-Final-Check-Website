/**
 * Opening Animation Sequence
 * Premium Hospitality Brand Reveal
 */

let siteEnabled = false;

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
  if (siteEnabled) return;
  siteEnabled = true;

  gsap.killTweensOf('*');
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
  setTimeout(initScrollAnimations, 600);
}

/**
 * Premium Scroll Reveal Animations
 * Slow, elegant, restrained motion for luxury hospitality feel
 */
function initScrollAnimations() {

  // Skip for reduced motion users
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  gsap.registerPlugin(ScrollTrigger);

  // Hero Section
  gsap.fromTo('.section-1 .hero-eyebrow, .section-1 h2, .section-1 .lead',
    { autoAlpha: 0, y: 20 },
    {
      autoAlpha: 1,
      y: 0,
      duration: 0.9,
      stagger: 0.07,
      ease: 'power2.out',
      immediateRender: false,
      clearProps: 'opacity, transform',
      scrollTrigger: {
        trigger: '.section-1',
        start: 'top 82%',
        once: true
      }
    }
  );

  // Why Jason Section
  gsap.fromTo('.section-3 .section-title, .value-card',
    { autoAlpha: 0, y: 20 },
    {
      autoAlpha: 1,
      y: 0,
      duration: 0.9,
      stagger: 0.07,
      ease: 'power2.out',
      immediateRender: false,
      clearProps: 'opacity, transform',
      scrollTrigger: {
        trigger: '.section-3',
        start: 'top 82%',
        once: true
      }
    }
  );

  // Jason Credibility Summary
  gsap.fromTo('.section-2 .lead-large, .section-2 p',
    { autoAlpha: 0, y: 18 },
    {
      autoAlpha: 1,
      y: 0,
      duration: 0.85,
      stagger: 0.06,
      ease: 'power2.out',
      immediateRender: false,
      clearProps: 'opacity, transform',
      scrollTrigger: {
        trigger: '.section-2',
        start: 'top 82%',
        once: true
      }
    }
  );

  // Jason Profile Section
  gsap.fromTo('.about-portrait, .about-content > *',
    { autoAlpha: 0, y: 20 },
    {
      autoAlpha: 1,
      y: 0,
      duration: 0.9,
      stagger: 0.07,
      ease: 'power2.out',
      immediateRender: false,
      clearProps: 'opacity, transform',
      scrollTrigger: {
        trigger: '.about-intro',
        start: 'top 82%',
        once: true
      }
    }
  );

  // Services Section
  gsap.fromTo('.standard-section .section-title, .service-card',
    { autoAlpha: 0, y: 18 },
    {
      autoAlpha: 1,
      y: 0,
      duration: 0.85,
      stagger: 0.06,
      ease: 'power2.out',
      immediateRender: false,
      clearProps: 'opacity, transform',
      scrollTrigger: {
        trigger: '.standard-section',
        start: 'top 82%',
        once: true
      }
    }
  );

  // Footer
  gsap.fromTo('.footer-content > *',
    { autoAlpha: 0, y: 16 },
    {
      autoAlpha: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.06,
      ease: 'power2.out',
      immediateRender: false,
      clearProps: 'opacity, transform',
      scrollTrigger: {
        trigger: '#site-footer',
        start: 'top 90%',
        once: true
      }
    }
  );
}
