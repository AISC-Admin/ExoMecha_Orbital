/* A.I.S.C Space Exploration Technologies — script global */
document.addEventListener("DOMContentLoaded", function () {

  /* ---------- Header : effet au scroll ---------- */
  var header = document.querySelector(".site-header");
  var toTop = document.querySelector(".to-top");

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle("is-scrolled", y > 30);
    if (toTop) toTop.classList.toggle("show", y > 500);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- Menu mobile ---------- */
  var navToggle = document.querySelector(".nav-toggle");
  var navLinks = document.querySelector(".nav-links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      var isOpen = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Marquage du lien de nav actif ---------- */
  var current = (window.location.pathname.split("/").pop() || "index.html");
  document.querySelectorAll(".nav-links a[href]").forEach(function (link) {
    var href = link.getAttribute("href");
    if (href === current || (current === "" && href === "index.html")) {
      link.classList.add("active");
    }
  });

  /* ---------- Animation d'apparition au scroll ---------- */
  var revealEls = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Formulaire de contact (mailto) ---------- */
  var form = document.getElementById("contact-form");
  if (form) {
    var isEN = (document.documentElement.getAttribute("lang") || "fr").toLowerCase().indexOf("en") === 0;
    var t = isEN ? {
      missing: "Please fill in at least your name, your email and your message.",
      defaultSubject: "Contact from the AISC Space Exploration website",
      nameLabel: "Name: ",
      emailLabel: "Email: ",
      orgLabel: "Company / Organization: ",
      sent: "Your email client will open with your message pre-filled. You can also write directly to "
    } : {
      missing: "Merci de renseigner au minimum votre nom, votre email et votre message.",
      defaultSubject: "Contact depuis le site AISC Space Exploration",
      nameLabel: "Nom : ",
      emailLabel: "Email : ",
      orgLabel: "Société / Organisation : ",
      sent: "Votre client email va s'ouvrir avec votre message pré-rempli. Vous pouvez aussi écrire directement à "
    };

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var name = form.querySelector("#name").value.trim();
      var email = form.querySelector("#email").value.trim();
      var org = form.querySelector("#org") ? form.querySelector("#org").value.trim() : "";
      var subject = form.querySelector("#subject").value.trim();
      var message = form.querySelector("#message").value.trim();
      var status = document.getElementById("form-status");

      if (!name || !email || !message) {
        if (status) {
          status.textContent = t.missing;
          status.style.color = "#f0a83d";
          status.classList.add("show");
        }
        return;
      }

      var to = "aisc.space.technologies@gmail.com";
      var mailSubject = encodeURIComponent(subject ? subject : t.defaultSubject);
      var bodyLines = [
        t.nameLabel + name,
        t.emailLabel + email
      ];
      if (org) bodyLines.push(t.orgLabel + org);
      bodyLines.push("", message);
      var mailBody = encodeURIComponent(bodyLines.join("\n"));

      window.location.href = "mailto:" + to + "?subject=" + mailSubject + "&body=" + mailBody;

      if (status) {
        status.textContent = t.sent + to + ".";
        status.style.color = "#9fabc4";
        status.classList.add("show");
      }
    });
  }

  /* ---------- Année automatique dans le footer ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
