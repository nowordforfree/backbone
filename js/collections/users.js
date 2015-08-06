var app = app || {};

(function () {
	var Users = Backbone.Collection.extend({
		model: app.User,
		url: 'http://127.0.0.1:3333/users/',
		comparator: 'username'
	});
	app.users = new Users();
})();