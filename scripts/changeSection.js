export const initChangeSection = (
  event,
  booking,
  eventButtonReserve,
  eventButtonEdit,
  bookingTitle,
  bookingForm,
  ) => {
  eventButtonReserve.style.transition = 'opacity 0.5s, visibility 0.5s';
  eventButtonEdit.style.transition = 'opacity 0.5s, visibility 0.5s';

  eventButtonReserve.classList.remove('event__button_hidden');
  eventButtonEdit.classList.remove('event__button_hidden');

  const changeSection = () => {
    event.classList.toggle('event__hidden');
    booking.classList.toggle('booking__hidden');
  };

  eventButtonReserve.addEventListener('click', () => {
    changeSection();
    bookingTitle.textContent = 'Забронируйте место в зале';
    bookingForm.method = 'POST';
  });

  eventButtonEdit.addEventListener('click', () => {
    changeSection();
    bookingTitle.textContent = 'Редактирование брони';
    bookingForm.method = 'PATCH';
  });

  return changeSection;
};