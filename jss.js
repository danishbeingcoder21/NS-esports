
const sidebar = document.getElementById("sidebar");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.querySelectorAll(".nav-link");

// Mobile sidebar
function closeMenu() {
  sidebar.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
}

menuToggle.addEventListener("click", () => {
  const isOpen = sidebar.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation" : "Open navigation"
  );
});

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    navLinks.forEach(item => item.classList.remove("active"));
    link.classList.add("active");
    closeMenu();
  });
});

// Highlight the section currently on screen
const sections = document.querySelectorAll("main section[id]");

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${entry.target.id}`
          );
        });
      }
    });
  }, { rootMargin: "-25% 0px -60% 0px" });

  sections.forEach(section => sectionObserver.observe(section));
}

// Reveal animations
const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach(item => revealObserver.observe(item));
} else {
  revealItems.forEach(item => item.classList.add("visible"));
}

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Contact form demo
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", event => {
  event.preventDefault();

  if (!contactForm.reportValidity()) return;

  formStatus.textContent =
    "Thanks for reaching out! This demo form is working, but messages are not sent yet. Connect an email service to receive applications.";

  contactForm.reset();
});

// Close mobile menu with Escape
document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeMenu();
});

// Close menu if the user clicks outside it on mobile
document.addEventListener("click", event => {
  if (
    window.innerWidth <= 720 &&
    sidebar.classList.contains("open") &&
    !sidebar.contains(event.target) &&
    !menuToggle.contains(event.target)
  ) {
    closeMenu();
  }
});
