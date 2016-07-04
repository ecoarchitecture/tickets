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
function createContentFileSolicitudRequisicion( ticketOdt){
	logger.debug('Crear documento de solicitud de requisicion ...');
	var template = site.childByNamePath('Configuracion/Plantillas/GP-RH-1.fodt');
	//var workingFolder = site.childByNamePath('Solicitudes/EnProceso');
	// Template Values
	var values = new Array();
	
	values['fechaSolicitud'] =     ticketOdt.properties['gp:fechaSolicitud'];
	values['folioSolicitud'] =    	ticketOdt.properties['gp:folioSolicitud'];
	values['solicitante'] =    	ticketOdt.properties['gp:solicitante'];
	values['division'] =    	ticketOdt.properties['gp:division'];
	values['circuito'] =      ticketOdt.properties['gp:circuito'];
	values['subcircuito'] =    	ticketOdt.properties['gp:subcircuito'];
	values['puesto'] =    	ticketOdt.properties['gp:puesto'];
	values['numPuestos'] =    	ticketOdt.properties['gp:numPuestos'];
	values['localidad'] =    	ticketOdt.properties['gp:localidad'];
	values['centroCostos'] =    	ticketOdt.properties['gp:centroCostos'];
	values['nombreJefeInmediato'] =    	ticketOdt.properties['gp:nombreJefeInmediato'];
	values['isNuevaCreacion'] =    	ticketOdt.properties['gp:isNuevaCreacion'];
	values['isSustitucion'] =    	ticketOdt.properties['gp:isSustitucion'];
	values['isIncapacidad'] =    	ticketOdt.properties['gp:isIncapacidad'];
	values['isPromocion'] =    	ticketOdt.properties['gp:isPromocion'];
	values['isCambio'] =    	ticketOdt.properties['gp:isCambio'];
	values['isApoyo'] =    	ticketOdt.properties['gp:isApoyo'];
	values['sustituyeA'] =    	ticketOdt.properties['gp:sustituyeA'];
	values['fechaSustitucion'] =    	ticketOdt.properties['gp:fechaSustitucion'];
	values['isTiempoIndefinido'] =    	ticketOdt.properties['gp:isTiempoIndefinido'];
	values['isTemporal'] =    	ticketOdt.properties['gp:isTemporal'];
	values['tiempoTemporal'] =    	ticketOdt.properties['gp:tiempoTemporal'];
	values['isSupervisaPersonal'] =    	ticketOdt.properties['gp:isSupervisaPersonal'];
	values['numSupervisaPersonal'] =    	ticketOdt.properties['gp:numSupervisaPersonal'];
	values['sexoCandidato'] =    	ticketOdt.properties['gp:sexoCandidato'];
	values['estadoCivil'] =    	ticketOdt.properties['gp:estadoCivil'];
	values['edadMinima'] =    	ticketOdt.properties['gp:edadMinima'];
	values['edadMaximo'] =    	ticketOdt.properties['gp:edadMaximo'];
	values['isRequiereViajar'] =    	ticketOdt.properties['gp:isRequiereViajar'];
	values['isFrecuenteViajar'] =    	ticketOdt.properties['gp:isFrecuenteViajar'];
	values['isEventualViajar'] =    	ticketOdt.properties['gp:isEventualViajar'];
	values['escolaridad'] =    	ticketOdt.properties['gp:escolaridad'];
	values['especialidad'] =    	ticketOdt.properties['gp:especialidad'];
	values['isExperienciaLaboral'] =    	ticketOdt.properties['gp:isExperienciaLaboral'];
	values['idioma'] =    	ticketOdt.properties['gp:idioma'];
	values['porcentajeIdiomaHablar'] =    	ticketOdt.properties['gp:porcentajeIdiomaHablar'];
	values['porcentajeIdiomaLeer'] =    	ticketOdt.properties['gp:porcentajeIdiomaLeer']	;
	values['porcentajeIdiomaTraducir'] =    	ticketOdt.properties['gp:porcentajeIdiomaTraducir'];
	values['otroIdioma'] =    	ticketOdt.properties['gp:otroIdioma']			;
	values['caracteristicasCandidato'] =    	ticketOdt.properties['gp:caracteristicasCandidato'];
	values['entrevistador1'] =    	ticketOdt.properties['gp:entrevistador1'];
	values['entrevistador2'] =    	ticketOdt.properties['gp:entrevistador2'];
		
	values['candidato1'] =    	ticketOdt.properties['gp:candidato1']	;
	values['candidato2'] =    	ticketOdt.properties['gp:candidato2']	;

	if(ticketOdt.properties['gp:nivelTabulador'] != null){
		logger.debug('Actualizando tabulador ...' + ticketOdt.properties['gp:nivelTabulador'] );
		
		values['nivelTabulador'] =  ticketOdt.properties['gp:nivelTabulador'];
		values['rangoMinimo'] =    ticketOdt.properties['gp:rangoMinimo']	;
		values['rangoMaximo'] = 	ticketOdt.properties['gp:rangoMaximo']	;
		values['sueldoRequerido'] =    	ticketOdt.properties['gp:sueldoRequerido'];
	}
	

	
	var content = ticketOdt.processTemplate(template, values);
	return content;
}




