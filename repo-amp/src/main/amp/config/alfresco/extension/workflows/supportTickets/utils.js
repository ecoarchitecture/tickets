/**
 *
 */
var site = siteService.getSite('support-tickets-site').node.childByNamePath('documentLibrary');

function log(msg)
{
  logger.debug('Workflow SupportTickets- ' + msg);
  logger.error('Workflow SupportTickets- ' + msg);
}

function getNewFolio()
{
  var now = new Date();
  var folio = utils.pad(now.getFullYear(), 4) + '' +
    utils.pad((now.getMonth() + 1), 2) + '' +
    utils.pad(now.getDate(), 2) + '' +
    utils.pad(now.getHours(), 2) + '' +
    utils.pad(now.getMinutes(), 2) + '' +
    utils.pad(now.getSeconds(), 2) + '' +
    utils.pad(now.getMilliseconds(), 3);

  return folio;
}

function getTicketFolderName()
{
  var now = new Date();
  var folderName = utils.pad(now.getFullYear(), 4) + '' +
    utils.pad((now.getMonth() + 1), 2) + '' +
    utils.pad(now.getDate(), 2);

  return folderName;
}

function checkStoreFolder(folio)
{
	logger.error('folio '+folio);
	//	2015 11 02 --164815258
	var year = folio.substring(0,4);
	var month = folio.substring(4,6);
	var day = folio.substring(6,8);
	var folderName = year+''+month+''+day;

	logger.error('folio substring');
	logger.error(folderName);

	var procesadosFolder = site.childByNamePath('Tickets/Procesados/'+year+'/'+month+'/'+day);

	if (procesadosFolder != null){
		log('Folder existe '+procesadosFolder);

		return procesadosFolder;

	}else{
		log('Folder NO existe, procediendo a crearlo');

		var theFolder = site.childByNamePath('Tickets/Procesados/'+year);

		if (theFolder == null){
			log('folder de año no existe '+year);
			site.childByNamePath('Tickets/Procesados/').createFolder(''+year);
			log('creado folder de año '+year);
		}

		theFolder = site.childByNamePath('Tickets/Procesados/'+year+'/'+month);
		if (theFolder == null){
			log('folder de mes no existe '+month);
			site.childByNamePath('Tickets/Procesados/'+year+'/').createFolder(''+month);
			log('creado folder de mes '+month);
		}

		theFolder = site.childByNamePath('Tickets/Procesados/'+year+'/'+month+'/'+day);
		if (theFolder == null){
			log('folder de dia no existe '+day);
			site.childByNamePath('Tickets/Procesados/'+year+'/'+month+'/').createFolder(''+day);
			log('creado folder de dia '+day);
		}

		procesadosFolder = site.childByNamePath('Tickets/Procesados/' + year+'/'+month+'/'+day);
		log('se ha creado el folder para procesados '+year+'/'+month+'/'+day);

		return procesadosFolder;
	}

}

function createPDFTicketFromTemplate(folio, ticketEquipment, ticketModule, ticketDescription, ticketDetail, ticketUserFirstName, ticketUserLastName, ticketTechnician, ticketAnalysis, ticketActions){

	//	Alfresco Node References
	var template = site.childByNamePath('Configuracion/Plantillas/FormatoFallas.fodt');
	var workingFolder = site.childByNamePath('Tickets/Current');
	//var tempFolder = site.childByNamePath('Tickets/Temp');

	//	Variables
	var nameTicket = 'Ticket-' + folio;
	var nameTicketPdf = nameTicket + '.pdf';


	//	New Ticket File
	var ticketOdt = workingFolder.createFile(nameTicket + '.odt');
	log('Se creó ticket vacío :::::::::');

	// Template Values
	var values = new Array();
	values['ticketEquipment'] = ticketEquipment;
	values['ticketModule'] = ticketModule;
	values['ticketFolio'] = folio;
	values['ticketDescription'] = ticketDescription;
	values['ticketDetail'] = ticketDetail;

	values['ticketUser'] = ticketUserFirstName+" "+ticketUserLastName;

	values['ticketTechnician'] = ticketTechnician;
	values['ticketAnalysis'] = ticketAnalysis;
	values['ticketActions'] = ticketActions;

	log(values['ticketFolio']);

	//	Process Template
	var content = ticketOdt.processTemplate(template, values);
	log('Se generó el contenido');

	//	Save Content
	ticketOdt.content = content;
	ticketOdt.save();

	//	Transform to PDF
	ticketOdt.transformDocument('application/pdf');
	log('Se transformó en pdf');

	//	Get Reference to PDF just created
	ticketPDF = workingFolder.childByNamePath(nameTicketPdf);
	ticketOdt.remove();

	return ticketPDF;
}

