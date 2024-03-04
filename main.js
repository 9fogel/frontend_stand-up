import './style.css';
import { initForm } from './scripts/form';
import { getComedians } from './scripts/api';
import { createComedianBlock } from './scripts/comedians';

const init = async () => {
  const bookingComedianList = document.querySelector('.booking__comedians-list');
  const bookingForm = document.querySelector('.booking__form');

  const countComedians = document.querySelector('.event__info-item_comedians .event__info-number');

  const bookingInputName = document.querySelector('.booking__input_fullname');
  const bookingInputPhone = document.querySelector('.booking__input_phone');
  const bookingInputTIcket = document.querySelector('.booking__input_ticket');

  const comedians = await getComedians();

  initForm(bookingForm, bookingInputName, bookingInputPhone, bookingInputTIcket);

  if (comedians) {
    countComedians.textContent = comedians.length;
    const comedianBlock = createComedianBlock(comedians, bookingComedianList);
    bookingComedianList.append(comedianBlock);
  }
};

init();
