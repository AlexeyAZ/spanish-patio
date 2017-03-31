(function($){

    var numberWithThousendSeparator = function (x, sep) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, sep);
    }

    var declOfNum = function(number, titles){
        number = Math.abs(number);
        var cases = [2, 0, 1, 1, 1, 2];
        return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
    }

    $(function(){
        // Run on DOM ready

        $(document).on('click', '.smooth', function(event){
            event.preventDefault();

            $('html, body').animate({
                scrollTop: $( $.attr(this, 'href') ).offset().top
            }, 500);
        });

        $('.js-go-home').click(function(event){
            event.preventDefault();
            event.stopPropagation();

            $('.thanks').hide();

            $('body').removeClass('full-height');
            $('.js-user-name').text('');

            $('.landing').show();

            $('body, html').animate({scrollTop:0}, 0);
        });
    });
})(jQuery);