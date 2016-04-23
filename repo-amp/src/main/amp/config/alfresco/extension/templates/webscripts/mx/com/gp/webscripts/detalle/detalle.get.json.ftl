{
  "detalles":
  [
<#list detalles as detalle>
    "${detalle}"<#if detalle_has_next>,</#if>
</#list>
  ]
}
