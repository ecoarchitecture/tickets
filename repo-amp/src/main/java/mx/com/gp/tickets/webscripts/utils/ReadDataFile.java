package mx.com.gp.tickets.webscripts.utils;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.alfresco.model.ContentModel;
import org.alfresco.service.cmr.repository.ContentReader;
import org.alfresco.service.cmr.repository.ContentService;
import org.alfresco.service.cmr.repository.NodeRef;
import org.alfresco.service.cmr.repository.StoreRef;
import org.alfresco.service.cmr.search.ResultSet;
import org.alfresco.service.cmr.search.SearchService;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import mx.com.gp.stickets.listeners.ITAnalyzesTicket;

public class ReadDataFile {



	private static Log logger = LogFactory.getLog(ReadDataFile.class);

	public Map<String, Object> execute(SearchService searchService, ContentService contentService, String fileName, String dataResultName){

		List<String> fileDataListElement = new ArrayList<String>();

		//String qry = "PATH:\"/app:company_home/app:shared/cm:FUENTES.fnt\"";
		String qry = "PATH:\"/app:company_home/st:sites/cm:support-tickets-site/cm:documentLibrary/cm:Configuracion/cm:"+fileName+"\"";
		qry = qry.replaceAll(" ", "_");

		logger.error("ReadData File Query : " + qry);

		ResultSet rs = searchService.query(StoreRef.STORE_REF_WORKSPACE_SPACESSTORE, SearchService.LANGUAGE_FTS_ALFRESCO, qry);

		logger.error("ResultSet : "+ rs);

		NodeRef dataNodeRef = rs.getNodeRef(0);
		System.out.println ("dataNodeRef: "+dataNodeRef);

		ContentReader reader = contentService.getReader(dataNodeRef, ContentModel.PROP_CONTENT);
		System.out.println ("got reader");
		BufferedReader br = new BufferedReader(new InputStreamReader(reader.getContentInputStream()));

		String strLine;

		//Read File Line By Line
		try {
			while ((strLine = br.readLine()) != null)   {
			  // Print the content on the console
			  System.out.println ("dataLine: "+strLine);
			  fileDataListElement.add(strLine);
			}
			br.close();
		} catch (IOException e) {
			e.printStackTrace();
		}

		Map<String, Object> model = new HashMap<String, Object>();
		//model.put("fuente", fuentes);
	    model.put(dataResultName, fileDataListElement);

	    System.out.println(dataResultName+" "+fileDataListElement);
	    System.out.println("Termina WebScript "+dataResultName);

	    return model;
	}
}
