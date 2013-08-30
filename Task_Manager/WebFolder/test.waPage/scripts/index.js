
WAF.onAfterInit = function onAfterInit() {// @lock
	var dg = $$('dataGrid1');
// @region namespaceDeclaration// @startlock
	var dataGrid1 = {};	// @dataGrid
	var documentEvent = {};	// @document
// @endregion// @endlock

// eventHandlers// @lock

	dataGrid1.onRowDraw = function dataGrid1_onRowDraw (event)// @startlock
	{// @endlock
		var	cell = event.row.cells[2],
			dom = cell.dom;
			
		if(!isNaN(cell.value)){
			dom
			.addClass('progress progress-striped active')
			.html('<div class="progress-bar progress-bar-info" style="width: ' + parseInt(cell.value) + '%;top: 15px;bottom: 15px;height: auto;"></div>')
		}
	};// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		dg.gridController.gridView._private.globals.rowHeight = 50;
		dg.redraw();
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("dataGrid1", "onRowDraw", dataGrid1.onRowDraw, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
// @endregion
};// @endlock
