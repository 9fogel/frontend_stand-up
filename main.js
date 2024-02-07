import './style.css';
import TomSelect from 'tom-select';

const bookingComedianList = document.querySelector('.booking__comedians-list');

const createComedianBlock = () => {
  const bookingComedian = document.createElement('li');
  bookingComedian.classList.add('booking__comedian');

  const bookingSelectComedian = document.createElement('select');
  bookingSelectComedian.classList.add('booking__select', 'booking__select_comedian');

  const bookingSelectTime = document.createElement('select');
  bookingSelectTime.classList.add('booking__select', 'booking__select_time');

  const inputHidden = document.createElement('input');;
  inputHidden.type = 'hidden';
  inputHidden.name = 'booking';

  const bookingHall = document.createElement('button');
  bookingHall.classList.add('booking__hall');

  bookingComedian.append(bookingSelectComedian, bookingSelectTime, inputHidden);

  const bookingTomSelectComedian = new TomSelect(bookingSelectComedian, {
    hideSelected: true,
    placeholder: 'Выбрать комика',
    options: [{
      value: 1,
      text: 'Белый',
    },
    {
      value: 2,
      text: 'Серый',
    }],
  });

  const bookingTomSelectTime = new TomSelect(bookingSelectTime, {
    hideSelected: true,
    placeholder: 'Время',
  });
  bookingTomSelectTime.disable();

  bookingTomSelectComedian.on('change', () => {
    bookingTomSelectTime.enable();
    bookingTomSelectComedian.blur();

    bookingTomSelectTime.addOptions([
      {
        value: 1,
        text: 'Белый',
      },
      {
        value: 2,
        text: 'Серый',
      }
    ]);
  });

  bookingTomSelectTime.on('change', () => {
    bookingTomSelectTime.blur();
    bookingHall.textContent = 'Зал 1';
    bookingComedian.append(bookingHall);
  });

  return bookingComedian;
};

const init = () => {

  const comedianBlock = createComedianBlock();
  bookingComedianList.append(comedianBlock);
};

init();

/**
<li class="booking__comedian">
  <select class="booking__select booking__select_comedian" name="comedian" >
    <option value="1">Юлия Ахмедова</option>
    <option value="2">Слава Комиссаренко</option>
  </select>

  <select class="booking__select booking__select_time" name="time">
    <option value="20:00">20:00</option>
    <option value="22:00">22:00</option>
  </select>

  <button class="booking__hall">Зал 1</button>
</li> */
