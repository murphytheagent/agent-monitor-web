const MOBILE_MENU_BREAKPOINT = 900;

function closeMenu(toggle, panel) {
  toggle.setAttribute("aria-expanded", "false");
  panel.hidden = true;
}

function openMenu(toggle, panel) {
  toggle.setAttribute("aria-expanded", "true");
  panel.hidden = false;
}

document.querySelectorAll(".site-menu-toggle").forEach((toggle) => {
  const panelId = toggle.getAttribute("aria-controls");
  const panel = panelId ? document.getElementById(panelId) : null;

  if (!panel) {
    return;
  }

  closeMenu(toggle, panel);

  toggle.addEventListener("click", (event) => {
    event.stopPropagation();

    if (panel.hidden) {
      openMenu(toggle, panel);
      return;
    }

    closeMenu(toggle, panel);
  });

  panel.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu(toggle, panel);
    });
  });

  document.addEventListener("click", (event) => {
    if (panel.hidden) {
      return;
    }

    if (panel.contains(event.target) || toggle.contains(event.target)) {
      return;
    }

    closeMenu(toggle, panel);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") {
      return;
    }

    closeMenu(toggle, panel);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > MOBILE_MENU_BREAKPOINT) {
      closeMenu(toggle, panel);
    }
  });
});
