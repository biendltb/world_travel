(function ($) {
    $('[data-toggle="sidebar-chat"]').on('click', function () {
        // SIDEBAR
        $('body').removeClass('show-sidebar');

        // COLLAPSE NAVBAR
        if ($("#main-nav").is('.in')) $("#main-nav").collapse('hide');

        // SUBNAV HIDE
        if ($('body').is('.show-chat'))  $('#subnav').collapse('hide');
    });
})(jQuery);