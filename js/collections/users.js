define(['backbone', 'models/user'], function (Backbone, User) {
	var Users = Backbone.Collection.extend({
		model: User,
		url: 'http://127.0.0.1:3333/users/',
		comparator: 'username'
	});
	return new Users();
})