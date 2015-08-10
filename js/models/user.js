define(['backbone'], function (Backbone) {
	var User = Backbone.Model.extend({
		idAttribute: '_id',
		defaults: {
			username: '',
			firstname: '',
			lastname: '',
			email: '',
			phone: ''
		}
	})
	return User;
})