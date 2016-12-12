export default function({ dispatch }) {
  return next => action => {
    if(!action.payload || !action.baseToCheck || action.baseChecked || action.isEmailForCheck || action.isNameForCheck ) {
      return next(action);
    }
    namesRepeatChecker(action);

  }
  function namesRepeatChecker(action) {
    let baseChecked = action.baseToCheck;
    let isSmthRepeats = 0;
    baseChecked[action.payload.number] = action.payload;
    if(action.baseToCheck.length > 0) {
      for (let i = 0; i < baseChecked.length; i++) {
        if(baseChecked[i]) {
          baseChecked[i].repeatsCount = 1;
        }
      }
      for (let j = 0; j < baseChecked.length; j++) {
        for (let k = 0; k < baseChecked.length; k++) {
          if (j >= k) continue;
          if (baseChecked[j] && baseChecked[k] && baseChecked[j].value === baseChecked[k].value) {
            if(baseChecked[j].value) {
              baseChecked[j].repeatsCount++;
              isSmthRepeats++;
              baseChecked[k].repeatsCount = baseChecked[j].repeatsCount;
            }
          }
        }
      }
    }
    const newAction = { ...action, payload: baseChecked, isSmthRepeats: isSmthRepeats, baseChecked: true };
    dispatch(newAction);
  }
}
