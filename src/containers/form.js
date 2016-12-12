import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPlayer, saveNameInput, saveEmailInput, calculateRandomize, postResultsOnEmails } from '../actions/index';
import { bindActionCreators } from 'redux';


let playersArr = [];

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameValue: '',
      emailValue: '',
      emailValueRepeats: null,
      nameValueRepeats: null,
      emailValidation: [],
      nameValidation: [],
      checkedRadio: 'onScreen',
      isWindowScrolled: false,
      isSubmitPermitted: false,
      sendingResults: [],
      resultsSent: false
    };
    this.handleNameInputChange = this.handleNameInputChange.bind(this);
    this.handleNameInputFocus = this.handleNameInputFocus.bind(this);
    this.handleEmailInputChange = this.handleEmailInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleRadioChange = this.handleRadioChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.randomizedArr && this.state.checkedRadio === 'sendByEmail' && !this.state.resultsSent) {
      this.setState ({
        resultsSent: true
      });
      for (let i = 0; i < nextProps.randomizedArr.length; i++) {
        this.props.postResultsOnEmails(nextProps.randomizedArr[i].senderName, this.props.emailsBase[i].value, nextProps.randomizedArr[i].receiverName);
      }
    }
    if(nextProps.responseArr.length > 0) {
      this.setState ({
        sendingResults: nextProps.responseArr
      });
      console.log(this.state.sendingResults);
    }
    if(nextProps.errorEmailWarning) {
      let tempEmailArr = this.state.emailValidation;
      tempEmailArr[nextProps.errorEmailWarning.number] = nextProps.errorEmailWarning.errorText;
      this.setState ({
        emailValidation: tempEmailArr
      });
    }
    if(nextProps.errorNameWarning) {
      let tempNameArr = this.state.nameValidation;
      tempNameArr[nextProps.errorNameWarning.number] = nextProps.errorNameWarning.errorText;
      this.setState ({
        nameValidation: tempNameArr
      });
    }
    if(nextProps.isSmthRepeats || this.state.nameValueRepeats || this.state.emailValueRepeats) {
      console.log(nextProps.isSmthRepeats);
      if(nextProps.namesBase.length > 0) {
        let tempNameArr = [];
        tempNameArr = nextProps.namesBase.filter((value) => {
          if(value.repeatsCount > 1) {
            return value;
          }
        })
        if(tempNameArr.length > 0) {
          this.setState ({
            nameValueRepeats: tempNameArr
          });
        } else {
          this.setState ({
            nameValueRepeats: null,
          });
        };
      }
      if (nextProps.emailsBase.length > 0) {
        let tempEmailArr = [];
        tempEmailArr = nextProps.emailsBase.filter((value) => {
          if(value.repeatsCount > 1) {
            return value;
          }
        })
        if(tempEmailArr.length > 0) {
          this.setState ({
            emailValueRepeats: tempEmailArr
          });
        } else {
          this.setState ({
            emailValueRepeats: null,
          });
        };
      };
    }
  }

  componentDidUpdate() {
    if(this.props.randomizedArr && this.state.checkedRadio === 'onScreen' && !this.state.isWindowScrolled) {
      window.scrollTo(0, 1500);
      this.setState ({
        isWindowScrolled: true
      })

    }
  }

  handleNameInputChange(event) {
    this.setState ({
      nameValue: event.target.value
    });
  }

  handleNameInputFocus(number) {
    if(this.props.namesBase[number]) {
      let newNameValue = this.props.namesBase[number].value;
      this.setState ({
        nameValue: newNameValue
      })
    } else {
      this.setState ({
        nameValue: ''
      })
    }
  }

  handleEmailInputChange(event) {
    this.setState ({
      emailValue: event.target.value
    });
  }

  handleRadioChange(event) {
    this.setState ({
      checkedRadio: event.target.value
    });
  }

  handleFormSubmit(event) {
    event.preventDefault();
    this.props.calculateRandomize(this.props.namesBase);
  }

  renderNameInputTip(number) {
    let repeatNameValue = null;
    let repeatEmailValue = null;
    if(this.state.nameValueRepeats || this.state.emailValueRepeats) {
      if(this.state.nameValueRepeats) {
        for (let i = 0; i < this.state.nameValueRepeats.length; i++) {
          if(this.state.nameValueRepeats[i].number === number) {
            repeatNameValue = this.state.nameValueRepeats[i];
          }
        }
      }
      if(this.state.emailValueRepeats) {
        for (let j = 0; j < this.state.emailValueRepeats.length; j++) {
          if(this.state.emailValueRepeats[j].number === number) {
            repeatEmailValue = this.state.emailValueRepeats[j];
          }
        }
      }

      if(repeatNameValue || repeatEmailValue) {
        let maxRepeatsCount = repeatNameValue ? repeatNameValue.repeatsCount : 1;
        if(repeatEmailValue && repeatEmailValue.repeatsCount > maxRepeatsCount) {
          maxRepeatsCount = repeatEmailValue.repeatsCount;
        }
        return (
          <div className="tip__wrapper">
            <p>Тот еще конфуз выйдет, если {repeatNameValue ? repeatNameValue.value : "кто-нибудь"} получит {maxRepeatsCount} подарка, а кто-нибудь - ни одного!</p>
            <p>{(repeatNameValue && repeatEmailValue) ? "Имя и Email должны быть уникальными." : (repeatNameValue) ? "Имя должно быть уникальным." : "Email должен быть уникальным."}</p>
          </div>
        );
      }
    }
  }

  renderEmailValidationTip(number) {
    if(this.state.emailValidation[number]) {
      return (
        <div className="tip__wrapper">
          <p>{this.state.emailValidation[number]}</p>
        </div>
      );
    }
  }
  renderNameValidationTip(number) {
    if(this.state.nameValidation[number]) {
      return (
        <div className="tip__wrapper">
          <p>{this.state.nameValidation[number]}</p>
        </div>
      );
    }
  }

  renderInputGroup() {
    for (let i = 0; i < this.props.playersCount; i++) {
      playersArr[i] = i;
    }
    return playersArr.map((number) => {
      return (
        <div key={number}>
          <h3>Участник №{number + 1}</h3>
          <div className="validation-tips__wrapper">
            {this.renderNameValidationTip(number)}
            {this.renderEmailValidationTip(number)}
          </div>

          <div className="form__input-group">
            <div className="form-group form__input-wrapper">
              <label className="input__label" htmlFor={`inputName${number}`}>Имя</label>
              <input type="text"
                onChange={this.handleNameInputChange}
                required='required'
                onFocus={() => this.handleNameInputFocus(number)}
                onBlur={() => this.props.saveNameInput(number, this.state.nameValue, this.props.namesBase)}
                className={(this.state.nameValidation[number]) ? "form-control input--warning form__input" : "form-control form__input"}
                id={`inputName${number}`}
                placeholder="Имя участника" />
            </div>
            {this.renderEmailInput(number)}
          </div>
          {this.renderNameInputTip(number)}
          <hr />
        </div>
      );
    })
  }

  renderEmailInput(number) {
    if(this.state.checkedRadio === 'sendByEmail') {
      return (
        <div className={"form-group form__input-wrapper"}>
          <label className="input__label"  htmlFor={`inputEmail${number}`}>Email</label>
          <input type="text"
            onChange={this.handleEmailInputChange}
            required='required'
            onBlur={() => this.props.saveEmailInput(number, this.state.emailValue, this.props.emailsBase)}
            className={(this.state.emailValidation[number]) ? "form-control input--warning form__input" : "form-control form__input"}
            id={`inputEmail${number}`}
            placeholder="Email адрес" />
        </div>
      )
    }
  }
  renderSendingResults() {
    if(this.state.sendingResults.length > 0 && this.state.checkedRadio === 'sendByEmail') {
      return (
        <div>
          <h2>
            Результаты:
          </h2>
          <h4>
            Каждому участнику мы выслали <strong>имя</strong>. Человеку с этим <strong>именем</strong> нужно найти подарок:
          </h4>
          <table className="table table-hover">
            <thead>
              <tr className="active">
                <th>№</th>
                <th>Отправитель</th>
                <th>Email</th>
                <th>Письмо</th>
              </tr>
            </thead>
            <tbody>
              {this.renderSendingResultsTableRows()}
            </tbody>
          </table>
        </div>
      );
    }
  }
  renderSendingResultsTableRows() {
    let orderNumber = 0;
    return this.state.sendingResults.map((name) => {
      orderNumber++;
      return (
        <tr key={name.sender.senderEmail}>
          <td className="active">{orderNumber}</td>
          <td className="">{name.sender.senderName}</td>
          <td className="">{name.sender.senderEmail}</td>
          <td className="active">{name.response.data[0].status === 'sent' ? 'Выслано Имя' : 'Ошибка'}</td>
        </tr>
      );
    })
  }

  renderResultTable() {
    if(this.props.randomizedArr && this.state.checkedRadio === 'onScreen') {
      return (
        <div>
          <h2>И ... результаты таковы:</h2>
          <table className="table table-hover">
            <thead>
              <tr className="active">
                <th>№</th>
                <th>Отправитель</th>
                <th>Получатель</th>
              </tr>
            </thead>
            <tbody>
              {this.renderResultTableRows()}
            </tbody>
          </table>
        </div>
      );
    }
  }
  renderResultTableRows() {
    let orderNumber = 0;
    return this.props.randomizedArr.map((name) => {
      orderNumber++;
      return (
        <tr key={name.senderName}>
          <td className="active">{orderNumber}</td>
          <td className="">{name.senderName}</td>
          <td className="active">{name.receiverName}</td>
        </tr>
      );
    })
  }



  render() {
    return (
      <div>
        <div className="inputs-header__wrapper">
          <h2>Данные участников</h2>
        </div>
        <h4>
          <p>Мы все посчитаем. Что сделать с результатом?</p>
        </h4>
        <hr />
        <div className="radio__wrapper">
          <div className="radio">
            <label>
              <input type="radio"
                onChange={this.handleRadioChange}
                name="optionsRadios"
                id="optionsRadios2"
                value="onScreen"
                defaultChecked />
                <strong>Показать на экране</strong>
            </label>
          </div>
          <div className="radio">
            <label>
              <input type="radio"
                onChange={this.handleRadioChange}
                name="optionsRadios"
                id="optionsRadios1"
                value="sendByEmail" />
                <strong>Разослать всем на почту</strong>
            </label>
          </div>
        </div>
        <hr />
        <h4>Введите Имя {(this.state.checkedRadio === 'sendByEmail') ? "и Email " : ""}каждого участника</h4>
        <form className="form__form"
          onSubmit={this.handleFormSubmit}>
          {this.renderInputGroup()}
          <div className="form__buttons-wrapper">
            <div>
              <button type="button"
                onClick={this.props.addPlayer}
                className="btn btn-info">
                <span className="badge">+</span> Добавить участника
              </button>
            </div>
            <div>
              <button type="submit"
                disabled={(this.state.emailValueRepeats || this.state.nameValueRepeats ) ? 'disabled' : ''}
                className="btn btn-warning">
                Рассчитать{(this.state.checkedRadio === 'sendByEmail') ? " и отправить " : ""} <span className="badge"><abbr title={this.state.checkedRadio === 'sendByEmail' ? "Мы случайным образом распределим участников на Дарителей и Получателей, а затем каждому вышлем на почту имя его Получателя"  : "Мы случайным образом распределим участников на Дарителей и Получателей"} className="text-success initialism">__?__</abbr></span>
              </button>
            </div>
          </div>
        </form>
        {this.renderResultTable()}
        {this.renderSendingResults()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    playersCount: state.reducers.playersCount,
    namesBase:  state.reducers.namesBase,
    isSmthRepeats: state.reducers.isSmthRepeats,
    errorEmailWarning: state.reducers.errorEmailWarning,
    errorNameWarning: state.reducers.errorNameWarning,
    emailsBase: state.reducers.emailsBase,
    randomizedArr: state.reducers.randomizedArr,
    responseArr: state.reducers.responseArr
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addPlayer, saveNameInput, saveEmailInput, calculateRandomize, postResultsOnEmails }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Form);
