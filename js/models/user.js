var app = app || {};

(function () {
	app.User = Backbone.Model.extend({
		idAttribute: '_id',
		defaults: {
			username: '',
			firstname: '',
			lastname: '',
			email: '',
			phone: ''
		}
	})
})()