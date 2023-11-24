import { Cell, PdfMakeWrapper, Table, Txt } from "pdfmake-wrapper";
import { config, createFooter, createHeader } from "../../../reports-templates/common-report";
import { NumberFormatter } from "src/app/utility/numerosAletras";

const pdf = new PdfMakeWrapper();

export async function resultCompras(data:any){
 
        pdf.add(await createHeader(data.header, pdf));

        pdf.add([
            new Table([
                ['Id', 'Documento', 'Proveedor', 'Fecha','Total'],
                ...extracData(data.result)
            ])
            .heights(() => {
                return 25;
            })
            .headerRows(1)
            .widths([50,75,175,50,50])
            .layout('lightHorizontalLines')
            .dontBreakRows(true)
            .end,

                new Table([
                    [new Cell(new Txt('Total credito').bold().end).rowSpan(1).end,`Q. ${NumberFormatter(data.total, 2)}`],
                ])
                .dontBreakRows(true)
                .widths([400, 100])
                .margin([0, 20])
                .end    
        ])

    /* ###################################################### FOOTER ###################################################### */
    pdf.add(createFooter(pdf))
    /* ###################################################### CONFIGURACIONES. ###################################################### */
    pdf.add(config(pdf))

    return pdf.create()

    function extracData(data: any[]) {
    return data.map(row => [row.id,row.documento,row.proveedor,row.created_at,row.total]);
}

}