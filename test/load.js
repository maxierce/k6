import { sleep } from "k6";
import http from "k6/http";

export const options= {
    stages:[{
        duration: "2m",
        target: 100
    },
    {
     duration: "1m",
     target:100
    },
    {
    duration: "45s",
     target:150
   },
    {
    duration: "45s",
     target:150
   },
   {
   duration: "1m",
    target:100
  }
]
};

export default function(){
    let response = http.get("https://cotizacion-homologacion.invertironline.com/api/cotizacion?idTitulo=444&idMercado=1&plazo=4")

  //  sleep(1);
} 