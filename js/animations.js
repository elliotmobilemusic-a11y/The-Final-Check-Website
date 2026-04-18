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

  // Only run intro animation once per session
  if (sessionStorage.getItem('hasSeenIntro')) {
    skipIntroAnimation();
    return;
  }
  
  // Run opening animation
  runIntroAnimation();

  // Allow Spacebar to skip / speed up intro
  document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && !siteEnabled) {
      e.preventDefault();
      skipIntroAnimation();
    }
  }, { once: true });

  // Mark as seen for this session
  sessionStorage.setItem('hasSeenIntro', 'true');
  
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
  
  // Reset scroll position to absolute top
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  
  gsap.set('body', { overflow: 'auto' });
  
  // Smooth elegant reveal of page content
  gsap.fromTo('#site-header', {
    y: -30,
    opacity: 0
  }, {
    y: 0,
    opacity: 1,
    duration: 1.2,
    ease: 'expo.out',
    delay: 0.1
  });

  gsap.fromTo('#main-content .hero-section', {
    y: 20,
    opacity: 0
  }, {
    y: 0,
    opacity: 1,
    duration: 1.4,
    ease: 'expo.out',
    delay: 0.2
  });

  gsap.fromTo('#main-content .services-section', {
    y: 30,
    opacity: 0
  }, {
    y: 0,
    opacity: 1,
    duration: 1.5,
    ease: 'expo.out',
    delay: 0.4
  });

  gsap.fromTo('#site-footer', {
    y: 20,
    opacity: 0
  }, {
    y: 0,
    opacity: 1,
    duration: 1.4,
    ease: 'expo.out',
    delay: 0.55
  });
}
