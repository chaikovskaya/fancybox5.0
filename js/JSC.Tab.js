!function(global) {
  'use strict';

  function Tab( elem, params ){
    this.$element = jQuery(elem);
    this.params = params || {};

    this.classSwitcherActive = this.params.classSwitcherActive || 'JS-Tab-Switcher-active';
    this.classItemActive = this.params.classItemActive || 'JS-Tab-Item-active';
    this.classReady = this.params.classReady || 'JS-Tab-ready';
    this.onInit = this.params.onInit || null;
    this.onReady = this.params.onReady || null;
    this.onToggle = this.params.onToggle || null;

    this.__construct();
  };

  Tab.prototype.__construct = function(){
    this.$items = this.$element.find('.JS-Tab-Item');
    this.$switcher = this.$element.find('.JS-Tab-Switcher');
    this.$select = this.$element.find('.JS-Tab-Select');

    this._init();

    this.$element.data('JS-Tab', this);
  };

  Tab.prototype._init = function(){
    var context = this;

    if( jQuery.isFunction(this.onInit) ){
      this.onInit.apply(window, [this]);
    }

    this.$switcher.on('click.JS-Tab', function(e){
      e.preventDefault();
      context.toggle.apply(context, [this]);
    });

    this.$select.on('change.JS-Tab', function(e){
      context.toggleSelect.apply(context, [this]);
    });

    this._ready();
  };

  Tab.prototype._ready = function() {
    this.$element.addClass('JS-Tab-ready').addClass(this.classReady);

    if ( jQuery.isFunction(this.onReady) ) {
      this.onReady.apply(window, [this]);
    }
  };

  Tab.prototype.toggleSelect = function( elem ){
    var index = elem.options.selectedIndex;

    this.toggle({} , index);
  }

  Tab.prototype.toggle = function( elem, index1){
    var index = jQuery(elem).index();

    if (index < 0) {
      index = index1;
    }

    var $item = this.$items.eq(index),
        $switcher = this.$switcher.eq(index);

    if (!$switcher.hasClass(this.classSwitcherActive)) {
      this.$switcher
        .removeClass(this.classSwitcherActive)
        .removeClass('JS-Tab-Switcher-active');

      $switcher
        .addClass(this.classSwitcherActive)
        .addClass('JS-Tab-Switcher-active');
    }

    if (!$item.hasClass(this.classItemActive)) {
      this.$items
        .removeClass(this.classItemActive)
        .removeClass('JS-Tab-Item-active')

      $item
        .addClass(this.classItemActive)
        .addClass('JS-Tab-Item-active');
    }

    //this.onToggle(jQuery(elem));
  };
  /*--/Tab--*/

  global.Tab = Tab;
}(this);
