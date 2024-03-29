import { createComedianBlock } from "./comedians";

export const initChangeSection = (
  event,
  booking,
  eventButtonReserve,
  eventButtonEdit,
  bookingTitle,
  bookingForm,
  comedians,
  bookingComedianList,
  ) => {
  eventButtonReserve.style.transition = 'opacity 0.5s, visibility 0.5s';
  eventButtonEdit.style.transition = 'opacity 0.5s, visibility 0.5s';

  eventButtonReserve.classList.remove('event__button_hidden');
  eventButtonEdit.classList.remove('event__button_hidden');

  const changeSection = () => {
    event.classList.toggle('event__hidden');
    booking.classList.toggle('booking__hidden');

    if (!booking.classList.contains('booking__hidden')) {
      const comedianBlock = createComedianBlock(comedians, bookingComedianList);
      bookingComedianList.append(comedianBlock);
    }

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