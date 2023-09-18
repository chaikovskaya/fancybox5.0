/*--GLOBAL--*/
var GLOBAL = GLOBAL || {};
GLOBAL.widthWindow = GLOBAL.widthWindow || {};
GLOBAL.FORMERROR = GLOBAL.FORMERROR || {};
GLOBAL.FORMERROR.REQUIRED = GLOBAL.FORMERROR.REQUIRED || '';
GLOBAL.FORMERROR.EMAIL = GLOBAL.FORMERROR.EMAIL || '';
GLOBAL.mobile = GLOBAL.mobile || 770;
GLOBAL.tablet = GLOBAL.tablet || 992;
GLOBAL.columnsStartLength = GLOBAL.columnsStartLength || 0;

GLOBAL.parseData = function parseData(data) {
    try {
        data = JSON.parse(data.replace(/'/gim, '"'));
    } catch(e) {
        data = {};
    }
    return data;
};


GLOBAL.owl = GLOBAL.owl || {};
GLOBAL.owl.common = GLOBAL.owl.common || {};
GLOBAL.owl.common.loop = true;
GLOBAL.owl.common.dots = false;
GLOBAL.owl.common.margin = 0;
GLOBAL.owl.common.responsiveClass = true;
GLOBAL.owl.common.autoHeight = true;
GLOBAL.owl.common.mouseDrag = true;
GLOBAL.owl.common.nav = false;


Fancybox.defaults.l10n = {
    CLOSE: "Закрыть",
    NEXT: "Следующий",
    PREV: "Предыдущий",
    MODAL: "Вы можете закрыть окно нажатием ESC",
    ERROR: "Ошибка, попробуйте повторить попытку",
    IMAGE_ERROR: "Изображение не найдено",
    ELEMENT_NOT_FOUND: "HTML элемент не найден",
    AJAX_NOT_FOUND: "Ошибка загрузки AJAX: Не найдено",
    AJAX_FORBIDDEN: "Ошибка загрузки AJAX: Запрещено",
    IFRAME_ERROR: "Ошибка при загрузке фрейма",
    TOGGLE_ZOOM: "Приблизить",
    TOGGLE_THUMBS: "Миниатюры",
    TOGGLE_SLIDESHOW: "Слайдшоу",
    TOGGLE_FULLSCREEN: "Полноэкранный режим",
    DOWNLOAD: "Загрузить"
}
/*--/global--*/

function isMobile() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
        return true;
    } else {
        return false;
    }
}

function initDropdown() {
    if (typeof(Dropdown) === 'undefined' || !jQuery.isFunction(Dropdown)) {
        return false;
    }

    var common = {};

    $('.JS-Dropdown').each(function(){
        var local = GLOBAL.parseData(jQuery(this).data('dropdown'));
        new Dropdown(this, jQuery.extend({}, common, local));
    });
}

function initScroll() {
    $('.js-custom-scroll').each(function(){
        var customScroll = this;
        new SimpleBar(customScroll, {
            autoHide: false
        });
    });
}

function initValidate($element) {
    if (typeof($element) == 'undefined') {
        $element = $('.js-form-validate');
    }

    $element.each(function() {
        var $element = jQuery(this),
            validator;

        validator = $element.validate({
            errorClass: 'form-error',
            validClass: 'form-success',
            submitHandler: function(form) {
                if (typeof(ajaxSubmit) == 'function') {
                    ajaxSubmit(form);
                }
            },
        });

        $.validator.messages.required = GLOBAL.FORMERROR.REQUIRED;
    });
}

function initMask() {
    $('.js-mask-phone').inputmask({
        mask: '+7 999 999 99 99',
        "tabThrough": true,
        "showMaskOnHover": false,
    });

    $('.js-mask-email').inputmask({
        alias: "email",
        "tabThrough": true,
        "showMaskOnHover": false,
    });
}

function initTextFilterCity() {
    $('.js-textfilter-city').each(function(){
        var $element = $(this),
            $input = $(this).find('.js-textfilter-city-input'),
            classActive = $element.data('textfilter-class') || 'active';

        $input.jcOnPageFilter({
            animateHideNShow: true,
            focusOnLoad: true,
            highlightColor: "transparent",
            textColorForHighlights: "inherit",
            caseSensitive: false,
            hideNegatives: true,
            parentSectionClass: "js-textfilter-city-list",
            parentLookupClass: "js-textfilter-city-parent",
            childBlockClass: "js-textfilter-city-child"
        });

        $input.keyup(function(e) {
            var len = $element.find('.js-textfilter-city-child span').length;
            if (len > 0) {
                $element.addClass(classActive);
            } else {
                $element.removeClass(classActive);
            }
        });
    });
}

function initQuantity() {
    if (typeof(Quantity) === 'undefined' || !jQuery.isFunction(Quantity)) {
        return false;
    }

    var common = {};

    $('.JS-Quantity').not('.JS-Quantity-ready').each(function(){
        var local = GLOBAL.parseData(jQuery(this).data('quantity'));
        new Quantity(this, jQuery.extend({}, common, local));
    });
}

