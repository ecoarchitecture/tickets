/**
 *
 */
var site = siteService.getSite('recursos-humanos-site').node.childByNamePath('documentLibrary');



/**
 *
 * @param ticketEquipment
 * @param ticketModule
 * @param ticketFolio
 * @param ticketDescription
 * @param ticketDetail
 * @param ticketUserName
 * @param ticketUserFirstName
 * @param ticketUserLastName
 * @param ticketNode
 * @param ticketTechnician
 * @param ticketAnalysis
 * @param ticketActions
 * @returns
 */
function createContentFileTicket( ticketNode, puesto){
	logger.debug('Crear documento de ticket ...');
	var template = site.childByNamePath('Configuracion/Plantillas/GP-RH-1.fodt');
	var workingFolder = site.childByNamePath('Solicitudes/EnProceso');
	// Template Values
	var values = new Array();
	values['puesto'] = puesto;
//	values['ticketModule'] = ticketModule;
//	values['ticketFolio'] = ticketFolio;
//	values['ticketDescription'] = ticketDescription;
//	values['ticketDetail'] = ticketDetail;
//	values['ticketUser'] = ticketUserFirstName+" "+ticketUserLastName;
//	values['ticketTechnician'] = ticketTechnician;
//	values['ticketAnalysis'] = ticketAnalysis;
//	values['ticketActions'] = ticketActions;
	var content = ticketNode.processTemplate(template, values);
	return content;
}


/**
 * Creación del tipo documentla de GP Tickect Support.
 * Retorna el Folio generado para el ticket.
 * @param ticketEquipment
 * @param ticketModule
 * @param ticketDescription
 * @param ticketDetail
 * @param ticketUserName
 * @param ticketUserFirstName
 * @param ticketUserLastName
 * @param ticketUserEmail
 * @param ticketUserTelephone
 * @param ticketUserMobile
 * @param ticketPriority
 * @returns
 */

function crearSolicitudRequisicion(puesto){



	var workingFolder = site.childByNamePath('Solicitudes/EnProceso');
	var folio = getNewFolio();

	var unitCost = "RH";
	

	var nameTicket = 'GP-' +unitCost+ '-' + folio;
	var nameTicketPdf = nameTicket + '.odt';

//	var descPriority = setPriority(ticketPriority);
	
	var ticketOdt = workingFolder.createFile(nameTicketPdf);

	logger.debug(" Solicitud creado : " + nameTicket);
	
	ticketOdt.name =nameTicket;
//	ticketOdt.specializeType('gp:typeSupportTicket');
//	ticketOdt.properties['gp:ticketEquipment']			= ticketEquipment;
//	ticketOdt.properties['gp:ticketModule']				= ticketModule;
//	ticketOdt.properties['gp:ticketFolio']				= nameTicket;
//	ticketOdt.properties['cm:title']					= ticketDescription;
//	ticketOdt.properties['cm:description']				= ticketDetail;
//	ticketOdt.properties['gp:ticketUserName']			= ticketUserName;
//	ticketOdt.properties['gp:ticketUserFirstName']		= ticketUserFirstName;
//	ticketOdt.properties['gp:ticketUserLastName']		= ticketUserLastName;
//	ticketOdt.properties['gp:ticketUserEmail']			= ticketUserEmail;
//	ticketOdt.properties['gp:ticketUserTelephone']		= ticketUserTelephone;
//	ticketOdt.properties['gp:ticketUserMobile']			= ticketUserMobile;
//	ticketOdt.properties['gp:ticketPriority']			= descPriority;
//	ticketOdt.properties['gp:ticketUnitCost']			= ticketUnitCost;
//	ticketOdt.properties['gp:ticketStatus']				= "CREADO";
//	ticketOdt.properties['gp:ticketServiceRating']		= "Pendiente";




	var content = createContentFileTicket( ticketOdt,puesto );
	ticketOdt.content = content;
	ticketOdt.save();
	//ticketOdt.transformDocument('application/pdf');

	//var ticketPDF = workingFolder.childByNamePath(nameTicketPdf);
	bpm_package.addNode(ticketOdt);
	//ticketOdt.remove();
	return nameTicket;

}



