document.addEventListener("DOMContentLoaded", function () {
  const grid = document.getElementById("galeria-grid");
  const filterButtons = document.querySelectorAll(".filter-button");

  // Image viewer elements
  const imageViewer = document.getElementById("image-viewer");
  const viewerImage = document.getElementById("viewer-image");
  const closeViewer = document.getElementById("close-viewer");
  const prevArrow = document.getElementById("prev-image");
  const nextArrow = document.getElementById("next-image");

  let currentImages = [];
  let currentIndex = 0;

  if (!grid || typeof imagenes === 'undefined') {
    return;
  }

  function renderItems(filter = "all") {
    grid.innerHTML = '<div class="grid-sizer"></div>'; // Clear grid but keep sizer

    const filteredImages = filter === "all" ? imagenes : imagenes.filter(img => {
      if (filter === 'schools') return img.categoria === 'batas';
      if (filter === 'sports') return img.categoria === 'xandal';
      if (filter === 'dance') return img.categoria === 'mallots';
    });

    currentImages = filteredImages; // Store the filtered images

    if (currentImages.length === 0) return;

    currentImages.forEach(({ archivo, categoria }, index) => {
      const item = document.createElement("div");
      item.className = "grid-item";
      item.dataset.category = categoria;
      item.dataset.index = index; // Store index for later
      item.innerHTML = `
        <img src="assets/img/galery/${archivo}" alt="" />
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
      msnry.layout();
    });
  }

  function openImageViewer(index) {
    if (index >= 0 && index < currentImages.length) {
      currentIndex = index;
      const { archivo } = currentImages[currentIndex];
      viewerImage.src = `assets/img/galery/${archivo}`;
      viewerImage.alt = "";
      imageViewer.classList.add("active");
    }
  }

  function showNextImage() {
    const nextIndex = (currentIndex + 1) % currentImages.length;
    openImageViewer(nextIndex);
  }

  function showPrevImage() {
    const prevIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    openImageViewer(prevIndex);
  }

  // Event Listeners
  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      const filter = button.id.replace("filter-", "");
      renderItems(filter);
      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
    });
  });

  grid.addEventListener("click", function (e) {
    const item = e.target.closest(".grid-item");
    if (item && item.dataset.index) {
      openImageViewer(parseInt(item.dataset.index, 10));
    }
  });

  closeViewer.addEventListener("click", function () {
    imageViewer.classList.remove("active");
  });

  imageViewer.addEventListener("click", function (e) {
    if (e.target === imageViewer) {
      imageViewer.classList.remove("active");
    }
  });

  nextArrow.addEventListener("click", showNextImage);
  prevArrow.addEventListener("click", showPrevImage);

  document.addEventListener("keydown", function (e) {
    if (imageViewer.classList.contains("active")) {
      if (e.key === "ArrowRight") {
        showNextImage();
      } else if (e.key === "ArrowLeft") {
        showPrevImage();
      } else if (e.key === "Escape") {
        imageViewer.classList.remove("active");
      }
    }
  });

  // Initial render
  renderItems();
});
