
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'comment';
	// @endregion// @endlock

	this.load = function (data) {// @lock
		var theSource = $comp.sources.comments;
	// @region namespaceDeclaration// @startlock
	var dislike = {};	// @image
	var like = {};	// @image
	var image4 = {};	// @image
	var image3 = {};	// @image
	var image1 = {};	// @image
	var matrix1 = {};	// @matrix
	var button1 = {};	// @button
	// @endregion// @endlock
	
	function setCurrentCommEditable(editable){
		var $el = getHtmlObj('matrix1').find('.waf-state-selected'),
			$toolbox = $el.find('[data-ref=' + getHtmlId('container3') + ']'),
			$editable = $el.find('[data-ref=' + getHtmlId('image1') + ']'),
			$elements = $el.find('.editable');
		
		if(editable === false){
			$toolbox.hide();
			$editable.show();
			$elements.prop({
				'readOnly': true
			});
		}else{
			$toolbox.show();
			$editable.hide();
			$elements.prop({
				'readOnly': false
			});
		}
	}
	
	// eventHandlers// @lock

	dislike.click = function dislike_click (event)// @startlock
	{// @endlock
		var theSource = $comp.sources.comments;
		debugger;
		
		theSource.like({
			onSuccess: function(e){
				if(e.result === true){
					theSource.serverRefresh({forceReload: true});
				}
			},
			params: [false]
		});
	};// @lock

	like.click = function like_click (event)// @startlock
	{// @endlock
		var theSource = $comp.sources.comments;
		
		theSource.like({
			onSuccess: function(e){
				if(e.result === true){
					theSource.serverRefresh({forceReload: true});
				}
			}
		});
	};// @lock

	image4.click = function image4_click (event)// @startlock
	{// @endlock
		$comp.sources.comments.removeCurrent();
	};// @lock

	image3.click = function image3_click (event)// @startlock
	{// @endlock
		$comp.sources.comments.save();
		setCurrentCommEditable(false);
	};// @lock

	image1.click = function image1_click (event)// @startlock
	{// @endlock
		setCurrentCommEditable();
	};// @lock

	matrix1.onChildrenDraw = function matrix1_onChildrenDraw (event)// @startlock
	{// @endlock
		var $el = event.htmlObject,
			$img = $el.find('[data-ref=' + getHtmlId('image1') + ']');
		
		$el.find('[data-ref=' + getHtmlId('container3') + ']').hide();
		
		if(!event.source.editable){
			$img.hide();
		}else{
			$img.show();
		}
		
		console.log(event.source.can_like);
		
		if(!event.source.like){
			var $like = $el.find('[data-ref=' + getHtmlId('like') + ']');
			if($like.length){
				$$($like.attr('id')).disable();
				$like.css({
					opacity: 0.5
				});
			}
		}
		
		console.log(event.source.can_dislike);
		
		if(!event.source.can_dislike){
			var $dislike = $el.find('[data-ref=' + getHtmlId('dislike') + ']');
			if($dislike.length){
				$$($dislike.attr('id')).disable();
				$dislike.css({
					opacity: 0.5
				});
			}
		}
	};// @lock

	button1.click = function button1_click (event)// @startlock
	{// @endlock
		var theVar = $comp.sourcesVar.comm;
		
		if(!theVar.title || !theVar.comment){
			return;
		}
		
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
			},
			onError: function(ev){
				theSource.cancel();
				waf.ErrorManager.displayError(ev);
			}
		});
		
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_dislike", "click", dislike.click, "WAF");
	WAF.addListener(this.id + "_like", "click", like.click, "WAF");
	WAF.addListener(this.id + "_image4", "click", image4.click, "WAF");
	WAF.addListener(this.id + "_image3", "click", image3.click, "WAF");
	WAF.addListener(this.id + "_image1", "click", image1.click, "WAF");
	WAF.addListener(this.id + "_matrix1", "onChildrenDraw", matrix1.onChildrenDraw, "WAF");
	WAF.addListener(this.id + "_button1", "click", button1.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
