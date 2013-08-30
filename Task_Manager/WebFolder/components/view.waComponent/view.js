﻿
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'view';
	// @endregion// @endlock

	this.load = function (data) {// @lock
		var tabView = $$('mainTab'),
			form = new _ns.Form([
			$$(getHtmlId('title')),
			$$(getHtmlId('done_slider')),
			$$(getHtmlId('description')),
			$$(getHtmlId('save')),
			$$(getHtmlId('cancel'))
		]),
		curTask = sources.task.getCurrentElement();
		
		
		if(data.__enable__){
			form.enable();
		}else{
			form.disable();
		}
		
		if(curTask && sources.task.editable){
			$$(getHtmlId('edit')).show();
		}
		else{
			$$(getHtmlId('edit')).hide();
		}
	// @region namespaceDeclaration// @startlock
	var image1 = {};	// @image
	var cancel = {};	// @button
	var save = {};	// @button
	var edit = {};	// @image
	var taskEvent = {};	// @dataSource
	// @endregion// @endlock

	// eventHandlers// @lock

	image1.click = function image1_click (event)// @startlock
	{// @endlock
		form.disable();
		tabView.selectTab(1);
	};// @lock

	cancel.click = function cancel_click (event)// @startlock
	{// @endlock
		sources.task.cancel();
		form.disable();
	};// @lock

	save.click = function save_click (event)// @startlock
	{// @endlock
		sources.task.save({
			onSuccess: function(){
				form.disable();
			}
		});
	};// @lock

	edit.click = function edit_click (event)// @startlock
	{// @endlock
		form.enable();
	};// @lock

	taskEvent.onCurrentElementChange = function taskEvent_onCurrentElementChange (event)// @startlock
	{// @endlock
		if(event.dataSource.editable){
			$$(getHtmlId('edit')).show();
		}
		else{
			$$(getHtmlId('edit')).hide();
		}
		
		form.disable();
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_image1", "click", image1.click, "WAF");
	WAF.addListener(this.id + "_cancel", "click", cancel.click, "WAF");
	WAF.addListener(this.id + "_save", "click", save.click, "WAF");
	WAF.addListener(this.id + "_edit", "click", edit.click, "WAF");
	WAF.addListener("task", "onCurrentElementChange", taskEvent.onCurrentElementChange, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock