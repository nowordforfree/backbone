require.config({
	paths: {
		'jquery': 'lib/jquery-2.1.4.min',
		'underscore': 'lib/underscore',
		'backbone': 'lib/backbone',
		'bootstrap': 'lib/bootstrap.min',
		'text': 'lib/text'
	},
	shim: {
		'underscore': {
			'exports': '_'
		},
		'backbone': {
			'deps': ['jquery', 'underscore'],
			'exports': 'Backbone'
		}
	}
});

require([
	'jquery',
	'backbone',
	'views/app-view',
	'routers/router'
	],
	function ($, Backbone, AppView, Workspace) {
		$(function () {
			new Workspace();
			Backbone.history.start();
			new AppView();
		});
	}
);