function createTicketFile(folio, ticketEquipment, ticketModule, ticketDescription, ticketDetail, ticketUserName, ticketUserFirstName, ticketUserLastName, ticketUserEmail, ticketUserTelephone, ticketUserMobile, ticketPriority){

	//	Variables
	var nameTicket = 'Ticket-' + folio;
	var nameTicketPdf = nameTicket + '.pdf';
	log('Se obtuvo template y workingfolder');

	var ticketPDF = createPDFTicketFromTemplate(folio, ticketEquipment, ticketModule, ticketDescription, ticketDetail, ticketUserFirstName, ticketUserLastName, ' ', ' ', ' ');

	//	Specialize Type to Support Ticket
	ticketPDF.specializeType('gp:typeSupportTicket');

	ticketPDF.properties['gp:ticketEquipment']			= ticketEquipment;
	ticketPDF.properties['gp:ticketModule']				= ticketModule;
	ticketPDF.properties['gp:ticketFolio']				= folio;
	ticketPDF.properties['cm:title']					= ticketDescription;
	ticketPDF.properties['cm:description']				= ticketDetail;

	ticketPDF.properties['gp:ticketUserName']			= ticketUserName;
	ticketPDF.properties['gp:ticketUserFirstName']		= ticketUserFirstName;
	ticketPDF.properties['gp:ticketUserLastName']		= ticketUserLastName;
	ticketPDF.properties['gp:ticketUserEmail']			= ticketUserEmail;
	ticketPDF.properties['gp:ticketUserTelephone']		= ticketUserTelephone;
	ticketPDF.properties['gp:ticketUserMobile']			= ticketUserMobile;

	//ticketPDF.properties['gp:ticketTechnician']			= asdf;
	//ticketPDF.properties['gp:ticketAnalysis']			= folio;
	//ticketPDF.properties['gp:ticketActions']			= folio;
	ticketPDF.properties['gp:ticketPriority']			= ticketPriority;
	ticketPDF.properties['gp:ticketStatus']				= "CREADO";
	ticketPDF.properties['gp:ticketServiceRating']		= "Pendiente";
	//ticketPDF.properties['gp:ticketUserCloseComments']	= "";

	ticketPDF.save();

	log('Se especializo el tipo de ticketPDF a gp:typeSupportTicket');

	return ticketPDF;
}

