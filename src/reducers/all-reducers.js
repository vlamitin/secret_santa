let defaultState = {
  playersCount: 3,
  namesBase: [],
  namesBaseGarbage: null,
  emailsBase: [],
  randomizedArr: null,
  isSmthRepeats: 0,
  errorWarning: '',
  responseArr: []

};

export default function(state = defaultState, action) {
  switch (action.type) {
    case 'ADD_PLAYER':
      return {
        ...state,
        playersCount: state.playersCount + 1
      };
    case 'SAVE_NAME_INPUT':
      return {
        ...state,
        namesBase: action.payload,
        isSmthRepeats: action.isSmthRepeats,
        errorNameWarning: action.errorNameWarning
      };
    case 'SAVE_EMAIL_INPUT':
      return {
        ...state,
        emailsBase: action.payload,
        isSmthRepeats: action.isSmthRepeats,
        errorEmailWarning: action.errorEmailWarning
      };
    case 'CALCULATE_RANDOMIZE':
      return {
        ...state,
        randomizedArr: action.payload
      };
      case 'POST_RESULTS_ON_EMAILS':
        return {
          ...state,
          responseArr: state.responseArr.concat([
            {
              response: action.payload,
              sender: action.sender
            }
          ])
        };
    default:
      return state
  }
}
