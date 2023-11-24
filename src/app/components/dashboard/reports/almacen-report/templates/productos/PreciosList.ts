import { Cell, Columns, PdfMakeWrapper, Table, Txt } from "pdfmake-wrapper";
import { config } from "../../../reports-templates/common-report";
import { createHeaderProduct } from "../common-reportProd";

const pdf = new PdfMakeWrapper();

export async function resultListPrecios(data:any){

    pdf.add(await createHeaderProduct(data.header, pdf));
 
    pdf.add([
        new Table([
            [
              new Txt('Costo').bold().color('white').end,
              new Txt('Precio').bold().color('white').end,
              new Txt('Tipo Precio').bold().color('white').end,
            ],
            ...extracData(data.resultado),
        ])
        .widths([100,200,100])
        .layout({
        fillColor: (rowIndex) => {
          // row 0 is the header
          if (rowIndex === 0) {
            return '#075785';
          }

          return '#ffffff';
        },
        hLineColor: () => '#8b8c89',
        vLineColor: () => '#8b8c89',
        //vLineWidth: () => 0,
      })
        //.margin([50,0])
        .end

        

            
    ])
        //pdf.add(await createHeaderProduct(data.header, pdf));
    //new Txt('Hello world!').alignment('center').italics().end;

    /* ###################################################### CONFIGURACIONES. ###################################################### */
    pdf.add(config(pdf))

    return pdf.create()

}

function extracData(data: any[]) {
const array:any[]=[]
    data.forEach(a=>{
    array.push([new Cell(new Txt(` ${a.nombre}`).end).colSpan(3).fillColor('#a3cef1').end,
                //new Cell(new Txt(`costo: Q.${a.costo[0].costo_prom}`).end).fillColor('#a3cef1').end,
              null,null])
    array.push(...extracDat(a.costo[0].costo_prom,a.precio))
})
    return array
}

function extracDat(costo:any,data: any[]) {
return data.map(row=>[costo,row.precio,row.tipoPrecio.nombre])


}