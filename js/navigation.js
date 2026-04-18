/**
 * Premium Page Transitions
 * Luxury Hospitality Navigation
 */

document.addEventListener('DOMContentLoaded', () => {
  
  // Page transition overlay
  const transitionOverlay = document.createElement('div');
  transitionOverlay.classList.add('page-transition-overlay');
  document.body.appendChild(transitionOverlay);

  // Intercept all internal navigation links
  document.querySelectorAll('a[href^="/"], a[href^="."]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      
      // Skip anchor links and external
      if (href.startsWith('#') || href.startsWith('http')) return;
      
      e.preventDefault();
      
      // Premium smooth page exit transition
      gsap.to(transitionOverlay, {
        opacity: 1,
        duration: 0.55,
        ease: 'power3.inOut',
        onComplete: () => {
          window.scrollTo(0, 0);
          window.location.href = href;
        }
      });
    });
  });

  // Premium page reveal animation on load
  window.addEventListener('load', () => {
    // Always ensure content is visible
    gsap.set('#main-content, .hero-section, .value-card, .service-card, .summary-item, .scroll-indicator', {
      opacity: 1,
      y: 0,
      clearProps: 'opacity, y'
    });

    // Elegant fade in sequence
    const revealTimeline = gsap.timeline();
    
    revealTimeline
      .fromTo(transitionOverlay, {
        opacity: 1
      }, {
        opacity: 0,
        duration: 0.75,
        ease: 'expo.out',
        delay: 0.08,
        clearProps: 'all'
      }, 0)
      .from('#site-header', {
        y: -22,
        opacity: 0,
        duration: 1.15,
        ease: 'expo.out'
      }, 0.2)
      .from('.hero-section', {
        y: 10,
        opacity: 0,
        duration: 1.25,
        ease: 'expo.out'
      }, 0.28)
      .from('.scroll-indicator', {
        y: 12,
        opacity: 0,
        duration: 1.1,
        ease: 'expo.out'
      }, 0.5);
  });
  
});