(() => {
  const AUTO_SPEED_PX_PER_SECOND = 28;
  const WHEEL_SPEED = 1.15;
  const LINE_HEIGHT_PX = 16;
  const WHEEL_IDLE_PAUSE_MS = 1200;

  const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  function wheelDeltaToPixels(event) {
    const rawDelta =
      Math.abs(event.deltaX) > Math.abs(event.deltaY)
        ? event.deltaX
        : event.deltaY;

    switch (event.deltaMode) {
      case WheelEvent.DOM_DELTA_LINE:
        return rawDelta * LINE_HEIGHT_PX;
      case WheelEvent.DOM_DELTA_PAGE:
        return rawDelta * window.innerHeight;
      default:
        return rawDelta;
    }
  }

  function getGapPx(track) {
    const gap = window.getComputedStyle(track).columnGap || window.getComputedStyle(track).gap;
    const value = Number.parseFloat(gap);
    return Number.isFinite(value) ? value : 0;
  }

  function getLoopDistance(track) {
    const gap = getGapPx(track);
    return (track.scrollWidth + gap) / 2;
  }

  function normalizeScrollLeft(viewport, loopDistance) {
    if (!loopDistance) return;
    while (viewport.scrollLeft >= loopDistance) {
      viewport.scrollLeft -= loopDistance;
    }
    while (viewport.scrollLeft < 0) {
      viewport.scrollLeft += loopDistance;
    }
  }

  function initScreenshotCarouselWheelScroll(root = document) {
    root.querySelectorAll('.screenshot-carousel').forEach((carousel) => {
      if (carousel.dataset.wheelScrollBound === 'true') return;

      const viewport = carousel.querySelector('.screenshot-carousel__viewport');
      const track = carousel.querySelector('.screenshot-carousel__track');

      if (!viewport || !track) return;

      carousel.dataset.wheelScrollBound = 'true';

      let rafId = 0;
      let lastFrameTime = 0;
      let pendingWheelDelta = 0;
      let isHovered = false;
      let isFocused = false;
      let wheelPauseUntil = 0;

      function shouldAutoScroll(now) {
        if (reduceMotionQuery.matches) return false;
        if (isHovered) return false;
        if (isFocused) return false;
        if (now < wheelPauseUntil) return false;
        return true;
      }

      function applyDelta(delta) {
        const loopDistance = getLoopDistance(track);
        if (!loopDistance) return;
        viewport.scrollLeft += delta;
        normalizeScrollLeft(viewport, loopDistance);
      }

      function tick(now) {
        if (!lastFrameTime) {
          lastFrameTime = now;
        }

        const elapsedSeconds = Math.min((now - lastFrameTime) / 1000, 0.05);
        lastFrameTime = now;

        if (pendingWheelDelta !== 0) {
          applyDelta(pendingWheelDelta);
          pendingWheelDelta = 0;
        } else if (shouldAutoScroll(now)) {
          applyDelta(AUTO_SPEED_PX_PER_SECOND * elapsedSeconds);
        }

        rafId = requestAnimationFrame(tick);
      }

      carousel.addEventListener(
        'wheel',
        (event) => {
          if (event.ctrlKey) return;

          const delta = wheelDeltaToPixels(event) * WHEEL_SPEED;
          if (delta === 0) return;

          event.preventDefault();

          pendingWheelDelta += delta;
          wheelPauseUntil = performance.now() + WHEEL_IDLE_PAUSE_MS;
        },
        { passive: false }
      );

      carousel.addEventListener('mouseenter', () => {
        isHovered = true;
      });

      carousel.addEventListener('mouseleave', () => {
        isHovered = false;
        wheelPauseUntil = performance.now() + 250;
      });

      carousel.addEventListener('focusin', () => {
        isFocused = true;
      });

      carousel.addEventListener('focusout', () => {
        isFocused = false;
      });

      window.addEventListener('resize', () => {
        normalizeScrollLeft(viewport, getLoopDistance(track));
      });

      rafId = requestAnimationFrame(tick);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener(
      'DOMContentLoaded',
      () => initScreenshotCarouselWheelScroll(),
      { once: true }
    );
  } else {
    initScreenshotCarouselWheelScroll();
  }

  document.addEventListener('astro:page-load', () => {
    initScreenshotCarouselWheelScroll();
  });
})();
