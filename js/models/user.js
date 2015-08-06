var app = app || {};

(function () {
	app.User = Backbone.Model.extend({
		defaults: {
			username: '',
			firstname: '',
			lastname: '',
			email: '',
			phone: '',
			_id: ''
		}
	})
})()