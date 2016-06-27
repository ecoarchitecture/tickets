{
  "divisiones":
  [
<#list divisiones as division>
    "${division}"<#if division_has_next>,</#if>
</#list>
  ]
}
