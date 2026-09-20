
document.addEventListener('DOMContentLoaded', () => {
  const menu = document.querySelector('.menu-button');
  const nav = document.querySelector('.nav');
  menu?.addEventListener('click', () => {
    const open = nav?.classList.toggle('open') ?? false;
    menu.setAttribute('aria-expanded', String(open));
  });

  const campaignMenu = document.querySelector('.lca68-menu');
  const campaignScrim = document.querySelector('.lca68-menu-scrim');
  const campaignDrawer = document.querySelector('.lca68-drawer');
  const platformGroup = document.querySelector('.lca68-drawer-group');
  const platformTrigger = document.querySelector('.lca68-drawer-platform-trigger');
  const platformSubmenu = document.querySelector('.lca68-drawer-submenu');
  const platformLinks = Array.from(platformSubmenu?.querySelectorAll('a') ?? []);
  const contactGroup = document.querySelector('.lca68-contact-group');
  const contactTrigger = document.querySelector('.lca68-drawer-contact-trigger');
  const contactPanel = document.querySelector('.lca68-contact-panel');
  const contactForm = contactPanel?.querySelector('form');
  const contactInput = contactPanel?.querySelector('input');
  const contactStatus = contactPanel?.querySelector('[role="status"]');
  let returnFocus = null;
  let previousOverflow = '';
  const setPlatformMenu = open => {
    if (open) setContactMenu(false);
    platformGroup?.classList.toggle('is-expanded', open);
    platformTrigger?.setAttribute('aria-expanded', String(open));
    platformSubmenu?.setAttribute('aria-hidden', String(!open));
    platformSubmenu?.toggleAttribute('inert', !open);
    platformLinks.forEach(link => link.tabIndex = open ? 0 : -1);
  };
  const setContactMenu = open => {
    contactGroup?.classList.toggle('is-expanded', open);
    contactTrigger?.setAttribute('aria-expanded', String(open));
    contactPanel?.setAttribute('aria-hidden', String(!open));
    contactPanel?.toggleAttribute('inert', !open);
    if (contactInput) contactInput.tabIndex = open ? 0 : -1;
    if (open) setPlatformMenu(false);
  };
  const setCampaignMenu = (open, showPlatforms = false) => {
    const wasOpen = campaignDrawer?.classList.contains('is-open');
    if (open && !wasOpen) {
      returnFocus = document.activeElement;
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    }
    campaignMenu?.classList.toggle('is-open', open);
    campaignScrim?.classList.toggle('is-open', open);
    campaignDrawer?.classList.toggle('is-open', open);
    campaignMenu?.setAttribute('aria-expanded', String(open));
    campaignMenu?.setAttribute('aria-label', open ? 'Close campaign menu' : 'Open campaign menu');
    campaignScrim?.setAttribute('tabindex', '-1');
    campaignDrawer?.setAttribute('aria-hidden', String(!open));
    campaignDrawer?.toggleAttribute('inert', !open);
    if (!open || showPlatforms) setPlatformMenu(open && showPlatforms);
    if (!open) setContactMenu(false);
    if (open && !wasOpen) requestAnimationFrame(() => platformTrigger?.focus({ preventScroll: true }));
    if (!open && wasOpen) {
      document.body.style.overflow = previousOverflow;
      if (returnFocus?.isConnected) returnFocus.focus({ preventScroll: true });
    }
  };
  campaignMenu?.addEventListener('click', () => setCampaignMenu(!campaignMenu.classList.contains('is-open')));
  campaignScrim?.addEventListener('click', () => setCampaignMenu(false));
  platformTrigger?.addEventListener('click', () => setPlatformMenu(!platformGroup?.classList.contains('is-expanded')));
  contactTrigger?.addEventListener('click', () => setContactMenu(!contactGroup?.classList.contains('is-expanded')));
  contactForm?.addEventListener('submit', event => {
    event.preventDefault();
    if (contactStatus) contactStatus.textContent = 'Thanks. We’ll be in touch.';
  });
  document.querySelectorAll('.lca68-platform-link').forEach(launcher => launcher.addEventListener('click', () => setCampaignMenu(true, true)));
  platformGroup?.addEventListener('mouseenter', () => setPlatformMenu(true));
  platformGroup?.addEventListener('mouseleave', () => {
    if (!platformGroup.contains(document.activeElement)) setPlatformMenu(false);
  });
  platformGroup?.addEventListener('focusout', event => {
    if (!platformGroup.contains(event.relatedTarget)) setPlatformMenu(false);
  });
  platformGroup?.addEventListener('keydown', event => {
    if ((event.key === 'ArrowDown' || event.key === 'ArrowRight') && event.target === platformTrigger) {
      event.preventDefault();
      setPlatformMenu(true);
      platformLinks[0]?.focus();
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      setPlatformMenu(false);
      platformTrigger?.focus();
    }
  });
  campaignDrawer?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setCampaignMenu(false)));
  document.addEventListener('keydown', event => {
    if (!campaignDrawer?.classList.contains('is-open')) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      setCampaignMenu(false);
    }
    if (event.key !== 'Tab') return;
    const drawerControls = Array.from(campaignDrawer.querySelectorAll('a[href], button:not([disabled]), input:not([disabled])'))
      .filter(element => element.tabIndex >= 0 && !element.closest('[inert]'));
    const controls = [campaignMenu, ...drawerControls].filter(Boolean);
    const first = controls[0];
    const last = controls[controls.length - 1];
    const active = document.activeElement;
    if (event.shiftKey && (active === first || !controls.includes(active))) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && (active === last || !controls.includes(active))) {
      event.preventDefault();
      first?.focus();
    }
  });
  setPlatformMenu(false);
  setContactMenu(false);

  const campaignVideo = document.querySelector('.lca68-video');
  const musicButton = document.querySelector('.lca68-music');
  const musicBars = musicButton?.querySelector('.lca68-music-bars');
  const musicLabel = musicButton?.querySelector('b');
  const motionButton = document.querySelector('.lca68-motion');
  const motionLabel = motionButton?.querySelector('b');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const updateMusic = muted => {
    musicBars?.classList.toggle('is-muted', muted);
    if (musicLabel) musicLabel.textContent = muted ? 'Music off' : 'Music on';
    musicButton?.setAttribute('aria-label', muted ? 'Turn background music on' : 'Turn background music off');
    musicButton?.setAttribute('aria-pressed', String(!muted));
  };
  const updateMotion = paused => {
    if (motionLabel) motionLabel.textContent = paused ? 'Play video' : 'Pause video';
    motionButton?.setAttribute('aria-label', paused ? 'Play background video' : 'Pause background video');
    motionButton?.setAttribute('aria-pressed', String(paused));
  };
  const playVideo = async () => {
    if (!campaignVideo) return;
    try {
      await campaignVideo.play();
    } catch {
      campaignVideo.muted = true;
      updateMusic(true);
    }
    updateMotion(campaignVideo.paused);
  };
  musicButton?.addEventListener('click', async () => {
    if (!campaignVideo) return;
    campaignVideo.muted = !campaignVideo.muted;
    campaignVideo.volume = 0.65;
    updateMusic(campaignVideo.muted);
    if (!campaignVideo.muted) await playVideo();
  });
  motionButton?.addEventListener('click', async () => {
    if (!campaignVideo) return;
    if (campaignVideo.paused) {
      await playVideo();
    } else {
      campaignVideo.pause();
      updateMotion(true);
    }
  });
  const respectReducedMotion = () => {
    if (!campaignVideo || !reducedMotion.matches) return;
    campaignVideo.autoplay = false;
    campaignVideo.pause();
    campaignVideo.muted = true;
    updateMotion(true);
    updateMusic(true);
  };
  if (campaignVideo) {
    campaignVideo.addEventListener('play', () => updateMotion(false));
    campaignVideo.addEventListener('pause', () => updateMotion(true));
    campaignVideo.addEventListener('volumechange', () => updateMusic(campaignVideo.muted));
    respectReducedMotion();
    updateMusic(campaignVideo.muted);
    updateMotion(campaignVideo.paused);
    reducedMotion.addEventListener('change', respectReducedMotion);
  }

  if (location.hash) requestAnimationFrame(() => document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView({block:'start'}));
});
