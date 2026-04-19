/**
 * The Final Check
 * Refined animation controller
 *
 * Goals:
 * - play intro on every fresh page load
 * - keep reduced-motion support
 * - make the intro smoother and more robust
 * - keep content visible and stable after reveal
 * - improve hover/parallax performance
 */

(() => {
  let siteEnabled = false;

  document.addEventListener("DOMContentLoaded", initSiteAnimations, { once: true });

  function initSiteAnimations() {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      showSiteImmediately();
      return;
    }

    runIntroAnimation();
  }

  function runIntroAnimation() {
    const overlay = document.getElementById("intro-overlay");
    const header = document.getElementById("site-header");
    const mainContent = document.getElementById("main-content");

    if (!overlay || !mainContent) {
      showSiteImmediately();
      return;
    }

    document.body.style.overflow = "hidden";

    const introTargets = [
      ".intro-divider",
      ".intro-logo",
      ".intro-tagline",
      ".intro-container",
    ];

    gsap.set(overlay, {
      display: "flex",
      opacity: 0,
      pointerEvents: "none",
    });

    gsap.set(mainContent, {
      opacity: 0,
      y: 24,
    });

    if (header) {
      header.classList.remove("active");
    }

    const tl = gsap.timeline({
      defaults: {
        ease: "expo.out",
      },
      onComplete: revealSite,
    });

    tl.to("#intro-overlay", {
      opacity: 1,
      duration: 0.7,
      ease: "power2.out",
    });

    tl.from(".intro-divider", {
      scaleX: 0,
      opacity: 0,
      duration: 1.1,
      transformOrigin: "center center",
    }, "+=0.25");

    tl.from(".intro-logo", {
      opacity: 0,
      y: 14,
      letterSpacing: "0.5em",
      duration: 1.35,
    }, "-=0.55");

    tl.to(".intro-tagline", {
      opacity: 0.72,
      y: 0,
      duration: 0.95,
      ease: "power2.out",
    }, "-=0.8");

    tl.to(".intro-container", {
      y: -36,
      duration: 1.0,
      ease: "power3.out",
    }, "+=0.45");

    tl.to("#intro-overlay", {
      opacity: 0,
      duration: 1.2,
      ease: "power2.inOut",
      onComplete: () => {
        gsap.set(overlay, { display: "none" });
        gsap.set(introTargets, { clearProps: "all" });
      },
    }, "-=0.15");
  }

  function revealSite() {
    if (siteEnabled) return;
    siteEnabled = true;

    const header = document.getElementById("site-header");
    const mainContent = document.getElementById("main-content");

    document.body.style.overflow = "";

    if (header) {
      header.classList.add("active");
    }

    gsap.to(mainContent, {
      opacity: 1,
      y: 0,
      duration: 1.0,
      ease: "expo.out",
      clearProps: "transform",
    });

    animateHeroContent();
    setupParallax();
    setupCardHoverEffects();
    setupScrollIndicator();
  }

  function showSiteImmediately() {
    if (siteEnabled) return;
    siteEnabled = true;

    const overlay = document.getElementById("intro-overlay");
    const header = document.getElementById("site-header");
    const mainContent = document.getElementById("main-content");

    document.body.style.overflow = "";

    if (overlay) {
      overlay.style.display = "none";
      overlay.style.opacity = "0";
    }

    if (header) {
      header.classList.add("active");
    }

    if (mainContent) {
      gsap.set(mainContent, {
        opacity: 1,
        y: 0,
        clearProps: "transform",
      });
    }

    setupParallax();
    setupCardHoverEffects();
    setupScrollIndicator();
  }

  function animateHeroContent() {
    const hero = document.querySelector(".hero-section");
    if (!hero) return;

    const targets = [
      hero.querySelector(".hero-eyebrow"),
      hero.querySelector("h1, h2"),
      hero.querySelector(".lead"),
      hero.querySelector(".lead-medium"),
      ...Array.from(hero.querySelectorAll("p")).filter(
        (el) =>
          !el.classList.contains("hero-eyebrow") &&
          !el.classList.contains("lead") &&
          !el.classList.contains("lead-medium")
      ),
      hero.querySelector(".scroll-indicator"),
    ].filter(Boolean);

    if (!targets.length) return;

    gsap.fromTo(
      targets,
      {
        opacity: 0,
        y: 10,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: "power2.out",
        clearProps: "transform",
      }
    );
  }

  function setupParallax() {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouchLike = window.matchMedia("(hover: none), (pointer: coarse)").matches;

    if (prefersReducedMotion || isTouchLike) return;

    const leftImage = document.querySelector(".atmosphere-left");
    const rightImage = document.querySelector(".atmosphere-right");

    if (!leftImage && !rightImage) return;

    const moveLeftX = leftImage ? gsap.quickTo(leftImage, "x", { duration: 1.4, ease: "power3.out" }) : null;
    const moveLeftY = leftImage ? gsap.quickTo(leftImage, "y", { duration: 1.4, ease: "power3.out" }) : null;
    const moveRightX = rightImage ? gsap.quickTo(rightImage, "x", { duration: 1.4, ease: "power3.out" }) : null;
    const moveRightY = rightImage ? gsap.quickTo(rightImage, "y", { duration: 1.4, ease: "power3.out" }) : null;

    window.addEventListener("mousemove", (event) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 10;
      const y = (event.clientY / window.innerHeight - 0.5) * 8;

      if (moveLeftX && moveLeftY) {
        moveLeftX(x * 0.35);
        moveLeftY(y * 0.25);
      }

      if (moveRightX && moveRightY) {
        moveRightX(x * -0.35);
        moveRightY(y * -0.25);
      }
    });
  }

  function setupCardHoverEffects() {
    const cards = document.querySelectorAll(".value-card, .service-card, .summary-item");
    if (!cards.length) return;

    cards.forEach((card) => {
      let isAnimating = false;

      card.addEventListener("mouseenter", () => {
        if (isAnimating) return;
        isAnimating = true;

        gsap.to(card, {
          y: -3,
          duration: 0.28,
          ease: "power2.out",
          onComplete: () => {
            isAnimating = false;
          },
        });
      });

      card.addEventListener("mouseleave", () => {
        if (isAnimating) return;
        isAnimating = true;

        gsap.to(card, {
          y: 0,
          duration: 0.34,
          ease: "power2.out",
          onComplete: () => {
            isAnimating = false;
          },
        });
      });
    });
  }

  function setupScrollIndicator() {
    const indicator = document.querySelector(".scroll-indicator");
    if (!indicator) return;

    const toggleIndicator = () => {
      if (window.scrollY > 80) {
        indicator.classList.add("hidden");
      } else {
        indicator.classList.remove("hidden");
      }
    };

    toggleIndicator();
    window.addEventListener("scroll", toggleIndicator, { passive: true });
  }
})();