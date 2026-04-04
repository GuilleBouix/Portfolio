// AOS Animation Initialization
interface AOSOptions {
  offset: number;
  delay: number;
  duration: number;
  easing: string;
  once: boolean;
  mirror: boolean;
  anchorPlacement: string;
}

interface AOS {
  init: (options: AOSOptions) => void;
}

declare const AOS: AOS;

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