function initPopupBasket() {
    $('.js-popup-basket').each(function() {
        $(this).on('click',function(e) {
            e.preventDefault();
            var url = $(this).data('src');

            $('.js-preloader').removeClass('g-hidden');

            $.ajax({
                url: url,
                type: "get",
                dataType: "html",
                success: function (data) {
                    $('.js-form-popup').html(data);
                    initScroll();
                    initQuantity();
                    initFormatPrice();
                    initSelectCheckbox();
                    initPopupBuy();

                    function initSetDelay() {
                        var local = GLOBAL.parseData(jQuery('.JS-PopupForm').data('popupform'));
                        new MobileMenu('.JS-PopupForm', local)._open();
                    }
                    setTimeout(initSetDelay, 10);

                    $('.js-preloader').addClass('g-hidden');
                },
                error: function(data) {
                }
            });
        });
    });
}

function initPopupWishlist() {
    $('.js-popup-wishlist').each(function() {
        $(this).on('click',function(e) {
            e.preventDefault();
            var url = $(this).data('src');

            $('.js-preloader').removeClass('g-hidden');

            $.ajax({
                url: url,
                type: "get",
                dataType: "html",
                success: function (data) {
                    $('.js-form-popup').html(data);
                    initScroll();
                    initQuantity();
                    initFormatPrice();
                    initSelectCheckbox();

                    function initSetDelay() {
                        var local = GLOBAL.parseData(jQuery('.JS-PopupForm').data('popupform'));
                        new MobileMenu('.JS-PopupForm', local)._open();
                    }
                    setTimeout(initSetDelay, 10);

                    $('.js-preloader').addClass('g-hidden');
                },
                error: function(data) {
                }
            });
        });
    });
}

function initSelect() {
    $('.js-select').selectric({
        disableOnMobile: false,
        nativeOnMobile: false,
        arrowButtonMarkup: '<b class="selectric-button"><i class="selectric-icon"></i></b>',
    });
}

function initMobileMenu() {
    if (typeof(MobileMenu) === 'undefined' || !jQuery.isFunction(MobileMenu)) {
        return false;
    }

    var common = {};

    jQuery('.JS-MobileMenu').not('.JS-MobileMenu-ready').each(function() {
        var local = GLOBAL.parseData(jQuery(this).data('mobilemenu'));
        new MobileMenu(this, jQuery.extend({}, common, local));
    });
}

function initForm() {
    jQuery('.js-form').each(function() {
        var $checkbox = $(this).find('.js-form-checkbox'),
            $button = $(this).find('.js-form-button'),
            classDisabled = $(this).data('form-disabled');

        if ($checkbox.is(':checked')) {
            $button.removeClass(classDisabled);
        } else {
            $button.addClass(classDisabled);
        }

        $checkbox.on("change", function(e) {
            e.stopPropagation();
            if ($checkbox.is(':checked')) {
                $button.prop("disabled", false);
                $button.removeClass(classDisabled);
            } else {
                $button.prop("disabled", true);
                $button.addClass(classDisabled);
            }
        });
    });
}

function openPopupSuccess(url) {
    if (typeof(url) == 'undefined') {
        url = '/';
    }

    $.fancybox.open({
        src  : url,
        type : 'ajax',
        toolbar  : false,
        smallBtn : true,
        afterShow: function (data) {
        },
        btnTpl: {
            smallBtn:
                '<button type="button" data-fancybox-close class="fancybox-close" title="{{CLOSE}}">' +
                '<svg class="fancybox-close-icon" width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
                '<path d="M1.75 1.25L12.4313 11.7813" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>\n' +
                '<path d="M12.4316 1.25L1.75029 11.7813" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>\n' +
                '</svg>' +
                '</button>'
        },
        lang: "ru",
        i18n: {
            ru: {
                CLOSE: "Закрыть",
            },
        }
    });
}

function initAdaptiveMenu() {
    $('.js-adaptivemenu').each(function() {
        var $navItemMore = $(this).find('.js-adaptivemenu-more'),
            $target = $(this).find('.js-adaptivemenu-target'),
            navItemWidthMore = 0,
            windowWidth = $(this).width(),
            navItemWidth = 0,
            $navItems,
            classActive = $(this).data("adaptivemenu-active");

        if ($(window).width() <= GLOBAL.mobile) {
            $navItems = $(this).find('.js-adaptivemenu-item');
        } else {
            $navItems = $(this).find('.js-adaptivemenu-item');
        }

        if (!$(this).hasClass(classActive)) {
            navItemWidthMore = $navItemMore.innerWidth();
        }

        windowWidth = windowWidth - navItemWidthMore;
        $navItemMore.before($target.find('.js-adaptivemenu-item'));

        $navItems.each(function () {
            navItemWidth += $(this).outerWidth();
        });

        navItemWidth > windowWidth ? $navItemMore.show() : $navItemMore.hide();

        while (navItemWidth > windowWidth) {
            navItemWidth -= $navItems.last().width();
            $navItems.last().prependTo($target);
            $navItems.splice(-1, 1);
        }
    });
}

