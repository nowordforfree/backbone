var app = app || {};

(function ($) {
	app.AppView = Backbone.View.extend({
		el: $('body > .container'),

		initialize: function () {
			this.$tbody = $('#users tbody');
			this.$btnform = $('#showform');

			this.listenTo(app.users, 'add', this.addOne);
			this.listenTo(app.users, 'reset', this.addAll);
			this.listenTo(app.users, 'action', this.show);
			app.users.fetch({ reset: true });
		},
		addOne: function (row) {
			var view = new GridView({ model: row });
			view.parent = this;
			this.$tbody.append(view.render().el);
		},
		addAll: function () {
			this.$tbody.html('');
			app.users.each(this.addOne, this);
		},
		show: function() {
			if (app.action && ACTIONS.indexOf(app.action) > -1) {
				if (app.action == ACTIONS[0]) {
					var create = {
						title: this.setTitle(app.action),
						action: ACTIONS[0],
						save: 'Create'
					}
					app.modal.prerender(create);
				}
				app.modal.render();
			}
		},
		setTitle: function (str) {
			return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase() + ' User';
		}
	});
})(jQuery);