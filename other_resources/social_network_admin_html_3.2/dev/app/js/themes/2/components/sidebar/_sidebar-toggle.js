(function ($){
    $('[data-toggle="sidebar-menu"]').on('click', function () {
        if ($('body').is('.show-sidebar')) {
            // Layout 2 Hide SubNAV
            $('#subnav').collapse('hide');
        }
    });

})(jQuery);
