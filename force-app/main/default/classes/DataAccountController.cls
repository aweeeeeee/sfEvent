public class DataAccountController {
    
	@AuraEnabled
    public static List<Account> getAccounts(String accName){
        
        return [SELECT Id, Name, Phone, Industry, Type FROM Account ORDER BY Name ASC];
    }
    
    @AuraEnabled
    public static List<Account> checkActive(String isActive){
       
        return [SELECT Id, Name FROM Account WHERE ActiveStatus__c ='No'];
    }
    
    @Auraenabled
    public static string createDataAcc(Account Acc){
        insert Acc;
        return Acc.Id;
    }
    
    @AuraEnabled
    public static List<Account> getAcctStatus(String getStatus){
        List<Account> accActive = [SELECT id, name,ActiveStatus__c FROM Account WHERE ActiveStatus__c='No'];

        for(Account acc: accActive){
            acc.ActiveStatus__c = 'Yes';
        }

        update accActive;
        
        return [SELECT Id, Name, Phone, Industry, Type FROM Account ORDER BY Name ASC];
    }
    
    @AuraEnabled        
    public static List<String> getPickListType(){
        List<String> pickListValuesList = new List<String>();
        Schema.DescribeFieldResult fieldResult = Account.Type.getDescribe();
        List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();
        for( Schema.PicklistEntry pickListVal : ple){
            pickListValuesList.add(pickListVal.getLabel());
            
        }     
        return pickListValuesList;
    }
    
    @Auraenabled
    public static List<String> getPickListIndustry(){
        List<String> pickListValuesList = new List<String>();
        Schema.DescribeFieldResult fieldResult = Account.Industry.getDescribe();
        List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();
        for( Schema.PicklistEntry pickListVal : ple){
            pickListValuesList.add(pickListVal.getLabel());
        }     
        return pickListValuesList; 
    }
    
    @AuraEnabled
    public static void delAccount(Account accountRec){
        delete accountRec;
    } 
    
    
    
}