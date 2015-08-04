var app = app || {};

(function () {
	app.User = Backbone.Model.extend({
		defaults: {
			username: '',
			firstname: '',
			lastname: '',
			email: '',
			phone: '',
			id: ''
		},
		url: function () {
			return this.id ? '/users/' + this.id : '/users';
		}
	})
})()