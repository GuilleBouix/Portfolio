const mobileNavigation = document.querySelector<HTMLDetailsElement>('#mobile-navigation');

if (mobileNavigation) {
  document.addEventListener('click', (event) => {
    if (!mobileNavigation.open || !(event.target instanceof Element)) return;

    if (!mobileNavigation.contains(event.target) || event.target.closest('a[href]')) {
      mobileNavigation.open = false;
    }
  });
}
