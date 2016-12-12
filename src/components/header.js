import React, { Component } from 'react';

export default class Header extends Component {
  render() {
    return (
      <div>
        <div className="page-header page-header__header">
          <h1><a href="./">Тайный Санта *</a></h1>
          <p>* он же Секретый Санта-Клаус, он же анонимный Дед Мороз, он же Амиго Секрето (Тайный Друг), он же Полианна (в честь романа), он же Крис Кингл (Christkind - Младенец Иисус)</p>
        </div>
      </div>
    );
  }
}
