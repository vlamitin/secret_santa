export default function({ dispatch }) {
  return next => action => {
    if(!action.payload || !action.isNameForCheck ) {
      return next(action);
    }
    isNameValid(action);
  }
  function isNameValid(action) {
    let isValid = action.payload.value.length;
    let errorNameWarning = {};
    if(isValid < 3) {
      errorNameWarning.number = action.payload.number;
      errorNameWarning.errorText = 'Имя должно содержать хотя бы 3 символа';
    } else {
      errorNameWarning.number = action.payload.number;
      errorNameWarning.errorText = null;
    }

    const newAction = { ...action, isNameForCheck: false, errorNameWarning: errorNameWarning };
    dispatch(newAction);
  }
}
