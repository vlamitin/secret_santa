export default function({ dispatch }) {
  return next => action => {
    if(!action.payload || !action.needToRandomize || action.randomized ) {
      return next(action);
    }
    calculateRandomize(action);
  }
  function calculateRandomize(action) {
    let calculateRandomizeArr = [];
    let baseForRandom = action.payload,
        namesArr = action.payload,
        randomNumber,
        isLastPlayerReceiver = false,
        self = this;

    for (let i = 0; i < namesArr.length; i++) {
      let isSenderReceiver = false;
      if (i === namesArr.length - 2 && !isLastPlayerReceiver) {
        baseForRandom = baseForRandom.filter(function(player) {
          if(player !== namesArr[namesArr.length - 1]) {
            return player;
          };
        });
        calculateRandomizeArr[i] = {
          senderName: namesArr[i].value,
          receiverName: namesArr[namesArr.length - 1].value
        }
      } else if (i === namesArr.length - 1  && !isLastPlayerReceiver) {
        calculateRandomizeArr[i] = {
          senderName: namesArr[i].value,
          receiverName: baseForRandom[0].value
        }
      } else {
        baseForRandom = baseForRandom.filter(function(player) {
          if(player !== namesArr[i]) {
            return player;
          }
        });
        getRandomInt(0, baseForRandom.length - 1);
        function getRandomInt (min, max) {
          randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        }
        calculateRandomizeArr[i] = {
          senderName: namesArr[i].value,
          receiverName: baseForRandom[randomNumber].value
        }
        if(calculateRandomizeArr[i].receiverName === namesArr[namesArr.length - 1].value) {
          isLastPlayerReceiver = true;
        }
        baseForRandom.splice(randomNumber, 1);
        for (let j = 0; j < calculateRandomizeArr.length; j++) {
          if(calculateRandomizeArr[j].receiverName === namesArr[i].value) {
            isSenderReceiver = true;
          }
        }
        if(!isSenderReceiver) {
          baseForRandom.push(namesArr[i]);
        }
      }
      console.log((i + 1), ') SENDER', calculateRandomizeArr[i].senderName, 'RECEIVER', calculateRandomizeArr[i].receiverName);
    }
    const newAction = { ...action, payload: calculateRandomizeArr, randomized: true };
    dispatch(newAction);
  }
}
