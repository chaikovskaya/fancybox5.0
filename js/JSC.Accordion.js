!function(global) {
  'use strict';

  function Accordion(elem, params) {
    this.$element = jQuery(elem);
    this.params = params || {};

    this.onInit = this.params.onInit || null;
    this.classReady = this.params.classReady || 'JS-Accordion-ready';
    this.classActive = this.params.classActive || 'accordion-active';
    this.speed = this.params.speed || 300;
    this.id = this.$element.data('accordion-id');

    this.__construct();
  };

  Accordion.prototype.__construct = function __construct() {
    this.$document = jQuery(document);
    this.$menu = this.$element.find('.JS-Accordion-Menu').eq(0);
    this.$switcher = this.$element.find('.JS-Accordion-Switcher').eq(0);
    this.$close = this.$element.find('.JS-Accordion-Close').eq(0);

    this._init();
  };

  Accordion.prototype._init = function _init() {
    var _this = this;

    if( jQuery.isFunction(this.onInit) ){
      this.onInit.apply(window, []);
    }

    this.$switcher.on('click.JS-Accordion', function(e, data) {
      _this._reset.apply(_this, []);
      _this._toggle.apply(_this, []);
    });

    this.$close.on('click.JS-Accordion', function(e, data) {
      _this._toggle.apply(_this, []);
    });

    this._ready();

    this._start();
  };

  Accordion.prototype._ready = function _ready() {
    this.$element
      .addClass('JS-Accordion-ready')
      .addClass(this.classReady);
  };

  Accordion.prototype._start = function _start() {
    if (this.$element.hasClass(this.classActive)) {
      this.$menu.slideDown(this.speed);
    } else {
      this.$menu.slideUp(this.speed);
    }
  };

  Accordion.prototype._reset = function _reset() {
    $('[data-accordion-id="' + this.id + '"]')
        .find('.JS-Accordion-Menu')
        .not(this.$menu)
        .slideUp(this.speed);
    $('[data-accordion-id="' + this.id + '"]')
        .not(this.$element)
        .removeClass(this.classActive);
  };

  Accordion.prototype._toggle = function _toggle() {
    if (this.$element.hasClass(this.classActive)) {
      this.$menu.slideUp(this.speed);
      this.$element.removeClass(this.classActive);
    } else {
      this.$menu.slideDown(this.speed);
      this.$element.addClass(this.classActive);
    }
  };


  /*--/Accordion--*/

  global.Accordion = Accordion;
}(this);
