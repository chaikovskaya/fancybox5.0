!function(global) {
    'use strict';

    function Dropdown(elem, params) {
        this.$element = jQuery(elem);
        this.params = params || {};

        this.onInit = this.params.onInit || null;
        this.classReady = this.params.classReady || 'JS-Dropdown-ready';
        this.classActive = this.params.classActive || 'dropdown-active';
        this.classShow = this.params.classShow || '';
        this.eventName = this.params.eventName || 'click';
        this.backgroundDisabled = this.params.backgroundDisabled || false;

        this.__construct();
    };

    Dropdown.prototype.__construct = function __construct() {
        this.$document = jQuery(document.body);
        this.$menu = this.$element.find('.JS-Dropdown-Menu').eq(0);
        this.$switcher = this.$element.find('.JS-Dropdown-Switcher').eq(0);
        this.$close = this.$element.find('.JS-Dropdown-Close');

        this._init();
    };

    Dropdown.prototype._init = function _init() {
        var _this = this;

        if( jQuery.isFunction(this.onInit) ){
            this.onInit.apply(window, []);
        }

        this.$switcher.on(this.eventName + '.JS-Dropdown', function(e, data) {
            _this._toggle.apply(_this, []);
        });

        this.$close.on('click.JS-Dropdown', function(e, data) {
            _this._toggle.apply(_this, []);
        });

        jQuery(document).on('mouseup.JS-Dropdown', function (e, data) {
            _this._outside.apply(_this, [e]);
        });

        this._ready();
    };

    Dropdown.prototype._ready = function _ready() {
        this.$element
            .addClass('JS-Dropdown-ready')
            .addClass(this.classReady);
    };

    Dropdown.prototype._toggle = function _toggle() {
        this.$element.toggleClass(this.classActive);
        if (this.classShow != '') {
            this.$document.toggleClass(this.classShow);
        }
    };

    Dropdown.prototype._outside = function _outside(e) {
        if (!this.backgroundDisabled && (this.$element.has(e.target).length === 0)){
            this.$element.removeClass(this.classActive);
            this.$document.removeClass(this.classShow);
        }
    };

    /*--/Dropdown--*/

    global.Dropdown = Dropdown;
}(this);
