const mobileNavigation = document.querySelector<HTMLDetailsElement>('#mobile-navigation');
const summary = mobileNavigation?.querySelector('summary');

if (mobileNavigation && summary) {
  mobileNavigation.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || !mobileNavigation.open) return;

    event.preventDefault();
    mobileNavigation.open = false;
    summary.focus();
  });

  mobileNavigation.addEventListener('focusout', (event) => {
    if (event.relatedTarget instanceof Node && !mobileNavigation.contains(event.relatedTarget)) {
      mobileNavigation.open = false;
    }
  });

  document.addEventListener('click', (event) => {
    if (!mobileNavigation.open || !(event.target instanceof Element)) return;

    if (!mobileNavigation.contains(event.target)) {
      mobileNavigation.open = false;
      return;
    }

    const link = event.target.closest<HTMLAnchorElement>('a[href]');
    if (!link || event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;

    if (link.origin === location.origin && link.pathname === location.pathname && link.hash) {
      const target = document.getElementById(link.hash.slice(1));
      if (target && !target.hasAttribute('tabindex')) target.tabIndex = -1;
    }

    mobileNavigation.open = false;
  });
}
