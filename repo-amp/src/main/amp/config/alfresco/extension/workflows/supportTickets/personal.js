/**
 *
 */
var site = siteService.getSite('recursos-humanos-site').node.childByNamePath('documentLibrary');



function mostrarValorBoolean( value ){
var str = 'Si';

if (!value){
	str = 'No';
}
	return str;
}

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
	
	values['isNuevaCreacion'] =    	mostrarValorBoolean(ticketOdt.properties['gp:isNuevaCreacion']);
	values['isSustitucion'] =    	mostrarValorBoolean(ticketOdt.properties['gp:isSustitucion']);
	values['isIncapacidad'] =    	mostrarValorBoolean(ticketOdt.properties['gp:isIncapacidad']);
	values['isPromocion'] =    	mostrarValorBoolean(ticketOdt.properties['gp:isPromocion']);
	values['isCambio'] =    	mostrarValorBoolean(ticketOdt.properties['gp:isCambio']);
	values['isApoyo'] =    mostrarValorBoolean(ticketOdt.properties['gp:isApoyo']);
	
	
	logger.debug("Campo ::::" + ticketOdt.properties['gp:sustituyeA']);
	
	if(ticketOdt.properties['gp:sustituyeA'] != null){
		
		values['sustituyeA'] =    	ticketOdt.properties['gp:sustituyeA'];
	}else{
		values['sustituyeA'] =  '';
	}
	
	
	if(ticketOdt.properties['gp:fechaSustitucion'] != null){
		values['fechaSustitucion'] =    	ticketOdt.properties['gp:fechaSustitucion'];
	}else{
		values['fechaSustitucion'] =  '';
	}
	
	
	
	
	values['isTiempoIndefinido'] =    	mostrarValorBoolean(ticketOdt.properties['gp:isTiempoIndefinido']);
	values['isTemporal'] =    	mostrarValorBoolean(ticketOdt.properties['gp:isTemporal']);
	
	if(ticketOdt.properties['gp:tiempoTemporal'] != null){
		values['tiempoTemporal'] =    	ticketOdt.properties['gp:tiempoTemporal'];
	}else{
		values['tiempoTemporal'] =  '';
	}
	
	values['isSupervisaPersonal'] =    	mostrarValorBoolean(ticketOdt.properties['gp:isSupervisaPersonal']);
	
	if(ticketOdt.properties['gp:numSupervisaPersonal'] != null){
		values['numSupervisaPersonal'] =    	ticketOdt.properties['gp:numSupervisaPersonal'];
	}else{
		values['numSupervisaPersonal'] =  0;
	}
	
	values['sexoCandidato'] =    	ticketOdt.properties['gp:sexoCandidato'];
	values['estadoCivil'] =    	ticketOdt.properties['gp:estadoCivil'];
	values['edadMinima'] =    	ticketOdt.properties['gp:edadMinima'];
	values['edadMaximo'] =    	ticketOdt.properties['gp:edadMaximo'];
	values['isRequiereViajar'] =    	mostrarValorBoolean(ticketOdt.properties['gp:isRequiereViajar']);
	values['isFrecuenteViajar'] =    	mostrarValorBoolean(ticketOdt.properties['gp:isFrecuenteViajar']);
	values['isEventualViajar'] =    	mostrarValorBoolean(ticketOdt.properties['gp:isEventualViajar']);
	values['escolaridad'] =    	ticketOdt.properties['gp:escolaridad'];
	values['especialidad'] =    	ticketOdt.properties['gp:especialidad'];
	values['isExperienciaLaboral'] =    	mostrarValorBoolean(ticketOdt.properties['gp:isExperienciaLaboral']);
	values['aniosExperienciaLaboral'] =    	ticketOdt.properties['gp:aniosExperienciaLaboral'];
	values['idioma'] =    	ticketOdt.properties['gp:idioma'];
	values['porcentajeIdiomaHablar'] =    	ticketOdt.properties['gp:porcentajeIdiomaHablar'];
	values['porcentajeIdiomaLeer'] =    	ticketOdt.properties['gp:porcentajeIdiomaLeer']	;
	values['porcentajeIdiomaTraducir'] =    	ticketOdt.properties['gp:porcentajeIdiomaTraducir'];
	values['otroIdioma'] =    	ticketOdt.properties['gp:otroIdioma']			;
	values['caracteristicasCandidato'] =    	ticketOdt.properties['gp:caracteristicasCandidato'];
	
	var e1 = ticketOdt.properties['gp:entrevistador1'];
	var e1Name = e1.properties.firstName +" " + e1.properties.lastName;
	values['entrevistador1'] =    	e1Name;
	
	
	if( ticketOdt.properties['gp:vistoBuenoRh'] != null){
		var rh = ticketOdt.properties['gp:vistoBuenoRh'];
		var rhName = rh.properties.firstName +" " + rh.properties.lastName;
		values['vistoBuenoRh'] = rhName;
	}else {
		values['vistoBuenoRh'] = "";
	}
	
	

	if(ticketOdt.properties['gp:entrevistador2'] != null){
		values['entrevistador2'] =    	ticketOdt.properties['gp:entrevistador2'];
	}else{
		values['entrevistador2'] =  "";
	}	
	
	if(ticketOdt.properties['gp:candidato1'] != null){
		values['candidato1'] =    	ticketOdt.properties['gp:candidato1'];
	}else{
		values['candidato1'] =  "";
	}
	
	
	if(ticketOdt.properties['gp:candidato2'] != null){
		values['candidato2'] =    	ticketOdt.properties['gp:candidato2'];
	}else{
		values['candidato2'] =  "";
	}	
	
	

	if(ticketOdt.properties['gp:nivelTabulador'] != null){
		logger.debug('Actualizando tabulador ...' + ticketOdt.properties['gp:nivelTabulador'] );
		
		values['nivelTabulador'] =  ticketOdt.properties['gp:nivelTabulador'];
		values['rangoMinimo'] =    ticketOdt.properties['gp:rangoMinimo']	;
		values['rangoMaximo'] = 	ticketOdt.properties['gp:rangoMaximo']	;
		values['sueldoRequerido'] =    	ticketOdt.properties['gp:sueldoRequerido'];
	}
	
	if(ticketOdt.properties['gp:nivelTabulador'] != null){
		values['nivelTabulador'] =  ticketOdt.properties['gp:nivelTabulador'];
	}else{
		values['nivelTabulador'] =  '';
	}
	if(ticketOdt.properties['gp:rangoMinimo'] != null){
		values['rangoMinimo'] =  ticketOdt.properties['gp:rangoMinimo'];
	}else{
		values['rangoMinimo'] =  '';
	}
	if(ticketOdt.properties['gp:rangoMaximo'] != null){
		values['rangoMaximo'] =  ticketOdt.properties['gp:rangoMaximo'];
	}else{
		values['rangoMaximo'] =  '';
	}
	if(ticketOdt.properties['gp:sueldoRequerido'] != null){
		values['sueldoRequerido'] =  ticketOdt.properties['gp:sueldoRequerido'];
	}else{
		values['sueldoRequerido'] =  '';
	}
	
	
	

	if(ticketOdt.properties['gp:nombreFinanzas'] != null){
	  values['nombreFinanzas'] = ticketOdt.properties['gp:nombreFinanzas'];
	}else{
	  values['nombreFinanzas'] = '';
	}

	if(ticketOdt.properties['gp:fechaAutFinanzas'] != null){
	  values['fechaAutFinanzas'] = ticketOdt.properties['gp:fechaAutFinanzas'];
	}else{
	  values['fechaAutFinanzas'] = '';
	}

	if(ticketOdt.properties['gp:comentariosFinanzas'] != null){
	  values['comentariosFinanzas'] = ticketOdt.properties['gp:comentariosFinanzas'];
	}  else{
	  values['comentariosFinanzas'] = '';
	}

	if(ticketOdt.properties['gp:outcomeFinanzas'] != null){
	  values['outcomeFinanzas'] = ticketOdt.properties['gp:outcomeFinanzas'];
	}  else{
	  values['outcomeFinanzas'] = '';
	}

	if(ticketOdt.properties['gp:nombreAdmin'] != null){
	  values['nombreAdmin'] = ticketOdt.properties['gp:nombreAdmin'];
	}   else{
	  values['nombreAdmin'] = '';
	}

	if(ticketOdt.properties['gp:fechaAutAdmin'] != null){
	  values['fechaAutAdmin'] = ticketOdt.properties['gp:fechaAutAdmin'];
	}  else{
	  values['fechaAutAdmin'] = '';
	}


	if(ticketOdt.properties['gp:comentariosAdmin'] != null){
	  values['comentariosAdmin'] = ticketOdt.properties['gp:comentariosAdmin'];
	}  else{
	  values['comentariosAdmin'] = '';
	}
	if(ticketOdt.properties['gp:outcomeAdmin'] != null){
	  values['outcomeAdmin'] = ticketOdt.properties['gp:outcomeAdmin'];
	}  else{
	  values['outcomeAdmin'] = '';
	}
	if(ticketOdt.properties['gp:nombreContraloria'] != null){
	  values['nombreContraloria'] = ticketOdt.properties['gp:nombreContraloria'];
	}  else{
	  values['nombreContraloria'] = '';
	}
	if(ticketOdt.properties['gp:fechaAutContraloria'] != null){
	  values['fechaAutContraloria'] = ticketOdt.properties['gp:fechaAutContraloria'];
	}   else{
	  values['fechaAutContraloria'] = '';
	}
	if(ticketOdt.properties['gp:comentariosContraloria'] != null){
	  values['comentariosContraloria'] = ticketOdt.properties['gp:comentariosContraloria'];
	}   else{
	  values['comentariosContraloria'] = '';
	}
	if(ticketOdt.properties['gp:outcomeContraloria'] != null){
	  values['outcomeContraloria'] = ticketOdt.properties['gp:outcomeContraloria'];
	}  else{
	  values['outcomeContraloria'] = '';
	}
	if(ticketOdt.properties['gp:nombreSolicitante'] != null){
	  values['nombreSolicitante'] = ticketOdt.properties['gp:nombreSolicitante'];
	} else{
	  values['nombreSolicitante'] = '';
	} 
	if(ticketOdt.properties['gp:fechaAutSolicitante'] != null){
	  values['fechaAutSolicitante'] = ticketOdt.properties['gp:fechaAutSolicitante'];
	}   else{
	  values['fechaAutSolicitante'] = '';
	} 
	if(ticketOdt.properties['gp:comentariosSolicitante'] != null){
	  values['comentariosSolicitante'] = ticketOdt.properties['gp:comentariosSolicitante'];
	}  else{
	  values['comentariosSolicitante'] = '';
	} 
	if(ticketOdt.properties['gp:outcomeSolicitante'] != null){
	  values['outcomeSolicitante'] = ticketOdt.properties['gp:outcomeSolicitante'];
	}  else{
	  values['outcomeSolicitante'] = '';
	} 
	
	if(ticketOdt.properties['gp:nombreGerente'] != null){
		  values['nombreGerente'] = ticketOdt.properties['gp:nombreGerente'];
		} else{
		  values['nombreGerente'] = '';
		} 
		if(ticketOdt.properties['gp:fechaAutGerente'] != null){
		  values['fechaAutGerente'] = ticketOdt.properties['gp:fechaAutGerente'];
		}   else{
		  values['fechaAutGerente'] = '';
		} 
		if(ticketOdt.properties['gp:comentariosGerente'] != null){
			  values['comentariosGerente'] = ticketOdt.properties['gp:comentariosGerente'];
			}  else{
			  values['comentariosGerente'] = '';
			} 
			if(ticketOdt.properties['gp:outcomeGerente'] != null){
			  values['outcomeGerente'] = ticketOdt.properties['gp:outcomeGerente'];
			}  else{
			  values['outcomeGerente'] = '';
			} 
		 
	

	
	var content = ticketOdt.processTemplate(template, values);
	return content;
}




