import { Notification } from "./notification";
import { getClient } from "./api";
import { getComedians } from "./api";
import { displayClientInfo, displayBooking} from "./display";
import { showQrController } from "./showQrController";

const getTicketNumber = () => {
  const queryString = window.location.search;
  // console.log(queryString); ?t=1234
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get('t');

}

export const initQrPage = async () => {
  const clientInfo = document.querySelector('.booking__client-info');
  const bookingPerformance = document.querySelector('.booking__performance');

  const ticketNumber = getTicketNumber();
  if (ticketNumber) {
    const clientData = await getClient(ticketNumber);
    displayClientInfo(clientInfo, clientData);
    const comediansData = await getComedians(ticketNumber);
    displayBooking(bookingPerformance, clientData, comediansData);

    showQrController(bookingPerformance);
  } else {
    Notification.getInstance().show('Произошла ошибка, проверьте ссылку');
  }
};