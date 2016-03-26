(function ($) {
    $('#subnav').collapse({'toggle': false});

    var toggleBtn = $('[data-toggle="sidebar-menu"]');

    // If No Sidebar Exit
    if (!toggleBtn.length) return;

    toggleBtn.on('click', function () {

        if ($('body').is('.show-chat')) $('body').removeClass('show-chat');

        $('body').toggleClass('show-sidebar');

        // Check chat windows
        require('../chat/_check-chat')();
    });

})(jQuery);