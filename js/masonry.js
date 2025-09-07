document.addEventListener("DOMContentLoaded", function () {
  const grid = document.getElementById("galeria-grid");
  const filterButtons = document.querySelectorAll(".filter-button");

  if (!grid || typeof imagenes === 'undefined') {
    return;
  }

  function renderItems(filter = "all") {
    grid.innerHTML = '<div class="grid-sizer"></div>'; // Clear grid but keep sizer

    const filteredImages = filter === "all" ? imagenes : imagenes.filter(img => {
      if (filter === 'schools') return img.categoria === 'school';
      if (filter === 'sports') return img.categoria === 'sport';
      if (filter === 'dance') return img.categoria === 'dance';
    });

    filteredImages.forEach(({ archivo, nombre, categoria }) => {
      const item = document.createElement("div");
      item.className = "grid-item";
      item.dataset.category = categoria;
      item.innerHTML = `
        <img src="assets/img/galery/${archivo}" alt="${nombre}" />
        <div class="overlay">
          <h3>${nombre}</h3>
        </div>
      `;
      grid.appendChild(item);
    });

    imagesLoaded(grid, function () {
      const msnry = new Masonry(grid, {
        itemSelector: ".grid-item",
        columnWidth: ".grid-sizer",
        percentPosition: true,
        gutter: 0,
      });
      msnry.layout(); // Recalculate layout after images are loaded
    });
  }

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      const filter = button.id.replace("filter-", "");
      renderItems(filter);

      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
    });
  });

  // Initial render
  renderItems();
});