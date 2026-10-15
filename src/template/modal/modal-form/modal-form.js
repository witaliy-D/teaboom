import { Modal } from "../../../components/modal/modal";

new Modal({
  name: 'form',
  setup($modal) {
  },
});

var selectors = document.querySelectorAll(".tel");
selectors.forEach(selector => {
  var im = new Inputmask("+7(999)-999-99-99");
  im.mask(selector);
});

$('input[name="check"]').on('change', function () {
  $(this)
    .closest('form')
    .find('button[type="submit"]')
    .prop('disabled', !this.checked);
}).trigger('change');

