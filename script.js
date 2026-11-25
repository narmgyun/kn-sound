/* KN Sound — interactions
   Small and dependency-free: header state, mobile menu, scroll reveal. */

(function () {
  'use strict';

  var header = document.getElementById('siteHeader');
  var menuBtn = document.getElementById('menuBtn');
  var nav = document.getElementById('primaryNav');

  /* --- Header background after leaving the hero ------------------------- */
  var frameQueued = false;

  function onScroll() {
    if (frameQueued) return;
    frameQueued = true;
    window.requestAnimationFrame(function () {
      header.classList.toggle('is-scrolled', window.scrollY > 40);
      frameQueued = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* --- Mobile menu ------------------------------------------------------ */
  function closeMenu() {
    nav.classList.remove('is-open');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.setAttribute('aria-label', '메뉴 열기');
    document.body.classList.remove('nav-open');
  }

  function openMenu() {
    nav.classList.add('is-open');
    menuBtn.setAttribute('aria-expanded', 'true');
    menuBtn.setAttribute('aria-label', '메뉴 닫기');
    document.body.classList.add('nav-open');
  }

  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function () {
      if (menuBtn.getAttribute('aria-expanded') === 'true') {
        closeMenu();
      } else {
        openMenu();
      }
    });

    nav.addEventListener('click', function (event) {
      if (event.target.closest('a')) closeMenu();
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && nav.classList.contains('is-open')) {
        closeMenu();
        menuBtn.focus();
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 860 && nav.classList.contains('is-open')) closeMenu();
    });
  }

  /* --- Reveal on scroll -------------------------------------------------
     A jump (anchor link, restored position) can skip past a block without the
     browser ever reporting it as visible, so anything at or above the fold is
     revealed on every check rather than only when it crosses into view.      */
  var pending = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function reveal(el) {
    var siblings = el.parentElement
      ? Array.prototype.slice.call(el.parentElement.children)
      : [];
    var index = Math.max(0, siblings.indexOf(el));
    el.style.transitionDelay = Math.min(index * 70, 280) + 'ms';
    el.classList.add('is-visible');
  }

  function checkReveals() {
    if (reduceMotion || !pending.length) return;
    var limit = window.innerHeight * 0.92;
    pending = pending.filter(function (el) {
      if (el.getBoundingClientRect().top < limit) {
        reveal(el);
        return false;
      }
      return true;
    });
  }

  var checkQueued = false;

  function onRevealScroll() {
    if (checkQueued) return;
    checkQueued = true;
    window.requestAnimationFrame(function () {
      checkReveals();
      checkQueued = false;
    });
  }

  if (reduceMotion) {
    pending.forEach(function (el) { el.classList.add('is-visible'); });
    pending = [];
  } else if ('IntersectionObserver' in window) {
    /* the observer keeps the first paint cheap; the scroll check backs it up */
    var check = function () { onRevealScroll(); };
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    window.addEventListener('load', check);
    checkReveals();
  } else {
    pending.forEach(function (el) { el.classList.add('is-visible'); });
    pending = [];
  }

  /* --- Current year ----------------------------------------------------- */
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
