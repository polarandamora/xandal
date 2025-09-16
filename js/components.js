function loadComponents() {
    const headerPlaceholder = document.querySelector('#page-header');
    const footerPlaceholder = document.querySelector('#page-footer');

    if (headerPlaceholder) {
      fetch('./components/header.html')
        .then(response => response.text())
        .then(data => {
          headerPlaceholder.innerHTML = data;

          // Ejecutar la lógica para marcar el enlace activo
          const currentPath = window.location.pathname.split("/").pop() || "index.html";

          document.querySelectorAll(".nav-link").forEach(link => {
            const linkPath = link.getAttribute("href");
            if (linkPath === currentPath) {
              link.classList.add("active");
            }
          });

          // Lógica del menú hamburguesa
          const menuBurger = document.querySelector('.menu-burger');
          const nav = document.querySelector('header nav');
          const languageSelector = document.querySelector('.language-selector');

          menuBurger.addEventListener('click', () => {
            nav.classList.toggle('active');
            languageSelector.classList.toggle('active');
          });
        })
        .catch(error => {
          console.error('Error al cargar el header:', error);
        });
    }

    if (footerPlaceholder) {
      fetch('./components/footer.html')
        .then(response => response.text())
        .then(data => {
          footerPlaceholder.innerHTML = data;
          // Un cop carregat el header, actualitzem les traduccions
          if (typeof updateContent === 'function') {
            updateContent();
          }
        })
        .catch(error => {
          console.error('Error al cargar el footer:', error);
        });
    }
  }

  document.addEventListener('DOMContentLoaded', loadComponents);