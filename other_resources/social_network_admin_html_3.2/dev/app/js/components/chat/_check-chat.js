module.exports = function () {
    if (!$('body').hasClass('show-chat')) {
        //alert('no chat ');
        $('.chat-window-container .panel-body').addClass('display-none');
        $('.chat-window-container input').addClass('display-none');
    } else {
        $('.chat-window-container .panel-body').removeClass('display-none');
        $('.chat-window-container input').removeClass('display-none');
    }
};
