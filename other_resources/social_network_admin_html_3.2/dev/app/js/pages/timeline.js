(function ($) {
    "use strict";

    $('[data-toggle*="gridalicious"]').each(function () {
        $(this).gridalicious({
            gutter: 15,
            width: 370,
            selector: '> div'
        });
    });

    $('.share textarea').on('keyup', function () {
        $(".share button")[ $(this).val() === '' ? 'hide' : 'show' ]();
    });

    if (! $("#scroll-spy").length) return;

    var offset = $("#scroll-spy").offset().top;

    $('body').scrollspy({target: '#scroll-spy', offset: offset});

})(jQuery);