function technicianAnalyzesProblem(theTicket, ticketEquipment, ticketModule, ticketDescription, ticketDetail, ticketUserFirstName, ticketUserLastName, ticketTechnician, ticketAnalysis, inProgress){


	log("technicianAnalyzesProblem ......")

	//	Variables
	var folio = getNewFolio();
	log('folio para temporal: '+folio);
	var ticketPDF = createPDFTicketFromTemplate(folio, ticketEquipment, ticketModule, ticketDescription, ticketDetail, ticketUserFirstName, ticketUserLastName, ticketTechnician, ticketAnalysis, ' ');
	var status = '';

	log('tempPDF '+ticketPDF);
	log('theTicket '+theTicket);
	log('inProgress '+inProgress);

	//	Set new content with extra data in the document to the original node
	theTicket.properties.content.write(ticketPDF.properties.content);
	theTicket.save();
	ticketPDF.remove();

	if (inProgress){
		status = 'EN-PROCESO';

		//theTicket.properties['gp:ticketEquipment']			= ticketEquipment;
		//theTicket.properties['gp:ticketFolio']				= folio;
		//theTicket.properties['gp:ticketDetail']				= ticketDetail;
		//theTicket.properties['gp:ticketUser']					= ticketUser;
		theTicket.properties['gp:ticketTechnician']				= ticketTechnician;
		theTicket.properties['gp:ticketAnalysis']				= ticketAnalysis;
		//theTicket.properties['gp:ticketActions']				= folio;
		//theTicket.properties['gp:ticketPriority']				= ticketPriority;
		theTicket.properties['gp:ticketStatus']					= status;
		//theTicket.properties['gp:ticketServiceRating']		= folio;
		//theTicket.properties['gp:ticketUserCloseComments']	= folio;
	}else{
		status = 'CANCELADO';

		//theTicket.properties['gp:ticketEquipment']			= ticketEquipment;
		//theTicket.properties['gp:ticketFolio']				= folio;
		//theTicket.properties['gp:ticketDetail']				= ticketDetail;
		//theTicket.properties['gp:ticketUser']					= ticketUser;
		theTicket.properties['gp:ticketTechnician']				= ticketTechnician;
		theTicket.properties['gp:ticketAnalysis']				= ticketAnalysis;
		theTicket.properties['gp:ticketActions']				= 'N/A';
		//theTicket.properties['gp:ticketPriority']				= ticketPriority;
		theTicket.properties['gp:ticketStatus']					= status;
		//theTicket.properties['gp:ticketServiceRating']			= '';
		theTicket.properties['gp:ticketUserCloseComments']		= 'N/A';
	}



	theTicket.save();

	log('Se creo nuevo contenido con technician y analisis en el documento y se actualizo ese contenido al nodo del ticket, se actualizaron las propiedades de technician, analysis y status al nodo');
}

function technicianSolvesProblem(theTicket, ticketEquipment, ticketModule, ticketDescription, ticketDetail, ticketUserFirstName, ticketUserLastName, ticketTechnician, ticketAnalysis, ticketActions){

//	Variables
	var folio = getNewFolio();
	log('folio para temporal: '+folio);
	var ticketPDF = createPDFTicketFromTemplate(folio, ticketEquipment, ticketModule, ticketDescription, ticketDetail, ticketUserFirstName, ticketUserLastName, ticketTechnician, ticketAnalysis, ticketActions);
	var status = '';

	log('tempPDF '+ticketPDF);
	log('theTicket '+theTicket);

	//	Set new content with extra data in the document to the original node
	theTicket.properties.content.write(ticketPDF.properties.content);
	theTicket.save();
	ticketPDF.remove();

	//theTicket.properties['gp:ticketEquipment']			= ticketEquipment;
	//theTicket.properties['gp:ticketFolio']				= folio;
	//theTicket.properties['gp:ticketDetail']				= ticketDetail;
	//theTicket.properties['gp:ticketUser']					= ticketUser;
	//theTicket.properties['gp:ticketTechnician']				= ticketTechnician;
	//theTicket.properties['gp:ticketAnalysis']				= ticketAnalysis;
	theTicket.properties['gp:ticketActions']				= ticketActions;
	//theTicket.properties['gp:ticketPriority']				= ticketPriority;
	theTicket.properties['gp:ticketStatus']					= "RESUELTO";
	//theTicket.properties['gp:ticketServiceRating']		= folio;
	//theTicket.properties['gp:ticketUserCloseComments']	= folio;

	theTicket.save();

	log('Se creo nuevo contenido status RESUELTO y ticketActions en el documento y se actualizo ese contenido al nodo del ticket, se actualizaron las propiedades de ticketActions y status al nodo');
}

