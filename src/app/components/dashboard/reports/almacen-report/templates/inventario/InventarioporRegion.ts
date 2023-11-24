import { Cell, PdfMakeWrapper, Table, Txt } from "pdfmake-wrapper";
import { config, createFooter, createHeader } from "../../../reports-templates/common-report";
import { ListGeneralProd } from "../../intefaces/reportAlmacen-interfaces";
import { createHeaderProduct } from "../common-reportProd";

const pdf = new PdfMakeWrapper();

export async function resultInventarioPorRegion(data:ListGeneralProd){
 
        pdf.add(await createHeaderProduct(data.header, pdf));

    pdf.add([
        new Table([
                        [
              new Txt('Id').bold().color('white').end,
              new Txt('Producto').bold().color('white').end,
              new Txt('Sucursal').bold().color('white').end,
              new Txt('Region').bold().color('white').end,
              new Txt('Cantidad').bold().color('white').end,
            ],
            ...extracData(data.resultado)
        ])
            .widths([30, 100, 100, 100, 'auto'])
            .dontBreakRows(true)
            .layout({
                fillColor: (rowIndex) => {
                // row 0 is the header
                if (rowIndex === 0) {
                    return '#1c866c';
                }
                return '#ffffff';
                },
                hLineColor: () => '#8b8c89',
                vLineColor: () => '#8b8c89',
            })
            .end,
    ])

    /* ###################################################### FOOTER ###################################################### */
    pdf.add(createFooter(pdf))
    /* ###################################################### CONFIGURACIONES. ###################################################### */
    pdf.add(config(pdf))

    return pdf.create()

    function extracData(data: any[]) {
    return data.map(row => [row.productoid, row.producto,row.sucursal,row.region,row.cantidad]);
}

}