import { Modal } from "../../../components/modal/modal";

new Modal({
    name: 'quiz',
    setup($modal) {

    },
    // onOpen($root, data, $trigger) {
    //     if (Object.keys(data).length) {
    //         if (data.modalTitle) {
    //             $($root).find('[name="form-title"]').val('PopUp: ' + data.modalTitle)
    //             $($root).find('[data-modal-title]').text(data.modalTitle)
    //         }
    //         else {
    //             const textTitle = $($root).find('[data-modal-title]').data('modal-title')
    //             $($root).find('[name="form-title"]').val('PopUp: ' + textTitle)
    //             $($root).find('[data-modal-title]').text(textTitle)
    //         }
    //         if (data.info) {
    //             $($root).find('[name="info"]').val(data.info)
    //         }
    //     }
    // },
    // onClose($root) {
    //     $($root).find('[name="info"]').val('')
    // },
});



$(".btnNext").click(function () {
    $(this).parent().parent('.quiz__item').css({
        'opacity': '0',
        'z-index': '0',
        'pointer-events': 'none'
    });
    $(this).parent().parent('.quiz__item').next().css({
        'opacity': '1',
        'z-index': '1',
        'pointer-events': 'auto'
    });
});

$(".btnPrev").click(function () {
    $(this).parents('.quiz__item').css({
        'opacity': '0',
        'z-index': '0',
        'pointer-events': 'none'
    });
    $(this).parents('.quiz__item').prev().css({
        'opacity': '1',
        'z-index': '1',
        'pointer-events': 'auto'
    });
});


// var disabledDays = [0, 6];
// $('.quiz__date').datepicker({
//     inline: true,
//     minDate: new Date(),
//     dateFormat: 'd MM',
//     disableNavWhenOutOfRange: true,
//     onRenderCell: function (date, cellType) {
//         if (cellType == 'day') {
//             var day = date.getDay(),
//                 isDisabled = disabledDays.indexOf(day) != -1;
//             return {
//                 disabled: isDisabled
//             }
//         }
//     },

//     onSelect: function (fd) {
//         $('.quiz__result-date').text(fd);
//     }
// });

//var myDatepicker = $('.quiz__date').datepicker().data('datepicker');
//myDatepicker.selectDate(new Date());

let date = $('.quiz__date').val();
$('.quiz__result-date').text(date);


let time = $('input[name="time"]:checked').val();
$('.quiz__result-time').text(time);


let service = $('input[name="service"]:checked').val();
$('.quiz__result-title').text(service);


let price = $('input[name="service"]:checked').siblings().children('.price-val').text();
$('.quiz__result-price span').text(price);


$('input[name="time"]').on('change', function () {
    $('.quiz__result-time').text($('input[name="time"]:checked').val());
});

$('input[name="service"]').on('change', function () {
    $('.quiz__result-title').text($('input[name="service"]:checked').val());
    $('.quiz__result-price span').text($('input[name="service"]:checked').siblings().children('.price-val').text());
});
