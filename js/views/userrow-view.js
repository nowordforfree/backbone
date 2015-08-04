var app = app || {};

(function ($) {
	app.AppView = Backbone.View.extend({
		el: $('#users'),
		rowsTemplate: _.template($('#userrows-template').html()),
		events: {
			'click glyphicon-pencil': 'log',
			'click glyphicon-trash': 'log'
		},
		initialize: function () {
			this.$tbody = this.$('#users tbody');
			app.users.fetch({ reset: true });
		},
		log: function (e) {
			console.log('Clicked on ' + e.target);
			console.log(this.get('id'));
		},
		render: function () {
			this.$tbody.html()
		}
	});
})(jQuery);