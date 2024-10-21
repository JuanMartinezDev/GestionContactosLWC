import { LightningElement} from 'lwc';
import LightningConfirm from 'lightning/confirm';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getContacts from '@salesforce/apex/ContactManagementSystemController.rContacts';
import addContacts from '@salesforce/apex/ContactManagementSystemController.cContacts';
import editContacts from '@salesforce/apex/ContactManagementSystemController.uContacts';
import deleteContacts from '@salesforce/apex/ContactManagementSystemController.dContacts';

export default class GestionContactos extends LightningElement {

    modalContainer = false;
    modalInfo = {};
    tituloModal;
    data = [];
    filterData = [];
    contactValue = [];
    columns = columns;
    contactId;
    contactFirstName;
    contactLastName;
    contactEmail;
    contactPhone;
    clicButton = false;
    action = '';
    contact = [];

    renderedCallback() {
        if (this.isRendered) {
            return;
        }
        this.isRendered = true;
        getContacts()
            .then(result => {
                this.data = result;
                this.filterData = result;
            })
            .catch(error => {
                console.error('Error obteniendo los contactos');
            });
    }

    filtrarContactName(event) {
        this.filterData = this.data;
        this.filterData = this.filterData.filter(r => r.FirstName.toLowerCase().includes(event.target.value.toLowerCase()));
    }

    reloadComponent() {
        this.isRendered = false;
        this.renderedCallback();
    }

    closeModalAction() {
        this.modalContainer = false;
    }

    async handleAction(event) {
        const action = event.detail.action;
        const row = event.detail.row;
        switch (action.name) {
            case 'deleteContact':
                if (await this.showModalMessage('Estas seguro de eliminar este contacto?')) {
                    this.deleteContact(row);
                }
                break;
            case 'editContact':
                this.editContact(row);
                break;
        }
    }

    async addContact() {
        this.modalInfo = {
            label: 'Guardar',
            title: 'Crear Contacto'
        };
        this.modalContainer = true;
        this.action = 'addContact';
    }

    deleteContact(row) {
        this.contact[0] = {
            Id: row.Id
        };

        deleteContacts({
                contacts: this.contact
            })
            .then(result => {
                this.showInfoToast('Se ha eliminando el contacto');
            })
            .catch(error => {
                this.showInfoToastError(`Error eliminando el contacto: ${error.body.message}`);
            });
    }

    editContact(row) {
        this.modalInfo = {
            label: 'Modificar',
            title: 'Modificar Contacto'
        };
        this.modalContainer = true;
        this.contactValue = row;
        this.action = 'editContact';
    }

    handleFNChange(event) {
        this.contactFirstName = event.target.value;
    }

    handleLNChange(event) {
        this.contactLastName = event.target.value;
    }

    handleEChange(event) {
        this.contactEmail = event.target.value;
    }

    handlePChange(event) {
        this.contactPhone = event.target.value;
    }

    async onClicButton() {
        this.contact[0] = {
            FirstName: this.contactFirstName == undefined ? this.contactValue.FirstName : this.contactFirstName,
            LastName: this.contactLastName == undefined ? this.contactValue.LastName : this.contactLastName,
            Email: this.contactEmail == undefined ? this.contactValue.Email : this.contactEmail,
            Phone: this.contactPhone == undefined ? this.contactValue.Phone : this.contactPhone
        }

        if ((this.contact[0].Email != '' || this.contact[0].Email != undefined) && this.validarCorreoElectronico(this.contact[0].Email)) {
            this.closeModalAction();
            if (this.action == 'addContact') {
                addContacts({
                        contacts: this.contact
                    })
                    .then(result => {
                        this.showInfoToast('Se ha insertado el contacto');
                    })
                    .catch(error => {
                        this.showInfoToastError(`Error insertando el contacto: ${error.body.message}`);
                    });
            }
            if (this.action == 'editContact') {
                this.contact[0] = {
                    Id: this.contactValue.Id,
                    FirstName: this.contactFirstName == undefined ? this.contactValue.FirstName : this.contactFirstName,
                    LastName: this.contactLastName == undefined ? this.contactValue.LastName : this.contactLastName,
                    Email: this.contactEmail == undefined ? this.contactValue.Email : this.contactEmail,
                    Phone: this.contactPhone == undefined ? this.contactValue.Phone : this.contactPhone
                };

                editContacts({
                        contacts: this.contact
                    })
                    .then(result => {
                        this.showInfoToast('Se ha modificado el contacto');
                    })
                    .catch(error => {
                        this.showInfoToastError(`Error actualizando el contacto: ${error.body.message}`);
                    });
            }
        } else {
            this.showInfoToastError('Email, es obligatorio.');
        }
    }

    async showModalMessage(msg) {
        this.modalOpen = true;
        const result = await LightningConfirm.open({
            message: `${msg}`,
            variant: 'header',
            theme: 'shade',
            label: 'Confirmar'
        });
        if (result) {
            this.modalOpen = false;
            return true;
        } else {
            this.modalOpen = false;
        }
    }

    showInfoToast(msg) {
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Éxito',
                message: msg,
                variant: 'success'
            })
        );
    }

    showInfoToastError(msg) {
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Error',
                message: msg,
                variant: 'error'
            })
        );
    }

    validarCorreoElectronico(correo) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(correo);
    }
}

const actions = [
    { label: 'Editar', name: 'editContact' },
    { label: 'Eliminar', name: 'deleteContact' }
];

const columns = [
    { label: 'Nombres', fieldName: 'FirstName', type: 'text' },
    { label: 'Apellidos', fieldName: 'LastName', type: 'text' },
    { label: 'Correo electronico', fieldName: 'Email', type: 'email' },
    { label: 'Celular', fieldName: 'Phone', type: 'phone' },
    { type: 'action', typeAttributes: { rowActions: actions, menuAlignment: 'auto' }}
];



