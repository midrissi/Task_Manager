var formatter = require("formatting"),
	groups = {
		admin: 'administrator',
		simple: 'loggedIn'
	};

guidedModel =// @startlock
{
	Comment :
	{
		user_name :
		{
			onGet:function()
			{// @endlock
				return this.getUserName();
			}// @startlock
		},
		entityMethods :
		{// @endlock
			getUserName:function()
			{// @lock
				if(!this.user){
					this.refresh();
				}
				
				if(this.user){
					return this.user.fullname;
				}
			}// @startlock
		},
		editable :
		{
			onGet:function()
			{// @endlock
				var curSession = currentSession();
					
				if(curSession.belongsTo(groups.admin)){
					return true;
				}
				
				var user = ds.User(sessionStorage.ID);
				
				if(this.user && user){
					return this.user.getKey() === user.getKey();
				}
				
				return false;
			}// @startlock
		},
		events :
		{
			onInit:function()
			{// @endlock
				var curSession = currentSession(),
					user = ds.User(sessionStorage.ID);
					
				this.user = user;
			},// @startlock
			onValidate:function()
			{// @endlock
				var curSession = currentSession(),
					user = ds.User(sessionStorage.ID);
				
				if(!this.isNew() && !curSession.belongsTo(groups.admin) && (!this.user || user.getKey() !== this.user.getKey())){
					return {error: 4, errorMessage: 'You are not allowed to modify this comment!'};
				}
				
				this.date = new Date();
			}// @startlock
		}
	},
	Task :
	{
		user_name :
		{
			onGet:function()
			{// @endlock
				return this.getUserName();
			}// @startlock
		},
		entityMethods :
		{// @endlock
			getUserName:function()
			{// @lock
				if(!this.user){
					this.refresh();
				}
				
				if(this.user){
					return this.user.fullname;
				}
			}// @startlock
		},
		editable :
		{
			onGet:function()
			{// @endlock
				var curSession = currentSession();
					
				if(curSession.belongsTo(groups.admin)){
					return true;
				}
				
				var user = ds.User(sessionStorage.ID);
				
				if(this.user && user){
					return this.user.getKey() === user.getKey();
				}
				
				return false;
			}// @startlock
		},
		finished :
		{
			onSet:function(value)
			{// @endlock
				if(value){
					this.done = 100;
				}
			},// @startlock
			onGet:function()
			{// @endlock
				return this.done >= 100;
			}// @startlock
		},
		events :
		{
			onValidate:function()
			{// @endlock
				var curSession = currentSession();
				
				if(!curSession.belongsTo(groups.admin) && sessionStorage.ID !== this.user.getKey()){
					return {error: 2, errorMessage: 'You are not allowed to modify this task!'};
				}
			},// @startlock
			onRestrictingQuery:function()
			{// @endlock
				var curSession = currentSession();
				
				if(curSession.belongsTo(groups.admin)){
					return this.all();
				}
				
				return this.query('public == :1', true);
			},// @startlock
			onRemove:function()
			{// @endlock
				var curSession = currentSession();
				
				if(!curSession.belongsTo(groups.admin)){
					var user = ds.User(sessionStorage.ID);
					
					if(user && this.user && this.user.getKey() === user.getKey()){
						var token = curSession.promoteWith(groups.admin);
						
						this['public'] = false;
						this.save();
						
						curSession.unPromote(token);
						
						return {error: 1, errorMessage: 'The task was removed!'};
					}
					else{
						return {error: 5, errorMessage: 'You are not allowed to remove this task!'};
					}
				}
			},// @startlock
			onSave:function()
			{// @endlock
				this.lastModification = new Date();
			},// @startlock
			onInit:function()
			{// @endlock
				this.creationDate = new Date();
				this.user = sessionStorage.ID;
				this['public'] = true;
			}// @startlock
		}
	},
	User :
	{
		entityMethods :
		{// @endlock
			passwordIsValid:function(password, isAKey)
			{// @lock
				return isAKey === true? this.key === password: this.key === directory.computeHA1(this.getKey(), password);
			}// @startlock
		},
		events :
		{
			onRestrictingQuery:function()
			{// @endlock
				var curSession = currentSession();
				
				if(curSession.belongsTo(groups.admin)){
					return this.all();
				}
				
				if(curSession.belongsTo(groups.simple) && sessionStorage.ID){
					return this.query('ID == :1', sessionStorage.ID);
				}
				
				return this.createEntityCollection();
			},// @startlock
			onValidate:function()
			{// @endlock
				var curSession = currentSession();
				
				if(!this.isNew() && !curSession.belongsTo(groups.admin) && sessionStorage.ID !== this.getKey()){
					return {error: 3, errorMessage: 'You are not allowed to modify this user!'};
				}
				
				if(!curSession.belongsTo(groups.admin)){
					this.group = 'loggedIn';
				}
				
				if(this.firstname){
					this.firstname = formatter.formatString(this.firstname, "c");
				}
				
				if(this.lastname){
					this.lastname = formatter.formatString(this.lastname, "U");
				}
			},// @startlock
			onRemove:function()
			{// @endlock
				this.tasks.remove();
			}// @startlock
		},
		fullname :
		{
			onGet:function()
			{// @endlock
				return formatter.formatString(this.firstname, "c") + " " + formatter.formatString(this.lastname, "U");
			}// @startlock
		},
		password :
		{
			onSet:function(value)
			{// @endlock
				this.key = directory.computeHA1(this.getKey(), value);
			},// @startlock
			onGet:function()
			{// @endlock
				return '***********';
			}// @startlock
		}
	}
};// @endlock
