(function () {
  "use strict";

  var DEFAULT_MORE = "About this project";

  function encodePath(rel) {
    return String(rel)
      .split("/")
      .map(function (part) {
        return encodeURIComponent(part);
      })
      .join("/");
  }

  function normalizeDescription(description) {
    if (description == null) return [];
    if (Array.isArray(description)) {
      return description.map(String).map(function (t) {
        return t.trim();
      }).filter(Boolean);
    }
    var one = String(description).trim();
    return one ? [one] : [];
  }

  function buildProjectRows(projects) {
    var rows = [];
    if (!projects || !projects.length) return rows;

    rows.push({ kind: "2", items: projects.slice(0, Math.min(2, projects.length)) });

    if (projects.length > 2) {
      rows.push({ kind: "4", items: projects.slice(2, Math.min(6, projects.length)) });
    }

    for (var i = 6; i < projects.length; i += 2) {
      rows.push({ kind: "4span2", items: projects.slice(i, i + 2) });
    }

    return rows;
  }

  function quadSpans(n, index) {
    if (n <= 1) return "cell--span4";
    if (n === 2) return "cell--span2";
    if (n === 3) return index === 0 ? "cell--span2" : "";
    return "";
  }

  function pairSpans(n, index) {
    if (n <= 1) return "cell--span2";
    return "cell--span2";
  }

  function renderBio(root, bio) {
    if (!root) return;
    root.textContent = "";

    if (!bio) {
      root.appendChild(document.createTextNode("Add a bio object to content.js."));
      return;
    }

    if (bio.eyebrow) {
      var eyebrow = document.createElement("p");
      eyebrow.className = "bio__eyebrow";
      eyebrow.textContent = bio.eyebrow;
      root.appendChild(eyebrow);
    }

    var paras = bio.paragraphs || [];
    for (var i = 0; i < paras.length; i++) {
      var p = document.createElement("p");
      p.className = "bio__p";
      p.textContent = paras[i];
      root.appendChild(p);
    }
  }

  function renderFiles(root, files) {
    if (!root) return;
    root.textContent = "";

    var section = document.getElementById("files-section");

    if (!files || !files.items || !files.items.length) {
      root.style.display = "none";
      if (section) section.hidden = true;
      return;
    }
    root.style.display = "";
    if (section) section.hidden = false;

    var h = document.createElement("h2");
    h.id = "files-heading";
    h.className = "files__heading";
    h.textContent = files.heading || "Files";
    root.appendChild(h);

    if (files.note) {
      var note = document.createElement("p");
      note.className = "files__note";
      note.textContent = files.note;
      root.appendChild(note);
    }

    var ul = document.createElement("ul");
    ul.className = "files__list";

    for (var i = 0; i < files.items.length; i++) {
      var item = files.items[i];
      if (!item || !item.path) continue;
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = encodePath(item.path);
      a.textContent = item.label || item.path;
      a.rel = "noopener noreferrer";
      li.appendChild(a);
      ul.appendChild(li);
    }

    root.appendChild(ul);
  }

  function renderProjectCell(project, spanClass, eagerImage) {
    var article = document.createElement("article");
    article.className = "cell" + (spanClass ? " " + spanClass : "");

    var href = project.link ? String(project.link) : encodePath(project.image);
    var media = document.createElement("a");
    media.className = "cell__media-link";
    media.href = href;
    media.target = "_blank";
    media.rel = "noopener noreferrer";

    var visual = document.createElement("div");
    visual.className = "cell__visual";

    var img = document.createElement("img");
    img.src = encodePath(project.image);
    img.alt = project.alt || "";
    img.width = 440;
    img.height = 440;
    img.decoding = "async";
    img.loading = eagerImage ? "eager" : "lazy";

    visual.appendChild(img);
    media.appendChild(visual);
    article.appendChild(media);

    var rule = document.createElement("hr");
    rule.className = "cell__rule";
    article.appendChild(rule);

    var body = document.createElement("div");
    body.className = "cell__body";

    var h = document.createElement("h2");
    h.className = "cell__title";
    h.textContent = project.title || "Untitled";
    body.appendChild(h);

    if (project.subtitle) {
      var sub = document.createElement("p");
      sub.className = "cell__sub";
      sub.textContent = project.subtitle;
      body.appendChild(sub);
    }

    var descParts = normalizeDescription(project.description);
    if (descParts.length) {
      var details = document.createElement("details");
      details.className = "cell__more";

      var summary = document.createElement("summary");
      summary.className = "cell__more-summary";
      summary.textContent = project.moreLabel || DEFAULT_MORE;
      details.appendChild(summary);

      var wrap = document.createElement("div");
      wrap.className = "cell__desc";
      for (var d = 0; d < descParts.length; d++) {
        var p = document.createElement("p");
        p.textContent = descParts[d];
        wrap.appendChild(p);
      }
      details.appendChild(wrap);
      body.appendChild(details);
    }

    article.appendChild(body);
    return article;
  }

  function renderPortfolio(root, projects) {
    if (!root) return;
    root.textContent = "";

    if (!projects || !projects.length) {
      var empty = document.createElement("p");
      empty.className = "portfolio__empty";
      empty.textContent = "Add projects to the projects array in content.js.";
      root.appendChild(empty);
      return;
    }

    var rows = buildProjectRows(projects);
    var eagerBudget = 2;

    function takeEager() {
      if (eagerBudget <= 0) return false;
      eagerBudget -= 1;
      return true;
    }

    for (var r = 0; r < rows.length; r++) {
      var row = rows[r];
      var rowEl = document.createElement("div");
      var items = row.items || [];
      var n = items.length;

      if (row.kind === "2") {
        rowEl.className = "grid-row grid-row--2";
        for (var i = 0; i < n; i++) {
          rowEl.appendChild(renderProjectCell(items[i], pairSpans(n, i), takeEager()));
        }
      } else if (row.kind === "4") {
        rowEl.className = "grid-row grid-row--4";
        for (var j = 0; j < n; j++) {
          rowEl.appendChild(renderProjectCell(items[j], quadSpans(n, j), takeEager()));
        }
      } else if (row.kind === "4span2") {
        rowEl.className = "grid-row grid-row--4";
        for (var k = 0; k < n; k++) {
          rowEl.appendChild(renderProjectCell(items[k], "cell--span2", takeEager()));
        }
      }

      root.appendChild(rowEl);
    }
  }

  function applySiteData(data) {
    var site = (data && data.site) || {};

    if (site.title) {
      document.title = site.title;
    }

    var meta = document.querySelector('meta[name="description"]');
    if (meta && site.metaDescription) {
      meta.setAttribute("content", site.metaDescription);
    }

    var logo = document.getElementById("site-logo");
    if (logo && site.name) {
      logo.textContent = site.name;
    }

    var footerName = document.getElementById("footer-name");
    if (footerName && site.name) {
      footerName.textContent = site.name;
    }

    var bag = document.getElementById("contact-bag");
    if (bag && data.contact && data.contact.bagHref) {
      bag.setAttribute("href", data.contact.bagHref);
    }
  }

  function initNav() {
    var openBtn = document.getElementById("nav-open");
    var closeBtn = document.getElementById("nav-close");
    var overlay = document.getElementById("site-nav");

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
  }

  function initYear() {
    var yearEl = document.getElementById("year");
    if (yearEl) {
      yearEl.textContent = String(new Date().getFullYear());
    }
  }

  function init() {
    initYear();
    initNav();

    var data = window.PORTFOLIO;
    if (!data) {
      renderBio(document.getElementById("bio-root"), null);
      renderFiles(document.getElementById("files-root"), null);
      return;
    }

    applySiteData(data);
    renderBio(document.getElementById("bio-root"), data.bio);
    renderPortfolio(document.getElementById("portfolio-root"), data.projects);
    renderFiles(document.getElementById("files-root"), data.files);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