/**
 * 
 */
function actualizarAutorizacion(rqwf_solicitudFolio, rqwf_outcomeAutorizacion,rqwf_comentarios,rqwf_autorizador, fase  ){
	

	logger.debug('Update solicitud ..' + fase);
	var workingFolder = site.childByNamePath('Solicitudes/EnProceso');
	var doc = workingFolder.childByNamePath(rqwf_solicitudFolio );
	logger.debug('Doc ---'+ doc);
	
	
	if(fase == 'FINANZAS'){
		
		doc.properties['gp:nombreFinanzas'] = rqwf_autorizador;
		doc.properties['gp:fechaAutFinanzas'] = new java.util.Date();
		doc.properties['gp:comentariosFinanzas'] = rqwf_comentarios;
		doc.properties['gp:outcomeFinanzas'] = rqwf_outcomeAutorizacion;
		
	}else if(fase == 'ADMIN'){
		
		doc.properties['gp:nombreAdmin'] = rqwf_autorizador;
		doc.properties['gp:fechaAutAdmin'] = new java.util.Date();
		doc.properties['gp:comentariosAdmin'] = rqwf_comentarios;
		doc.properties['gp:outcomeAdmin'] = rqwf_outcomeAutorizacion;
		
	}else if(fase == 'CONTRALORIA'){
		doc.properties['gp:nombreContraloria'] = rqwf_autorizador;
		doc.properties['gp:fechaAutContraloria'] = new java.util.Date();
		doc.properties['gp:comentariosContraloria'] = rqwf_comentarios;
		doc.properties['gp:outcomeContraloria'] = rqwf_outcomeAutorizacion;
	}else if( fase == 'SOLICITANTE'){
		
		doc.properties['gp:nombreSolicitante'] = rqwf_autorizador;
		doc.properties['gp:fechaAutSolicitante'] = new java.util.Date();
		doc.properties['gp:comentariosSolicitante'] = rqwf_comentarios;
		doc.properties['gp:outcomeSolicitante'] = rqwf_outcomeAutorizacion;
	}else if( fase == 'GERENTE'){
		
		doc.properties['gp:nombreGerente'] = rqwf_autorizador;
		doc.properties['gp:fechaAutGerente'] = new java.util.Date();
		doc.properties['gp:comentariosGerente'] = rqwf_comentarios;
		doc.properties['gp:outcomeGerente'] = rqwf_outcomeAutorizacion;
	}
	
	
//	var aspectAutorizacion = new Array();
//	aspectAutorizacion['gp:nombreAutorizador'] = rqwf_autorizador;
//	aspectAutorizacion['gp:comentariosAutorizador'] = rqwf_comentarios;
//	aspectAutorizacion['gp:tipoAutorizacion'] = rqwf_outcomeAutorizacion;
//	aspectAutorizacion['gp:fechaAutorizacion'] = new java.util.Date();
	
	var content = createContentFileSolicitudRequisicion( doc );
	
	//doc.createAssociation(aspectAutorizacion,"gp:autorizaciones" );
	
	//doc.addAspect("gp:autorizacion" , aspectAutorizacion);
	
	doc.save();
	
	
	
	var content = createContentFileSolicitudRequisicion( doc );
	
	doc.addAspect("cm:versionable");
	var workingCopy = doc.checkout();
	workingCopy.content = content;
	doc = workingCopy.checkin();
	
}


