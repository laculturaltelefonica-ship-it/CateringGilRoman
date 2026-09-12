//CateringGilRoman/script.js

document.addEventListener("DOMContentLoaded", () => {
  /* =========================================================
     CATERING GIL & ROMÁN
     Script principal
     ========================================================= */


  /* =========================================================
     NAVBAR — cambia al hacer scroll
     ========================================================= */

  const navbar = document.querySelector(".navbar");

  const updateNavbar = () => {
    if (!navbar) return;

    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };

  updateNavbar();

  window.addEventListener("scroll", updateNavbar, {
    passive: true
  });


  /* =========================================================
     NAVEGACIÓN SUAVE
     ========================================================= */

  const navLinks = document.querySelectorAll(
    'a[href^="#"]:not([href="#"])'
  );

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      const navbarHeight = navbar
        ? navbar.offsetHeight
        : 0;

      const targetPosition =
        target.getBoundingClientRect().top +
        window.scrollY -
        navbarHeight -
        15;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });
    });
  });


  /* =========================================================
     ANIMACIONES AL ENTRAR EN PANTALLA
     ========================================================= */

  const animatedElements = document.querySelectorAll(
    ".service-card, " +
    ".price-card, " +
    ".highlight-card, " +
    ".gallery-item, " +
    ".about-content, " +
    ".about-image, " +
    ".faq-item, " +
    ".contact-card"
  );

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, observerInstance) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-visible");

          observerInstance.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    animatedElements.forEach((element) => {
      element.classList.add("reveal-on-scroll");
      observer.observe(element);
    });
  } else {
    animatedElements.forEach((element) => {
      element.classList.add("is-visible");
    });
  }


  /* =========================================================
     FAQ — comportamiento tipo acordeón
     ========================================================= */

  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const summary = item.querySelector("summary");

    if (!summary) return;

    summary.addEventListener("click", () => {
      /*
       * Permitimos varios FAQ abiertos a la vez.
       * Esto evita que el usuario pierda una respuesta
       * que estaba consultando.
       */
    });
  });


  /* =========================================================
     EFECTO PARALLAX MUY SUAVE EN EL HERO
     ========================================================= */

  const hero = document.querySelector(".hero");

  if (hero && window.matchMedia("(min-width: 769px)").matches) {
    const heroContent = hero.querySelector(".hero-content");

    const updateHero = () => {
      const scrollPosition = window.scrollY;

      if (scrollPosition > window.innerHeight) return;

      if (heroContent) {
        const movement = scrollPosition * 0.12;

        heroContent.style.transform =
          `translateY(${movement}px)`;
      }
    };

    window.addEventListener("scroll", updateHero, {
      passive: true
    });
  }


  /* =========================================================
     BOTONES DE WHATSAPP
     ========================================================= */

  const whatsappLinks = document.querySelectorAll(
    'a[href*="wa.me"]'
  );

  whatsappLinks.forEach((link) => {
    link.addEventListener("click", () => {
      /*
       * Evento preparado para analítica futura.
       * No hacemos ninguna redirección manual:
       * el enlace original sigue funcionando normalmente.
       */

      console.log("Clic en WhatsApp");
    });
  });


  /* =========================================================
     BOTONES DE PRESUPUESTO
     ========================================================= */

  const budgetLinks = document.querySelectorAll(
    'a[href*="/Eventos/"]'
  );

  budgetLinks.forEach((link) => {
    link.addEventListener("click", () => {
      console.log("Clic en Pedir presupuesto");
    });
  });


  /* =========================================================
     IMÁGENES — carga progresiva
     ========================================================= */

  const images = document.querySelectorAll("img");

  images.forEach((image) => {
    /*
     * Añadimos loading lazy a las imágenes que no
     * sean la imagen principal del hero.
     */

    if (!image.hasAttribute("loading")) {
      image.setAttribute("loading", "lazy");
    }

    /*
     * Decimos al navegador que las imágenes tienen
     * dimensiones reservadas cuando sea posible.
     */

    image.addEventListener("load", () => {
      image.classList.add("image-loaded");
    });
  });


  /* =========================================================
     DETECCIÓN DE IMÁGENES ROTAS
     ========================================================= */

  images.forEach((image) => {
    image.addEventListener("error", () => {
      console.warn(
        "No se ha podido cargar la imagen:",
        image.getAttribute("src")
      );

      image.classList.add("image-error");
    });
  });


  /* =========================================================
     BOTÓN "VOLVER ARRIBA"
     =========================================================
     
     Si en el futuro añadimos un botón con:
     
     <a href="#top" class="back-to-top">↑</a>
     
     este código hará que funcione automáticamente.
     ========================================================= */

  const backToTop = document.querySelector(".back-to-top");

  if (backToTop) {
    const updateBackToTop = () => {
      if (window.scrollY > 500) {
        backToTop.classList.add("visible");
      } else {
        backToTop.classList.remove("visible");
      }
    };

    updateBackToTop();

    window.addEventListener("scroll", updateBackToTop, {
      passive: true
    });
  }


  /* =========================================================
     ACCESIBILIDAD — teclado
     ========================================================= */

  document.addEventListener("keydown", (event) => {
    /*
     * Escape puede cerrar cualquier elemento <details>
     * que esté abierto.
     */

    if (event.key === "Escape") {
      document
        .querySelectorAll("details[open]")
        .forEach((details) => {
          details.removeAttribute("open");
        });
    }
  });


  /* =========================================================
     REDUCED MOTION
     ========================================================= */

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  if (prefersReducedMotion.matches) {
    document.documentElement.classList.add(
      "reduce-motion"
    );
  }


  /* =========================================================
     AÑO AUTOMÁTICO DEL FOOTER
     ========================================================= */

  const currentYear = document.querySelector(
    ".current-year"
  );

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }


  /* =========================================================
     CONSOLE — desarrollo
     ========================================================= */

  console.log(
    "Catering Gil & Román — web cargada correctamente."
  );
});


