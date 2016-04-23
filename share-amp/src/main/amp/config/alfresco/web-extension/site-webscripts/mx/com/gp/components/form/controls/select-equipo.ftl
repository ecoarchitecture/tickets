<#include "/org/alfresco/components/form/controls/common/utils.inc.ftl" />

<script language="JavaScript" type="text/javascript">
function initEquipos()
{
  setTimeout(function() { loadEquiposOptions(); }, 1000);
}

function loadEquiposOptions()
{
  var fieldId = '${fieldHtmlId}';
  var fieldValue = '${field.value?string}';

  console.log("fieldValue "+'${field.value?string}');
  console.log("field "+'${field}');

  Alfresco.util.Ajax.request(
  {
    url : Alfresco.constants.PROXY_URI + '/mx/com/gp/equipo',
    successCallback :
    {
      fn : function(response)
      {
        var selectObj = document.getElementById(fieldId);
        var opt;

        for (var i = 0; i < response.json.equipos.length; i++)
        {
          opt = document.createElement('option');

          opt.value = response.json.equipos[i];
          opt.text = opt.value;

          selectObj.add(opt);
        }

        if (fieldValue != ''){
        	selectObj.value = fieldValue;
        	getModulos(selectObj);
        }
      }
    },
    failureMessage : 'Error al cargar los Equipos y Sistemas',
    successMessage : 'Se cargó la lista de Equipos y Sistemas'
  });

}

function getModulos(equipo)
{
	if (equipo != null && equipo.value != null && equipo.value != '' && equipo.value != 'OTRO'){
	  var fieldId = '${fieldHtmlId}';
	  fieldId = fieldId.substring(0, fieldId.lastIndexOf('_') + 1);

	  var moduloField = document.getElementById(getModuloFieldId());
	  moduloField.innerHTML = "";

	  var detalleField = document.getElementById(getDetalleFieldId());
	  detalleField.innerHTML = "";

	  Alfresco.util.Ajax.request(
	  {
	    url : Alfresco.constants.PROXY_URI + '/mx/com/gp/modulo?equipo=' + escape(equipo.value),
	    successCallback :
	    {
	      fn : function(response)
	      {
	        var txtObj = document.getElementById(fieldId + 'ticketModule');
	        txtObj.innerHTML = "";

	        var opt;
	        var moduloValue = getValueModulo();

	        console.log("inEquipo-GetModulos get valueModulo");
	        console.log("equipoGetValueModulo "+moduloValue);

			opt = document.createElement('option');

			opt.value = '';
			opt.text = opt.value;
			txtObj.add(opt);

	        for (var i = 0; i < response.json.modulos.length; i++)
	        {
	          opt = document.createElement('option');

	          opt.value = response.json.modulos[i];
	          opt.text = opt.value;

	          if(opt.value == moduloValue){
	          	console.log("opt.value == moduloValue");
	          	console.log("opt.value "+opt.value);

	          	opt.selected = true;
	          }

	          txtObj.add(opt);

	          console.log("modulos.value "+txtObj.value);
	        }
	        getDetalles(moduloValue);
	      }
	    },
	    failureMessage : 'Error al cargar los Modulos para el Equipo o Sistema [' + equipo.value + ']',
	    successMessage : 'Se cargaron los Modulos de [' + equipo.value + ']'
	  });
	 }

	 if (equipo.value == 'OTRO'){

	 	var moduloField = document.getElementById(getModuloFieldId());
		moduloField.innerHTML = "";

		var detalleField = document.getElementById(getDetalleFieldId());
		detalleField.innerHTML = "";


		var fieldId = '${fieldHtmlId}';
		fieldId = fieldId.substring(0, fieldId.lastIndexOf('_') - 4);
		var txtObj = document.getElementById(fieldId + 'bpm_comment');
		txtObj.required=true;
	 }
}

initEquipos();
</script>

<#if field.control.params.optionSeparator??>
   <#assign optionSeparator=field.control.params.optionSeparator>
<#else>
   <#assign optionSeparator=",">
</#if>
<#if field.control.params.labelSeparator??>
   <#assign labelSeparator=field.control.params.labelSeparator>
<#else>
   <#assign labelSeparator="|">
</#if>

<#assign fieldValue=field.value>

<#if fieldValue?string == "" && field.control.params.defaultValueContextProperty??>
   <#if context.properties[field.control.params.defaultValueContextProperty]??>
      <#assign fieldValue = context.properties[field.control.params.defaultValueContextProperty]>
   <#elseif args[field.control.params.defaultValueContextProperty]??>
      <#assign fieldValue = args[field.control.params.defaultValueContextProperty]>
   </#if>
</#if>

<div class="form-field">
   <#if form.mode == "view">
      <div class="viewmode-field">
         <#if field.mandatory && !(fieldValue?is_number) && fieldValue?string == "">
            <span class="incomplete-warning"><img src="${url.context}/res/components/form/images/warning-16.png" title="${msg("form.field.incomplete")}" /><span>
         </#if>
         <span class="viewmode-label">${field.label?html}:</span>
         <#if fieldValue?string == "">
            <#assign valueToShow=msg("form.control.novalue")>
         <#else>
            <#assign valueToShow=fieldValue>
            <#if field.control.params.options?? && field.control.params.options != "">
               <#list field.control.params.options?split(optionSeparator) as nameValue>
                  <#if nameValue?index_of(labelSeparator) == -1>
                     <#if nameValue == fieldValue?string || (fieldValue?is_number && fieldValue?c == nameValue)>
                        <#assign valueToShow=nameValue>
                        <#break>
                     </#if>
                  <#else>
                     <#assign choice=nameValue?split(labelSeparator)>
                     <#if choice[0] == fieldValue?string || (fieldValue?is_number && fieldValue?c == choice[0])>
                        <#assign valueToShow=msgValue(choice[1])>
                        <#break>
                     </#if>
                  </#if>
               </#list>
            </#if>
         </#if>
         <span class="viewmode-value">${valueToShow?html}</span>
      </div>
   <#else>
      <label for="${fieldHtmlId}">${field.label?html}:<#if field.mandatory><span class="mandatory-indicator">${msg("form.required.fields.marker")}</span></#if></label>

         <select id="${fieldHtmlId}" name="${field.name}" tabindex="0" onchange="getModulos(this);"
               <#if field.description??>title="${field.description}"</#if>
               <#if field.indexTokenisationMode??>class="non-tokenised"</#if>
               <#if field.control.params.size??>size="${field.control.params.size}"</#if>
               <#if field.control.params.styleClass??>class="${field.control.params.styleClass}"</#if>
               <#if field.control.params.style??>style="${field.control.params.style}"</#if>
               <#if field.disabled  && !(field.control.params.forceEditable?? && field.control.params.forceEditable == "true")>disabled="true"</#if>>
               <option value=""></option>
         </select>
         <@formLib.renderFieldHelp field=field />

   </#if>
</div>