var sliderMainBanner;
function initSliderMainBanner() {
    jQuery('.js-slider-main-banner').each(function() {
        var $slider = $(this),
            sliderLength = $slider.find('.swiper-slide').length,
            $list = $slider.find('.js-slider-list'),
            $nextButton = $slider.find('.js-slider-next')[0],
            $prevButton = $slider.find('.js-slider-prev')[0],
            $pagination = $slider.find('.js-slider-pagination')[0];

        var isStart = sliderLength > 1 ? true : false;

        sliderMainBanner = new Swiper($list[0], {
            loop: isStart,
            pagination: {
                el: $pagination,
                clickable: true,
            },
            navigation: {
                nextEl: $nextButton,
                prevEl: $prevButton,
                disabledClass: "slider-button_disabled",
            },
            slidesPerView: 1,
            threshold: 10,
            lazy: true,
            breakpoints: {
                0: {
                    simulateTouch: false,
                    spaceBetween: 15,
                },
                770: {
                    spaceBetween: 25,
                },
                992: {
                    spaceBetween: 30,
                },
            },
            on: {
                beforeInit: function () {
                },
                init: function () {
                },
                slideChangeTransitionEnd: function () {
                },
            },
        });
    });
}

function initAccordion() {
    if (typeof(Accordion) === 'undefined' || !jQuery.isFunction(Accordion)) {
        return false;
    }

    var common = {};

    $('.JS-Accordion').each(function(){
        var local = GLOBAL.parseData(jQuery(this).data('accordion'));
        new Accordion(this, jQuery.extend({}, common, local));
    });
}

function initTextFilterCity() {
    $('.js-textfilter-city').each(function(){
        var $element = $(this),
            $input = $(this).find('.js-textfilter-city-input'),
            classActive = $element.data('textfilter-class') || 'active';

        $input.jcOnPageFilter({
            animateHideNShow: true,
            focusOnLoad: true,
            highlightColor: "transparent",
            textColorForHighlights: "inherit",
            caseSensitive: false,
            hideNegatives: true,
            parentSectionClass: "js-textfilter-city-list",
            parentLookupClass: "js-textfilter-city-parent",
            childBlockClass: "js-textfilter-city-child"
        });

        $input.keyup(function(e) {
            var len = $element.find('.js-textfilter-city-child span').length;
            if (len > 0) {
                $element.addClass(classActive);
            } else {
                $element.removeClass(classActive);
            }
        });
    });
}

function initExpand() {
    jQuery('.js-expand').each(function() {
        var $element = $(this),
            $block = $element.find('.js-expand-block'),
            $link = $element.find('.js-expand-link'),
            local = GLOBAL.parseData(jQuery(this).data('expand')),
            classActive = local.classActive || 'active',
            classShow = local.classShow || 'show',
            heightParent = parseInt($block.css('min-height'),10) || 21,
            heightChild = $block.height();

        if (heightChild > heightParent) {
            $element.addClass(classActive);

            $link.on("click", function() {
                $element.addClass(classShow);
            });
        }
    });
}

function initFormatPrice() {
    $('.js-format-price').each(function(){
        let classActive = 'js-format-price-active';

        if (!$(this).hasClass(classActive)) {
            let str = parseFloat($(this).text()) || "0";

            let strNew = str.toLocaleString();
            $(this).text(strNew);
            $(this).addClass(classActive);
        }
    });
}

function initMainmenu() {
    $('.js-main-menu-item').each(function(){
        let $element = $(this),
            $switcher = $('.js-main-menu-switcher'),
            classActive = $switcher.data('mainmenu-class');

        $element.hover(
            function () {
                $switcher.removeClass(classActive);
            },
            function () {
            }
        );
    });
}

var sliderActions;
function initSliderActions() {
    jQuery('.js-slider-actions').each(function() {
        var $slider = $(this),
            sliderLength = $slider.find('.swiper-slide').length,
            $list = $slider.find('.js-slider-list'),
            $nextButton = $slider.find('.js-slider-next')[0],
            $prevButton = $slider.find('.js-slider-prev')[0],
            $pagination = $slider.find('.js-slider-pagination')[0];

        var isStart = sliderLength > 1 ? true : false;

        sliderActions = new Swiper($list[0], {
            loop: isStart,
            pagination: {
                el: $pagination,
                clickable: true,
            },
            navigation: {
                nextEl: $nextButton,
                prevEl: $prevButton,
                disabledClass: "slider-button_disabled",
            },
            threshold: 10,
            lazy: true,
            breakpoints: {
                0: {
                    simulateTouch: false,
                    spaceBetween: 20,
                    slidesPerView: 1,
                    loop: sliderLength > 1 ? true : false,
                },
                770: {
                    spaceBetween: 25,
                    slidesPerView: 2,
                    loop: sliderLength > 2 ? true : false,
                },
                992: {
                    spaceBetween: 30,
                    slidesPerView: 3,
                    loop: sliderLength > 3 ? true : false,
                },
            },
            on: {
                beforeInit: function () {
                },
                init: function () {
                },
                slideChangeTransitionEnd: function () {
                },
            },
        });
    });
}

