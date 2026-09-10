// AOS Animation Initialization
import AOS from 'aos';
import 'aos/dist/aos.css';

export function initAOS(): void {
  AOS.init({
    offset: 50,
    delay: 0,
    duration: 400,
    easing: 'ease-out-sine',
    once: true,
    mirror: false,
    anchorPlacement: 'top-bottom',
  });
}

initAOS();
