/*!
 * @copyright &copy; Kartik Visweswaran, Krajee.com, 2014
 * @version 1.0.0
 *
 * A multi level dependent dropdown JQuery plugin. The plugin
 * allows nested and combined dependencies.
 * 
 * For more JQuery plugins visit http://plugins.krajee.com
 * For more Yii related demos visit http://demos.krajee.com
 */
(function ($) {
    var isEmpty = function (value, trim) {
        return typeof value === 'undefined' || value === null || value === undefined || value == []
            || value === '' || trim && $.trim(value) === '';
    };
    var addOption = function ($el, id, name, sel) {
        var settings = (id == sel && sel !== null) ? {value: id, text: name, selected: "selected"} : {value: id, text: name};
        $("<option/>", settings).appendTo($el);
    };
    var getSelect = function (data, placeholder, defVal) {
        var $select = $("<select>");
        if (!isEmpty(placeholder)) {
            addOption($select, "", placeholder, defVal);
        }
        $.each(data, function (i, groups) {
            if (groups.id) {
                addOption($select, groups.id, groups.name, defVal);
            }
            else {
                var $group = $('<optgroup>', {label: i});
                $.each(groups, function (j, option) {
                    addOption($group, option.id, option.name, defVal);
                });
                $group.appendTo($select);
            }
        });
        return $select.html();
    };
    var getSettings = function ($element, vUrl, vId, vVal, vPlaceholder, vLoading) {
        var $el = $element, url = vUrl, id = vId, val = vVal, placeholder = vPlaceholder, optCount = 0;
        var settings = {
            url: url,
            type: 'post',
            data: {depdrop_parents: val},
            dataType: 'json',
            success: function (data) {
                var selected = isEmpty(data.selected) ? null : data.selected;
                if (data == null || data.length === 0) {
                    addOption($el, '', self.emptyMsg, '');
                }
                else {
                    $el.html(getSelect(data.output, placeholder, selected));
                    if ($el.find('optgroup').length > 0) {
                        $el.find('option[value=""]').attr('disabled', 'disabled');
                    }
                    $el.val(selected);
                    if (data.output.length !== 0) {
                        $el.removeAttr('disabled');
                    }
                }
                optCount = $el.find('option').length;
                if ($el.find('option[value=""]').length > 0) {
                    optCount--;
                }
                $el.trigger('depdrop.change', [id, $("#" + id).val(), optCount]);
            }
        };
        settings['beforeSend'] = function () {
            $el.trigger('depdrop.beforeChange', [id, $("#" + id).val()]);
            $el.attr('disabled', 'disabled');
            $el.html('');
            if (vLoading) {
                $el.addClass('kv-loading');
            }
        };
        settings['error'] = function () {
            $el.trigger('depdrop.error', [id, $("#" + id).val()]);
        };
        settings['complete'] = function () {
            $el.trigger('depdrop.afterChange', [id, $("#" + id).val()]);
            if (vLoading) {
                $el.removeClass('kv-loading');
            }
        };
        return settings;
    };

    // DepDrop public class definition
    var DepDrop = function (element, options) {
        this.$element = $(element);
        this.url = options.url;
        this.depends = options.depends;
        this.loading = options.loading;
        this.placeholder = options.placeholder;
        this.emptyMsg = options.emptyMsg;
        this.init();
    };

    DepDrop.prototype = {
        constructor: DepDrop,
        init: function () {
            var self = this, depends = self.depends, $id, value = {}, len = depends.length;
            self.$element.attr('disabled', 'disabled');
            if (self.placeholder != '') {
                self.$element.find('option[value=""]').remove();
                self.$element.prepend('<option value="">' + self.placeholder + '</option>');
            }
            for (var i = 0; i < len; i++) {
                $id = $('#' + depends[i]);
                $id.on('change', function () {
                    for (var j = 0; j < len; j++) {
                        $id = $('#' + depends[j]);
                        value[j] = $id.val();
                    }
                    $.ajax(getSettings(self.$element, self.url, $id.attr('id'), value, self.placeholder, self.loading));
                })
            }
            self.$element.trigger('depdrop.init');
        },
    };

    //Dependent dropdown plugin definition
    $.fn.depdrop = function (option) {
        var args = Array.apply(null, arguments);
        args.shift();
        return this.each(function () {
            var $this = $(this),
                data = $this.data('depdrop'),
                options = typeof option === 'object' && option;

            if (!data) {
                $this.data('depdrop', (data = new DepDrop(this, $.extend({}, $.fn.depdrop.defaults, options, $(this).data()))));
            }

            if (typeof option === 'string') {
                data[option].apply(data, args);
            }
        });
    };

    $.fn.depdrop.defaults = {
        url: '',
        loading: true,
        placeholder: 'Select ...',
        emptyMsg: 'No data found'
    };
}(jQuery));