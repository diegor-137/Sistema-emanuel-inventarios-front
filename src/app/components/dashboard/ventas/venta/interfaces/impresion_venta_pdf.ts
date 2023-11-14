import { Cell, Columns, Img, PdfMakeWrapper, Table, Txt } from "pdfmake-wrapper";
import { config, createFooter } from "../../../reports/reports-templates/common-report";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { NumberFormatter, numeroALetras } from "src/app/utility/numerosAletras";
PdfMakeWrapper.setFonts(pdfFonts);
const pdf = new PdfMakeWrapper();

export async function impresionVenta_pdf(factura:any){

      const {data,total} = factura

        pdf.header([
           new Txt(data.tipo).alignment('center').fontSize(14).color('#047886').margin(20).end
       ])
        pdf.add([

        new Table([
            ['Id', 'Fecha', 'Cliente'],
          ])
                .dontBreakRows(true)
                .widths([300, 100, 100])
                .margin([0, 20])
                .end  
        ])

         pdf.rawContent([
           new Columns([
               await new Img('https://images.freeimages.com/images/large-previews/c58/for-sale-1582326.jpg').fit([100, 100]).build(),

           ]).columnGap(20).margin(5).end,
           new Columns([new Txt(`Datos generales de documento`).alignment('left').end]).columnGap(10).margin(5).bold().end,
           new Columns([
               new Txt([new Txt("Ingresado en: ").bold().end,`${data.sucursal.nombre}\n${data.sucursal.direccion}`]).alignment('left').end,
               pdf.add(''),
           ]).columnGap(20).margin(5).end,
           new Columns([
               new Txt([new Txt("Realizada por: ").bold().end,new Txt(`${data.empleado.nombre} ${data.empleado.apellido}`).end]).end,
               '',
                new Txt([new Txt("Fecha realizada: ").bold().end,`${new Date(data.fecha).toLocaleDateString("es-gt", 
                {
                    weekday: 'short', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric', 
                    hour: "numeric", 
                    minute: "numeric", 
                    formatMatcher: "best fit"
                }
                )}`]).end,
           ]).columnGap(10).margin(5).end,
       ]);  

       /************************Listado de productos**********************/
      pdf.add([
         new Txt('Listado de Productos:').bold().end,
         new Table([
            [
              new Txt('Cantidad').bold().color('white').end,
              new Txt('Producto').bold().color('white').end,
              new Txt('Precio').bold().color('white').end,
               new Txt('Subtotal').bold().color('white').end,
            ],
            ...extracData(data.detalle),
            
         ])
        .widths([75,225,75,75])
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
        .end,

        new Table([
            [new Cell(new Txt('Total Venta').bold().end).rowSpan(1).end,`Q. ${NumberFormatter(total, 2)}`],
            [new Cell(new Txt('Aporte en letras Venta total').bold().end).colSpan(2).border([true, true, true, false]).end],
            [new Cell(new Txt((numeroALetras(Number(total), {}))).end).colSpan(2).border([true, false, true, true]).end],
          ])
        .dontBreakRows(true)
        .widths([375,100])
        .margin([0, 5])
        .end,
        

          new Table([
            [new Cell(new Txt('Observaciones').bold().end).colSpan(2).border([true, true, true, false]).end],
            [new Cell(new Txt(data.observacion).end).colSpan(2).border([true, false, true, true]).end],
          ])
        .dontBreakRows(true)
        .widths([375,100])
        .end,
  
    ])

    pdf.add(createFooter(pdf))
          pdf.add(config(pdf))
       return pdf.create()

      }

   function extracData(data: any[]) {

    return data.map(row => [row.cantidad, row.nombre_p, row.precio_venta, row.subtotal]);
   }