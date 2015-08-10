define([
	'jquery',
	'backbone',
	'collections/users',
	'views/form-view',
	'views/grid-view',
	'common'
	], function ($, Backbone, Users, FormView, GridView, common) {
	var AppView = Backbone.View.extend({
		el: $('body > .container'),
		events: {
			'click #showform': 'create'
		},
		initialize: function () {
			this.form = new FormView();

			this.$tbody = $('#users tbody');

			this.listenTo(Users, 'add', this.addOne);
			this.listenTo(Users, 'reset', this.addAll);
			Users.fetch({ reset: true });
		},
		addOne: function (row) {
			var view = new GridView({ model: row });
			view.parent = this;
			this.$tbody.append(view.render().el);
		},
		addAll: function () {
			this.$tbody.html('');
			Users.each(this.addOne, this);
		},
		create: function () {
			var create = {
				title: 'Create User',
				action: common.ACTIONS[1],
				save: 'Create'
			};
			this.form.prerender(create);
		}
	});
	return AppView;
})