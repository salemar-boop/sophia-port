/**
 * =============================================================================
 *  EDIT THIS FILE TO CHANGE YOUR PORTFOLIO COPY, PROJECT LIST, AND DOWNLOADS
 * =============================================================================
 *
 * site.name          — Center wordmark in the header + footer credit
 * site.title         — Text shown in the browser tab
 * site.metaDescription — Optional short line for search / link previews
 *
 * bio.eyebrow        — Optional tiny uppercase line above your bio (set "" to hide)
 * bio.paragraphs     — Each string becomes one paragraph (plain text)
 *
 * projects[]         — Order controls layout: first 2 = large row, next 4 = small
 *                      row, then every 2 projects = another large pair row.
 *   title, subtitle  — Shown on the tile (plain text)
 *   image            — Path from the site root, e.g. "port/photo.jpg"
 *   alt              — Short image description for screen readers
 *   description      — Optional. Use a string for one block, or an array of
 *                      strings for multiple paragraphs. Omit or leave "" to hide
 *                      the “About this project” section on that tile.
 *   moreLabel        — Optional label for the expandable details (default below)
 *   link             — Optional URL for “Open full image/file”. Defaults to image
 *
 * files.heading, files.note — Section title + intro line above the download list
 * files.items[]      — { label, path } for each link (path like "port/file.pdf")
 *
 * contact.bagHref    — Where the bag icon goes (#contact, mailto:you@..., etc.)
 */

window.PORTFOLIO = {
  site: {
    name: "Sophia",
    title: "Sophia — Portfolio",
    metaDescription: "Design portfolio — selected projects and process files.",
  },

  bio: {
    eyebrow: "About",
    paragraphs: [
      "Replace these paragraphs with your own bio: who you are, what you study or do, and what someone should know before they scroll the work.",
      "You can add more entries to the paragraphs array — each one becomes its own paragraph on the page.",
    ],
  },

  contact: {
    bagHref: "#contact",
  },

  projects: [
    {
      title: "Unlock your potential",
      subtitle: "Mixed media · Clock",
      image: "port/1765297829.197648.jpg",
      alt: "Hand-painted clock with key-shaped hands on a gallery wall",
      description: [
        "A wall clock with a black face, hand-painted marks, and key-shaped hands.",
        "Shown with a small gallery card — replace this text with your artist statement or process notes.",
      ],
      moreLabel: "About this project",
    },
    {
      title: "Study 7831",
      subtitle: "Photography",
      image: "port/1765297831.848271.jpg",
      alt: "Project photograph",
      description: "Write what this piece is about, how you made it, or what you learned.",
      moreLabel: "About this project",
    },
    {
      title: "Study 7833",
      subtitle: "Photography",
      image: "port/1765297833.7515922.jpg",
      alt: "Project photograph",
      description: "",
      moreLabel: "About this project",
    },
    {
      title: "Study 7838",
      subtitle: "Photography",
      image: "port/1765297838.013812.jpg",
      alt: "Project photograph",
      description: "",
      moreLabel: "About this project",
    },
    {
      title: "Icons",
      subtitle: "Digital",
      image: "port/icons.jpg",
      alt: "Icon grid design",
      description: "",
      moreLabel: "About this project",
    },
    {
      title: "Final II",
      subtitle: "Print",
      image: "port/final final 2.png",
      alt: "Final design piece two",
      description: "",
      moreLabel: "About this project",
    },
    {
      title: "Final III",
      subtitle: "Print",
      image: "port/final final 3.png",
      alt: "Final design piece three",
      description: "",
      moreLabel: "About this project",
    },
    {
      title: "Final PP1",
      subtitle: "Layout",
      image: "port/final final pp1.png",
      alt: "Final presentation page one",
      description: "",
      moreLabel: "About this project",
    },
  ],

  files: {
    heading: "More files",
    note: "PDFs and video in the port folder — add or remove rows in content.js under files.items.",
    items: [
      { label: "Cookbook turn in.pdf", path: "port/cookbook turn in.pdf" },
      { label: "9 patterns.pdf", path: "port/9 patterns.pdf" },
      { label: "Word Final 2-1.pdf", path: "port/Word Final 2-1.pdf" },
      { label: "Final final.pdf", path: "port/final final.pdf" },
      { label: "Final-1.pdf", path: "port/final-1.pdf" },
      { label: "Final 1-1.pdf", path: "port/final 1-1.pdf" },
      { label: "Finall.pdf", path: "port/finall.pdf" },
      { label: "Process video (.mp4)", path: "port/20260223-2206-07.5363944 (1).mp4" },
    ],
  },
};
