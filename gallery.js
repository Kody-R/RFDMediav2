document.addEventListener("DOMContentLoaded", function () {
    // Lightbox functionality
    const images = document.querySelectorAll(".gallery-item");
    images.forEach(img => {
        img.addEventListener("click", function () {
            const lightbox = document.createElement("div");
            lightbox.classList.add("lightbox");
            lightbox.innerHTML = `<img src="${this.src}" alt="${this.alt}">`;
            document.body.appendChild(lightbox);
            lightbox.addEventListener("click", () => lightbox.remove());
        });
    });

    // Filtering functionality
    const filterButtons = document.querySelectorAll(".filter-btn");
    const galleryItems = document.querySelectorAll(".gallery-item");

    filterButtons.forEach(button => {
        button.addEventListener("click", function () {
            const filter = this.getAttribute("data-filter");

            galleryItems.forEach(item => {
                if (filter === "all" || item.getAttribute("data-category") === filter) {
                    item.style.display = "block";
                } else {
                    item.style.display = "none";
                }
            });
        });
    });
});