var sliderActionsAll;
function initSliderActionsAll() {
    jQuery('.js-slider-actions-all').each(function() {
        var $slider = $(this),
            sliderLength = $slider.find('.swiper-slide').length,
            $list = $slider.find('.js-slider-list'),
            $nextButton = $slider.find('.js-slider-next')[0],
            $prevButton = $slider.find('.js-slider-prev')[0],
            $pagination = $slider.find('.js-slider-pagination')[0];

        var isStart = sliderLength > 1 ? true : false;

        sliderActionsAll = new Swiper($list[0], {
            loop: isStart,
            pagination: {
                el: $pagination,
                clickable: true,
            },
            navigation: {
                nextEl: $nextButton,
                prevEl: $prevButton,
                disabledClass: "slider-button_disabled",
            },
            threshold: 10,
            lazy: true,
            breakpoints: {
                0: {
                    simulateTouch: false,
                    spaceBetween: 20,
                    slidesPerView: 1,
                    loop: sliderLength > 1 ? true : false,
                },
                770: {
                    spaceBetween: 25,
                    slidesPerView: "auto",
                },
                992: {
                    spaceBetween: 30,
                    slidesPerView: "auto",
                },
            },
            on: {
                beforeInit: function () {
                },
                init: function () {
                },
                slideChangeTransitionEnd: function () {
                },
            },
        });
    });
}

var sliderPopular;
function initSliderPopular() {
    jQuery('.js-slider-popular').each(function() {
        var $slider = $(this),
            sliderLength = $slider.find('.swiper-slide').length,
            $list = $slider.find('.js-slider-list'),
            $nextButton = $slider.find('.js-slider-next')[0],
            $prevButton = $slider.find('.js-slider-prev')[0],
            $pagination = $slider.find('.js-slider-pagination')[0];

        var isStart = sliderLength > 1 ? true : false;

        sliderPopular = new Swiper($list[0], {
            loop: isStart,
            pagination: {
                el: $pagination,
                clickable: true,
            },
            navigation: {
                nextEl: $nextButton,
                prevEl: $prevButton,
                disabledClass: "slider-button_disabled",
            },
            threshold: 10,
            lazy: true,
            breakpoints: {
                0: {
                    simulateTouch: false,
                    spaceBetween: 20,
                    slidesPerView: 2,
                    loop: sliderLength > 2 ? true : false,
                },
                770: {
                    spaceBetween: 25,
                    slidesPerView: 3,
                    loop: sliderLength > 3 ? true : false,
                },
                992: {
                    spaceBetween: 30,
                    slidesPerView: 4,
                    loop: sliderLength > 4 ? true : false,
                },
                1330: {
                    spaceBetween: 30,
                    slidesPerView: 5,
                    loop: sliderLength > 5 ? true : false,
                },
            },
            on: {
                beforeInit: function () {
                },
                init: function () {
                },
                slideChangeTransitionEnd: function () {
                },
            },
        });
    });
}
function reInitSliderPopular() {
    if (sliderPopular) {
        sliderPopular.destroy();
    }
    sliderPopular = undefined;
}

var sliderProducts;
function initSliderProducts() {
    jQuery('.js-slider-products').each(function() {
        var $slider = $(this),
            sliderLength = $slider.find('.swiper-slide').length,
            $list = $slider.find('.js-slider-list'),
            $nextButton = $slider.find('.js-slider-next')[0],
            $prevButton = $slider.find('.js-slider-prev')[0],
            $pagination = $slider.find('.js-slider-pagination')[0];

        var isStart = sliderLength > 1 ? true : false;

        sliderProducts = new Swiper($list[0], {
            loop: isStart,
            pagination: {
                el: $pagination,
                clickable: true,
            },
            navigation: {
                nextEl: $nextButton,
                prevEl: $prevButton,
                disabledClass: "slider-button_disabled",
            },
            threshold: 10,
            lazy: true,
            breakpoints: {
                0: {
                    simulateTouch: false,
                    spaceBetween: 20,
                    slidesPerView: 2,
                    loop: sliderLength > 2 ? true : false,
                },
                770: {
                    spaceBetween: 25,
                    slidesPerView: 3,
                    loop: sliderLength > 3 ? true : false,
                },
                992: {
                    spaceBetween: 30,
                    slidesPerView: 4,
                    loop: sliderLength > 4 ? true : false,
                },
                1330: {
                    spaceBetween: 30,
                    slidesPerView: 5,
                    loop: sliderLength > 5 ? true : false,
                },
            },
            on: {
                beforeInit: function () {
                },
                init: function () {
                },
                slideChangeTransitionEnd: function () {
                },
            },
        });
    });
}

function initNumerator() {
    jQuery('.js-numerator-item').each(function() {
        var $element = $(this),
            $value = $element.find('.js-numerator-value'),
            value = $value.text(),
            max = $element.data('numerator-max'),
            step = $element.data('numerator-step'),
            delay = $element.data('numerator-delay');

        function start() {
            if (value < max){
                value = Number(value) + Number(step);
                $value.html(value);
                setTimeout(start, delay);
            } else {
                if (value > 0){
                    if (value >= 1000000){
                        max = value/1000000;
                    }
                    $value.html(max);
                }
            }
        }
        start();
    });
}

