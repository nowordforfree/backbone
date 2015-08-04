var app = app || {};

(function () {
	var Users = Backbone.Collection.extend({
		model: app.User,
		url: '/users'
	});
	app.users = new Users;
})()