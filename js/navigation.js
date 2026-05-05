/**
 * Navigation Helpers
 * The Final Check
 *
 * Lightweight only:
 * - sets the correct active nav item automatically
 * - improves hash-link focus behaviour for accessibility
 * - does not interfere with intro animation or page loading
 */

(() => {
  document.addEventListener("DOMContentLoaded", initNavigation, { once: true });

  function initNavigation() {
    syncActiveNavLinks();
    enhanceHashLinks();
    focusHashTargetOnLoad();
  }

  function syncActiveNavLinks() {
    const navLinks = document.querySelectorAll(".nav-links a[href]");
    if (!navLinks.length) return;

    const currentPath = normalisePath(window.location.pathname);

    navLinks.forEach((link) => {
      const url = new URL(link.getAttribute("href"), window.location.origin);
      const linkPath = normalisePath(url.pathname);

      const isHomeMatch =
        (currentPath === "/" || currentPath === "/index.html") &&
        (linkPath === "/" || linkPath === "/index.html");

      const isMatch = isHomeMatch || currentPath === linkPath;

      link.classList.toggle("active", isMatch);

      if (isMatch) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  function enhanceHashLinks() {
    const hashLinks = document.querySelectorAll('a[href^="#"]');

    hashLinks.forEach((link) => {
      link.addEventListener("click", () => {
        const targetId = link.getAttribute("href");
        if (!targetId || targetId === "#") return;

        const target = document.querySelector(targetId);
        if (!target) return;

        window.setTimeout(() => {
          makeTemporarilyFocusable(target);
          target.focus({ preventScroll: true });
        }, 250);
      });
    });
  }

  function focusHashTargetOnLoad() {
    if (!window.location.hash) return;

    const target = document.querySelector(window.location.hash);
    if (!target) return;

    window.setTimeout(() => {
      makeTemporarilyFocusable(target);
      target.focus({ preventScroll: true });
    }, 300);
  }

  function makeTemporarilyFocusable(element) {
    if (!element.hasAttribute("tabindex")) {
      element.setAttribute("tabindex", "-1");
    }
  }

  function normalisePath(pathname) {
    if (!pathname) return "/";

    let path = pathname.trim();

    if (path.length > 1 && path.endsWith("/")) {
      path = path.slice(0, -1);
    }

    if (path === "/index.html") {
      return "/";
    }

    if (path.length > 5 && path.endsWith(".html")) {
      path = path.slice(0, -5);
    }

    return path || "/";
  }
})();
