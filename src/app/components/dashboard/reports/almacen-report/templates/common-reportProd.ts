import { Columns, Img, PdfMakeWrapper, Txt } from "pdfmake-wrapper";
import { Header } from "../intefaces/reportAlmacen-interfaces";

export async function createHeaderProduct(propiedad:Header, pdf:PdfMakeWrapper){
        const {documento, sucursal, empleado} = propiedad
       pdf.header([
           new Txt('A Dios sea la Gloria!').alignment('center').fontSize(14).color('#047886').margin(20).end
       ])        
       pdf.rawContent([
           new Columns([
               await new Img('https://images.freeimages.com/images/large-previews/c58/for-sale-1582326.jpg').fit([100, 100]).build(),
               
               [
                new Txt(`Tipo de reporte:`).alignment('center').bold().end,
                   new Txt(`${documento}`).alignment('center').end,
                   /* new Columns([
                       new Txt(`Serie:\nNo:`).alignment('right').end,
                       new Txt(`${serie}\n${numero}`).alignment('left').end
                   ]).margin([50,0]).end */
               ],
           ]).columnGap(20).margin(5).end,
           new Columns([
               new Txt(['Reporte generado en sucursal:']).bold().end,
               new Txt(`${sucursal.nombre}\n${sucursal.direccion}`).alignment('left').end,
               pdf.add(''),
           ]).columnGap(20).margin(5).end,
           new Columns([
               new Txt(['Usuario: ', new Txt(`${empleado.nombre} ${empleado.apellido}`).end]).alignment('left').end,
               '',
           ]).columnGap(10).margin(5).end,
       ]);  
}