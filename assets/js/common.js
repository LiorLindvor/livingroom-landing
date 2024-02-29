// Wrap every letter in a span
document.querySelectorAll('.txt-anim').forEach(function (element) {
    const nodes = Array.from(element.childNodes);

    nodes.forEach(node => {
        if (node.nodeType === 3) {  // Text node
            const text = node.textContent;
            const spannedText = Array.from(text).map(char => `<span class="char">${char}</span>`).join('');
            const spanContainer = document.createElement("span");
            spanContainer.innerHTML = spannedText;
            element.replaceChild(spanContainer, node);
        }
    });
});


// --- IMG ANIMATION ---

gsap.registerPlugin(ScrollTrigger);

/*

<script src="https://cdn.jsdelivr.net/gh/studio-freight/lenis@1.0.23/bundled/lenis.min.js" defer></script>

const lenis = new Lenis({
    lerp: 0.07
});

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
})*/

// Images parallax
gsap.utils.toArray('.img-anim').forEach(container => {
    const img = container.querySelector('img');
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: container,
            scrub: true,
            pin: false,
        }
    });

    tl.fromTo(img, {
        yPercent: -20,
        scale: "1.28",
        ease: 'none'
    }, {
        yPercent: 20,
        scale: "1",
        ease: 'none'
    });
});

// --- END IMG ANIMATION ---


// --- TEXT ANIMATION ---

gsap.utils.toArray('.txt-anim').forEach(container => {
    const chars = container.querySelectorAll('.char');
    const splitTextTl = gsap.timeline({
        scrollTrigger: {
            trigger: container,
            toggleActions: "play none none none",
            /*toggleActions: "restart pause resume reverse",
            start: "top 65%"*/
        }
    });

// gsap.set (chars, {overflow: "hidden"});
    splitTextTl.from(chars, {duration: 0.5, opacity: 0, bottom: -25, ease: "circ:out", stagger: 0.03}, "+=0");
});

// --- END TEXT ANIMATION ---

let reviewsSlider;
const reviewsSliderWrap = document.querySelectorAll('.friends-slider .swiper');

for (let i = 0; i < reviewsSliderWrap.length; i++) {
    reviewsSlider = new Swiper(reviewsSliderWrap[i], {
        loop: true,
        autoplay: {
            delay: 0,
            disableOnInteraction: false
        },
        speed: 5000,
        slidesPerView: 'auto',
        spaceBetween: 0,
        grabCursor: true,
        mousewheelControl: true,
        keyboardControl: true,
        watchSlidesVisibility: true,
        navigation: {
            disabledClass: "disabled",
            nextEl: ".btn-next",
            prevEl: ".btn-prev",
        },
    });
}


const formFields = () => {
    const inputText = document.querySelectorAll(".form-fields label input, .form-fields label select, .form-fields label textarea");

    for (let item of inputText) { // relitere
        item.addEventListener("focusout", (e) => {
            let nextSibling = item.nextElementSibling;
            if (item.value.length == 0) {
                nextSibling.style.opacity = null;
            } else {
                nextSibling.style.opacity = '0';
            }
        });
    }
};

formFields();

//# sourceMappingURL=maps/common.js.map
