/**
 *
 */
var site = siteService.getSite('support-tickets-site').node.childByNamePath('documentLibrary');



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
function createContentFileTicket(ticketEquipment,ticketModule,ticketFolio, ticketDescription, ticketDetail , ticketUserName, ticketUserFirstName ,ticketUserLastName, ticketNode, ticketTechnician ,ticketAnalysis,ticketActions  ){
	logger.debug('Crear documento de ticket ...');
	var template = site.childByNamePath('Configuracion/Plantillas/FormatoFallas.fodt');
	var workingFolder = site.childByNamePath('Tickets/Current');
	// Template Values
	var values = new Array();
	values['ticketEquipment'] = ticketEquipment;
	values['ticketModule'] = ticketModule;
	values['ticketFolio'] = ticketFolio;
	values['ticketDescription'] = ticketDescription;
	values['ticketDetail'] = ticketDetail;
	values['ticketUser'] = ticketUserFirstName+" "+ticketUserLastName;
	values['ticketTechnician'] = ticketTechnician;
	values['ticketAnalysis'] = ticketAnalysis;
	values['ticketActions'] = ticketActions;
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

function crearTicketSoporte(ticketEquipment,ticketModule,ticketDescription,ticketDetail,ticketUserName,ticketUserFirstName,ticketUserLastName,ticketUserEmail,ticketUserTelephone,ticketUserMobile,ticketPriority, ticketUnitCost){



	var workingFolder = site.childByNamePath('Tickets/Current');
	var folio = getNewFolio();
	
	var unitCost = "AT";
	if(ticketUnitCost == 'MADRINAS'){
		unitCost = "MA";
	}
	
	var nameTicket = 'GP-' +unitCost+ '-' + folio;
	var nameTicketPdf = nameTicket + '.pdf';
	
	var descPriority = setPriority(ticketPriority);
	logger.debug('Prioridad :' + descPriority);
	logger.debug('Unit Cost :'+ticketUnitCost);
	var ticketOdt = workingFolder.createFile(nameTicket + '.odt');
	
	logger.debug(" Folio creado : " + nameTicket);
	ticketOdt.name =nameTicket;
	ticketOdt.specializeType('gp:typeSupportTicket');
	ticketOdt.properties['gp:ticketEquipment']			= ticketEquipment;
	ticketOdt.properties['gp:ticketModule']				= ticketModule;
	ticketOdt.properties['gp:ticketFolio']				= nameTicket;
	ticketOdt.properties['cm:title']					= ticketDescription;
	ticketOdt.properties['cm:description']				= ticketDetail;
	ticketOdt.properties['gp:ticketUserName']			= ticketUserName;
	ticketOdt.properties['gp:ticketUserFirstName']		= ticketUserFirstName;
	ticketOdt.properties['gp:ticketUserLastName']		= ticketUserLastName;
	ticketOdt.properties['gp:ticketUserEmail']			= ticketUserEmail;
	ticketOdt.properties['gp:ticketUserTelephone']		= ticketUserTelephone;
	ticketOdt.properties['gp:ticketUserMobile']			= ticketUserMobile;
	ticketOdt.properties['gp:ticketPriority']			= descPriority;
	ticketOdt.properties['gp:ticketUnitCost']			= ticketUnitCost;
	ticketOdt.properties['gp:ticketStatus']				= "CREADO";
	ticketOdt.properties['gp:ticketServiceRating']		= "Pendiente";
	
	


	var content = createContentFileTicket(ticketEquipment,ticketModule,nameTicket, ticketDescription, ticketDetail , ticketUserName, ticketUserFirstName ,ticketUserLastName, ticketOdt , '', '', '');
	ticketOdt.content = content;
	ticketOdt.save();
	//ticketOdt.transformDocument('application/pdf');

	//var ticketPDF = workingFolder.childByNamePath(nameTicketPdf);
	bpm_package.addNode(ticketOdt);
	//ticketOdt.remove();
	return nameTicket;

}

/**
 *
 * @param stwf_analysisOutcome
 * @param stwf_ticketTechnician
 * @param stwf_ticketFolio
 * @param stwf_ticketAnalysis
 * @param ticketDocument
 */
function updateAnalisisTask(stwf_analysisOutcome , stwf_ticketTechnician, stwf_ticketFolio,stwf_ticketAnalysis, ticketDocument ){

	logger.debug('Update task ..'+stwf_ticketAnalysis);
	var workingFolder = site.childByNamePath('Tickets/Current');
	var doc = workingFolder.childByNamePath(stwf_ticketFolio );
	logger.debug('Doc ---'+ doc);

	if (stwf_analysisOutcome == 'OK'){
		status = 'EN-PROCESO';
		doc.properties['gp:ticketTechnician']				= stwf_ticketTechnician;
		doc.properties['gp:ticketAnalysis']				= stwf_ticketAnalysis;
		doc.properties['gp:ticketStatus']					= status;
	}else{
		status = 'CANCELADO';

		doc.properties['gp:ticketTechnician']				= stwf_ticketTechnician;
		doc.properties['gp:ticketAnalysis']				= stwf_ticketAnalysis;
		doc.properties['gp:ticketActions']				= 'N/A';
		doc.properties['gp:ticketStatus']					= status;
		doc.properties['gp:ticketUserCloseComments']		= 'N/A';
	}

	doc.save();

	var ticketEquipment = doc.properties['gp:ticketEquipment'];
	var ticketModule = doc.properties['gp:ticketModule'];
	var ticketFolio = doc.properties['gp:ticketFolio'];
	var ticketDescription =  doc.properties['cm:title'];
	var ticketDetail = doc.properties['cm:description'];
	var ticketUserName = doc.properties['gp:ticketUserName'];
	var ticketUserFirstName = doc.properties['gp:ticketUserFirstName'];
	var ticketUserLastName = doc.properties['gp:ticketUserLastName'];
	var ticketUserEmail = doc.properties['gp:ticketUserEmail'];
	var ticketUserTelephone =doc.properties['gp:ticketUserTelephone'];
	var ticketUserMobile =doc.properties['gp:ticketUserMobile'];
	var ticketPriority = doc.properties['gp:ticketPriority'];


	//logger.debug("ticketDetail ->"+ticketDetail);
	var content = createContentFileTicket(ticketEquipment,ticketModule,ticketFolio, ticketDescription, ticketDetail , ticketUserName, ticketUserFirstName ,ticketUserLastName, doc , stwf_ticketTechnician, stwf_ticketAnalysis, '');
	//logger.debug("content->"+content);
	doc.addAspect("cm:versionable");
	var workingCopy = doc.checkout();
	workingCopy.content = content;
	doc = workingCopy.checkin();
	//doc.content = content;
	//workingCopy.content = content;
	//doc = workingCopy.checkin("a history note", true);


}

/**
 *
 * @param stwf_ticketFolio
 * @param stwf_ticketServiceRating
 * @param stwf_ticketUserCloseComments
 * @param stwf_closeTicketOutcome
 */
function updateCierreTask(stwf_ticketFolio, stwf_ticketServiceRating, stwf_ticketUserCloseComments, stwf_closeTicketOutcome  ){
	logger.debug('Update task ..'+stwf_ticketServiceRating);


	var workingFolder = site.childByNamePath('Tickets/Current');
	var doc = workingFolder.childByNamePath(stwf_ticketFolio );
	if (stwf_closeTicketOutcome == 'OK'){
		doc.properties['gp:ticketStatus']					= "CERRADO";
	}else{
		doc.properties['gp:ticketStatus']					= "RE-TRABAJO";
	}
	doc.properties['gp:ticketServiceRating']			= stwf_ticketServiceRating;
	doc.properties['gp:ticketUserCloseComments']		= stwf_ticketUserCloseComments;

	doc.save();

	var ticketEquipment = doc.properties['gp:ticketEquipment'];
	var ticketModule = doc.properties['gp:ticketModule'];
	var ticketFolio = doc.properties['gp:ticketFolio'];
	var ticketDescription =  doc.properties['cm:title'];
	var ticketDetail = doc.properties['cm:description'];
	var ticketUserName = doc.properties['gp:ticketUserName'];
	var ticketUserFirstName = doc.properties['gp:ticketUserFirstName'];
	var ticketUserLastName = doc.properties['gp:ticketUserLastName'];
	var ticketUserEmail = doc.properties['gp:ticketUserEmail'];
	var ticketUserTelephone =doc.properties['gp:ticketUserTelephone'];
	var ticketUserMobile =doc.properties['gp:ticketUserMobile'];
	var ticketPriority = doc.properties['gp:ticketPriority'];
	var ticketAnalysis = doc.properties['gp:ticketAnalysis'];
	var ticketActions = doc.properties['gp:ticketActions'];


	//logger.debug("ticketDetail ->"+ticketDetail);
	var content = createContentFileTicket(ticketEquipment,ticketModule,ticketFolio, ticketDescription, ticketDetail , ticketUserName, ticketUserFirstName ,ticketUserLastName, doc , stwf_ticketTechnician, stwf_ticketAnalysis, stwf_ticketActions);
	//logger.debug("content->"+content);
	doc.addAspect("cm:versionable");
	var workingCopy = doc.checkout();
	workingCopy.content = content;
	doc = workingCopy.checkin();
	//doc.content = content;
	//workingCopy.content = content;
	//doc = workingCopy.checkin("a history note", true);

}

/**
 *
 * @param stwf_ticketFolio
 * @param stwf_ticketActions
 */
function updateResolucionTask(stwf_ticketFolio,stwf_ticketActions){

	logger.debug('Update task ..'+stwf_ticketActions);
	var workingFolder = site.childByNamePath('Tickets/Current');
	var doc = workingFolder.childByNamePath(stwf_ticketFolio );
	logger.debug('Doc ---'+ doc);
		var status = 'RESUELTO';
		doc.properties['gp:ticketActions']				= stwf_ticketActions;
		doc.properties['gp:ticketStatus']					= status;

	doc.save();

	var ticketEquipment = doc.properties['gp:ticketEquipment'];
	var ticketModule = doc.properties['gp:ticketModule'];
	var ticketFolio = doc.properties['gp:ticketFolio'];
	var ticketDescription =  doc.properties['cm:title'];
	var ticketDetail = doc.properties['cm:description'];
	var ticketUserName = doc.properties['gp:ticketUserName'];
	var ticketUserFirstName = doc.properties['gp:ticketUserFirstName'];
	var ticketUserLastName = doc.properties['gp:ticketUserLastName'];
	var ticketUserEmail = doc.properties['gp:ticketUserEmail'];
	var ticketUserTelephone =doc.properties['gp:ticketUserTelephone'];
	var ticketUserMobile =doc.properties['gp:ticketUserMobile'];
	var ticketPriority = doc.properties['gp:ticketPriority'];


	//logger.debug("ticketDetail ->"+ticketDetail);
	var content = createContentFileTicket(ticketEquipment,ticketModule,ticketFolio, ticketDescription, ticketDetail , ticketUserName, ticketUserFirstName ,ticketUserLastName, doc , stwf_ticketTechnician, stwf_ticketAnalysis, stwf_ticketActions);
	//logger.debug("content->"+content);
	doc.addAspect("cm:versionable");
	var workingCopy = doc.checkout();
	workingCopy.content = content;
	doc = workingCopy.checkin();
	//doc.content = content;
	//workingCopy.content = content;
	//doc = workingCopy.checkin("a history note", true);


}


/**
 *
 * @param stwf_ticketFolio
 * @param stwf_ticketServiceRating
 * @param stwf_ticketUserCloseComments
 * @param stwf_closeTicketOutcome
 */
function updateCierreTaskAut(stwf_ticketFolio ){
	logger.debug('Update task aut..'+stwf_ticketFolio);


	var workingFolder = site.childByNamePath('Tickets/Current');
	var doc = workingFolder.childByNamePath(stwf_ticketFolio );


	doc.properties['gp:ticketStatus']					= "CERRADO-SIN-RETRO";
	doc.properties['gp:ticketServiceRating']			= "Excelente";
	doc.properties['gp:ticketUserCloseComments']		= "Cerrado automáticamente por Alfresco ya que el usuario no cerró el ticket";

	doc.save();

	var ticketEquipment = doc.properties['gp:ticketEquipment'];
	var ticketModule = doc.properties['gp:ticketModule'];
	var ticketFolio = doc.properties['gp:ticketFolio'];
	var ticketDescription =  doc.properties['cm:title'];
	var ticketDetail = doc.properties['cm:description'];
	var ticketUserName = doc.properties['gp:ticketUserName'];
	var ticketUserFirstName = doc.properties['gp:ticketUserFirstName'];
	var ticketUserLastName = doc.properties['gp:ticketUserLastName'];
	var ticketUserEmail = doc.properties['gp:ticketUserEmail'];
	var ticketUserTelephone =doc.properties['gp:ticketUserTelephone'];
	var ticketUserMobile =doc.properties['gp:ticketUserMobile'];
	var ticketPriority = doc.properties['gp:ticketPriority'];
	var ticketAnalysis = doc.properties['gp:ticketAnalysis'];
	var ticketActions = doc.properties['gp:ticketActions'];


	//logger.debug("ticketDetail ->"+ticketDetail);
	var content = createContentFileTicket(ticketEquipment,ticketModule,ticketFolio, ticketDescription, ticketDetail , ticketUserName, ticketUserFirstName ,ticketUserLastName, doc , stwf_ticketTechnician, stwf_ticketAnalysis, stwf_ticketActions);
	//logger.debug("content->"+content);
	doc.addAspect("cm:versionable");
	var workingCopy = doc.checkout();
	workingCopy.content = content;
	doc = workingCopy.checkin();
	//doc.content = content;
	//workingCopy.content = content;
	//doc = workingCopy.checkin("a history note", true);

}


function setVencimientoTicket(ticketPriority){

	logger.debug('Due Date :' + bpm_workflowDueDate);
	logger.debug('Ticket Priority :' + bpm_workflowPriority);

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
    utils.pad(now.getDate(), 2) + '' +
    utils.pad(now.getHours(), 2) + '' +
    utils.pad(now.getMinutes(), 2) + '' +
    utils.pad(now.getSeconds(), 2) + '' +
    utils.pad(now.getMilliseconds(), 3);

  return folio;
}
