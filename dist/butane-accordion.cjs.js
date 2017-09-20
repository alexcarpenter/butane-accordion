'use strict';

require('wicg-inert');

class ButaneAccordian {
  constructor (element) {
    this.accordion = element;

    this.buttons = this.accordion.querySelectorAll('[aria-controls]');
    this.buttonsArray = Array.from(this.buttons);
    this.buttonFirst = this.buttons[0];
    this.buttonLast = this.buttons[this.buttons.length - 1];

    this.toggle = this.toggle.bind(this);
    this.expand = this.expand.bind(this);
    this.collapse = this.collapse.bind(this);
    this.getPanel = this.getPanel.bind(this);
    this.collapseAll = this.collapseAll.bind(this);
    this.bindKeyPress = this.bindKeyPress.bind(this);

    this.addEventListeners();
  }

  addEventListeners () {
    this.accordion.addEventListener('click', (event) => {
      const target = event.target;
      const isButton = target.hasAttribute('aria-controls');
      if (isButton) {
        this.toggle(target);
      }
    });

    this.accordion.addEventListener('keydown', this.bindKeyPress);
  }

  toggle (element) {
    const x = element.getAttribute('aria-expanded') === 'true' ? this.collapse : this.expand;
    x.call(this, element);
  }

  expand (button) {
    this.collapseAll();
    const panel = this.getPanel(button);
    button.setAttribute('aria-expanded', true);
    panel.hidden = false;
  }

  collapse (button) {
    const panel = this.getPanel(button);
    button.setAttribute('aria-expanded', false);
    panel.hidden = true;
  }

  getPanel (element) {
    return document.getElementById(element.getAttribute('aria-controls'))
  }

  collapseAll () {
    this.buttonsArray.forEach(button => {
      this.collapse(button);
    });
  }

  bindKeyPress (event) {
  }
}

const init = () => {
  const butaneAccordians = document.querySelectorAll('[data-butane-accordian]');

  Array.from(butaneAccordians).forEach(accordion => {
    new ButaneAccordian(accordion); // eslint-disable-line no-new
  });
};

var main = { init };

module.exports = main;
