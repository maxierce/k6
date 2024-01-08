import http from "k6/http"

export default function(){
    let response = http.get("https://cotizacion-homologacion.invertironline.com/api/cotizacion?idTitulo=99919&idMercado=1&plazo=4")
}