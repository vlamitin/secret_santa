export default function({ dispatch }) {
  return next => action => {
    if(!action.payload || !action.isEmailForCheck ) {
      return next(action);
    }
    isEmailValid(action);
  }
  function isEmailValid(action) {
    let pattern = /\b[a-z0-9._]+@[a-z0-9.-]+\.[a-z]{2,4}\b/i;
    let isValid = action.payload.value.search(pattern);
    let errorEmailWarning = {};
    if(isValid === -1) {
      errorEmailWarning.number = action.payload.number;
      errorEmailWarning.errorText = 'Введите корректный Email';
    } else {
      errorEmailWarning.number = action.payload.number;
      errorEmailWarning.errorText = null;
    }

    const newAction = { ...action, isEmailForCheck: false, errorEmailWarning: errorEmailWarning };
    dispatch(newAction);
  }
}
