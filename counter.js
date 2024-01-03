import http from "k6/http"
import { Counter } from "k6/metrics"
import { check } from 'k6';
// k6 run --summary-export=results.json smoke.js
export const options={
    vus:10,
    duration:"20s"
}

const productsCounter = new Counter("calledProducts")
const categoriesCounter = new Counter("calledCategories")

export default function(){
    let response = http.get("https://cotizacion-homologacion.invertironline.com/api/cotizacion?idTitulo=444&idMercado=1&plazo=4")
    productsCounter.add(1);
    check(response, {
        'El codigo de estado es 200': (r) => r.status === 200,
      })

    let categories = http.get("https://cotizacion-homologacion.invertironline.com/api/cotizacion?idTitulo=17388&idMercado=1&plazo=4")
    categoriesCounter.add(1)
    
}