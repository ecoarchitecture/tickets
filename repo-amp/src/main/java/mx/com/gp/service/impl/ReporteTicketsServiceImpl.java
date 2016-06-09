/**
 * 
 */
package mx.com.gp.service.impl;

import java.io.Serializable;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.activiti.engine.delegate.DelegateExecution;
import org.activiti.engine.delegate.JavaDelegate;
import org.activiti.engine.impl.cfg.ProcessEngineConfigurationImpl;
import org.activiti.engine.impl.context.Context;
import org.alfresco.model.ContentModel;
import org.alfresco.repo.content.MimetypeMap;
import org.alfresco.repo.workflow.activiti.ActivitiConstants;
import org.alfresco.service.ServiceRegistry;
import org.alfresco.service.cmr.model.FileFolderService;
import org.alfresco.service.cmr.repository.ContentService;
import org.alfresco.service.cmr.repository.ContentWriter;
import org.alfresco.service.cmr.repository.NodeRef;
import org.alfresco.service.cmr.repository.NodeService;
import org.alfresco.service.cmr.repository.StoreRef;
import org.alfresco.service.cmr.search.ResultSet;
import org.alfresco.service.cmr.search.ResultSetRow;
import org.alfresco.service.cmr.search.SearchService;
import org.alfresco.service.cmr.security.AuthenticationService;
import org.alfresco.service.cmr.security.PersonService;
import org.alfresco.service.namespace.NamespaceService;
import org.alfresco.service.namespace.QName;
import org.apache.poi.hssf.usermodel.HSSFHeader;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Header;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * @author vanderluk
 *
 */
public class ReporteTicketsServiceImpl implements JavaDelegate {
	

	private static Logger logger = LoggerFactory.getLogger(ReporteTicketsServiceImpl.class);
	
	/**
	 * Spring dependency
	 */
	public ServiceRegistry serviceRegistry;
	
	public AuthenticationService authenticationService;
	
	private NodeService nodeService;
	
	private ContentService contentService;
	

