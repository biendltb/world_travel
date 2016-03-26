(function ($) {

    $('[data-toggle="sidebar-chat"]').on('click', function () {
        $('body').removeClass(function (index, data) {
            if (data === "") {
                $('body').addClass('show-sidebar');
            }
            $('body').removeClass('show-sidebar');
            $("#main-nav").collapse('hide');
        });
    });

})(jQuery);