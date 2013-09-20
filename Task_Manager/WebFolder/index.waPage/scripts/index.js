	
WAF.onAfterInit = function onAfterInit() {// @lock
	var tabView = $$('mainTab'),
		dg = $$('tasksGrid'),
		doneCol = dg.column('done'),
		descCol = dg.column('description'),
		titleCol = dg.column('title');
		
// @region namespaceDeclaration// @startlock
	var button3 = {};	// @button
	var image1 = {};	// @image
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
	
	function center(container){
		$$(container).center({center : 'h'});
		$(window).resize(function(){
			$$(container).center({center : 'h'});
		});
	}
	
// eventHandlers// @lock

	button3.click = function button3_click (event)// @startlock
	{// @endlock
		dg.$domNode
		.find('.waf-toolbar-element[title=Add]')
		.click()
	};// @lock

	image1.click = function image1_click (event)// @startlock
	{// @endlock
		sources.task.all();
	};// @lock

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
		location.reload();
	};// @lock

	login1.login = function login1_login (event)// @startlock
	{// @endlock
		location.reload();
	};// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		center('container1');
		
		dg.$domNode
		.find('.waf-toolbar-element')
		.unbind('click').click(function(e){
			if(!waf.directory.currentUser()){
				return false;
			}
			
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
		
		$$('image1')
		.$domNode
		.attr({
			'data-original-title': "Refresh the task list"
		})
		.tooltip({
            html: true
        })
		
		refreshView();
		dg.gridController.gridView._private.globals.rowHeight = 50;
		dg.redraw();
	};// @lock

	tasksGrid.onRowDraw = function tasksGrid_onRowDraw (event)// @startlock
	{// @endlock
		if(!event.element){
			return;
		}
		
		var	cell = event.row.cells[doneCol.columnNumber],
			dom = cell.dom;
			
		if(!isNaN(cell.value)){
			dom
			.addClass('progress progress-striped active')
			.html('<div class="progress-bar progress-bar-info" style="width: ' + parseInt(cell.value) + '%;top: 15px;bottom: 15px;height: auto;"></div>')
		}
		
		cell = event.row.cells[descCol.columnNumber];
		dom = cell.dom;
		
		if(cell.value && cell.value.length > 70){
			dom.attr({
                'data-original-title': cell.value
            }).tooltip({
                html: true,
            	container: 'body'
            })
            .text(cell.value.substr(0,70) + "...");
		}
		
		cell = event.row.cells[titleCol.columnNumber];
		dom = cell.dom;
		
		if(cell.value && cell.value.length > 60){
			dom.attr({
                'data-original-title': cell.value
            }).tooltip({
                html: true,
            	container: 'body'
            })
            .text(cell.value.substr(0,60) + "...");
		}
	};// @lock

	tasksGrid.onRowDblClick = function tasksGrid_onRowDblClick (event)// @startlock
	{// @endlock
		tabView.selectTab(2);
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("button3", "click", button3.click, "WAF");
	WAF.addListener("image1", "click", image1.click, "WAF");
	WAF.addListener("tasksGrid", "onRowDraw", tasksGrid.onRowDraw, "WAF");
	WAF.addListener("button1", "click", button1.click, "WAF");
	WAF.addListener("login1", "logout", login1.logout, "WAF");
	WAF.addListener("login1", "login", login1.login, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
	WAF.addListener("tasksGrid", "onRowDblClick", tasksGrid.onRowDblClick, "WAF");
// @endregion
};// @endlock
