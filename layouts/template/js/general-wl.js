(function($){

    var afterSendForm = function($form) {
        var name = $('#thanks-form-name').val();

        if ($form.data('type') === 'popup') {
            $('.popup-modal').modal('hide');

            if ($form.data('name')) {
                name = $($form.data('name')).val();
            }
        }

        $('.landing').hide();

        $('body').addClass('full-height');
        if (!name) {
            name = 'Наши';
        } else {
            name = name + ', наши';
        }
        $('.js-user-name').text(name);

        $('.thanks').show();

        $('body, html').animate({scrollTop:0}, 0);
    }

    var initWL = function() {
        if (typeof wl !== 'undefined') {
            wl.callbacks.onFormSubmit = function ($form, res) {
                if ($form.data('next') ) {

                    if(res.status == 200){

                        if ($form.data('name')) {
                            $('#send-additional-form').data('name', $form.data('name'));
                        } else {
                            $('#send-additional-form').data('name', '');
                        }

                        if ($form.data('type') && $form.data('type') == "popup") {
                            $('#send-query').modal('hide');

                            $('#send-query').on('hidden.bs.modal', function () {
                                $('#send-additional').modal('show');
                            })
                        } else {
                            $('#send-additional').modal('show');
                        }

                    } else {
                        wl.callbacks.def.onFormSubmit($form, res);
                    }
                } else {
                    //$('#send-additional').modal('toggle');
                    if(res.status == 200){
                        $('.popup-modal').modal('hide');

                        $('.popup-modal').on('hidden.bs.modal', function () {

                            afterSendForm($form);
                        });
                    } else {
                        wl.callbacks.def.onFormSubmit($form, res);
                    }
                }
            }
        } else {

            $('form').submit(function(event){
                event.preventDefault();

                var $form = $(this);

                if ($form.data('next') ) {

                    if ($form.data('name')) {
                        $('#send-additional-form').data('name', $form.data('name'));
                    } else {
                        $('#send-additional-form').data('name', '');
                    }

                    if ($form.data('type') && $form.data('type') == "popup") {
                        $('#send-query').modal('hide');

                        $('#send-query').on('hidden.bs.modal', function () {
                            $('#send-additional').modal('show');
                        })
                    } else {
                        $('#send-additional').modal('show');
                    }

                } else {

                    $('.popup-modal').modal('hide');

                    $('.popup-modal').on('hidden.bs.modal', function () {

                        afterSendForm($form);
                    });
                }

                return false;
            });
        }
    }

    $(function(){
    // Run on DOM ready
    	initWL();

        $('#send-query').on('show.bs.modal', function (event) {
            var button = $(event.relatedTarget); // Button that triggered the modal
            var title = button.data('title'); // Extract info from data-* attributes
            var button = button.data('button') || 'Отправить'; // Extract info from data-* attributes

            var modal = $(this);
            modal.find('#send-query-title').text(title);
            modal.find('#send-query-target').val(title);

            if (button) {
                modal.find('#send-query-button').text(button);
            }
        });
    });

    // $("input[name=phone]").intlTelInput();

    ymaps.ready(init);

    function init() {
        // Данные о местоположении, определённом по IP
        // ymaps.geolocation.get({
        //     // Выставляем опцию для определения положения по ip
        // provider: 'yandex',
        //     // Автоматически геокодируем полученный результат.
        //     autoReverseGeocode: true
        // }).then(function (result) {
        //     // Выведем в консоль данные, полученные в результате геокодирования объекта.
        //     var city = result.geoObjects.get(0).properties.get('metaDataProperty.GeocoderMetaData.AddressDetails.Country.AdministrativeArea.SubAdministrativeArea.Locality.LocalityName');

        //     $('.js-city').text(city);
        //     $('#city').val(city);
        // });
    }

})(jQuery);