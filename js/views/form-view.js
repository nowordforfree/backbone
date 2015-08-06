var app = app || {};

(function ($) {
	FormView = Backbone.View.extend({
		el: $('#userform'),
		template: _.template($('#userform-template').html()),
		events: {
			'click #Save': 'definemethod'
		},
		initialize: function () {
			this.$formwrap = $('.modal-content');
			$( this.$el ).on('hide.bs.modal', this.reset);
		},
		definemethod: function (e) {
			if (app.action == ACTIONS[0]) {
				var newuser = this.validate();
				if (newuser) {
					app.users.create( newuser );
					this.render();
				}
			}
			if (app.action == ACTIONS[1]) {
				console.log(this.model);
				console.log(e);
			}
		},
		validate: function() {
			var validateEmail = function(email) {
				var emailregex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
				return emailregex.test(email);
			};
			var validatePhone = function(phone) {
				var phoneregex = /^\(?([0-9]{3})\)?([ -]?)([0-9]{3})\2([0-9]{4})$/;
				return phoneregex.test(phone);
			};
			var errors = {
				'requiredempty': 'This field requires value',
				'formatmismatch': 'Value provided does not match valid format'
			};
			var error = '';
			var newuser = {};
			var valid = true;
			$('.modal-body .form-horizontal').children().each(function (i, el) {
				var pass = true;
				var input = $(el).find('input[type!="hidden"]')[0];
				if (input) {
					newuser[$(input).attr('id').toLowerCase()] = $(input).val().trim();
					var value = $(input).val();
					if (value.trim().length == 0 && $(input).attr('required')) {
						pass = false;
						error = errors['requiredempty'];
					}
					if ($(input).attr('id').toLowerCase() == 'phone') {
						if (value.trim().length > 0) {
							if (!validatePhone(value)) {
								pass = false;
								error = errors['formatmismatch'];
							}
						}
					}
					if ($(input).attr('id').toLowerCase() == 'email') {
						if (value.trim().length > 0) {
							if (!validateEmail(value)) {
								pass = false;
								error = errors['formatmismatch'];
							}
						} else {
							pass = false;
							error = errors['requiredempty'];
						}
					}
					if (!pass) {
						$(el).toggleClass('has-error', true);
						$(el).toggleClass('has-success', false);
						$(el).find('.help-block').text(error);
						valid = false;
					} else {
						$(el).toggleClass('has-error', false);
						$(el).toggleClass('has-success', true);
						$(el).find('.help-block').text('');
					}
				}
			});
			if (valid) {
				return newuser;
			}
			return false;
		},
		prerender: function(param) {
			this.$formwrap.html(this.template(param));
		},
		render: function() {
			this.$el.modal('toggle');
			return this;
		},
		reset: function () {
			$('.modal-body .form-horizontal').find('input').each(function (i, el) {
				$(el).val('');
			})
			window.location.href = window.location.href.substring(0, window.location.href.indexOf('#') + 1);
		}
	});
	app.modal = new FormView();
})(jQuery);