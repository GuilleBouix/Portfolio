// Mobile Menu Toggle
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const iconBurger = document.getElementById('icon-burger');
const iconClose = document.getElementById('icon-close');
const menuItems = document.querySelectorAll('.menu-item');

let isOpen = false;

menuToggle?.addEventListener('click', () => {
  isOpen = !isOpen;

  if (isOpen) {
    mobileMenu?.classList.remove('hidden');
    setTimeout(() => {
      mobileMenu?.classList.add('show');
    }, 10);

    menuItems.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add('show');
      }, 50 + (index * 50));
    });

    iconBurger?.classList.remove('opacity-100', 'rotate-0');
    iconBurger?.classList.add('opacity-0', 'rotate-90');
    iconClose?.classList.remove('opacity-0', 'rotate-90');
    iconClose?.classList.add('opacity-100', 'rotate-0');
  } else {
    menuItems.forEach(item => {
      item.classList.remove('show');
    });

    mobileMenu?.classList.remove('show');
    setTimeout(() => {
      mobileMenu?.classList.add('hidden');
    }, 300);

    iconClose?.classList.remove('opacity-100', 'rotate-0');
    iconClose?.classList.add('opacity-0', 'rotate-90');
    iconBurger?.classList.remove('opacity-0', 'rotate-90');
    iconBurger?.classList.add('opacity-100', 'rotate-0');
  }
});

document.addEventListener('click', (e) => {
  if (isOpen && !menuToggle?.contains(e.target as Node) && !mobileMenu?.contains(e.target as Node)) {
    isOpen = false;

    menuItems.forEach(item => {
      item.classList.remove('show');
    });

    mobileMenu?.classList.remove('show');
    setTimeout(() => {
      mobileMenu?.classList.add('hidden');
    }, 300);

    iconClose?.classList.remove('opacity-100', 'rotate-0');
    iconClose?.classList.add('opacity-0', 'rotate-90');
    iconBurger?.classList.remove('opacity-0', 'rotate-90');
    iconBurger?.classList.add('opacity-100', 'rotate-0');
  }
});
