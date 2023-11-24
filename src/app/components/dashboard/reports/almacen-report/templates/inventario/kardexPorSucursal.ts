import { Cell, PdfMakeWrapper, Table, Txt } from "pdfmake-wrapper";
import { config, createFooter, createHeader } from "../../../reports-templates/common-report";
import { ListGeneralProd} from "../../intefaces/reportAlmacen-interfaces";
import { createHeaderProduct } from "../common-reportProd";
import { ResultGeneric } from "../../../interfaces/report-interfaces";

const pdf = new PdfMakeWrapper();

export async function resultKardexPorSucursal(data:any){
 
        pdf.add(await createHeader(data.header, pdf));

            pdf.add([
        new Table([
                        [
            new Txt('Fecha').bold().color('white').end,
            new Txt('Producto').bold().color('white').end,
            new Txt('Concepto').bold().color('white').end,
            new Txt('Cantidad').bold().color('white').end,
            new Txt('Nueva Cantidad').bold().color('white').end,
            ],
            ...extracData(data.resultado)
        ])
            .widths([55, 100, 75,50,50])
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
    return data.map(row => [new Date (row.createdAt).toLocaleDateString("es-gt", {year: 'numeric', month: '2-digit', day: 'numeric', formatMatcher: "best fit"}), 
                            row.producto.nombre,`${row.concepto} #${row.transaccion}`,row.cantidad,row.nuevaCantidad]);
}

}