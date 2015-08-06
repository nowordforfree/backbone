var app = app || {};

(function ($) {
	GridView = Backbone.View.extend({
		tagName: 'tr',
		template: _.template($('#userrow-template').html()),
		events: {
			'click .tdicon:has(>a>.glyphicon-pencil)': 'edit',
			'click .tdicon:has(>a>.glyphicon-trash)': 'clear'
		},
		initialize: function () {
			this.listenTo(this.model, 'change', this.render);
		},
		edit: function () {
			var edit = this.model.toJSON();
			edit['title'] = this.parent.setTitle(ACTIONS[1]);
			edit['action'] = ACTIONS[1];
			edit['save'] = 'Save changes';
			app.modal.prerender(edit);
		},
		clear: function () {
			// invoke this.model.destroy
			var remove = this.model.toJSON();
			remove['title'] = 'Are you sure that you want to Delete this user?';
			remove['action'] = ACTIONS[2];
			remove['save'] = 'Delete User';
			app.modal.prerender(remove);
		},
		render: function () {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}
	})
	app.grid = new GridView();
})(jQuery)