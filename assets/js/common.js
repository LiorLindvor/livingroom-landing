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
    splitTextTl.from(chars, {duration: 0.3, opacity: 0, bottom: -25, ease: "circ:out", stagger: 0.01}, "+=0");
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

const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

/*const validatePhone = (phone) => {
    return phone.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};*/

function sendForm(e) {
    let submitBTN = e.target,
        form = submitBTN.closest('form');

    if (!form.classList.contains('disabled')) {
        if (form.length) {
            let error = false,
                name = form.querySelector('input[name=name]').value,
                email = form.querySelector('input[name=email]').value,
                phone_code = form.querySelector('input[name=phone_code]').value,
                phone = form.querySelector('input[name=phone]').value,
                company = form.querySelector('input[name=company]').value,
                message = form.querySelector('textarea[name=message]').value;
                // email_to = form.querySelector('input[name=email_to]').value;

            if (!name || name.length < 2) {
                error = true;
                form.querySelector('input[name=name]').closest('label').classList.add('error');
                setTimeout(function () {
                    form.querySelector('input[name=name]').closest('label').classList.remove('error');
                }, 2000);
                return false;
            }

            if (!email || !validateEmail(email)) {
                error = true;
                form.querySelector('input[name=email]').closest('label').classList.add('error');
                setTimeout(function () {
                    form.querySelector('input[name=email]').closest('label').classList.remove('error');
                }, 2000);
                return false;
            }

            if (!phone || phone.length < 9) {
                error = true;
                form.querySelector('input[name=phone]').closest("label").classList.add("error");
                setTimeout(function () {
                    form.querySelector('input[name=phone]').closest("label").classList.remove("error");
                }, 2000);
                return false;
            }

          /*  if (!company || company.length < 2) {
                error = true;
                form.querySelector('input[name=company]').closest('label').classList.add('error');
                setTimeout(function () {
                    form.querySelector('input[name=company]').closest('label').classList.remove('error');
                }, 2000);
                return false;
            }*/

            if (!error) {
                submitBTN.classList.add('disabled');
                const URL = 'sendform.php';
                // const URL =  '/wp-admin/admin-ajax.php';
                let formData = new FormData();
                //formData.append("action", "sendForm");
                formData.append("name", name);
                formData.append("email", email);
                formData.append("phone_code", phone_code);
                formData.append("phone", phone);
                formData.append("company", company);
                formData.append("message", message);
                // formData.append("email_to", email_to);

                fetch(URL, {
                    method: "POST",
                    body: formData,
                }).then(function (response) {
                    if (response.ok) { // если HTTP-статус в диапазоне 200-299
                        /*form.reset();
                        submitBTN.classList.remove('disabled');*/

                        form.remove();

                        // получаем тело ответа (см. про этот метод ниже)
                        return response.text();
                    }
                }).catch(function (error) {
                    console.error('Request failed', error);
                })
            }
        }
    }
}



//# sourceMappingURL=maps/common.js.map
