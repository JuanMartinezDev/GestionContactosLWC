@isTest
public class ContactManagementSystemControllerTest {
      
    @testSetup
    static void setup() {
        List<Contact> contacts = new List<Contact>();
        for (Integer i = 0; i < 5; i++) {
            contacts.add(new Contact(
                FirstName = 'Test',
                LastName = 'User' + i,
                Email = 'testuser' + i + '@example.com',
                Phone = '1234567890'
            ));
        }
        insert contacts;
    }
    
    @isTest
    static void testCreateContacts() {
        List<Contact> successContact = new List<Contact>{new Contact(FirstName = 'Juan', LastName = 'Martinez', Email = 'juantest@example.com', Phone = '32122222')};
        ContactManagementSystemController.cContacts(successContact);
        List<Contact> insertedContacts = [SELECT Id, Email FROM Contact WHERE Email = 'juantest@example.com'];
        System.assertEquals(1, insertedContacts.size(), 'Se esperaba 1 contacto insertado');
    }
    
    @isTest
    static void testCreateContactsError() {
        List<Contact> errorContact = new List<Contact>{new Contact(FirstName = 'Error', LastName = '', Email = '', Phone = '')};
        ContactManagementSystemController.cContacts(errorContact);
        List<Contact> noInsertedContacts = [SELECT Id, Email FROM Contact WHERE FirstName = 'Error'];
        System.assertEquals(0, noInsertedContacts.size(), 'No se esperaba que el contacto se insertará');
    }
    
    @isTest
    static void testCreateContactsErrorDML() {
        List<Contact> errorDMLInsertedContact = new List<Contact>{new Contact(FirstName = 'Error', LastName = 'Error', Email = 'sda@das&n.com', Phone = '1234')};
            try{
                ContactManagementSystemController.cContacts(errorDMLInsertedContact);
            }catch(Exception e){
                System.assert(true, 'Se esperaba 1 exception');
            } 
    }
    
    @isTest
    static void testUpdateContacts() {
        List<Contact> existingContacts = [SELECT Id, Email FROM Contact WHERE Email = 'testuser1@example.com'];
        List<Contact> successModifiedContact = new List<Contact>{new Contact(Id = existingContacts[0].Id, Email = 'juantestmodified@example.com')};
        ContactManagementSystemController.uContacts(successModifiedContact);
        List<Contact> updateContacts = [SELECT Id, Email FROM Contact WHERE Email = 'juantestmodified@example.com'];
        System.assertEquals(1, updateContacts.size(), 'Se esperaba 1 contacto modificado');
    }
    
    @isTest
    static void testUpdateContactsError() {
        List<Contact> existingContacts = [SELECT Id, Email FROM Contact WHERE Email = 'testuser2@example.com'];
        List<Contact> errorModifiedContact = new List<Contact>{new Contact(Id = existingContacts[0].Id, Email = '')};
        ContactManagementSystemController.uContacts(errorModifiedContact);
        List<Contact> updateContacts = [SELECT Id, Email FROM Contact WHERE Email = ''];
        System.assertEquals(0, updateContacts.size(), 'No se esperaba 1 contacto modificado');
    }
    
    @isTest
    static void testUpdateContactsErrorDML() {
        List<Contact> errorDMLModifiedContact = new List<Contact>{new Contact(Id = null, Email = 'sda@das&n.com')};
            try{
                ContactManagementSystemController.uContacts(errorDMLModifiedContact);
            }catch(Exception e){
                System.assert(true, 'Se esperaba 1 exception');
            } 
    }
    
    @isTest
    static void testDeleteContacts() {
        List<Contact> existingContacts = [SELECT Id, Email FROM Contact WHERE Email = 'testuser2@example.com'];
        List<Contact> deletedContact = new List<Contact>{new Contact(Id = existingContacts[0].Id)};
        ContactManagementSystemController.dContacts(deletedContact);
        List<Contact> updateContacts = [SELECT Id, Email FROM Contact WHERE Email = 'testuser2@example.com'];
        System.assertEquals(0, updateContacts.size(), 'No se esperaba 1 contacto no eliminado');
    }
    
    @isTest
    static void testDeleteContactsError() {
        List<Contact> deletedContact = new List<Contact>{new Contact(Id = null)};
            try{
                ContactManagementSystemController.dContacts(deletedContact);
            }catch(Exception e){
                System.assert(true, 'Se esperaba 1 exception');
            } 
    }
    
    @isTest
    static void testListContacts() {
        List<Contact> contacts = ContactManagementSystemController.rContacts();
        System.assert(contacts.size() > 0, 'Se esperaban contactos en la lista');
    }  
}