const keyCodes = {
  esc: 27,
  tab: 9,
  upArrow: 38,
  rightArrow: 39,
  downArrow: 40,
  leftArrow: 37,
  home: 36,
  end: 35
};

class ButaneAccordion {
  constructor (element) {
    this.accordion = element;

    this.buttons = this.accordion.querySelectorAll('[aria-controls]');
    this.buttonsArray = Array.from(this.buttons);
    this.buttonFirst = this.buttons[0];
    this.buttonLast = this.buttons[this.buttons.length - 1];

    this.allowMultiple = this.accordion.hasAttribute('data-butane-accorion-multiple');

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
    if (!this.allowMultiple) {
      this.collapseAll();
    }
    const panel = this.getPanel(button);
    button.setAttribute('aria-expanded', true);
    button.classList.add('is-active');
    panel.hidden = false;
  }

  collapse (button) {
    const panel = this.getPanel(button);
    button.setAttribute('aria-expanded', false);
    button.classList.remove('is-active');
    panel.hidden = true;
  }

  getPanel (element) {
    const elementId = element.getAttribute('aria-controls');
    const panel = this.accordion.querySelector(`#${elementId}`);
    if (!panel) {
      throw new Error(`An accordion panel with an ID of ${elementId} does not exist.`)
    } else {
      return panel
    }
  }

  collapseAll () {
    this.buttonsArray.forEach(button => {
      this.collapse(button);
    });
  }

  bindKeyPress (event) {
    const target = event.target;
    const which = event.which;
    let direction;

    if (target.hasAttribute('aria-controls')) {
      if (which === keyCodes.upArrow || which === keyCodes.downArrow) {
        const index = this.buttonsArray.indexOf(target);
        switch (which) {
          case keyCodes.upArrow:
            direction = -1;
            break
          case keyCodes.downArrow:
            direction = 1;
            break
        }
        const length = this.buttonsArray.length;
        const newIndex = (index + length + direction) % length;

        this.buttonsArray[newIndex].focus();
      } else if (which === keyCodes.home || keyCodes.end) {
        switch (which) {
          case keyCodes.home:
            this.buttonFirst.focus();
            break
          case keyCodes.end:
            this.buttonLast.focus();
            break
        }
      }
    }
  }
}

const init = () => {
  const butaneAccordions = document.querySelectorAll('[data-butane-accordion]');

  Array.from(butaneAccordions).forEach(accordion => {
    new ButaneAccordion(accordion); // eslint-disable-line no-new
  });
};

var main = { init };

export default main;