/**
 * 
 */
function actualizarAutorizacion(rqwf_solicitudFolio, rqwf_outcomeAutorizacion,rqwf_comentarios,rqwf_autorizador  ){
	

	logger.debug('Update solicitud ..');
	var workingFolder = site.childByNamePath('Solicitudes/EnProceso');
	var doc = workingFolder.childByNamePath(rqwf_solicitudFolio );
	logger.debug('Doc ---'+ doc);
	
	var aspectAutorizacion = new Array();
	aspectAutorizacion['gp:nombreAutorizador'] = rqwf_autorizador;
	aspectAutorizacion['gp:comentariosAutorizador'] = rqwf_comentarios;
	aspectAutorizacion['gp:tipoAutorizacion'] = rqwf_outcomeAutorizacion;
	aspectAutorizacion['gp:fechaAutorizacion'] = new java.util.Date();
	
//	var content = createContentFileSolicitudRequisicion( doc );
	
	//doc.createAssociation(aspectAutorizacion,"gp:autorizaciones" );
	
	doc.addAspect("gp:autorizacion" , aspectAutorizacion);
	
	doc.save();
//	var workingCopy = doc.checkout();
	//workingCopy.content = content;
//	doc = workingCopy.checkin();
	
}


/**
 * 
 */
function actualizarTabulador(rqwf_solicitudFolio, rqwf_nivelTabulador, rqwf_rangoMinimo, rqwf_rangoMaximo, rqwf_sueldoRequerido){
	

	logger.debug('Update solicitud ..');
	var workingFolder = site.childByNamePath('Solicitudes/EnProceso');
	var doc = workingFolder.childByNamePath(rqwf_solicitudFolio );
	logger.debug('Doc ---'+ doc);
	
	doc.properties['gp:nivelTabulador'] = rqwf_nivelTabulador;
	doc.properties['gp:rangoMinimo'] = rqwf_rangoMinimo;
	doc.properties['gp:rangoMaximo'] = rqwf_rangoMaximo;
	doc.properties['gp:sueldoRequerido'] = rqwf_sueldoRequerido;
	
	doc.save();
	
	var content = createContentFileSolicitudRequisicion( doc );
	
	doc.addAspect("cm:versionable");
	var workingCopy = doc.checkout();
	workingCopy.content = content;
	doc = workingCopy.checkin();
	
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

function crearSolicitudRequisicion(solicitante,
      	division,
      	circuito,
      	subcircuito,
      	puesto,
      	numPuesto,
      	localidad,
      	nombreJefeInmediato,
      	isNuevaCreacion,
      	isSustitucion,
      	isIncapacidad,
      	isPromocion,
      	isCambio,
      	isApoyo,
      	sustituyeA,
      	fechaSustitucion,
      	isTiempoIndefinido,
      	isTemporal,
      	tiempoTemporal,
      	isSupervisaPersonal,
      	numSupervisaPersonal,
      	sexoCandidato,
      	estadoCivil,
      	edadMinima,
      	edadMaximo,
      	isRequiereViajar,
      	isFrecuenteViajar,
      	isEventualViajar,
      	escolaridad,
      	especialidad,
      	isExperienciaLaboral,
      	aniosExperienciaLaboral,
      	idioma,
      	porcentajeIdiomaHablar,
      	porcentajeIdiomaLeer,
      	porcentajeIdiomaTraducir,
      	porcentajeIdiomaEscrito,
      	otroIdioma,
      	caracteristicasCandidato,
      	entrevistador1,
      	entrevistador2,
      	candidato1,
      	candidato2){

	logger.debug('Candidato2 :::' + candidato2);

	var workingFolder = site.childByNamePath('Solicitudes/EnProceso');
	var folio = getNewFolio();
	var unitCost = "RH";
	

	var nameTicket = 'GP-' +unitCost+ '-' + folio;
	var nameTicketPdf = nameTicket + '.odt';

//	var descPriority = setPriority(ticketPriority);
	
	var ticketOdt = workingFolder.createFile(nameTicketPdf);

	logger.debug(" Solicitud creado : " + nameTicket);
	
	ticketOdt.name =nameTicket;
	ticketOdt.specializeType('gp:solicitudRequisicion');
	
	ticketOdt.properties['gp:fechaSolicitud']			= new java.util.Date();
	ticketOdt.properties['gp:folioSolicitud']			= nameTicket;
	ticketOdt.properties['gp:solicitante']			= solicitante;
	ticketOdt.properties['gp:division']			= division;
	ticketOdt.properties['gp:circuito']			= circuito;
	ticketOdt.properties['gp:subcircuito']			= subcircuito;
	ticketOdt.properties['gp:puesto']			= puesto;
	ticketOdt.properties['gp:numPuestos']			= numPuesto;
	ticketOdt.properties['gp:localidad']			= localidad;
	ticketOdt.properties['gp:centroCostos']			= subcircuito;
	ticketOdt.properties['gp:nombreJefeInmediato']			= nombreJefeInmediato;
	ticketOdt.properties['gp:isNuevaCreacion']			= isNuevaCreacion;
	ticketOdt.properties['gp:isSustitucion']			= isSustitucion;
	ticketOdt.properties['gp:isIncapacidad']			= isIncapacidad;
	ticketOdt.properties['gp:isPromocion']			= isPromocion;
	ticketOdt.properties['gp:isCambio']			= isCambio;
	ticketOdt.properties['gp:isApoyo']			= isApoyo;
	ticketOdt.properties['gp:sustituyeA']			= sustituyeA;
	ticketOdt.properties['gp:fechaSustitucion']			= fechaSustitucion;
	ticketOdt.properties['gp:isTiempoIndefinido']			= isTiempoIndefinido;
	ticketOdt.properties['gp:isTemporal']			= isTemporal;
	ticketOdt.properties['gp:tiempoTemporal']			= tiempoTemporal;
	ticketOdt.properties['gp:isSupervisaPersonal']			= isSupervisaPersonal;
	ticketOdt.properties['gp:numSupervisaPersonal']			= numSupervisaPersonal;
	ticketOdt.properties['gp:sexoCandidato']			= sexoCandidato;
	ticketOdt.properties['gp:estadoCivil']			= estadoCivil;
	ticketOdt.properties['gp:edadMinima']			= edadMinima;
	ticketOdt.properties['gp:edadMaximo']			= edadMaximo;
	ticketOdt.properties['gp:isRequiereViajar']			= isRequiereViajar;
	ticketOdt.properties['gp:isFrecuenteViajar']			= isFrecuenteViajar;
	ticketOdt.properties['gp:isEventualViajar']			= isEventualViajar;
	ticketOdt.properties['gp:escolaridad']			= escolaridad;
	ticketOdt.properties['gp:especialidad']			= especialidad;
	ticketOdt.properties['gp:isExperienciaLaboral']			= isExperienciaLaboral;
	ticketOdt.properties['gp:aniosExperienciaLaboral']			= aniosExperienciaLaboral;
	ticketOdt.properties['gp:idioma']			= idioma;
	ticketOdt.properties['gp:porcentajeIdiomaHablar']			= porcentajeIdiomaHablar;
	ticketOdt.properties['gp:porcentajeIdiomaLeer']			= porcentajeIdiomaLeer;
	ticketOdt.properties['gp:porcentajeIdiomaTraducir']			= porcentajeIdiomaTraducir;
	ticketOdt.properties['gp:porcentajeIdiomaEscrito']			= porcentajeIdiomaEscrito;
	ticketOdt.properties['gp:otroIdioma']			= otroIdioma;
	ticketOdt.properties['gp:caracteristicasCandidato']			= caracteristicasCandidato;
	ticketOdt.properties['gp:entrevistador1']			= entrevistador1;
	ticketOdt.properties['gp:entrevistador2']			= entrevistador2;
	ticketOdt.properties['gp:candidato1']			= candidato1;
	ticketOdt.properties['gp:candidato2']			= candidato2;
	
//	ticketOdt.properties['gp:nivelTabulador']			= nivelTabulador;
//	ticketOdt.properties['gp:rangoMinimo']			= rangoMinimo;
//	ticketOdt.properties['gp:rangoMaximo']			= rangoMaximo;
//	ticketOdt.properties['gp:sueldoRequerido']			= sueldoRequerido;



	var content = createContentFileSolicitudRequisicion( ticketOdt );
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
  
  
  var group = people.getGroup('GROUP_RECURSOS_HUMANOS');
	var groupMembers = group.getChildren();

	for (var i = 0; i < groupMembers.length; i++)
	{
		var member = groupMembers[i];
		var memberEmail = member.properties['cm:email'];
		var memberUser = member.properties['cm:userName'];

		logger.debug('Enviando notificación a: ' + memberUser + ' [' + memberEmail + ']');

		if (memberEmail != null || memberEmail != ''){

			

				try
				{
					logger.debug('Enviando correo a end user: ' + email);

					var mail = actions.create('mail');

					mail.parameters.to = memberEmail;
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
  

	
}