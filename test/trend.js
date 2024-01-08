import { sleep } from "k6";
import http, { request } from "k6/http";
import { check } from 'k6';
import { Trend } from "k6/metrics";
// k6 run --summary-export=results.json smoke.js
export const options= {
    vus: 50,
    duration: "20s",
    threshold:{
        http_req_failed:["rate<.01"],
        http_req_duration:["p(90) < 500"]
    }
};

const myTrend = new Trend("durations_time");
const mySecodTrend = new Trend("categories_time");

export default function(){
    let response = http.get("https://cotizacion-homologacion.invertironline.com/api/cotizacion?idTitulo=17388&idMercado=1&plazo=4")
    check(response, {
        'El codigo de estado es 200': (r) => r.status === 200,
        'Verificar que la respuesta nos devuelva la palabra "cotizaciones"': (r) =>
          r.body.includes('cotizacion')
      })
    myTrend.add(response.timings.duration);

    let responseDos = http.get("https://cotizacion-homologacion.invertironline.com/api/cotizacion?idTitulo=444&idMercado=1&plazo=4")
    check(response, {
        'El codigo de estado es 200': (r) => r.status === 200,
        'Verificar que la respuesta nos devuelva la palabra "cotizaciones"': (r) =>
          r.body.includes('cotizacion'),
          "El tiempo de respuesta es menor a 5s": (r)=> r.timings.duration < 500
      })
      mySecodTrend.add(responseDos.timings.duration);

}