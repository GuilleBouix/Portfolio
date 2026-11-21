// AOS Animation Initialization
import AOS from 'aos';

export function initAOS(): void {
  if (!window.matchMedia('(prefers-reduced-motion: no-preference)').matches) return;

  AOS.init({
    offset: 50,
    delay: 0,
    duration: 400,
    easing: 'ease-out-sine',
    once: true,
    mirror: false,
    anchorPlacement: 'top-bottom',
  });

  document.documentElement.classList.add('aos-ready');
}

initAOS();
