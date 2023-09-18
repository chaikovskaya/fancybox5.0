!function(global) {
  'use strict';

  function ShowMore(elem, params) {
    this.$element = jQuery(elem);
    this.params = params || {};

    this.onInit = this.params.onInit || null;
    this.classReady = this.params.classReady || 'JS-ShowMore-ready';
    this.classStart = this.params.classStart || 'showmore-start';
    this.classActive = this.params.classActive || 'showmore-active';
    this.classSwitcherActive = this.params.classSwitcherActive || 'switcher-active';
    this.classHide = this.params.classHide || 'showmore-item-hide';
    this.amount = this.params.amount || 1;
    this.speed = this.params.speed || 300;
    this.elementItem = this.params.elementItem || '.JS-ShowMore-Item';
    this.start = this.params.start || {};
    this.toggle = this.params.toggle || {};

    this.__construct();
  };

  ShowMore.prototype.__construct = function __construct() {
    this.$document = jQuery(document);
    this.$menu = this.$element.find('.JS-ShowMore-Menu').eq(0);
    this.$switcher = this.$element.find('.JS-ShowMore-Switcher').eq(0);
    this.$item = this.$element.find(this.elementItem);
    this.$amount = this.$element.find('.JS-ShowMore-Amount').eq(0);
    this._init();
  };

  ShowMore.prototype._init = function _init() {
    var _this = this;

    if ( jQuery.isFunction(this.onInit) ){
      this.onInit.apply(window, []);
    }

    if ( this.$item.length > this.amount ){
      _this._showSwitcher.apply(_this, []);

      if (this.$element.hasClass(this.classActive)) {
        this.$element.removeClass(this.classActive);
      }
      _this._showItems.apply(_this, []);
      _this._hideItems.apply(_this, []);
      _this._setAmount.apply(_this, []);

      this.$switcher.off().on('click.JS-ShowMore', function(e, data) {
        e.stopPropagation();
        _this._toggle.apply(_this, []);
        _this.toggle();
      });
    }

    this.start();
    this._ready();
  };

  ShowMore.prototype._ready = function _ready() {
    this.$element
      .addClass('JS-ShowMore-ready')
      .addClass(this.classReady);
  };

  ShowMore.prototype._showSwitcher = function _showSwitcher() {
    this.$element.addClass(this.classStart);
    this.$switcher.addClass(this.classSwitcherActive);
  };

  ShowMore.prototype._hideItems = function _hideItems() {
    var _this = this,
        i = 0;

    this.$item.each(function(){
      i++;
      if (i >= _this.amount) {
        _this.$item.eq(i).addClass(_this.classHide);
      }
    });
  };

  ShowMore.prototype._showItems = function _showItems() {
    this.$item.removeClass(this.classHide);
  };

  ShowMore.prototype._setAmount = function _setAmount() {
    var lengthItemHide = this.$item.filter('[class~="' + this.classHide + '"]').length;
    this.$amount.html(lengthItemHide);
  };

  ShowMore.prototype._toggle = function _toggle() {
    if (this.$element.hasClass(this.classActive)) {
      this.$menu.slideUp(this.speed);
      this.$element.removeClass(this.classActive);
      this._hideItems();
    } else {
      this.$menu.slideDown(this.speed);
      this.$element.addClass(this.classActive);
      this._showItems();
    }
  };
  /*--/ShowMore--*/

  global.ShowMore = ShowMore;
}(this);
