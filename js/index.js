$(function () {
    gsap.registerPlugin(ScrollTrigger);

  // ======================= header =======================
  $(window).on('scroll', function () {
    const scrollPos = $(window).scrollTop() + 90;

    // 기존 메뉴의 활성화 해제
    $('header nav a').removeClass('active');

    $('.scene-target').each(function () {
        const top = $(this).offset().top;
        const height = $(this).outerHeight();

        if (scrollPos >= top && scrollPos < top + height) {
            const num = $(this).data('num');
            const name = $(this).data('name');
            const id = $(this).attr('id');

            $('.scene .num').text(num);
            $('.scene .section_list').text(name);

            // 현재 섹션과 연결된 메뉴 활성화
            $('header nav a[href="#' + id + '"]').addClass('active');
        }
    });
}).trigger('scroll'); // 처음 열었을 때도 적용


// ======================= aboutme =======================
const aboutTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: '#aboutme .inner',
        start: 'top 80%',
        end: 'top 85%',
        toggleActions: 'play none none none',
        // markers: true,
    }
})

// 카드 먼저 올라오기
aboutTimeline.from('#aboutme .ic_card', {
    y: 20,
    opacity: 0,
    duration: 1,
    ease: 'power2.out'
})

// 카드 애니메이션이 끝나면 프로필 이력 순차적으로 올라오기
// 자기소개
aboutTimeline.from('#aboutme .sketch', {
    y: 20,
    opacity: 0,
    duration: 0.6,
    ease: 'power2.out'
})

// 이력
aboutTimeline.from('#aboutme .profile_record', {
    y: 20,
    opacity: 0,
    duration: 0.6,
    ease: 'power2.out'
})

// 스킬
aboutTimeline.from('#aboutme .skill', {
    y: 30,
    opacity: 0,
    duration: 0.6,
    ease: 'power2.out'
})





// ======================= coding 스와이프 =======================
var swiper = new Swiper('.coding_swiper', {
    slidesPerView: 2,
    spaceBetween: 40,
    loop: true,

    autoplay: {
        delay: 4000,
    },

    centeredSlides: true,

    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },

    // 반응형 설정
    breakpoints: {
        // 768px 이하 (모바일)
        0: {
            slidesPerView: 1,
            spaceBetween: 20,
        },

        // 769px 이상 (PC)
        769: {
            slidesPerView: 2,
            spaceBetween: 50,
        }
    }
});

const swiperEl = document.querySelector('.coding_swiper');

// 마우스 올렸을 때 멈춤
swiperEl.addEventListener('mouseenter', () => {
    swiper.autoplay.stop();
});

// 마우스 뗄 때 다시 재생
swiperEl.addEventListener('mouseleave', () => {
    swiper.autoplay.start();
});


/* ======================= landing_page ======================= */
gsap.from('#landing_page .layout_design.landing', {
    y: 30,
    opacity: 0,
    duration: 1.2,
    delay: 0.6,
    ease: 'power2.out',

    scrollTrigger: {
        trigger: '#landing_page',
        start: 'top 90%',
        end: 'top 85%',
        toggleActions: 'play none none none',
        // markers: true
    }
})


/* ======================= app ======================= */
const mm = gsap.matchMedia();

mm.add("(min-width: 376px)", () => {

    // 376px 이상에서 텍스트 애니메이션 실행
    gsap.from('#app .app_txtbox', {
        x: -25,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '#app .inner',
            start: 'top 80%',
            toggleActions: 'play none none none',
        }
    });

});

// 핸드폰 애니메이션은 모든 화면에서 실행
const appTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: '#app .inner',
        start: 'top 80%',
        toggleActions: 'play none none none',
    }
});

appTimeline.from('#app .img_box img:first-child', {
    y: 30,
    opacity: 0,
    duration: 0.5,
    ease: 'power2.out'
});

appTimeline.from('#app .img_box img:last-child', {
    y: -30,
    opacity: 0,
    duration: 0.5,
    ease: 'power2.out'
})


/* ======================= cardnews ======================= */
// 이미지팝업
$('.insta_grid .cardnews_img').click(function () {
        // 클릭한 카드 안의 이미지 정보 가져오기
        const imgsrc = $(this).find('img').attr('src');
        const imgalt = $(this).find('img').attr('alt');

        // 팝업 이미지로 넣기
        $('.cardnews_popup').find('.popup_img').attr({
            src: imgsrc,
            alt: imgalt
        });

        // 팝업 열기 + 페이지 스크롤 막기
        previousOverflow = $('body')[0].style.overflow;
        $('.cardnews_popup').addClass('on');
        $('body').css('overflow', 'hidden');
    });

    function closePopup() {
        $('.cardnews_popup').removeClass('on');
        $('body').css('overflow', previousOverflow);
    }

    // 닫기 버튼 클릭
    $('.cardnews_popup .popup_close').click(function () {
        closePopup();
    });

    // 어두운 배경 클릭
    $('.cardnews_popup').click(function (event) {
        if (event.target === this) {
            closePopup();
        }
    });

    // ESC 키로 닫기
    $(document).keydown(function (event) {
        if (
            event.key === 'Escape' &&
            $('.cardnews_popup').hasClass('on')
        ) {
            closePopup();
        }
    })



