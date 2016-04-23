package mx.com.gp.stickets.listeners;

import java.util.Map;

import org.activiti.engine.delegate.DelegateExecution;
import org.activiti.engine.delegate.ExecutionListener;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public class ProcessExecutionListener implements ExecutionListener {

	private static final long serialVersionUID = 2446538459399992108L;

	private static Log logger = LogFactory.getLog(ProcessExecutionListener.class);

	@Override
	public void notify(DelegateExecution execution) throws Exception {

		logger.error("ProcessExecutionListener.notify()");

		//	Set initial values
		String name = "Administrator";
  		logger.error("current user: "+name);
      	execution.setVariable("stwf_ticketUser", name);
      	execution.setVariable("stwf_ticketFolio", "0");



		Map<String, Object> variables = execution.getVariables();

		for (Object key : variables.keySet()) {
			System.out.println("Key : " + key.toString() + " Value : " + variables.get(key));
		}

		logger.error("ProcessExecutionListener.notify()");
	}

}
