({
	getAccounts : function(component) {
		
        let action = component.get("c.getAccounts");
        action.setParams({
            accName : ""
        });
        
        action.setCallback(this, $A.getCallback(function(response){
            
            let state = response.getState();
            
            if(state === "SUCCESS"){
				//console.log(response.getReturnValue());
                component.set("v.data", response.getReturnValue());
                component.set("v.allData", response.getReturnValue());
            }
            
        }));
        $A.enqueueAction(action);
	},
    
    getTypePicklist: function(component, event) {
        var typeVar = component.get("c.getPickListType");
       
        typeVar.setCallback(this, function(response) {
            var type = response.getState();
            if(type === 'SUCCESS'){
                var typeList = response.getReturnValue();
                component.set("v.typeVal", typeList);
            }
        })
       $A.enqueueAction(typeVar);
    },
    
    getIndustryPicklist: function(component, event) {
        var industryVar = component.get("c.getPickListIndustry");
       
        industryVar.setCallback(this, function(response) {
            
            var industry = response.getState();
            if(industry === 'SUCCESS'){
                var industryList = response.getReturnValue();
                component.set("v.industryVal", industryList);
            }
        })
       $A.enqueueAction(industryVar);
    },
    
    saveItms : function(component){
 		
        var action = component.get("c.createDataAcc");
        action.setParams({'Acc':component.get('v.accountObj')});
        action.setCallback(this,function(response){  
            let state = response.getState();
            if(state === "SUCCESS"){
                component.set('v.accountId',data.getReturnValue());
            }
        });
        $A.enqueueAction(action);
        
		component.set("v.isOpen", false);
        this.showToast("Success!","success","You Have added on Account record in draft");
        this.reloadDataTable();
         
    },
    
    reloadDataTable : function(){
        var refreshEvent = $A.get("e.force:refreshView");
        if(refreshEvent){
            refreshEvent.fire();
        }
    },
    
    deleteRecord : function(component, event) {
        var accountRec = event.getParam('row');        
        var action = component.get("c.delAccount");
        var rows = component.get('v.data');
        action.setParams({
            "accountRec": accountRec
        });
        action.setCallback(this, function(response) {
            	component.set('v.data', rows);
        });
        $A.enqueueAction(action);
        this.showToast("Success!","success","You have successfuly remove '" + accountRec.Name + "' in Account Record Draft");
        this.reloadDataTable();
    },
    
    showToast:function(title,type,message){
        var toastEvent = $A.get("e.force:showToast");
        if(toastEvent){
            toastEvent.setParams({"title": title,"type": type,"message": message,duration: "4000"}).fire();
        }
    },
    
    checkActive : function(component) {

        let action = component.get("c.checkActive");
        action.setParams({
            isActive : ""
        });
        
        action.setCallback(this, $A.getCallback(function(response){
            
            let state = response.getState();
 			let button = component.find('saveAll');
            
            if(state === "SUCCESS"){
                
                var result = response.getReturnValue();
                
                if(result.length > 0) {
                    button.set('v.disabled',false);
                } else {
                    button.set('v.disabled',true);
                }

                
            }
        }));
        $A.enqueueAction(action);

    },
    
    getAccStatus : function (component, event){
        let action = component.get("c.getAcctStatus");
        action.setParams({
            getStatus : ""
        });
        
        action.setCallback(this, $A.getCallback(function(response){
            
            let state = response.getState();
            var result = response.getReturnValue();
            console.log(result.length);
            
            if(state === "SUCCESS"){
                component.set("v.data", response.getReturnValue());
            }
           
        }));
        $A.enqueueAction(action);
        let button = component.find('saveAll');
        button.set('v.disabled',true);
        this.showToast("Success!","success","You have created record");
    }
    
})