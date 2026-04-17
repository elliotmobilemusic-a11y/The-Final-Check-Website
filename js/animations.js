/**
 * Opening Animation Sequence
 * Apple style cinematic brand reveal
 */

document.addEventListener('DOMContentLoaded', () => {
  
  // Skip animation for reduced motion users
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    skipIntroAnimation();
    return;
  }
  
  // Skip animation for repeat visits in same session
  if (sessionStorage.getItem('introPlayed')) {
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
      sessionStorage.setItem('introPlayed', 'true');
      enableSite();
    }
  });
  
  tl.to('#intro-overlay', {
    opacity: 1,
    duration: 0.6,
    ease: 'power2.out'
  });
  
  tl.from('.intro-line', {
    scaleX: 0,
    duration: 0.8,
    ease: 'power2.out',
    delay: 0.3
  });
  
  tl.to('.intro-line', {
    scaleY: 140,
    duration: 0.9,
    ease: 'expo.out',
    delay: 0.2
  });
  
  tl.from('.intro-logo', {
    opacity: 0,
    y: 20,
    duration: 0.7,
    ease: 'power2.out'
  }, '-=0.4');
  
  tl.to('.intro-logo-container', {
    scale: 0.75,
    y: -60,
    duration: 1,
    ease: 'expo.out',
    delay: 0.6
  });
  
  tl.to('#intro-overlay', {
    opacity: 0,
    duration: 0.8,
    ease: 'power2.inOut',
    onComplete: () => {
      document.getElementById('intro-overlay').style.display = 'none';
    }
  }, '-=0.2');
}

function skipIntroAnimation() {
  gsap.killTweensOf('*');
  gsap.set('#intro-overlay', { opacity: 0, display: 'none' });
  gsap.set('.intro-line, .intro-logo, .intro-logo-container', { clearProps: 'all' });
  enableSite();
}

function enableSite() {
  gsap.set('body', { overflow: 'auto' });
  document.getElementById('main-content').style.opacity = '1';
  document.getElementById('site-header').classList.add('active');
  
  // Initialise scroll animations
  if (typeof initScrollAnimations === 'function') {
    initScrollAnimations();
  }
}