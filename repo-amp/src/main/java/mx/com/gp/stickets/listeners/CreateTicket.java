/**
 *
 */
package mx.com.gp.stickets.listeners;

import org.activiti.engine.delegate.DelegateExecution;
import org.activiti.engine.delegate.DelegateTask;
import org.activiti.engine.delegate.ExecutionListener;
import org.activiti.engine.delegate.TaskListener;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

/**
 * @author vanderluk
 *
 */
public class CreateTicket implements ExecutionListener {

	private static final long serialVersionUID = 3345402462629333568L;

	private static Log logger = LogFactory.getLog(CreateTicket.class);


	@Override
	public void notify(DelegateExecution arg0) throws Exception {

		logger.error("Notify Execution:::");

		if(arg0.getEventName().equals("start")){
			logger.error("start event :::");
			processStartEvent(arg0);
		}
		
		

	}


	/**
	 *
	 * @param execution
	 */
	private void processStartEvent(DelegateExecution execution){
		logger.error("processStartEvent::::");



		/*
		execution.setVariable("stwf_ticketUserName", person.properties.userName);
  		execution.setVariable("stwf_ticketUserFirstName", person.properties.firstName);
  		execution.setVariable("stwf_ticketUserLastName", person.properties.lastName);
  		execution.setVariable("stwf_ticketUserEmail", person.properties.email);
  		execution.setVariable("stwf_ticketUserTelephone", person.properties.telephone);
  		execution.setVariable("stwf_ticketUserMobile", person.properties.mobile);
      	execution.setVariable("stwf_ticketUser", person);
      	execution.setVariable("stwf_ticketFolio", '0');
      	execution.setVariable("stwf_CloseTicketNotifications", 0);*/


	}


}
