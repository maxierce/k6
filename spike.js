import { sleep } from "k6";
import http from "k6/http";

export const options= {
    stages:[{
        duration: "2m",
        target: 100
    },
    {
     duration: "60s",
     target:350
    },
    {
    duration: "60s",
     target:200
   }
]
};

export default function(){
    let response = http.get("https://cotizacion-homologacion.invertironline.com/api/cotizacion?idTitulo=444&idMercado=1&plazo=4")
    check(response, {
      'El codigo de estado es 200': (r) => r.status === 200,
    })
  sleep(1);
}