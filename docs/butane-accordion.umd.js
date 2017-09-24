(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.ButaneAccordion = factory());
}(this, (function () { 'use strict';

var keyCodes = {
  esc: 27,
  tab: 9,
  upArrow: 38,
  rightArrow: 39,
  downArrow: 40,
  leftArrow: 37,
  home: 36,
  end: 35
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var ButaneAccordion = function () {
  function ButaneAccordion(element) {
    classCallCheck(this, ButaneAccordion);

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

  createClass(ButaneAccordion, [{
    key: 'addEventListeners',
    value: function addEventListeners() {
      var _this = this;

      this.accordion.addEventListener('click', function (event) {
        var target = event.target;
        var isButton = target.hasAttribute('aria-controls');
        if (isButton) {
          _this.toggle(target);
        }
      });

      this.accordion.addEventListener('keydown', this.bindKeyPress);
    }
  }, {
    key: 'toggle',
    value: function toggle(element) {
      var x = element.getAttribute('aria-expanded') === 'true' ? this.collapse : this.expand;
      x.call(this, element);
    }
  }, {
    key: 'expand',
    value: function expand(button) {
      if (!this.allowMultiple) {
        this.collapseAll();
      }
      var panel = this.getPanel(button);
      button.setAttribute('aria-expanded', true);
      button.classList.add('is-active');
      panel.hidden = false;
    }
  }, {
    key: 'collapse',
    value: function collapse(button) {
      var panel = this.getPanel(button);
      button.setAttribute('aria-expanded', false);
      button.classList.remove('is-active');
      panel.hidden = true;
    }
  }, {
    key: 'getPanel',
    value: function getPanel(element) {
      var elementId = element.getAttribute('aria-controls');
      var panel = this.accordion.querySelector('#' + elementId);
      if (!panel) {
        throw new Error('An accordion panel with an ID of ' + elementId + ' does not exist.');
      } else {
        return panel;
      }
    }
  }, {
    key: 'collapseAll',
    value: function collapseAll() {
      var _this2 = this;

      this.buttonsArray.forEach(function (button) {
        _this2.collapse(button);
      });
    }
  }, {
    key: 'bindKeyPress',
    value: function bindKeyPress(event) {
      var target = event.target;
      var which = event.which;
      var direction = void 0;

      if (target.hasAttribute('aria-controls')) {
        if (which === keyCodes.upArrow || which === keyCodes.downArrow) {
          var index = this.buttonsArray.indexOf(target);
          switch (which) {
            case keyCodes.upArrow:
              direction = -1;
              break;
            case keyCodes.downArrow:
              direction = 1;
              break;
          }
          var length = this.buttonsArray.length;
          var newIndex = (index + length + direction) % length;

          this.buttonsArray[newIndex].focus();
        } else if (which === keyCodes.home || keyCodes.end) {
          switch (which) {
            case keyCodes.home:
              this.buttonFirst.focus();
              break;
            case keyCodes.end:
              this.buttonLast.focus();
              break;
          }
        }
      }
    }
  }]);
  return ButaneAccordion;
}();

var init = function init() {
  var butaneAccordions = document.querySelectorAll('[data-butane-accordion]');

  Array.from(butaneAccordions).forEach(function (accordion) {
    new ButaneAccordion(accordion); // eslint-disable-line no-new
  });
};

var main = { init: init };

return main;

})));
