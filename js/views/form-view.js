define([
	'backbone',
	'jquery',
	'bootstrap',
	'collections/users',
	'models/user',
	'text!tpl/form.html',
	'common'
	], function (Backbone, $, b, Users, User, tpl, common) {
		var FormView = Backbone.View.extend({
			el: $('#userform'),
			template: _.template(tpl),
			events: {
				'click #Save': 'definemethod'
			},
			initialize: function () {
				this.$formwrap = $('.modal-content');
				$( this.$el ).on('hide.bs.modal', this.reset);
				this.listenTo(Users, 'action', this.render);
			},
			definemethod: function () {
				if (common.action == common.ACTIONS[0]) {
					this.create();
				} else if (common.action == common.ACTIONS[1]) {
					this.edit();
				} else if (common.action == common.ACTIONS[2]) {
					this.clear();
				}
			},
			create: function () {
				var newuser = this.validate();
				if (newuser) {
					var self = this;
					$.ajax({
						url: Users.url,
						method: 'POST',
						data: newuser,
						success: function(resp) {
							if (resp && resp.message) {
								$('.modal-body .response').text(resp.message);
							} else {
								newuser._id = resp._id;
								Users.add(new User(newuser));
								self.render();
							}
						},
						error: function(resp) {
							$('.modal-body .response').text(resp.responseText);
						}
					});
				}
			},
			edit: function () {
				var updateduser = this.validate();
				if (updateduser) {
					var user = Users.get($(this.el).find('input[type="hidden"]').val());
					if (user) {
						var self = this;
						user.save( updateduser, {
							success: function(model, resp) {
								if (resp && resp.message) {
									$('.modal-body .response').text(resp.message);
								} else {
									self.render();
								}
							},
							error: function(model, resp) {
								$('.modal-body .response').text(resp.responseJSON.message);
							},
							wait: true
						});
					}
				}
			},
			clear: function () {
				if ($(this.el).css('display') == 'none') {
					return this.render();
				}
				var user = Users.get($(this.el).find('input[type="hidden"]').val());
				if (user) {
					user.destroy();
					this.render();
				}
			},
			prerender: function(param) {
				this.$formwrap.html(this.template(param));
			},
			render: function() {
				if (common.action && common.ACTIONS.indexOf(common.action) > -1) {
					this.$el.modal('toggle');
					return this;
				}
			},
			reset: function () {
				$('.modal-body .form-horizontal').find('input').each(function (i, el) {
					$(el).val('');
				})
				$('.modal-body .response').text('');
				window.location.href = window.location.href.substring(0, window.location.href.indexOf('#') + 1);
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
				$('.modal-body .response').text('');
				var errors = {
					'requiredempty': 'This field requires value',
					'formatmismatch': 'Value provided does not match valid format'
				},
				error = '',
				newuser = {},
				valid = true;
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
				})
if (valid) {
	return newuser;
}
return false;
			}
		});
		return FormView;
});