	/* (non-Javadoc)
	 * @see mx.com.gp.service.ReporteTicketsService#generateReporte()
	 */
	public void generateReporte(String stwfTipoReporte, String stwfReportDescription) {

		this.serviceRegistry = getServiceRegistry();
		
		nodeService = serviceRegistry.getNodeService();
		
		AuthenticationService authService = serviceRegistry.getAuthenticationService();
		PersonService personService = (PersonService)serviceRegistry.getPersonService();
		// Get current user
		NodeRef person = personService.getPerson(authService.getCurrentUserName());

		SearchService searchService = serviceRegistry.getSearchService();
		// Getting a NodeRef from its path
		ResultSet results = searchService.query(person.getStoreRef(), SearchService.LANGUAGE_LUCENE, "PATH:\"/app:company_home/st:sites/cm:support-tickets-site/cm:documentLibrary/cm:Tickets/cm:Current/*\"");
		
		
		
		//Blank workbook
        XSSFWorkbook workbook = new XSSFWorkbook(); 
        
        //Create a blank sheet
        XSSFSheet sheet = workbook.createSheet("Reporte de Tickets de Soporte");
        
        
        
   
		int rownum = 0;
		int cellnumHeader = 0;
		
		//Headers
		
		Row rowHeader = sheet.createRow(rownum++);
		Cell cellHeader = rowHeader.createCell(cellnumHeader++);
        cellHeader.setCellValue("USUARIO");
		
        Cell cellCreatedHeader = rowHeader.createCell(cellnumHeader++);
        cellCreatedHeader.setCellValue("FECHA");
        
        Cell cellEquipmentHeader = rowHeader.createCell(cellnumHeader++);
        cellEquipmentHeader.setCellValue("EQUIPO");
        
        Cell cellPriorityHeader = rowHeader.createCell(cellnumHeader++);
        cellPriorityHeader.setCellValue("PRIORIDAD");
        
        Cell cellDescriptionHeader = rowHeader.createCell(cellnumHeader++);
        cellDescriptionHeader.setCellValue("DESCRIPCIÓN");
        
        
        Cell cellModuleHeader = rowHeader.createCell(cellnumHeader++);
        cellModuleHeader.setCellValue("MÓDULO");
        
        Cell cellStatusHeader = rowHeader.createCell(cellnumHeader++);
        cellStatusHeader.setCellValue("ESTADO");
        
        Cell cellUserHeader = rowHeader.createCell(cellnumHeader++);
        cellUserHeader.setCellValue("TÉCNICO");
        
        Cell cellFolioHeader = rowHeader.createCell(cellnumHeader++);
        cellFolioHeader.setCellValue("FOLIO");
        
        Cell cellUnitCostHeader = rowHeader.createCell(cellnumHeader++);
        cellUnitCostHeader.setCellValue("UNIDAD");
        
        Cell cellRatingHeader = rowHeader.createCell(cellnumHeader++);
        cellRatingHeader.setCellValue("CALIFICACIÓN");
		
		 for(ResultSetRow rowAlfresco : results)
         {
			 
			 Row row = sheet.createRow(rownum++);
			 int cellnum = 0;
			 
             NodeRef currentNodeRef = rowAlfresco.getNodeRef();
             
            String creator = (String) nodeService.getProperty(currentNodeRef,PROP_QNAME_CREATOR);
            Cell cell = row.createCell(cellnum++);
            cell.setCellValue(creator);

            Date created = (Date) nodeService.getProperty(currentNodeRef, PROP_QNAME_CREATED);
            Cell cellCreated = row.createCell(cellnum++);
            cellCreated.setCellValue(created);
            
            String ticketEquipment = (String)nodeService.getProperty(currentNodeRef, PROP_QNAME_EQUIPMENT);
            Cell cellEquipment = row.createCell(cellnum++);
            cellEquipment.setCellValue(ticketEquipment);
        

            String priority = (String)nodeService.getProperty(currentNodeRef, PROP_QNAME_PRIORITY);
            Cell cellPriority = row.createCell(cellnum++);
            cellPriority.setCellValue(priority);

            String description = (String)nodeService.getProperty(currentNodeRef, PROP_QNAME_DESCRIPTION);
            Cell cellDescription = row.createCell(cellnum++);
            cellDescription.setCellValue(description);
            
            
            String ticketModule= (String)nodeService.getProperty(currentNodeRef, PROP_QNAME_MODULE);
            Cell cellModule = row.createCell(cellnum++);
            cellModule.setCellValue(ticketModule);
            
            
            String ticketStatus= (String)nodeService.getProperty(currentNodeRef, PROP_QNAME_STATUS);
            Cell cellStatus = row.createCell(cellnum++);
            cellStatus.setCellValue(ticketStatus);
            
            
            String user= (String)nodeService.getProperty(currentNodeRef, PROP_QNAME_TECHNICIAN);
            Cell cellUser = row.createCell(cellnum++);
            cellUser.setCellValue(user);
            
            String folio= (String)nodeService.getProperty(currentNodeRef, PROP_QNAME_FOLIO);
            Cell cellFolio = row.createCell(cellnum++);
            cellFolio.setCellValue(folio);
          
            String unitCosts= (String)nodeService.getProperty(currentNodeRef, PROP_QNAME_UNIT_COSTS);
            Cell cellUnitCost = row.createCell(cellnum++);
            cellUnitCost.setCellValue(unitCosts);
            
            String rating= (String)nodeService.getProperty(currentNodeRef, PROP_QNAME_UNIT_RATING);
            Cell cellRating = row.createCell(cellnum++);
            cellRating.setCellValue(rating);
             
         }
		
		 String reportName = "Reporte_Tickets-"+  new Date().getTime()+".xlsx";
		 
		
		 
		 StoreRef storeRef = new StoreRef(StoreRef.PROTOCOL_WORKSPACE, "SpacesStore");
		 contentService = serviceRegistry.getContentService();
	     FileFolderService fileFolderService = serviceRegistry.getFileFolderService();
	     
	     
	     ResultSet rs = searchService.query(storeRef, SearchService.LANGUAGE_LUCENE, "PATH:\"/app:company_home/st:sites/cm:support-tickets-site/cm:documentLibrary/cm:Reports\"");
	       NodeRef companyHomeNodeRef = null;
	       try
	       {
	           if (rs.length() == 0)
	           {
	               System.out.println("Didn't find Company Home");
	           }
	           companyHomeNodeRef = rs.getNodeRef(0);
	           
	           
	        // Create a map to contain the values of the properties of the node
	           
	           Map<QName, Serializable> props = new HashMap<QName, Serializable>(1);
	           props.put(ContentModel.PROP_NAME, reportName); 
	           props.put(PROP_QNAME_TIPO_REPORTE, stwfTipoReporte);
	           
	           props.put(ContentModel.PROP_DESCRIPTION, stwfReportDescription);

	           // use the node service to create a new node
	           NodeRef node = this.nodeService.createNode(
	        		   companyHomeNodeRef, 
	                               ContentModel.ASSOC_CONTAINS, 
	                               QName.createQName(NamespaceService.CONTENT_MODEL_1_0_URI, reportName),
	                               ContentModel.TYPE_CONTENT, 
	                               props).getChildRef();
	                               
	           
	           
	           
	           nodeService.setType(node, PROP_QNAME_MY_TYPE);
	           
	           // Use the content service to set the content onto the newly created node
	           ContentWriter writer = this.contentService.getWriter(node, ContentModel.PROP_CONTENT, true);
	           writer.setMimetype(MimetypeMap.MIMETYPE_EXCEL);
	           writer.setEncoding("UTF-8");
	           
	           try
	           {
	               //Write the workbook in file system
	  			 
	  			 //System.out.println("Report Name : "+reportName);
//	  			FileOutputStream out = new FileOutputStream(new File(reportName));
	        	   workbook.write(writer.getContentOutputStream());    
//	               out.close();
	           } 
	           catch (Exception e) 
	           {
	               e.printStackTrace();
	           }
	           
	           
	           
	           
	           
	           
	       }
	       finally
	       {
	           rs.close();
	       }
		 
	}







