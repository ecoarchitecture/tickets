package mx.com.gp.stickets.listeners;

import org.activiti.engine.delegate.DelegateExecution;
import org.activiti.engine.delegate.DelegateTask;
import org.activiti.engine.delegate.TaskListener;
import org.alfresco.service.cmr.site.SiteService;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public class ITAnalyzesTicket implements TaskListener {

	protected SiteService siteService;

	private static final long serialVersionUID = 3345402462629333568L;

	private static Log logger = LogFactory.getLog(ITAnalyzesTicket.class);


	private static final String DESC_TASK_PRIORITY_HIGH = "Alta";

	private static final String DESC_TASK_PRIORITY_NORMAL = "Normal";

	private static final String DESC_TASK_PRIORITY_LOW = "Baja";

	private static final int TASK_PRIORITY_HIGH = 1;

	private static final int TASK_PRIORITY_NORMAL = 2;

	private static final int TASK_PRIORITY_LOW = 3;


	@Override
    public void notify(DelegateTask task) {

		logger.error(":::::: Delegate Notify ::::::");


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


		logger.error("ITAnalyzesTicket.notify() analisis");

		DelegateExecution execution = task.getExecution();


		logger.error("task assignee "+ task.getAssignee());
		execution.setVariable("stwf_ticketTechnician", task.getAssignee());
		execution.setVariable("bpm_reassignable", false);

	}






}
