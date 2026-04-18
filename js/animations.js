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

  // ------------------------------
  // HERO SECTION
  // ------------------------------
  {
    const trigger = document.querySelector('.hero-section');
    const targets = [
      document.querySelector('.hero-section .hero-eyebrow'),
      document.querySelector('.hero-section h2'),
      document.querySelector('.hero-section .lead')
    ].filter(Boolean);

    if (trigger && targets.length) {
      gsap.fromTo(targets,
        { autoAlpha: 0, y: 14 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.05,
          ease: 'power2.out',
          immediateRender: false,
          scrollTrigger: {
            trigger,
            start: 'top 86%',
            once: true,
            toggleActions: 'play none none none'
          }
        }
      );
    }
  }

  // ------------------------------
  // WHY JASON SECTION
  // ------------------------------
  {
    const trigger = document.querySelector('.why-jason-section');
    const targets = [
      document.querySelector('.why-jason-section .section-title'),
      ...document.querySelectorAll('.why-jason-section .value-card')
    ].filter(Boolean);

    if (trigger && targets.length) {
      gsap.fromTo(targets,
        { autoAlpha: 0, y: 14 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.06,
          ease: 'power2.out',
          immediateRender: false,
          scrollTrigger: {
            trigger,
            start: 'top 86%',
            once: true,
            toggleActions: 'play none none none'
          }
        }
      );
    }
  }

  // ------------------------------
  // JASON SUMMARY SECTION
  // ------------------------------
  {
    const trigger = document.querySelector('.jason-summary-section');
    const targets = [
      document.querySelector('.jason-summary-section .lead-large'),
      ...document.querySelectorAll('.jason-summary-section p')
    ].filter(Boolean);

    if (trigger && targets.length) {
      gsap.fromTo(targets,
        { autoAlpha: 0, y: 12 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.04,
          ease: 'power2.out',
          immediateRender: false,
          scrollTrigger: {
            trigger,
            start: 'top 86%',
            once: true,
            toggleActions: 'play none none none'
          }
        }
      );
    }
  }

  // ------------------------------
  // JASON PROFILE SECTION
  // ------------------------------
  {
    const trigger = document.querySelector('.jason-profile-section');
    const targets = [
      document.querySelector('.jason-profile-section .about-portrait'),
      ...document.querySelectorAll('.jason-profile-section .about-content > *')
    ].filter(Boolean);

    if (trigger && targets.length) {
      gsap.fromTo(targets,
        { autoAlpha: 0, y: 14 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.05,
          ease: 'power2.out',
          immediateRender: false,
          scrollTrigger: {
            trigger,
            start: 'top 86%',
            once: true,
            toggleActions: 'play none none none'
          }
        }
      );
    }
  }

  // ------------------------------
  // SERVICES SECTION
  // ------------------------------
  {
    const trigger = document.querySelector('.services-section');
    const targets = [
      document.querySelector('.services-section .section-title'),
      ...document.querySelectorAll('.services-section .service-card')
    ].filter(Boolean);

    if (trigger && targets.length) {
      gsap.fromTo(targets,
        { autoAlpha: 0, y: 12 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.05,
          ease: 'power2.out',
          immediateRender: false,
          scrollTrigger: {
            trigger,
            start: 'top 86%',
            once: true,
            toggleActions: 'play none none none'
          }
        }
      );
    }
  }

  // ------------------------------
  // FOOTER
  // ------------------------------
  {
    const trigger = document.querySelector('#site-footer');
    const targets = [...document.querySelectorAll('.footer-content > *')].filter(Boolean);

    if (trigger && targets.length) {
      gsap.fromTo(targets,
        { autoAlpha: 0, y: 10 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.04,
          ease: 'power2.out',
          immediateRender: false,
          scrollTrigger: {
            trigger,
            start: 'top 90%',
            once: true,
            toggleActions: 'play none none none'
          }
        }
      );
    }
  }
}
