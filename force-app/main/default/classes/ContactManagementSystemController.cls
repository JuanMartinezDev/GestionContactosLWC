public with sharing class ContactManagementSystemController {
    
    @AuraEnabled
    public static void cContacts(List<Contact> contacts) {
        try{
            List<Contact> listcContacts = new List<Contact>();
            for (Contact c : contacts) {
                if (c.Email != null && c.Email != '') {
                    listcContacts.add(c);
                } else {
                    c.Email.addError('Email is required');
                }
            } 
            if(!listcContacts.isEmpty()){
                insert listcContacts;
            }  
        }catch(Exception e){
            throw new DMLexception(e.getMessage());
        } 
    }
    
    @AuraEnabled
    public static void uContacts(List<Contact> contacts) {
        try{
            List<Contact> listuContacts = new List<Contact>();
            for (Contact c : contacts) {
                if (c.Email != null && c.Email != '') {
                    listuContacts.add(c);
                } else {
                    c.Email.addError('Email is required');
                }
            }
            if(!listuContacts.isEmpty()){
                update listuContacts;
            }
        }catch(Exception e){
            throw new DMLexception(e.getMessage());
        }  
    }
    
    @AuraEnabled
    public static void dContacts(List<Contact> contacts) {
        try{
            delete contacts;
        }catch(Exception e){
            throw new DMLexception(e.getMessage());
        }
    }
    
    @AuraEnabled
    public static List<Contact> rContacts() {
        List<Contact> contacts = [SELECT Id, FirstName, LastName, Email, Phone 
                                  FROM Contact 
                                  WHERE Email != null];
        return contacts;
    }
}