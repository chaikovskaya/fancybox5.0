!function(global) {
  'use strict';

  function MobileMenu( elem, params ){
    this.$element = jQuery(elem);
    this.params = params || {};

    this.classActive = this.params.classActive || 'JS-MobileMenu-active';
    this.classShow = this.params.classShow || '';
    this.classElementActive = this.params.classElementActive || '';
    this.classLevels = this.params.classLevels || 'mob-is-levels';
    this.classCurrent = this.params.classCurrent || 'mob-child-is-current';
    this.classReady = this.params.classReady || 'JS-MobileMenu-ready';
    this.countLevels = 0;
    this.onInit = this.params.onInit || null;
    this.onReady = this.params.onReady || null;
    this.backgroundDisabled = this.params.backgroundDisabled || false;

    this.__construct();
  };

  MobileMenu.prototype.__construct = function(){
    this.$document = jQuery('body');
    this.$burger = this.$element.find('.JS-MobileMenu-Burger').first();
    this.$close = this.$element.find('.JS-MobileMenu-Close');
    this.$dropdown = this.$element.find('.JS-MobileMenu-Dropdown').first();
    this.$child = this.$element.find('.JS-MobileMenu-Child');
    this.$parent = this.$element.find('.JS-MobileMenu-Parent');
    this.$back = this.$element.find('.JS-MobileMenu-Back');

    this._init();

    this.$element.data('JS-MobileMenu', this);
  };

  MobileMenu.prototype._init = function _init() {
    var _this = this;

    if( jQuery.isFunction(this.onInit) ){
      this.onInit.apply(window, [this]);
    }

    this.$burger.on('click.JS-MobileMenu', function(e) {
      _this._open.apply(_this, []);
    });

    this.$close.on('click.JS-MobileMenu', function(e){
      _this._close.apply(_this, []);
    });

    this.$parent.on('click.JS-MobileMenu', function(e){
      e.preventDefault();
      _this._next.apply(_this, [this]);
    });

    this.$back.on('click.JS-MobileMenu', function(e){
      _this._back.apply(_this, [this]);
    });

    this._ready();
  };

  MobileMenu.prototype._ready = function _ready() {
    this.$element.addClass('JS-MobileMenu-ready').addClass(this.classReady);

    if ( jQuery.isFunction(this.onReady) ) {
      this.onReady.apply(window, [this]);
    }
  };

  MobileMenu.prototype._outside = function _outside(e) {
    if (!this.backgroundDisabled && (this.$element.has(e.target).length === 0)){
      this._close();
    }
  };

  MobileMenu.prototype._open = function _open() {
    var _this = this;
    this.$dropdown.addClass(this.classActive);
    this.$document.addClass(this.classShow);
    this.$element.addClass(this.classElementActive);

    this.$document.on('mouseup.JS-MobileMenu', function (e, data) {
      _this._outside.apply(_this, [e]);
    });
  };

  MobileMenu.prototype._close = function _close() {
    this.$document.off('mouseup.JS-MobileMenu');

    this.$dropdown.removeClass(this.classActive);
    this.$document.removeClass(this.classShow);
    this.$element.removeClass(this.classElementActive);
  };

  MobileMenu.prototype._showClassLevels = function _showClassLevels() {
    if (this.countLevels > 0 && !this.$dropdown.hasClass(this.classLevels)) {
      this.$dropdown.addClass(this.classLevels);
    }

    if (this.countLevels <= 0) {
      this.$dropdown.removeClass(this.classLevels);
    }
  };

  MobileMenu.prototype._next = function _next(elem) {
    this.$element.find('.' + this.classCurrent).removeClass(this.classCurrent);

    var $child = $(elem).next();

    $child
        .addClass(this.classActive)
        .addClass(this.classCurrent);

    if ($child.length > 0) {
      this.countLevels++;
      this._showClassLevels();
    }
  };

  MobileMenu.prototype._back = function _back(elem) {
    var $child = $(elem).closest(this.$child);

    $child
        .removeClass(this.classActive)
        .removeClass(this.classCurrent);

    $(elem).closest('.JS-MobileMenu-Child' + '.' + this.classActive).addClass(this.classCurrent);

    if ($child.length > 0) {
      this.countLevels--;
      this._showClassLevels();
    }
  };
  /*--/MobileMenu--*/

  global.MobileMenu = MobileMenu;
}(this);
