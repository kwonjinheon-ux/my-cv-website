function toggleColorTheme(myRadio) {
  const themeStyle = document.querySelector("#theme-style");
  if (!themeStyle) return;

  if (myRadio.value === "light") {
    themeStyle.setAttribute("href", "css/style.css");
  }

  if (myRadio.value === "dark") {
    themeStyle.setAttribute("href", "css/style_dark.css");
  }
}

window.toggleColorTheme = toggleColorTheme;

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const primaryNav = document.querySelector("#primary-nav");

/* 모바일 햄버거 메뉴 Reference: https://www.w3schools.com/howto/howto_js_mobile_navbar.asp*/
  if (menuToggle && primaryNav) {
    const closeMobileMenu = () => {
      primaryNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
    };

    menuToggle.addEventListener("click", () => {
      const isOpen = primaryNav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    });

    primaryNav.querySelectorAll("a[href^='#']").forEach((link) => {
      link.addEventListener("click", (event) => {
        const targetId = link.getAttribute("href");
        const targetSection = targetId ? document.querySelector(targetId) : null;

        if (!targetSection) return;

        event.preventDefault();
        closeMobileMenu();

        const navbar = document.querySelector(".navbar");
        const navHeight = navbar ? navbar.offsetHeight : 0;
        const targetTop = targetSection.getBoundingClientRect().top + window.scrollY - navHeight - -2;

        window.scrollTo({
          top: Math.max(targetTop, 0),
          behavior: "smooth",
        });

        history.replaceState(null, "", targetId);
      });
    });
  }
  
// 아코디언 모드 Reference: https://www.w3schools.com/howto/howto_js_accordion.asp

  document.querySelectorAll(".accordion, .accordion-about").forEach((button) => {
    button.setAttribute("aria-expanded", "false");

    button.addEventListener("click", () => {
      const panel = button.nextElementSibling;
      const isOpen = button.classList.contains("active");

      document.querySelectorAll(".accordion, .accordion-about").forEach((item) => {
        item.classList.remove("active");
        item.setAttribute("aria-expanded", "false");

        const itemPanel = item.nextElementSibling;
        if (itemPanel) {
          itemPanel.style.maxHeight = null;
        }
      });

      if (!isOpen && panel) {
        button.classList.add("active");
        button.setAttribute("aria-expanded", "true");
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  });

// 팝업창 원본으로 띄우기
// https://www.w3schools.com/css/css3_images_modal.asp

  function openModal(modalId, caption) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    modal.style.display = "flex";
    modal.style.flexDirection = "column";
    modal.classList.add("show");

    const message = modal.querySelector(".caption, #evidenceModalCaption, .evidence-modal-caption");
    if (message) {
      message.innerText = caption;
    }
  }

  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    modal.classList.remove("show");

    setTimeout(function () {
      modal.style.display = "none";

      const message = modal.querySelector(".caption, #evidenceModalCaption, .evidence-modal-caption");
      if (message) {
        message.innerText = "";
      }
    }, 300);
  }

  const evidenceModal = document.querySelector("#evidenceModal");
  const evidenceModalImage = document.querySelector("#evidenceModalImage");
  const evidenceModalClose = document.querySelector(".evidence-modal-close");

  document.querySelectorAll(".evidence-popup-trigger").forEach((image) => {
    image.addEventListener("click", () => {
      if (!evidenceModal || !evidenceModalImage) return;

      evidenceModalImage.src = image.src;
      evidenceModalImage.alt = image.alt || "";
      openModal("evidenceModal", image.alt || "");
    });
  });

  if (evidenceModalClose && evidenceModal) {
    evidenceModalClose.addEventListener("click", () => {
      closeModal("evidenceModal");
    });
  }

  if (evidenceModal) {
    evidenceModal.addEventListener("click", (event) => {
      if (event.target === evidenceModal) {
        closeModal("evidenceModal");
      }
    });
  }
});
