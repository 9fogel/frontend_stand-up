import Inputmask from 'inputmask';
import JustValidate from 'just-validate';
import { Notification } from './notification.js';
import { sendData } from './api.js';

export const initForm = (
  bookingForm,
  bookingInputName,
  bookingInputPhone,
  bookingInputTIcket,
  changeSection,
  bookingComedianList,
  ) => {

  const notification = Notification.getInstance();

  const validate = new JustValidate(bookingForm, {
    errorFieldCssClass: 'booking__input_invalid',
    successFieldCssClass: 'booking__input_valid ',
  });

  new Inputmask('+375(99)999-99-99').mask(bookingInputPhone);
  new Inputmask('9999').mask(bookingInputTIcket);

  validate
  .addField(bookingInputName, [{
    rule: 'required',
    errorMessage: 'Заполните имя',
  }
  ])
  .addField(bookingInputPhone, [{
    rule: 'required',
    errorMessage: 'Заполните телефон',
  }, {
    validator() {
      const phone = bookingInputPhone.inputmask.unmaskedvalue();
      return phone.length === 9;
    },
    errorMessage: 'Некорректный телефон',
  }
  ])
  .addField(bookingInputTIcket, [{
    rule: 'required',
    errorMessage: 'Заполните номер билета',
  }, {
    validator() {
      const ticket = bookingInputTIcket.inputmask.unmaskedvalue();
      return ticket.length === 4;
    },
    errorMessage: 'Неверный номер билета',
  }
  ]).onFail((fields) => {
    let errorMessage = '';

    for (const key in fields) {
      if (!Object.hasOwnProperty.call(fields, key)) {
        continue;
      }
      const element = fields[key];
      if(!element.isValid) {
        errorMessage += `${element.errorMessage}, `;
      }
    }

    notification.show(errorMessage.slice(0, -2), false);
  });

bookingForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  if (!validate.isValid) {
    return;
  }

  const data = {
    booking: [],
  };
  const times = new Set();

  new FormData(bookingForm).forEach((value, field) => {
    if (field === 'booking') {
      const [comedian, time] = value.split(',');

      if (comedian && time) {
        data.booking.push({
          comedian,
          time,
        });
        times.add(time);
      }

    } else {
      data[field] = value;
    }
  });

  if (times.size !== data.booking.length) {
    notification.show('Нельзя быть в одно время на двух выступлениях', false);
  }

  if (!times.size) {
    notification.show('Вы не выбрали комика и/или время');
  }

  const method = bookingForm.getAttribute('method');

  let isSend = false;
  if (method === 'PATCH') {
    isSend = await sendData(method, data, data.ticketNumber);
  } else {
    isSend = await sendData(method, data);
  }

  if (isSend) {
    notification.show('Бронь принята', true);
    changeSection();
    bookingForm.reset();
    bookingComedianList.textContent = '';
  }

  console.log(data);
});
}