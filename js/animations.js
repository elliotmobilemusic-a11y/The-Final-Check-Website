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
  
  // Ensure all content is visible immediately
  gsap.set('#site-header', {
    y: 0,
    opacity: 1
  });

  gsap.set('#main-content', {
    opacity: 1,
    y: 0
  });

  gsap.set('.hero-section, .services-section, #site-footer', {
    opacity: 1,
    y: 0
  });

  // Smooth elegant reveal animation
  gsap.from('#site-header', {
    y: -20,
    opacity: 0,
    duration: 1.1,
    ease: 'expo.out',
    delay: 0.1
  });

  gsap.from('.hero-section', {
    y: 12,
    opacity: 0,
    duration: 1.3,
    ease: 'expo.out',
    delay: 0.15
  });

  if (document.querySelector('.services-section')) {
    gsap.from('.services-section', {
      y: 18,
      opacity: 0,
      duration: 1.4,
      ease: 'expo.out',
      delay: 0.3
    });
  }

  gsap.from('#site-footer', {
    y: 12,
    opacity: 0,
    duration: 1.2,
    ease: 'expo.out',
    delay: 0.45
  });
  
  // Subtle parallax on atmospheric background images
  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 12;
    const y = (e.clientY / window.innerHeight - 0.5) * 8;
    
    gsap.to('.atmosphere-left', {
      x: x * 0.4,
      y: y * 0.3,
      duration: 1.8,
      ease: 'power2.out'
    });
    
    gsap.to('.atmosphere-right', {
      x: x * -0.4,
      y: y * -0.3,
      duration: 1.8,
      ease: 'power2.out'
    });
  });

  // Micro hover effect on all cards
  document.querySelectorAll('.value-card, .service-card, .summary-item').forEach(card => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        y: -3,
        duration: 0.35,
        ease: 'power2.out'
      });
    });
    
    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        y: 0,
        duration: 0.45,
        ease: 'power2.out'
      });
    });
  });

  // Hide scroll indicator when user scrolls
  let scrollIndicator = document.querySelector('.scroll-indicator');
  if (scrollIndicator) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 80) {
        scrollIndicator.classList.add('hidden');
      } else {
        scrollIndicator.classList.remove('hidden');
      }
    }, { passive: true });
  }
}