function setPriority(bpm_workflowPriority){

	var descPriority = 'NA';
	if(typeof bpm_workflowPriority != 'undefined'){

		switch(bpm_workflowPriority) {
	    case 1:
	    	descPriority =  'Alta';
	        break;
	    case 2:
	    	descPriority =  'Mediana';
	        break;
	    case 3:
	    	descPriority =  'Baja';
	        break;
	    default:
	    	descPriority = 'Mediana'
		}

	}
	return descPriority;
}



function getNewFolio()
{
  var now = new Date();
  var folio = utils.pad(now.getFullYear(), 4) + '' +
    utils.pad((now.getMonth() + 1), 2) + '' +
    utils.pad(now.getDate(), 2) + '-' +
    utils.pad(now.getHours(), 2) + '' +
    utils.pad(now.getMinutes(), 2) + '' +
    utils.pad(now.getSeconds(), 2) + '' +
    utils.pad(now.getMilliseconds(), 3);

  return folio;
}



/**
 * Envio de correo de notificación
 * @param wfPackage
 * @param wfTitle
 * @param wfText
 * @param wfFolio
 * @param wfPuesto
 * @param email
 * @param subject
 */
function sendMailToEndUser(wfPackage, wfTitle, wfText, wfFolio, wfPuesto, email, subject)
{
	logger.debug('email '+email);
	logger.debug('wfFolio '+wfFolio);
  
	var wfId = null;
  //wfPackage.properties['bpm:workflowInstanceId'];

	var template = site.childByNamePath('Configuracion/Plantillas/wf-email-ftl.htm');
	logger.debug('template end user '+template);

	var wfMail = new Object();
	wfMail.args = new Object();

	wfMail.args.workflowTasks = true;
  wfMail.args.workflowPooled = true;
  wfMail.args.workflowTitle = wfPuesto;
  wfMail.args.workflowDescription = 'Solicitud de requisición de personal';
  wfMail.args.workflowDueDate = new Date();

  wfMail.args.workflowDocuments = wfPackage.children;

	if (email != null || email != ''){

		try
		{
			logger.debug('Enviando correo a end user: ' + email);

			var mail = actions.create('mail');

			mail.parameters.to = email;
			mail.parameters.subject = subject;
			//mail.parameters.text = text;
			mail.parameters.template = template;
			mail.parameters.template_model = wfMail;

			mail.execute(wfPackage);

			logger.debug('Correo enviado end user!');
		}
		catch (exception)
		{
			logger.debug(exception);
		}
	}
}




/**
 * 
 */
function sendMailToRecursosHumanos(wfPackage, wfTitle, wfText, wfFolio, wfPuesto, email, subject)
{
	logger.debug('email '+email);
	logger.debug('wfFolio '+wfFolio);
  
	var wfId = null;
  //wfPackage.properties['bpm:workflowInstanceId'];

	var template = site.childByNamePath('Configuracion/Plantillas/wf-email-ftl.htm');
	logger.debug('template end user '+template);

	var wfMail = new Object();
	wfMail.args = new Object();

	wfMail.args.workflowTasks = true;
  wfMail.args.workflowPooled = false;
  wfMail.args.workflowTitle = wfPuesto;
  wfMail.args.workflowDescription = 'Solicitud de requisición de personal';
  wfMail.args.workflowDueDate = new Date();

  wfMail.args.workflowDocuments = wfPackage.children;

	if (email != null || email != ''){

		try
		{
			logger.debug('Enviando correo a end user: ' + email);

			var mail = actions.create('mail');

			mail.parameters.to = email;
			mail.parameters.subject = subject;
			//mail.parameters.text = text;
			mail.parameters.template = template;
			mail.parameters.template_model = wfMail;

			mail.execute(wfPackage);

			logger.debug('Correo enviado end user!');
		}
		catch (exception)
		{
			logger.debug(exception);
		}
	}
}