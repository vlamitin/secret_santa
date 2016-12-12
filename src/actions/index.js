import * as types from '../constants/action-types';
import * as config from '../constants/config';
import axios from 'axios';

axios.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8';

export function addPlayer() {
  return {
    type: types.ADD_PLAYER
  };
}


export function saveNameInput(number, nameValue, namesBase) {
  return {
    type: types.SAVE_NAME_INPUT,
    payload: {
      number: number,
      value: nameValue
    },
    isNameForCheck: true,
    baseToCheck: namesBase
  };
}

export function saveEmailInput(number, emailValue, emailsBase) {
  return {
    type: types.SAVE_EMAIL_INPUT,
    payload: {
      number: number,
      value: emailValue
    },
    isEmailForCheck: true,
    baseToCheck: emailsBase
  };
}

export function calculateRandomize(namesBase) {
  return {
    type: types.CALCULATE_RANDOMIZE,
    payload: namesBase,
    needToRandomize: true
  };
}

export function postResultsOnEmails(senderName, senderEmail, receiverName) {
  let namesAndEmailsComposed = [];
  console.log(senderName, senderEmail, receiverName);
  const request = axios.post(config.SEND_EMAIL_URL, {
    key: config.AUTH_TOKEN,
    message: {
      'from_email': config.FROM_EMAIL,
      'to': [{'email': senderEmail, 'type': 'to'}],
      'auto_text': 'true',
      'subject': 'Результаты распределения участников для Секретного Санты',
      'html': `<p>Спасибо за участие, <strong>${senderName}</strong>! Имеем сообщить, что человек, которому вам выпала честь дарить подарок на этот новый год, это ... <strong>${receiverName}</strong>!</p>`
    }
  });
  return {
    type: types.POST_RESULTS_ON_EMAILS,
    payload: request,
    sender: {
      senderName: senderName,
      senderEmail: senderEmail
    }
  };
}