function initAnimateNumerator() {
    var wow = new WOW(
        {
            boxClass:     'js-animate-section-numerator',
            animateClass: 'animated-section',
            offset:       0,
            mobile:       true,
            live:         true,
            callback:     function(box) {
                initNumerator();
                initIndicator();
            },
            scrollContainer: null,
            resetAnimation: false,
        }
    );
    wow.init();
}

var sliderBrands;
function initSliderBrands() {
    jQuery('.js-slider-brands').each(function() {
        var $slider = $(this),
            sliderLength = $slider.find('.swiper-slide').length,
            $list = $slider.find('.js-slider-list'),
            $nextButton = $slider.find('.js-slider-next')[0],
            $prevButton = $slider.find('.js-slider-prev')[0],
            $pagination = $slider.find('.js-slider-pagination')[0];

        var isStart = sliderLength > 1 ? true : false;

        sliderBrands = new Swiper($list[0], {
            loop: isStart,
            pagination: {
                el: $pagination,
                clickable: true,
            },
            navigation: {
                nextEl: $nextButton,
                prevEl: $prevButton,
                disabledClass: "slider-button_disabled",
            },
            threshold: 10,
            lazy: true,
            breakpoints: {
                0: {
                    simulateTouch: false,
                    spaceBetween: 20,
                    slidesPerView: 2,
                    loop: sliderLength > 2 ? true : false,
                },
                770: {
                    spaceBetween: 25,
                    slidesPerView: 4,
                    loop: sliderLength > 4 ? true : false,
                },
                992: {
                    spaceBetween: 30,
                    slidesPerView: 5,
                    loop: sliderLength > 5 ? true : false,
                },
            },
            on: {
                beforeInit: function () {
                },
                init: function () {
                },
                slideChangeTransitionEnd: function () {
                },
            },
        });
    });
}
function reInitSliderBrands() {
    if (sliderBrands) {
        sliderBrands.destroy();
    }
    sliderBrands = undefined;
}

function initShowMoreBrands(showmoreExtra) {
    if (typeof(ShowMore) === 'undefined' || !jQuery.isFunction(ShowMore)) {
        return false;
    }
    var common = {
            start: function () {},
            toggle: function () {}
        },
        showmoreExtra = showmoreExtra || {};

    $('.JS-ShowMore-Brands').each(function(){
        var local = GLOBAL.parseData(jQuery(this).data('showmore'));
        new ShowMore(this, jQuery.extend({}, common, local, showmoreExtra));
    });
}

function initShowMoreProducts(showmoreExtra) {
    if (typeof(ShowMore) === 'undefined' || !jQuery.isFunction(ShowMore)) {
        return false;
    }
    var common = {
            start: function () {},
            toggle: function () {}
        },
        showmoreExtra = showmoreExtra || {};

    $('.JS-ShowMore-Products').each(function(){
        var local = GLOBAL.parseData(jQuery(this).data('showmore'));
        new ShowMore(this, jQuery.extend({}, common, local, showmoreExtra));
    });
}

var sliderNews;
function initSliderNews() {
    jQuery('.js-slider-news').each(function() {
        var $slider = $(this),
            sliderLength = $slider.find('.swiper-slide').length,
            $list = $slider.find('.js-slider-list'),
            $nextButton = $slider.find('.js-slider-next')[0],
            $prevButton = $slider.find('.js-slider-prev')[0],
            $pagination = $slider.find('.js-slider-pagination')[0];

        var isStart = sliderLength > 1 ? true : false;

        sliderNews = new Swiper($list[0], {
            loop: isStart,
            pagination: {
                el: $pagination,
                clickable: true,
            },
            navigation: {
                nextEl: $nextButton,
                prevEl: $prevButton,
                disabledClass: "slider-button_disabled",
            },
            threshold: 10,
            lazy: true,
            breakpoints: {
                0: {
                    simulateTouch: false,
                    spaceBetween: 20,
                    slidesPerView: 1,
                    loop: sliderLength > 1 ? true : false,
                },
                770: {
                    spaceBetween: 25,
                    slidesPerView: 2,
                    loop: sliderLength > 2 ? true : false,
                },
                992: {
                    spaceBetween: 30,
                    slidesPerView: 3,
                    loop: sliderLength > 3 ? true : false,
                },
            },
            on: {
                beforeInit: function () {
                },
                init: function () {
                },
                slideChangeTransitionEnd: function () {
                },
            },
        });
    });
}

function initTextareaSize() {
    let classActive = 'textarea-active';

    $('.js-textarea-size').on('input', function (e) {
        e.target.style.innerHeight = 'auto';
        e.target.style.height = e.target.scrollHeight + "px";

        if (!$(this).hasClass(classActive)) {
            $(this).addClass(classActive);
        }
    });
}

