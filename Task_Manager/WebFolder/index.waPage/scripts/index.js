	
WAF.onAfterInit = function onAfterInit() {// @lock
	var tabView = $$('mainTab'),
		dg = $$('tasksGrid'),
		doneCol = dg.column('done'),
		descCol = dg.column('description');
		
// @region namespaceDeclaration// @startlock
	var button1 = {};	// @button
	var login1 = {};	// @login
	var documentEvent = {};	// @document
	var tasksGrid = {};	// @dataGrid
// @endregion// @endlock
	
	function refreshView(){
		if(!waf.directory.currentUser()){
			$$('button1').setValue('Signup');
		}
		else{
			$$('button1').setValue('Edit Profile');
		}
		
		sources.user.all();
	}
	
// eventHandlers// @lock

	button1.click = function button1_click (event)// @startlock
	{// @endlock
		var user = sources.user.getCurrentElement();
		
		tabView.selectTab(3);
		
		if(!user){
			sources.user.addNewElement();
		}
	};// @lock

	login1.logout = function login1_logout (event)// @startlock
	{// @endlock
		refreshView();
	};// @lock

	login1.login = function login1_login (event)// @startlock
	{// @endlock
		refreshView();
	};// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		dg.$domNode
		.find('.waf-toolbar-element')
		.unbind('click').click(function(e){
			switch($(this).attr('title')){
				case 'Add':
					sources.task.addNewElement();
					if($$('taskCompo').form){
						$$('taskCompo').form.enable();
						tabView.selectTab(2);
					}else{
						$$('taskCompo').config.__enable__ = true;
						tabView.selectTab(2);
					}
					break;
				case 'Delete':
					sources.task.removeCurrent({
						onError: function(){
							sources.task.all();
						}
					});
					break;
			}

			return false;
		});
		
		refreshView();
		dg.gridController.gridView._private.globals.rowHeight = 50;
		dg.redraw();
	};// @lock

	tasksGrid.onRowDraw = function tasksGrid_onRowDraw (event)// @startlock
	{// @endlock
		var	cell = event.row.cells[doneCol.columnNumber],
			dom = cell.dom;
			
		if(!isNaN(cell.value)){
			dom
			.addClass('progress progress-striped active')
			.html('<div class="progress-bar progress-bar-info" style="width: ' + parseInt(cell.value) + '%;top: 15px;bottom: 15px;height: auto;"></div>')
		}
		
		cell = event.row.cells[descCol.columnNumber];
		dom = cell.dom;
		
		if(cell.value && cell.value.length > 100){
			dom.text(cell.value.substr(0,100) + "...");
		}
	};// @lock

	tasksGrid.onRowDblClick = function tasksGrid_onRowDblClick (event)// @startlock
	{// @endlock
		tabView.selectTab(2);
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("tasksGrid", "onRowDraw", tasksGrid.onRowDraw, "WAF");
	WAF.addListener("button1", "click", button1.click, "WAF");
	WAF.addListener("login1", "logout", login1.logout, "WAF");
	WAF.addListener("login1", "login", login1.login, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
	WAF.addListener("tasksGrid", "onRowDblClick", tasksGrid.onRowDblClick, "WAF");
// @endregion
};// @endlock
