/**
 * 
 */
package mx.com.gp.service.impl;

import org.activiti.engine.delegate.DelegateExecution;
import org.activiti.engine.delegate.JavaDelegate;
import org.activiti.engine.impl.cfg.ProcessEngineConfigurationImpl;
import org.activiti.engine.impl.context.Context;
import org.alfresco.repo.workflow.activiti.ActivitiConstants;
import org.alfresco.service.ServiceRegistry;
import org.alfresco.service.cmr.security.AuthenticationService;

/**
 * @author vanderluk
 *
 */
public class GPAuthenticationService implements JavaDelegate {
	
	
	public ServiceRegistry serviceRegistry;
	
	public AuthenticationService authenticationService;

	/* (non-Javadoc)
	 * @see org.activiti.engine.delegate.JavaDelegate#execute(org.activiti.engine.delegate.DelegateExecution)
	 */
	@Override
	public void execute(DelegateExecution arg0) throws Exception {
		// TODO Auto-generated method stub
		
		
		this.serviceRegistry = getServiceRegistry();
		
		AuthenticationService authService = serviceRegistry.getAuthenticationService();
		
		authService.authenticateAsGuest();

	}
	
	
	protected ServiceRegistry getServiceRegistry() {

        ProcessEngineConfigurationImpl config = Context.getProcessEngineConfiguration();

        if (config != null) {

            // Fetch the registry that is injected in the activiti spring-configuration

        	
        	
            ServiceRegistry registry = (ServiceRegistry) config.getBeans().get(ActivitiConstants.SERVICE_REGISTRY_BEAN_KEY);

            if (registry == null) {

                throw new RuntimeException(

                            "Service-registry not present in ProcessEngineConfiguration beans, expected ServiceRegistry with key" + 

                            ActivitiConstants.SERVICE_REGISTRY_BEAN_KEY);

            }

            return registry;
        }
        throw new IllegalStateException("No ProcessEngineCOnfiguration found in active context");

    }	


}
