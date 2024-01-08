import { sleep } from "k6";
import http from "k6/http";
import { check } from 'k6';

export const options= {
    stages:[{
        duration: "60s",
        target: 10
    },
    {
     duration: "300s",
     target:10
    },
    {
    duration: "60s",
     target:0
}]
};

export default function(){
    let response = http.get("https://cotizacion-homologacion.invertironline.com/api/cotizacion?idTitulo=444&idMercado=1&plazo=4")
    check(response, {
        'is status 200': (r) => r.status === 200,
      });
    sleep(1);
}