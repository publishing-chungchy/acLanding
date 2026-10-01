$(document).ready(function () {
    // 스크롤시 section에 act 추가하는 함수
    $(window).scroll(function () {
        var showlist = $("section");
        var windowBottom = $(window).height() + $(window).scrollTop();
        var scrZero = '';

        for (var num = 0; num < showlist.length; num++) {
            var listBottom = $(showlist[num]).height() / 2 - scrZero + $(showlist[num]).offset().top;
            if (windowBottom >= listBottom) {
                $(showlist[num]).addClass("act");
            } else {
                $(showlist[num]).removeClass("act");
            }
        }


        // 하단에서 cta 숨기기
        if ($(".section11").hasClass("act")) {
            $(".btn-cta").addClass("act");
        } else {
            $(".btn-cta").removeClass("act");
        }
    });

    // 헤더 움직이는 함수
    $(function () {
        var prevScrollTop = 0;

        $(window).scroll(function () {

            var nowScrollTop = $(window).scrollTop();
            var headerHeight = $('header').outerHeight();

            if (nowScrollTop > prevScrollTop) {
                $('header').css({
                    'top': -headerHeight,
                });
            } else {
                $('header').css({
                    'top': 10,
                });
            }
            prevScrollTop = nowScrollTop;

        });

    });

    // 태그내 글자 쪼개는 함수
    $(".section02 .title p").each(function () {
        const text = $(this).text();

        $(this).html(
            text.split("").map((char, index) => {
                if (char === " ") return "&nbsp;";

                return `<span style="--delay:${index * 0.1}s">${char}</span>`;
            }).join("")
        );
    });

    $(".section04 .tab li.yet").on("click", function () {
        $(this).removeClass("shake");
        this.offsetWidth; // 강제 리플로우
        $(this).addClass("shake");
    });

    // 스와이프 슬라이드
    var swiper = new Swiper(".mySwiper", {
        slidesPerView: "auto",
        initialSlide: 1,
        spaceBetween: -200,
        speed: 500,
        centeredSlides: true,
        breakpoints: {
            481: {
        spaceBetween: -100,
            },
        }
    });
    $(".pagination button").eq(swiper.activeIndex).addClass("act");
    $(".pagination button").click(function () {
        swiper.slideTo($(this).parent().index());
    });
    swiper.on("slideChange", function () {
        $(".pagination button").removeClass("act");
        $(".pagination button")
            .eq(swiper.activeIndex)
            .addClass("act");
    });

    // tab
    $(".section04 .tab li .btn").click(function () {
        var idx = $(this).closest("li").index();
        $(".section04 .tab li .btn").removeClass("act");
        $(this).addClass("act");
        $(this).parents("ul.tab").siblings(".tab-contents").children(".tab-item").removeClass("act");
        $(this).parents("ul.tab").siblings(".tab-contents").children(".tab-item").eq(idx).addClass("act");
    });

    // 롤링배너
    $(".rolling-wrap .inner").each(function () {
        const $inner = $(this);
        $inner.append($inner.children().clone());
    });

    // section08 스크롤 제각기
    $(function () {
        const $section = $(".section08");
        const $imgs = $section.find(".img-wrap img");

        let ticking = false;

        function moveImages() {
            const scrollTop = $(window).scrollTop();
            const winH = $(window).height();

            const sectionTop = $section.offset().top;
            const sectionBottom = sectionTop + $section.outerHeight();

            if (scrollTop + winH < sectionTop || scrollTop > sectionBottom) {
                ticking = false;
                return;
            }

            const start = sectionTop - winH;
            const progress = Math.max(0, scrollTop - start);

            $imgs.each(function () {
                const $img = $(this);
                const speed = Number($img.data("speed")) || 1;
                const moveY = progress * (speed - 1) * -1;

                $img.css({
                    transform: `translateY(${moveY}px)`
                });
            });

            ticking = false;
        }

        $(window).on("scroll resize", function () {
            if (!ticking) {
                requestAnimationFrame(moveImages);
                ticking = true;
            }
        });

        moveImages();
    });

    // popup
    $(".show_popUp").click(function () {
        $(".dimmed").addClass("act");
        $(".popup.terms").addClass("act");
    });

    $(".dimmed .popup .btn").click(function () {
        $(".dimmed").removeClass("act");
        $(".dimmed .popup").removeClass("act");
    });

    // cta 클릭시 section11 이동
    $(".btn-cta").click(function(){

    });

});