function initSelectCheckbox() {
    $('.js-selectCheckbox').each(function() {
        var $input = jQuery(this).find('.js-selectCheckbox-input'),
            $link = jQuery(this).find('.js-selectCheckbox-link input:checkbox');

        $link.on("change", function() {
            if ($link.prop("checked")) {
                $input.prop("checked", true);
            } else {
                $input.prop("checked", false);
            }
        });
    });
}

function initIndicator() {
    $('.js-indicator').each(function() {
        var $element = jQuery(this).find('.js-indicator-element'),
            $target = jQuery(this).find('.js-indicator-target'),
            total = $element.data('indicator-total');

        $target.attr('stroke-dasharray', total + ',' + total);
    });
}

function initCatalogShow() {
    $('.js-catalog-switcher').each(function() {
        var $switcher = jQuery(this),
            $link = jQuery('.js-catalog-link');

        $switcher.on("click", function() {
            $link.trigger("click");
            return false;
        });
    });
}

var sliderCategoryTag;
function initSliderCategoryTag() {
    jQuery('.js-slider-category-tag').each(function() {
        var $slider = $(this),
            sliderLength = $slider.find('.swiper-slide').length,
            $list = $slider.find('.js-slider-list'),
            $nextButton = $slider.find('.js-slider-next')[0],
            $prevButton = $slider.find('.js-slider-prev')[0],
            $pagination = $slider.find('.js-slider-pagination')[0],
            classActive = $slider.data('active-class'),
            $activeSlide = $slider.find('.' + classActive);

        var isStart = sliderLength > 1 ? true : false;

        sliderCategoryTag = new Swiper($list[0], {
            loop: false,
            pagination: {
                el: $pagination,
                clickable: true,
            },
            navigation: {
                nextEl: $nextButton,
                prevEl: $prevButton,
                disabledClass: "slider-button_disabled",
            },
            threshold: 10,
            slidesPerView: "auto",
            spaceBetween: 0,
            breakpoints: {
                0: {
                    simulateTouch: false,
                },
                770: {
                },
                992: {
                }
            },
            on: {
                beforeInit: function () {
                },
                init: function () {
                },
                slideChangeTransitionEnd: function () {
                },
            },
        });
        if (isStart) {
            let index = $activeSlide.index();
            sliderCategoryTag.slideTo(index, 600, false);
        }
    });
}
function reInitSliderCategoryTag() {
    if (sliderCategoryTag) {
        sliderCategoryTag.destroy();
    }
    sliderCategoryTag = undefined;
}

function initShowMore(showmoreExtra) {
    if (typeof(ShowMore) === 'undefined' || !jQuery.isFunction(ShowMore)) {
        return false;
    }
    var common = {
            start: function () {},
            toggle: function () {}
        },
        showmoreExtra = showmoreExtra || {};

    $('.JS-ShowMore').each(function(){
        var local = GLOBAL.parseData(jQuery(this).data('showmore'));
        new ShowMore(this, jQuery.extend({}, common, local, showmoreExtra));
    });
}

function initSliderRange() {
    jQuery('.js-slider-range').each(function() {
        var $element = $(this),
            $track = $element.find('.js-slider-range-track');

        var min = Number($(this).find('.min-price').attr('data-value'));
        var max = Number($(this).find('.max-price').attr('data-value'));

        var price_id = $(this).attr('data-code');

        $track.slider({
            range: true,
            min: min,
            max: max,
            drag: true,
            values: [min, max],
            classes: {
                "ui-slider-handle": "slider-range-button",
                "ui-slider-range": "slider-range-quantity"
            },
            slide: function (event, ui) {
                $("input#minCost_" + price_id).val(ui.values[0]);
                $("input#maxCost_" + price_id).val(ui.values[1]);

                $('#minCost_' + price_id).trigger('change');
            },
            stop: function (event, ui) {
                $("input#minCost_" + price_id).val(ui.values[0]);
                $("input#maxCost_" + price_id).val(ui.values[1]);

                $('#minCost_' + price_id).trigger('change');
            }
        });
    });
}

function initPopupFilter() {
    if (typeof(MobileMenu) === 'undefined' || !jQuery.isFunction(MobileMenu)) {
        return false;
    }

    var common = {};

    jQuery('.JS-PopupFilter').not('.JS-MobileMenu-ready').each(function() {
        var local = GLOBAL.parseData(jQuery(this).data('mobilemenu'));
        new MobileMenu(this, jQuery.extend({}, common, local));
    });
}

function initTabCard() {
    if (typeof(Tab) === 'undefined' || !jQuery.isFunction(Tab)) {
        return false;
    }

    var common = {
    };

    jQuery('.JS-Tab-Card').not('.JS-Tab-ready').each(function() {
        var local = GLOBAL.parseData(jQuery(this).data('tab'));
        new Tab(this, jQuery.extend({}, common, local));
    });
}

function initAccordionCard() {
    if (typeof(Accordion) === 'undefined' || !jQuery.isFunction(Accordion)) {
        return false;
    }

    var common = {};

    $('.JS-Accordion-Card').not('.JS-Accordion-ready').each(function(){
        var local = GLOBAL.parseData(jQuery(this).data('accordion'));
        new Accordion(this, jQuery.extend({}, common, local));
    });
}