function userClosesTicket(theTicket, ticketEquipment, ticketModule, ticketDescription, ticketDetail, ticketUserName, ticketUserFirstName, ticketUserLastName, ticketTechnician, ticketAnalysis, ticketActions, rating, comments){

//	Variables
	var folio = getNewFolio();
	log('folio para temporal: '+folio);
	var ticketPDF = createPDFTicketFromTemplate(folio, ticketEquipment, ticketModule, ticketDescription, ticketDetail, ticketUserFirstName, ticketUserLastName, ticketTechnician, ticketAnalysis, ticketActions);
	var status = '';

	log('tempPDF '+ticketPDF);
	log('theTicket '+theTicket);

	//	Set new content with extra data in the document to the original node
	theTicket.properties.content.write(ticketPDF.properties.content);
	theTicket.save();
	ticketPDF.remove();

	//theTicket.properties['gp:ticketEquipment']			= ticketEquipment;
	//theTicket.properties['gp:ticketFolio']				= folio;
	//theTicket.properties['gp:ticketDetail']				= ticketDetail;
	//theTicket.properties['gp:ticketUser']					= ticketUser;
	//theTicket.properties['gp:ticketTechnician']				= ticketTechnician;
	//theTicket.properties['gp:ticketAnalysis']				= ticketAnalysis;
	//theTicket.properties['gp:ticketActions']				= ticketActions;
	//theTicket.properties['gp:ticketPriority']				= ticketPriority;
	theTicket.properties['gp:ticketStatus']					= "CERRADO";
	theTicket.properties['gp:ticketServiceRating']			= rating;
	theTicket.properties['gp:ticketUserCloseComments']		= comments;

	theTicket.save();

	log('Se creo nuevo contenido status RESUELTO y ticketActions en el documento y se actualizo ese contenido al nodo del ticket, se actualizaron las propiedades de ticketActions y status al nodo');
}

function userClosesTicketAuto(theTicket, ticketEquipment, ticketModule, ticketDescription, ticketDetail, ticketUserName, ticketUserFirstName, ticketUserLastName, ticketTechnician, ticketAnalysis, ticketActions, rating, comments){

//	Variables
	var folio = getNewFolio();
	log('folio para temporal: '+folio);
	var ticketPDF = createPDFTicketFromTemplate(folio, ticketEquipment, ticketModule, ticketDescription, ticketDetail, ticketUserFirstName, ticketUserLastName, ticketTechnician, ticketAnalysis, ticketActions);
	var status = '';

	log('tempPDF '+ticketPDF);
	log('theTicket '+theTicket);

	//	Set new content with extra data in the document to the original node
	theTicket.properties.content.write(ticketPDF.properties.content);
	theTicket.save();
	ticketPDF.remove();

	//theTicket.properties['gp:ticketEquipment']			= ticketEquipment;
	//theTicket.properties['gp:ticketFolio']				= folio;
	//theTicket.properties['gp:ticketDetail']				= ticketDetail;
	//theTicket.properties['gp:ticketUser']					= ticketUser;
	//theTicket.properties['gp:ticketTechnician']				= ticketTechnician;
	//theTicket.properties['gp:ticketAnalysis']				= ticketAnalysis;
	//theTicket.properties['gp:ticketActions']				= ticketActions;
	//theTicket.properties['gp:ticketPriority']				= ticketPriority;
	theTicket.properties['gp:ticketStatus']					= "CERRADO-SIN-RETRO";
	theTicket.properties['gp:ticketServiceRating']			= "Excelente";
	theTicket.properties['gp:ticketUserCloseComments']		= "Cerrado automáticamente por Alfresco ya que el usuario no cerró el ticket";

	theTicket.save();

	log('Se creo nuevo contenido status RESUELTO y ticketActions en el documento y se actualizo ese contenido al nodo del ticket, se actualizaron las propiedades de ticketActions y status al nodo');
}

function setTicketTechnician(theTicket, technician){

	theTicket.properties['gp:ticketTechnician'] = technician;
	theTicket.save();
}

function setTicketAnalysis(theTicket, analysis){

	theTicket.properties['gp:ticketAnalysis'] = analysis;
	theTicket.properties['gp:ticketStatus'] = 'EN-PROCESO';
	theTicket.save();
}

function getTicketFile(folio){

	var nameTicket = 'Ticket-' + folio;
	var nameTicketPdf = nameTicket + '.pdf';

	var workingFolder = site.childByNamePath('Tickets/Current');

	var ticketPDF = workingFolder.childByNamePath(nameTicketPdf);

	return ticketPDF;

}


