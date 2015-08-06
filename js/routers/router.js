var app = app || {};

(function () {
	var Router = Backbone.Router.extend({
		routes: {
			'*any': 'changeaction'
		},
		changeaction: function(arg) {
			app.action = arg || '';
			app.users.trigger('action');
		}
	})
	app.Router = new Router();
	Backbone.history.start();
})();