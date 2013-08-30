
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'comment';
	// @endregion// @endlock

	this.load = function (data) {// @lock
		var theSource = $comp.sources.comments,
			theVar = $comp.sourcesVar.comm;
	// @region namespaceDeclaration// @startlock
	var button1 = {};	// @button
	// @endregion// @endlock

	// eventHandlers// @lock

	button1.click = function button1_click (event)// @startlock
	{// @endlock
		theSource.addNewElement();
		for(var attr in theVar){
			theSource[attr] = theVar[attr];
		}
		
		theSource.save({
			onSuccess: function(ev){
				$comp.sourcesVar.comm = {
					title: '',
					comment: ''
				};
				$comp.sources.comm.sync();
			}
		});
		
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_button1", "click", button1.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
