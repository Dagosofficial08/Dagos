const slider = document.querySelectorAll(".slide");
let counter = 0;

slider.forEach(
    (slide, index) => {
        slide.style.left = `${index * 100}%`;
    }
)

const slideImage = () => {
    slider.forEach(
        (slide) => {
            slide.style.transform = `translateX(-${counter * 100}%)`;
        }
    )
}

const goNext = () => {
    if (counter < slider.length - 1) {
        counter++;
        slideImage();
    }
}

const goPrev = () => {
    if (counter > 0) {
        counter--;
        slideImage();
    }
}