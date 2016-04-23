{
  "equipos":
  [
<#list equipos as equipo>
    "${equipo}"<#if equipo_has_next>,</#if>
</#list>
  ]
}
