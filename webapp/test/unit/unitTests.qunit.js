/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"minisap2023/minisap_deep/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
