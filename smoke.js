import { sleep } from "k6";
import http from "k6/http";
import { check } from 'k6';
// k6 run --summary-export=results.json smoke.js

export const options= {
    vus: 1,
    duration: "20s"
};

export default function(){
    let response = http.get("https://cotizacion-homologacion.invertironline.com/api/cotizacion?idTitulo=444&idMercado=1&plazo=4")
    check(response, {
        'El codigo de estado es 200': (r) => r.status === 200,
        'Verificar que la respuesta nos devuelva la palabra "cotizaciones"': (r) =>
          r.body.includes('cotizacion')
      })
    sleep(1);
}