	/**
	 * @param serviceRegistry the serviceRegistry to set
	 */
	public void setServiceRegistry(ServiceRegistry serviceRegistry) {
		this.serviceRegistry = serviceRegistry;
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






	@Override
	public void execute(DelegateExecution execution) throws Exception {
		
		Date fechaInicio =(Date) execution.getVariable("stwf_reportFechaInicio");
		Date fechaFin =(Date) execution.getVariable("stwf_reportFechaFin");
		
		String tipoReporte =(String) execution.getVariable("stwf_tipoReporte");
		
		String description = (String) execution.getVariable("bpm_workflowDescription");
		
		System.out.println("Fecha De Inicio" + fechaInicio) ;
		System.out.println("Fecha De Fin" + fechaFin) ;
		System.out.println("tipoReporte " + tipoReporte) ;
		
		// TODO Auto-generated method stub
		generateReporte(tipoReporte, description);
	}







	/**
	 * @param authenticationService the authenticationService to set
	 */
	public void setAuthenticationService(AuthenticationService authenticationService) {
		this.authenticationService = authenticationService;
	}





	QName PROP_QNAME_FOLIO = QName.createQName("http://www.granporturaria.com.mx/model/content/1.0", "ticketFolio");
	QName PROP_QNAME_EQUIPMENT = QName.createQName("http://www.granporturaria.com.mx/model/content/1.0", "ticketEquipment");
	QName PROP_QNAME_CREATED = QName.createQName("http://www.alfresco.org/model/content/1.0", "created");
	QName PROP_QNAME_PRIORITY = QName.createQName("http://www.granporturaria.com.mx/model/content/1.0", "ticketPriority");
	QName PROP_QNAME_USER_MOBILE = QName.createQName("http://www.granporturaria.com.mx/model/content/1.0", "ticketUserMobile");
	QName PROP_QNAME_USER_FIRST_NAME = QName.createQName("http://www.granporturaria.com.mx/model/content/1.0", "ticketUserFirstName");
	QName PROP_QNAME_DESCRIPTION = QName.createQName("http://www.alfresco.org/model/content/1.0", "description");
	QName PROP_QNAME_CREATOR = QName.createQName("http://www.alfresco.org/model/content/1.0", "creator");
	QName PROP_QNAME_USER_LAST_NAME = QName.createQName("http://www.granporturaria.com.mx/model/content/1.0", "ticketUserLastName");
	QName PROP_QNAME_USER_EMAIL = QName.createQName("http://www.granporturaria.com.mx/model/content/1.0", "ticketUserEmail");
	QName PROP_QNAME_MODULE = QName.createQName("http://www.granporturaria.com.mx/model/content/1.0", "ticketModule");
	QName PROP_QNAME_STATUS = QName.createQName("http://www.granporturaria.com.mx/model/content/1.0", "ticketStatus");
	QName PROP_QNAME_UNIT_COSTS = QName.createQName("http://www.granporturaria.com.mx/model/content/1.0", "ticketUnitCost");
	QName PROP_QNAME_UNIT_USER = QName.createQName("http://www.granporturaria.com.mx/model/content/1.0", "ticketUserName");
	QName PROP_QNAME_UNIT_RATING = QName.createQName("http://www.granporturaria.com.mx/model/content/1.0", "ticketServiceRating");
	QName PROP_QNAME_TECHNICIAN = QName.createQName("http://www.granporturaria.com.mx/model/content/1.0", "ticketTechnician");
	
	QName PROP_QNAME_MY_TYPE = QName.createQName("http://www.granporturaria.com.mx/model/content/1.0", "reporteISO9001");
	QName PROP_QNAME_TIPO_REPORTE = QName.createQName("http://www.granporturaria.com.mx/model/content/1.0", "tipoReporte");
	
	








	
	
	
}