let galleryPhotoThumbs,
    galleryPhotoTop;
function initPhotoCard() {
    let $slider = $(".js-photo-card-thumbs"),
        $list = $slider.find('.js-slider-list'),
        sliderLength = $slider.find('.swiper-slide').length,
        $buttonPrev = $slider.find('.js-gallery-card-prev'),
        $buttonNext = $slider.find('.js-gallery-card-next'),
        $sliderMain = $(".js-photo-card-main"),
        $listMain = $sliderMain.find('.js-slider-list'),
        $pagination = $sliderMain.find('.js-slider-pagination')[0];

    let isStart = sliderLength > 1 ? true : false;

    galleryPhotoThumbs = new Swiper($list[0], {
        loop: false,
        autoHeight: true,
        pagination: false,
        threshold: 10,
        watchSlidesProgress: true,
        breakpoints: {
            0: {
                spaceBetween: 10,
                slidesPerView: 4,
            },
            770: {
                spaceBetween: 10,
                slidesPerView: 4,
            },
            992: {
                spaceBetween: 12,
                slidesPerView: 3,
            },
            1330: {
                spaceBetween: 12,
                slidesPerView: 4,
            },
        }
    });
    galleryPhotoTop = new Swiper($listMain[0], {
        loop: isStart,
        direction: "horizontal",
        navigation: false,
        pagination: {
            el: $pagination,
            clickable: true,
        },
        thumbs: {
            swiper: galleryPhotoThumbs
        },
        slidesPerView: 1,
        threshold: 10,
        spaceBetween: 15,
        breakpoints: {
            0: {
            },
            770: {
            },
            992: {
            },
        },
    });
    $buttonPrev.on('click', function(e) {
        galleryPhotoTop.slidePrev();
    });
    $buttonNext.on('click', function(e) {
        galleryPhotoTop.slideNext();
    });
};

function initAnchorShow() {
    $('.js-anchor-switcher').each(function() {
        var $switcher = jQuery(this);

        $switcher.on("click", function() {
            let id = $(this).attr("href");
            $(id).trigger("click");
        });
    });
}

function initPopupGallery() {
    $(".js-popup-gallery").fancybox({
        loop: true,
        infobar: false,
        toolbar  : false,
        smallBtn : true,
        arrows : false,
        animationEffect: "fade",
        hash : false,
        btnTpl: {
            smallBtn:
                '<button type="button" data-fancybox-close class="fancybox-close" title="{{CLOSE}}">' +
                '<svg class="fancybox-close-icon" width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
                '<path d="M1.75 1.25L12.4313 11.7813" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>\n' +
                '<path d="M12.4316 1.25L1.75029 11.7813" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>\n' +
                '</svg>' +
                '</button>'
        },
        beforeClose: function (instance) {
        },
        afterShow: function(instance, current) {
            if ( instance.group.length > 1 && current.$content ) {
                current.$content.append('' +
                    '<button class="fancybox-button fancybox-button--arrow_left prev" data-fancybox-prev>' +
                    '<span class="fancybox-button-icon fancybox-button-icon_left"><svg class="fancybox-button-arrow" width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
                    '<path d="M6.91406 1.23002L1.7524 6.39169C1.14281 7.00127 1.14281 7.99877 1.7524 8.60835L6.91406 13.77" stroke="white" stroke-width="2.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>\n' +
                    '</svg></span>\n' +
                    '</button>' +
                    '<button class="fancybox-button fancybox-button--arrow_right next" data-fancybox-next>' +
                    '<span class="fancybox-button-icon fancybox-button-icon_right"><svg class="fancybox-button-arrow" width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
                    '<path d="M2.08594 1.23002L7.2476 6.39169C7.85719 7.00127 7.85719 7.99877 7.2476 8.60835L2.08594 13.77" stroke="white" stroke-width="2.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>\n' +
                    '</svg></span>\n' +
                    '</button>'
                );
            }
        },
        lang: "ru",
        i18n: {
            ru: {
                CLOSE: "Закрыть",
            },
        },
    });
}

function initFind() {
    $('.js-find').each(function () {
        var $element = $(this),
            $input = $element.find('.js-find-input'),
            $item = $element.find('.js-find-container'),
            $value = $element.find('.js-find-value');

        $input.on('input change', function(){
            var value = this.value.toUpperCase(),
                classHide = 'find-hide';

            $item.removeClass(classHide);

            if (value.length) {
                for (let i = 0; i < $value.length; i++) {
                    var text = $($value[i]).text().toUpperCase();
                    if (!(text.indexOf(value) + 1)) {
                        $($value[i]).closest('.js-find-container').addClass(classHide);
                    }
                }
            }
        });
    });
}

function initSticky() {
    if (typeof(StickyFix) === 'undefined' || !jQuery.isFunction(StickyFix)) {
        return false;
    }

    var common = {
        update: function (){
        }
    };

    $('.JS-Sticky').each(function(){
        var local = GLOBAL.parseData(jQuery(this).data('sticky'));
        new StickyFix(this, jQuery.extend({}, common, local));
    });
}

