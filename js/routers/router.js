define([
	'jquery',
	'backbone',
	'collections/users',
	'common'
	], function ($, Backbone, Users, common) {
		var Router = Backbone.Router.extend({
			routes: {
				'*any': 'changeaction'
			},
			changeaction: function(arg) {
				common.action = arg || '';
				Users.trigger('action');
			}
		})
		return Router;
	}
);