/* ======================= branding ======================= */
gsap.from('#branding .layout_design.branding_logo', {
    y: 30,
    opacity: 0,
    duration: 1.2,
    delay: 0.6,
    ease: 'power2.out',

    scrollTrigger: {
        trigger: '#branding',
        start: 'top 90%',
        end: 'top 85%',
        toggleActions: 'play none none none',
        // markers: true
    }
})

let brandingPreviousOverflow = '';

// 프로세스 버튼 클릭
$('.BrandingProcess').click(function () {
    brandingPreviousOverflow = $('body')[0].style.overflow;

    $('.branding_popup').addClass('active');
    $('body').css('overflow', 'hidden');

    // 스크롤 초기화
    $('.branding_scroll').scrollTop(0);
});

// 팝업 닫기
function closeBrandingPopup() {
    $('.branding_scroll').scrollTop(0);
    $('.branding_popup').removeClass('active');
    $('body').css('overflow', brandingPreviousOverflow);
}

// X 버튼 클릭
$('.branding_close').click(function () {
    closeBrandingPopup();
});

// 어두운 배경 클릭
$('.branding_popup').click(function (event) {
    if (event.target === this) {
        closeBrandingPopup();
    }
});

// ESC 키로 닫기
$(document).keydown(function (event) {
    if (
        event.key === 'Escape' &&
        $('.branding_popup').hasClass('on')
    ) {
        closeBrandingPopup();
    }
})



/* ======================= design ======================= */
$('.salespage_scroll').scrollTop(0);

gsap.from('#design .design_work', {
    y: 30,
    opacity: 0,
    duration: 1,
    stagger: 0.3,
    ease: 'power2.out',

    scrollTrigger: {
        trigger: '#design .inner',
        start: 'top 75%',
        toggleActions: 'play none none none',
        // markers: true
    }
})

// 상세페이지 팝업 열기
$('.SalesPage').click(function () {
    const imgsrc = $(this).attr('data-img');

    $('.salespage_popup').find('.salespage_image').attr('src', imgsrc);

    // 팝업 열기 + 페이지 스크롤 막기
    salesPreviousOverflow = $('body')[0].style.overflow;
    $('.salespage_popup').addClass('on');
    $('body').css('overflow', 'hidden');

    $('.salespage_scroll').scrollTop(0);
});

function closeSalesPopup() {
    // 스크롤 먼저 초기화
    $('.salespage_content').scrollTop(0);

    // 팝업 닫기 + 페이지 스크롤 복구
    $('.salespage_popup').removeClass('on');
    $('body').css('overflow', salesPreviousOverflow);
}

// 닫기 버튼 클릭
$('.salespage_popup .salespage_close').click(function () {
    closeSalesPopup();
});

// 어두운 배경 클릭
$('.salespage_popup').click(function (event) {
    if (event.target === this) {
        closeSalesPopup();
    }
});

// ESC 키로 닫기
$(document).keydown(function (event) {
    if (
        event.key === 'Escape' &&
        $('.salespage_popup').hasClass('on')
    ) {
        closeSalesPopup();
    }
});

/* ======================= footer ======================= */
// 초기 상태
gsap.set('.Journey .address', {
    y: 30,
    opacity: 0
});

let journeyOpen = false;

$('.journey_btn').on('click', function () {
    if (!journeyOpen) {
        gsap.to('.Journey .address', {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.15,
            ease: 'power2.out'
        });
    } else {
        gsap.to('.Journey .address', {
            y: 30,
            opacity: 0,
            duration: 0.4,
            stagger: {
                each: 0.1,
                from: 'first'
            },
            ease: 'power2.in'
        });
    }
    journeyOpen = !journeyOpen;
})

const boxes = document.querySelectorAll('.Journey .address');

boxes.forEach((box) => {
    // 마우스 들어왔을 때
    box.addEventListener('mouseenter', () => {
        gsap.to(box, {
            backgroundColor: '#A4E800',
            duration: 0.1,
            ease: 'power2.out'
        });
    });
    // 마우스 나갔을 때
    box.addEventListener('mouseleave', () => {
        gsap.to(box, {
            backgroundColor: '#fff',
            duration: 0.1,
            ease: 'power2.out'
        });
    });
})

// address 클릭하면 복사되는 효과
const copyItems = document.querySelectorAll('.Journey .address[data-copy]');

copyItems.forEach((item) => {

    item.addEventListener('click', async () => {

        const copyText = item.dataset.copy;

        const original = item.querySelector('.original');
        const copied = item.querySelector('.copied');

        await navigator.clipboard.writeText(copyText);

        // 기존 텍스트 사라짐
        gsap.to(original, {
            opacity: 0,
            duration: 0.2
        });

        // Copied 등장
        gsap.to(copied, {
            opacity: 1,
            duration: 0.2
        });

        // 1초 후 원래대로
        gsap.to(copied, {
            opacity: 0,
            duration: 0.2,
            delay: 1
        });

        gsap.to(original, {
            opacity: 1,
            duration: 0.2,
            delay: 1
        })

    })

})

})