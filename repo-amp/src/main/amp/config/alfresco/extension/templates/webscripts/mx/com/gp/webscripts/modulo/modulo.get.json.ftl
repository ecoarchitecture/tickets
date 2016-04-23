{
  "modulos":
  [
<#list modulos as modulo>
    "${modulo}"<#if modulo_has_next>,</#if>
</#list>
  ]
}
