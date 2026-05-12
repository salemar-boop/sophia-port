(function () {
  var openBtn = document.getElementById("nav-open");
  var closeBtn = document.getElementById("nav-close");
  var overlay = document.getElementById("site-nav");
  var yearEl = document.getElementById("year");

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  if (!openBtn || !closeBtn || !overlay) return;

  function setOpen(isOpen) {
    overlay.hidden = !isOpen;
    overlay.setAttribute("aria-hidden", isOpen ? "false" : "true");
    openBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    document.body.style.overflow = isOpen ? "hidden" : "";
  }

  openBtn.addEventListener("click", function () {
    setOpen(true);
    closeBtn.focus();
  });

  closeBtn.addEventListener("click", function () {
    setOpen(false);
    openBtn.focus();
  });

  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) {
      setOpen(false);
      openBtn.focus();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !overlay.hidden) {
      setOpen(false);
      openBtn.focus();
    }
  });

  overlay.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      setOpen(false);
    });
  });
})();
