package mx.com.gp.tickets.webscripts;

import java.util.Map;

import org.alfresco.service.cmr.repository.ContentService;
import org.alfresco.service.cmr.repository.NodeService;
import org.alfresco.service.cmr.search.SearchService;
import org.alfresco.service.cmr.site.SiteService;
import org.apache.log4j.Logger;
import org.springframework.extensions.webscripts.DeclarativeWebScript;
import org.springframework.extensions.webscripts.Status;
import org.springframework.extensions.webscripts.WebScriptRequest;

import mx.com.gp.tickets.webscripts.utils.ReadDataFile;

public class EquipoFallaWebscript extends DeclarativeWebScript {

	protected NodeService nodeService;
	protected ContentService contentService;
	protected SearchService searchService;
	protected SiteService siteService;

	public SiteService getSiteService() {
		return siteService;
	}

	public void setSiteService(SiteService siteService) {
		this.siteService = siteService;
	}

	public NodeService getNodeService() {
		return nodeService;
	}

	public void setNodeService(NodeService nodeService) {
		this.nodeService = nodeService;
	}

	public ContentService getContentService() {
		return contentService;
	}

	public void setContentService(ContentService contentService) {
		this.contentService = contentService;
	}

	public SearchService getSearchService() {
		return searchService;
	}

	public void setSearchService(SearchService searchService) {
		this.searchService = searchService;
	}

	public static Logger logger = Logger.getLogger(EquipoFallaWebscript.class.getName());

	@Override
	protected Map<String, Object> executeImpl(WebScriptRequest request, Status status){

		logger.error("Inicia WebScript Equipo");

		String fileName = "EQUIPO.list";
	    String dataResultName = "equipos";

	    Map<String, Object> model = new ReadDataFile().execute(searchService, contentService, fileName, dataResultName);

	    logger.error("equipos "+model.get(dataResultName));
	    logger.error("Termina WebScript Equipos");

	    return model;
	}
}