function setDesPriority( bpm_workflowPriority ){

	if(bpm_workflowPriority == 1 ){
		return 'Alta';
	}else if (bpm_workflowPriority == 2 ){
		return 'Media';
	}else if (bpm_workflowPriority == 3 ){
		return 'Baja';
	}

}



function sendMailToGroup(wfPackage, mailTitle, wfDescription, wfPriority, groupName, subject, text, comments)
{


log('Enviando notificación a: [' + groupName + ']');
sendMailToUser(wfPackage, true, mailTitle, wfDescription, wfPriority, groupName, subject, text, comments);


}

function sendMailToUser(wfPackage, wfPooled, mailTitle, wfDescription, wfPriority, email, subject, text, comments)
{
	//log('Propiedades:');

	//for (var i in wfPackage.properties)
		//log('  ' + i + '=' + wfPackage.properties[i]);


	var descPriority = setDesPriority(wfPriority)

	log('mailTitle '+mailTitle);
	log('wfDescription '+wfDescription);
	log('wfPriority '+descPriority);
	log('email '+email);
	log('subject '+subject);
	log('text '+text);
	log('comments '+comments);

	var wfId = null;//wfPackage.properties['bpm:workflowInstanceId'];

	log('WF ID: ' + wfId);

	var template = site.childByNamePath('Configuracion/Plantillas/wf-email-ftl.htm');
	log('template '+template);

	var wfMail = new Object();
	wfMail.args = new Object();

	wfMail.args.workflowPooled = wfPooled;
	wfMail.args.workflowTasks = true;
	//wfMail.args.workflowId = wfId;
	wfMail.args.workflowTitle = mailTitle;
	wfMail.args.workflowDescription = wfDescription;
	//wfMail.args.workflowDueDate = wfDueDate;
	wfMail.args.workflowPriority = descPriority;
	wfMail.args.mailText = text;
	wfMail.args.workflowComments = comments;
	wfMail.args.workflowDocuments = wfPackage.children;

	if (email != null || email != ''){
		try
		{
			log('Enviando correo a: ' + email);

			var mail = actions.create('mail');

			mail.parameters.to = email;
			mail.parameters.subject = subject;
			//mail.parameters.text = text;
			mail.parameters.template = template;
			mail.parameters.template_model = wfMail;

			mail.execute(wfPackage);

			log('Correo enviado!');
		}
		catch (exception)
		{
			log(exception);
		}
	}


}

function sendMailToEndUser(wfPackage, wfTitle, wfText, wfFolio, wfAnalisis, wfEquipment, wfModule, wfDesc, wfDetail, wfActions, wfPriority, wfTasks, email, subject)
{
	log('email '+email);
	log('wfFolio '+wfFolio);
	var wfId = null;//wfPackage.properties['bpm:workflowInstanceId'];

	var template = site.childByNamePath('Configuracion/Plantillas/wf-emailEndUser-ftl.htm');
	log('template end user '+template);

	var wfMail = new Object();
	wfMail.args = new Object();

	wfMail.args.workflowTitle = wfTitle;

	wfMail.args.ticketText = wfText;
	wfMail.args.ticketFolio = wfFolio;
	wfMail.args.ticketAnalysis = wfAnalisis;

	wfMail.args.ticketEquipment = wfEquipment;
	wfMail.args.ticketModule = wfModule;
	wfMail.args.ticketDescription = wfDesc;
	wfMail.args.ticketDetail = wfDetail;

	wfMail.args.workflowActions = wfActions;
	wfMail.args.workflowPriority = setDesPriority(wfPriority);
	wfMail.args.workflowTasks = wfTasks;

	wfMail.args.workflowDocuments = wfPackage.children;

	if (email != null || email != ''){

		try
		{
			log('Enviando correo a end user: ' + email);

			var mail = actions.create('mail');

			mail.parameters.to = email;
			mail.parameters.subject = subject;
			//mail.parameters.text = text;
			mail.parameters.template = template;
			mail.parameters.template_model = wfMail;

			mail.execute(wfPackage);

			log('Correo enviado end user!');
		}
		catch (exception)
		{
			log(exception);
		}
	}
}
