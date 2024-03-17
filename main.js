import './style.css';
import { initForm } from './scripts/form';
import { getComedians } from './scripts/api';
import { initChangeSection } from './scripts/changeSection';
import { initQrPage } from './scripts/qrPage';

const init = async () => {
  if (window.location.pathname.endsWith('qr.html')) {
    initQrPage();
    return;
  }

  const bookingComedianList = document.querySelector('.booking__comedians-list');
  const bookingForm = document.querySelector('.booking__form');

  const countComedians = document.querySelector('.event__info-item_comedians .event__info-number');

  const bookingInputName = document.querySelector('.booking__input_fullname');
  const bookingInputPhone = document.querySelector('.booking__input_phone');
  const bookingInputTIcket = document.querySelector('.booking__input_ticket');

  const event = document.querySelector('.event');
  const booking = document.querySelector('.booking');
  const eventButtonReserve = document.querySelector('.event__button_reserve');
  const eventButtonEdit = document.querySelector('.event__button_edit');
  const bookingTitle = document.querySelector('.booking__title');

  const comedians = await getComedians();

  if (comedians) {
    countComedians.textContent = comedians.length;

    const changeSection = initChangeSection(
      event,
      booking,
      eventButtonReserve,
      eventButtonEdit,
      bookingTitle,
      bookingForm,
      comedians,
      bookingComedianList,
    );

    initForm(
      bookingForm,
      bookingInputName,
      bookingInputPhone,
      bookingInputTIcket,
      changeSection,
      bookingComedianList,
    );
  }
};

init();
