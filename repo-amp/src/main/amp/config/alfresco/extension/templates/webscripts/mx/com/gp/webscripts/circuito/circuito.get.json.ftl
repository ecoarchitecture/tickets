{
  "circuitos":
  [
<#list circuitos as circuito>
    "${circuito}"<#if circuito_has_next>,</#if>
</#list>
  ]
}
