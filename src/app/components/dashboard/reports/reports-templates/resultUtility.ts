import { PdfMakeWrapper, Img, Txt, Columns, Table, Cell } from 'pdfmake-wrapper';
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { config, createFooter, createHeader } from './common-report';
import { ResultUtility } from '../interfaces/report-interfaces';
import { NumberFormatter, numeroALetras } from 'src/app/utility/numerosAletras';
PdfMakeWrapper.setFonts(pdfFonts);
const pdf = new PdfMakeWrapper();

export async function resultUtility(resultUtility:ResultUtility) {
    /* ###################################################### HEADER ###################################################### */

    pdf.add(await createHeader(resultUtility.header, pdf));

    pdf.add([
        new Table([
            ['Id', 'Fecha', 'Cliente', 'Empleado','Total Venta', 'Total Compra', 'Utilidad' ],
            ...extracData(resultUtility.result),
        ])
            .heights(() => {
                return 25;
            })
            .headerRows(1)
            .widths([15, 80, 90, 90, 'auto', 'auto', 'auto'])
            .layout('lightHorizontalLines')
            .dontBreakRows(true)
            .end,

            new Table([
                [new Cell(new Txt('Tipo Pago.').bold().end).rowSpan(3).end, new Txt('Total Venta').bold().end, `Q. ${NumberFormatter(resultUtility.venta, 2)}`],
                [{}, new Txt('Total compra').bold().end, `Q. ${NumberFormatter(resultUtility.compra, 2)}`],
                [{}, new Txt('Utilidad').bold().end, `Q. ${NumberFormatter(resultUtility.utilidad, 2)}`],
                [new Cell(new Txt('Aporte en letras Venta total').bold().end).colSpan(3).border([true, true, true, false]).end],
                [new Cell(new Txt((numeroALetras(Number(resultUtility.venta), {}))).end).colSpan(3).border([true, false, true, true]).end],
            ])
                .dontBreakRows(true)
                .widths([300, 100, 100])
                .margin([0, 20])
                .end    
    ])

    /* ###################################################### FOOTER ###################################################### */
    pdf.add(createFooter(pdf))
    /* ###################################################### CONFIGURACIONES. ###################################################### */
    pdf.add(config(pdf))
  
    return pdf.create()

}


function extracData(data: any[]) {
    return data.map(row => [row.id, new Date (row.created_at).toLocaleDateString("es-gt", {year: 'numeric', month: '2-digit', day: 'numeric', hour: "numeric", minute: "numeric", formatMatcher: "best fit"})   ,
         row.cliente, `${row.nombre} ${row.apellido}`, `Q. ${NumberFormatter(row.total, 2)}`, `Q. ${NumberFormatter(row.totalcompra, 2)}`, `Q. ${NumberFormatter(row.utilidad, 2)}`]);
}