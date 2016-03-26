(function ($) {
    "use strict";

    $(window).bind('enterBreakpoint768', function () {
        $("body").addClass('show-sidebar');
    });

    $(window).bind('exitBreakpoint768', function () {
        $("body").removeClass('show-sidebar');
    });

})(jQuery);
