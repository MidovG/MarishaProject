document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.querySelector("[data-carousel]");
    if (!carousel) return;

    const slides = Array.from(carousel.querySelectorAll(".carousel__slide"));
    const prevBtn = carousel.querySelector("[data-carousel-prev]");
    const nextBtn = carousel.querySelector("[data-carousel-next]");
    const dotsContainer = carousel.querySelector("[data-carousel-dots]");
    const dots = Array.from(dotsContainer.querySelectorAll("[data-carousel-dot]"));

    let currentIndex = 0;

    function updateCarousel(index) {
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        currentIndex = index;

        slides.forEach((slide, i) => {
            slide.classList.toggle("is-active", i === currentIndex);
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle("is-active", i === currentIndex);
        });
    }

    prevBtn.addEventListener("click", () => {
        updateCarousel(currentIndex - 1);
    });

    nextBtn.addEventListener("click", () => {
        updateCarousel(currentIndex + 1);
    });

    dots.forEach(dot => {
        dot.addEventListener("click", () => {
            const index = Number(dot.getAttribute("data-carousel-dot"));
            updateCarousel(index);
        });
    });

    // Автопереключение (можно убрать, если не нужно)
    let autoSlide = setInterval(() => {
        updateCarousel(currentIndex + 1);
    }, 7000);

    carousel.addEventListener("mouseenter", () => {
        clearInterval(autoSlide);
    });

    carousel.addEventListener("mouseleave", () => {
        autoSlide = setInterval(() => {
            updateCarousel(currentIndex + 1);
        }, 7000);
    });
});
