define([
	'backbone',
	'jquery',
	'text!tpl/row.html',
	'common'
	], function (Backbone, $, tpl, common) {
	var GridView = Backbone.View.extend({
		tagName: 'tr',
		template: _.template(tpl),
		events: {
			'click .tdicon:has(>a>.glyphicon-pencil)': 'edit',
			'click .tdicon:has(>a>.glyphicon-trash)': 'clear'
		},
		initialize: function () {
			this.listenTo(this.model, 'change', this.render);
			this.listenTo(this.model, 'destroy', this.remove);
		},
		edit: function () {
			var edit = this.model.toJSON();
			edit['title'] = this.setTitle(common.ACTIONS[1]);
			edit['action'] = common.ACTIONS[1];
			edit['save'] = 'Save changes';
			this.parent.form.prerender(edit);
		},
		clear: function () {
			var remove = this.model.toJSON();
			remove['title'] = 'Are you sure that you want to Delete this user?';
			remove['action'] = common.ACTIONS[2];
			remove['save'] = 'Delete User';
			this.parent.form.prerender(remove);
		},
		setTitle: function (str) {
			return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase() + ' User';
		},
		render: function () {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}
	});
	return GridView;
});