function initRadioSwitch() {
    $(".js-radio-switch").each(function(){
        var $element = $(this),
            $input = $element.find('.js-radio-switch-input'),
            $field = $element.find('.js-radio-switch-field'),
            classActive = $element.data('radio-switch-class') || 'active';

        $input.on('change.js-radio-active', function(e){
            e.stopPropagation();
            if ($input.is(':checked') && !$element.hasClass()) {
                $element.addClass(classActive);
            } else {
                $element.removeClass(classActive);
                $field.val('');
            }
        });
    });
}

function initPopupGallery() {
    Fancybox.bind("[data-fancybox]", {
        closeButton: '<button type="button" data-fancybox-close class="fancybox-close" title="{{CLOSE}}"><svg class="fancybox-close-icon" width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.75 1.25L12.4313 11.7813" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M12.4316 1.25L1.75029 11.7813" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>',
        Toolbar: false,
        Thumbs: false,
    });
}

function openPopupProfile() {
    Fancybox.bind("[data-fancybox='content']", {
        Toolbar: false,
        Thumbs: false,
        on: {
            done: (fancybox, slide) => {
                initValidate();
                initForm();
                initMask();
            },
        },
        closeButton: '<button type="button" data-fancybox-close class="fancybox-close" title="{{CLOSE}}"><svg class="fancybox-close-icon" width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.75 1.25L12.4313 11.7813" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M12.4316 1.25L1.75029 11.7813" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>',
    });
}

function openPopupSuccess(url) {
    Fancybox.close();

    if (typeof(url) == 'undefined') {
        url = '/';
    }

    new Fancybox([
        {
            src  : url,
            type: "ajax",
        },
    ]);
}

function initPopupCity() {
    Fancybox.bind("[data-fancybox='city']", {
        Toolbar: false,
        Thumbs: false,
        on: {
            done: (fancybox, slide) => {
                initScroll();
                initTextFilterCity();
            },
        },
        closeButton: '<button type="button" data-fancybox-close class="fancybox-close" title="{{CLOSE}}"><svg class="fancybox-close-icon" width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.75 1.25L12.4313 11.7813" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M12.4316 1.25L1.75029 11.7813" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>',
    });
}

function initPopupBuy() {
    Fancybox.bind("[data-fancybox='buy']", {
        Toolbar: false,
        Thumbs: false,
        on: {
            done: (fancybox, slide) => {
                initValidate();
                initForm();
                initMask();
            },
        },
        closeButton: '<button type="button" data-fancybox-close class="fancybox-close" title="{{CLOSE}}"><svg class="fancybox-close-icon" width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.75 1.25L12.4313 11.7813" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M12.4316 1.25L1.75029 11.7813" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>',
    });
}

function initResizeWindow() {
    var width = $(window).outerWidth();
    if (width <= GLOBAL.mobile) {
        GLOBAL.widthWindow = 'isMobile';
        if (sliderPopular) {
            reInitSliderPopular();
        }
        if (sliderBrands) {
            reInitSliderBrands();
        }
        initShowMoreBrands();
        initShowMoreProducts();
        if (sliderCategoryTag == undefined) {
            initSliderCategoryTag();
        }
        initAccordionCard();
    } else if (width <= GLOBAL.tablet) {
        GLOBAL.widthWindow = 'isTablet';
        if (sliderPopular == undefined) {
            initSliderPopular();
        }
        if (sliderBrands == undefined) {
            initSliderBrands();
        }
        if (sliderCategoryTag == undefined) {
            initSliderCategoryTag();
        }
        initTabCard();
    } else {
        GLOBAL.widthWindow = '';
        if (sliderPopular == undefined) {
            initSliderPopular();
        }
        if (sliderBrands == undefined) {
            initSliderBrands();
        }
        if (sliderCategoryTag) {
            reInitSliderCategoryTag();
        }
        initTabCard();
    }
}

$(document).ready(function () {
    initResizeWindow();
    $(window).resize(function(){
        initResizeWindow();
        initAdaptiveMenu();
        initSticky();
    });

    initDropdown();
    initScroll();
    initValidate();
    initMask();
    initPopupBasket();
    initPopupWishlist();
    initSelect();
    initMobileMenu();
    initForm();
    ymaps.ready(initMap);
    initAdaptiveMenu();
    initSliderMainBanner();
    initAccordion();
    initTextFilterCity();
    initExpand();
    initFormatPrice();
    initMainmenu();
    initSliderActions();
    initSliderProducts();
    initAnimateNumerator();
    initSliderActionsAll();
    initSliderNews();
    initTextareaSize();
    initQuantity();
    initSelectCheckbox();
    initCatalogShow();
    initShowMore();
    initSliderRange();
    //initPopupFilter();
    initPhotoCard();
    initAnchorShow();
    ymaps.ready(initMapShops);
    initFind();
    initSticky();
    initRadioSwitch();
    initPopupGallery();
    openPopupProfile();
    initPopupCity();
    initPopupBuy();
});
