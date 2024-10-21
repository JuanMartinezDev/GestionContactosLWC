# Salesforce DX Project: Gestion de Contactos

El objetivo de este Readme es explicar la funcionalidad expuesta para el componente personalizado c/gestionContactos.

## Gestion de contactos

Es un componente LWC que se se conecta con la clase APEX 'ContactManagementSystemController' la cual expone toda la funcionalidad básica para la creación, modificación, eliminación y visualización de contactos de una organización de salesforce.

## Funcionalidad
### Visual principal

![Visual principal](imgReadme/image.png)
### Crear Contacto

Clic en "Nuevo Contacto"
![Crear Contacto](imgReadme/image-1.png)

Diligenciar el formulario de manera correcta y clic en "Guardar"
![alt text](imgReadme/image-2.png)

Se habrá creado el contacto.
![alt text](imgReadme/image-3.png)

Clic en refrescar para ver el nuevo contacto.
![alt text](imgReadme/image-4.png)
![alt text](imgReadme/image-5.png)

### Funcionalidad de buscar contacto

Clic en Buscar contacto y escriba el nombre del contacto ejemplo 'Ricardo'.
Automaticamente la data-table se filtrará. Si quiere ver de nuevo todos los datos borré el nombre.

![alt text](imgReadme/image-6.png)

### Editar un contacto

Para editar un contacto deberá seleccionar el registro de la tabla que quiere editar lo puede buscar más rápido usando el filtro, una vez indentificado el contacto clic en la opción desplegable y clic en "Editar".

![alt text](imgReadme/image-7.png)
![alt text](imgReadme/image-8.png)

Se abrirá un modal de edición con los valores del registro seleccionado, edite los campos que requiera y clic en "Modificar".
![alt text](imgReadme/image-9.png)

El contacto se modifico correctamente
![alt text](imgReadme/image-10.png)

Verificamos la modificación refrescando la tabla.
![alt text](imgReadme/image-11.png)
![alt text](imgReadme/image-12.png)

### Eliminar un contacto

Para eliminar un contacto deberá seleccionar el registro de la tabla que quiere editar lo puede buscar más rápido usando el filtro, una vez indentificado el contacto clic en la opción desplegable y clic en "Eliminar".
![alt text](imgReadme/image-7.png)
![alt text](imgReadme/image-13.png)

Se abrirá un confirm, deberá aceptar si esta seguro de eliminar el contacto.
![alt text](imgReadme/image-14.png)

El contacto se ha eliminado
![alt text](imgReadme/image-15.png)

Verifiquemos que el contacto ya no existe refrescando la tabla.
![alt text](imgReadme/image-16.png)
![alt text](imgReadme/image-17.png)

## Refactorización

Se hace uso de la lógica APEX entregada, dónde se agrega el manejo de errores Try Catch, se cambia la lógica para optimizar recursos, eso incluye el cambio de transacciones DML fuera de ciclos For, ya que esto es una mala práctica porque puede incurrir en los limites de la organización.

![alt text](imgReadme/image-18.png)

Se optimiza la consulta SOQL para que filtre los contactos sin Email de esa manera nos ahorramos un for que recorra y separe los contactos sin Email.
![alt text](imgReadme/image-19.png)

Se anexa un análisis previo de los puntos de mejora de la lógica inicial (Disculpen la imagen).
![alt text](imgReadme/Sin título.png)

De igual manera se crea la clase test 'ContactManagementSystemControllerTest' gestionando toda la cobertura de la solución.

![alt text](imgReadme/image-20.png)
![alt text](imgReadme/image-21.png)

## Instalación Paquete

Para realizar la instalación de este recurso se realizó la creación de un paquete.
![alt text](imgReadme/image-23.png)

Realice la instalación mediante el siguiente link:

 https://login.salesforce.com/packaging/installPackage.apexp?p0=04tHu000003X5aM

Ingrese al link, e inicie sesion en la organizacion que desea instalar el paquete:

![alt text](imgReadme/image-22.png)

Aparecera la siguiente ruta de instalación, seleccione las opciones de la imagen y clic en "instalar".

![alt text](imgReadme/image-24.png)
![alt text](imgReadme/image-25.png)

Se habrá instalado correctamente, clic en "Listo".
![alt text](imgReadme/image-26.png)

Podrá verificar la correcta instalación del paquete en configuración > paquetes instalados:

![alt text](imgReadme/image-27.png)

### Agregar LWC a página lightning
Para poder probar la funcionalidad del componente dirijase a la página de registros de contactos de la organización por ejemplo y seleccione un contacto.

Una vez en está vista clic en configuración, modificar página.
![alt text](imgReadme/image-28.png)
![alt text](imgReadme/image-29.png)

En personalizado verá el componente LWC:
![alt text](imgReadme/image-30.png)

Arrastrelo a cualquier parte de la página:
![alt text](imgReadme/image-31.png)

Clic en "Guardar" y active la página:

![alt text](imgReadme/image-33.png)
![alt text](imgReadme/image-34.png)

Clic en Asignar como predeterminada y siga los pasos:
![alt text](imgReadme/image-35.png)
![alt text](imgReadme/image-36.png)
![alt text](imgReadme/image-37.png)

Ya se activo:

![alt text](imgReadme/image-38.png)

Clic atrás
![alt text](imgReadme/image-39.png)

Listo estará instalado el componente de manera funcional.

![alt text](imgReadme/image-40.png)

## Instalación CLI 

De igual manera puede realizar la instalación mediante Salesforce CLI autorizando la organizacion a la cual quiere realizar el despliegue de los componentes que los encontrará en la siguiente ruta:

force-app\main\default:
classes\ContactManagementSystemController.cls
classes\ContactManagementSystemControllerTest.cls
lwc\gestionContactos

![alt text](imgReadme/image-41.png)
![alt text](imgReadme/image-42.png)

Una vez desplegados todos los componentes deberá realizar el mismo paso de agregar el LWC a una página lightning especificado en el punto de instalación paquete "Agregar LWC a página lightning".

## Salesforce DX Project: Next Steps
Now that you’ve created a Salesforce DX project, what’s next? Here are some documentation resources to get you started.

### How Do You Plan to Deploy Your Changes?

Do you want to deploy a set of changes, or create a self-contained application? Choose a [development model](https://developer.salesforce.com/tools/vscode/en/user-guide/development-models).

### Configure Your Salesforce DX Project

The `sfdx-project.json` file contains useful configuration information for your project. See [Salesforce DX Project Configuration](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_ws_config.htm) in the _Salesforce DX Developer Guide_ for details about this file.

### Read All About It

- [Salesforce Extensions Documentation](https://developer.salesforce.com/tools/vscode/)
- [Salesforce CLI Setup Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_intro.htm)
- [Salesforce DX Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_intro.htm)
- [Salesforce CLI Command Reference](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/cli_reference.htm)



