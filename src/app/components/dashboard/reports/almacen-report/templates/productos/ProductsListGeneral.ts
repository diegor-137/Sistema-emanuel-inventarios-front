import { Cell, PdfMakeWrapper, Table, Txt } from "pdfmake-wrapper";
import { config, createFooter, createHeader } from "../../../reports-templates/common-report";
import { ListGeneralProd } from "../../intefaces/reportAlmacen-interfaces";
import { createHeaderProduct } from "../common-reportProd";

const pdf = new PdfMakeWrapper();

export async function resultListGeneralProduct(data:ListGeneralProd){
 
        pdf.add(await createHeaderProduct(data.header, pdf));

    pdf.add([
        new Table([
            ['Id','Nombre','Estado','Categoria','Marca'],
            ...extracData(data.resultado)
        ])
            .heights(() => {
                return 25;
            })
            .headerRows(1)
            .widths([30, 100, 100, 100, 'auto'])
            .layout('lightHorizontalLines')
            .dontBreakRows(true)
            .end,
    ])

    /* ###################################################### FOOTER ###################################################### */
    pdf.add(createFooter(pdf))
    /* ###################################################### CONFIGURACIONES. ###################################################### */
    pdf.add(config(pdf))

    return pdf.create()

    function extracData(data: any[]) {
    return data.map(row => [row.id, row.nombre,row.estado,row.categoria.nombre,row.marca.nombre]);
}

}