/**
 * 
 */
function actualizarTabulador(rqwf_solicitudFolio, rqwf_nivelTabulador, rqwf_rangoMinimo, rqwf_rangoMaximo, rqwf_sueldoRequerido, rqwf_voborh){
	

	logger.debug('Update solicitud ..');
	var workingFolder = site.childByNamePath('Solicitudes/EnProceso');
	var doc = workingFolder.childByNamePath(rqwf_solicitudFolio );
	logger.debug('Doc ---'+ doc);
	
	doc.properties['gp:nivelTabulador'] = rqwf_nivelTabulador;
	doc.properties['gp:rangoMinimo'] = rqwf_rangoMinimo;
	doc.properties['gp:rangoMaximo'] = rqwf_rangoMaximo;
	doc.properties['gp:sueldoRequerido'] = rqwf_sueldoRequerido;
	doc.properties['gp:vistoBuenoRh'] = rqwf_voborh;
	
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
	//	Transform to PDF
	//ticketOdt.transformDocument('application/pdf');
	//logger.debug('Se transformó en pdf');

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
function sendMailToEndUser(wfPackage, wfTitle, wfText, wfFolio, wfPuesto, email, subject, pooled)
{
	logger.debug('email '+email);
	logger.debug('wfFolio '+wfFolio);
  
	var wfId = null;
  //wfPackage.properties['bpm:workflowInstanceId'];

	var template = site.childByNamePath('Configuracion/Plantillas/wf-email-ftl.htm');
	logger.debug('template end user '+template);

	var wfMail = new Object();
	wfMail.args = new Object();

	wfMail.args.workflowTasks = false;
  wfMail.args.workflowPooled = pooled;
  wfMail.args.workflowTitle = wfPuesto;
  wfMail.args.workflowDescription = wfText;
  wfMail.args.workflowDueDate = new Date();
  wfMail.args.solicitudFolio = wfFolio;
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
function sendMailToRecursosHumanos(wfPackage, wfTitle, wfText, wfFolio, wfPuesto, email, subject, rqwf_areaRh)
{
	
	logger.debug('email RH :: '+rqwf_areaRh);
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
  wfMail.args.workflowDescription = wfText;
  wfMail.args.workflowDueDate = new Date();
  wfMail.args.solicitudFolio = wfFolio;
  wfMail.args.workflowDocuments = wfPackage.children;
  
//  var str = 'GROUP_'+rqwf_areaRh;
//	  var replacedStr = rqwf_areaRh.replace(/\s/g, "_");
	  
  var group = people.getGroup(rqwf_areaRh);
  logger.debug("Group:::" + group);
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


function sendMailAutorizacionGerente(wfPackage, wfTitle, wfText, wfFolio, wfPuesto, subject, rqwf_gerenteArea)
{

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
  wfMail.args.workflowDescription = 'Autorización de requisición de personal';
  wfMail.args.workflowDueDate = new Date();
  wfMail.args.solicitudFolio = wfFolio;
  wfMail.args.workflowDocuments = wfPackage.children;
  
  
  

  var userNodeId =  people.getPerson(rqwf_gerenteArea) ;
  logger.log("user detail Node ::::"+userNodeId.properties.email);
  var memberEmail = userNodeId.properties.email;
  
  logger.debug('Enviando notificación a:  [' + memberEmail + ']');
  
  var mail = actions.create('mail');

	mail.parameters.to = memberEmail;
	mail.parameters.subject = subject;
	//mail.parameters.text = text;
	mail.parameters.template = template;
	mail.parameters.template_model = wfMail;

	mail.execute(wfPackage);

	logger.debug('Correo enviado end user!');
  

}

function sendMailAutorizacionPendiente(wfPackage, wfTitle, wfText, wfFolio, wfPuesto, subject, group)
{

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
  wfMail.args.workflowDescription = 'Se requiere de su autorización de Requisición de Personal';
  wfMail.args.workflowDueDate = new Date();
  wfMail.args.solicitudFolio = wfFolio;
  wfMail.args.workflowDocuments = wfPackage.children;
  
  
  var group = people.getGroup(group);
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
					logger.debug('Enviando correo a end user: ' + memberEmail);

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
