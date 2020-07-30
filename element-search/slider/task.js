const elSliderPreviosBtn = document.getElementsByClassName('slider__arrow_prev').item(0);
const elSliderNextBtn = document.getElementsByClassName('slider__arrow_next').item(0);
const elSliderItems = Array.from(document.querySelectorAll('.slider__items .slider__item'));
const elSliderDots = Array.from(document.querySelectorAll('.slider__dots .slider__dot'));

function setNewActiveSlide(fromIndex, toIndex) {
    elSliderItems[fromIndex].classList.remove('slider__item_active');
    elSliderDots[fromIndex].classList.remove('slider__dot_active');
    elSliderItems[toIndex].classList.add('slider__item_active');
    elSliderDots[toIndex].classList.add('slider__dot_active');
}

function indexOfActiveItem() {
    return elSliderItems.findIndex(a => a.classList.contains('slider__item_active'));
}

function nextSlide() {
    const currentIndex = indexOfActiveItem();
    
    if (currentIndex === elSliderItems.length - 1) {
        setNewActiveSlide(currentIndex, 0);
    } else {
        setNewActiveSlide(currentIndex, currentIndex + 1);
    }
}

function previosSlide() {
    const currentIndex = indexOfActiveItem();
    
    if (currentIndex === 0) {
        setNewActiveSlide(currentIndex, elSliderItems.length - 1);
    } else {
        setNewActiveSlide(currentIndex, currentIndex - 1);    
    }
}

elSliderNextBtn.onclick = nextSlide;
elSliderPreviosBtn.onclick = previosSlide;
setInterval(nextSlide, 3000);

for (let dotIndex in elSliderDots) {
    elSliderDots[dotIndex].onclick = function() {
        setNewActiveSlide(indexOfActiveItem(), dotIndex);
    }
}
