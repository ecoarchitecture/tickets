package mx.com.gp.stickets.listeners;

import java.util.HashMap;
import java.util.Map;

import org.activiti.engine.delegate.DelegateExecution;
import org.activiti.engine.delegate.DelegateTask;
import org.activiti.engine.delegate.TaskListener;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public class AsignacionSolicitudRequisicion implements TaskListener {


	private static final long serialVersionUID = 3345402462629333568L;

	private static Log logger = LogFactory.getLog(AsignacionSolicitudRequisicion.class);

	

	@Override
    public void notify(DelegateTask task) {

		logger.error(":::::: aDelegate Notify ::::::" +task.getEventName());

		if (task.getEventName().equals("create")){
			processCreateEvent(task);
		}

		if (task.getEventName().equals("complete")){
			processCompleteEvent(task);
		}
	}

	private void processCreateEvent(DelegateTask task){

		logger.error("Init processCreateEvent :::::::::");


	}

	private void processCompleteEvent(DelegateTask task){


		logger.debug("Asignando Responsable de área");

		DelegateExecution execution = task.getExecution();

		String gerente = getGerente(task);
		
		logger.error("Gerente Asignado ::::" + gerente);
		
		execution.setVariable("rqwf_gerenteArea", gerente);
		execution.setVariable("bpm_reassignable", false);

	}
	
	/**
	 * 
	 * @param task
	 * @return
	 */
	private String getGerente(DelegateTask task){
		
		Map<String,String> mapAutorizaciones = new HashMap<String, String>();
		Map<String,String> mapGerentesAreas = new HashMap<String, String>();
		mapAutorizaciones.put("JUMEX ALMACEN", "REGA0914");
		mapAutorizaciones.put("TALLER ECATEPEC", "REGA0914");
		mapAutorizaciones.put("TALLER TULTI", "REGA0914");
		mapAutorizaciones.put("PATIO CENTRAL", "REGA0914");
		
		mapAutorizaciones.put("INSPECCION", "AIGH0111");
		mapAutorizaciones.put("AT RH", "EAMJ1112");
		mapAutorizaciones.put("AT SISTEMAS", "REMA0726");
		
		mapAutorizaciones.put("AT SISTEMAS", "REMA0726");
		
		
		mapAutorizaciones.put("PUEBLA TALLER", "REGA0914");
		mapAutorizaciones.put("VERACRUZ TALLER", "REGA0914");
		mapAutorizaciones.put("CIVAC TALLER", "REGA0914");
		mapAutorizaciones.put("AGUAS TALLER", "REGA0914");
		mapAutorizaciones.put("MAD RECURSOS HUMANOS", "EAMJ1112");
		mapAutorizaciones.put("MAD SISTEMAS", "REMA0726");
		mapAutorizaciones.put("MAD CONTABILIDAD", "GAGE0215");
		mapAutorizaciones.put("MAD CAJEROS", "PEAM0628");
		
		mapAutorizaciones.put("ADMIN DE EQUIPO", "AIGH0111");
		mapAutorizaciones.put("NOMINAS", "EEDJ1017");
		mapAutorizaciones.put("JURIDICO", "EAMJ1112");
		mapAutorizaciones.put("INFRAESTRUCTURA TEC.", "REMA0726");
		mapAutorizaciones.put("FACTURACION & COBRANZA", "NAAD1014");
		mapAutorizaciones.put("CONTABILIDAD", "GAGE0215");
		mapAutorizaciones.put("RECURSOS HUMANOS", "EAMJ1112");
		mapAutorizaciones.put("CONTRALORIA", "GAGE0215");
		mapAutorizaciones.put("TESORERIA", "PEAM0628");
		mapAutorizaciones.put("DIRECCION GP", "GAGE0215");
		mapAutorizaciones.put("AT CONTABILIDAD", "GAGE0215");
		mapAutorizaciones.put("AT CAJEROS", "PEAM0628");
		
		
		mapGerentesAreas.put("AUTOTRANSPORTE", "HOMJ1008");
		mapGerentesAreas.put("MADRINAS", "VAMN0606");
		mapGerentesAreas.put("PRESIDENCIA", "GAGE0215");
		
		String division = (String)task.getVariable("rqwf_division");
		String circuito = (String)task.getVariable("rqwf_circuito");
		String centroCostos = (String)task.getVariable("rqwf_centroCostos");
		
		
		logger.error("Centro de Costos :::" + centroCostos);
		
		String gerente = mapAutorizaciones.get(centroCostos);
		
		if(gerente == null){
			logger.error("No se encontro en los gerentes especiales ...");
			
			gerente = mapGerentesAreas.get(division);
			
		}
		
		return gerente;
		
	}






}
