import { Cell, PdfMakeWrapper, Table, Txt } from "pdfmake-wrapper";
import { config, createFooter, createHeader } from "../../../reports-templates/common-report";

const pdf = new PdfMakeWrapper();

export async function resultlistadoClientes(data:any){
 
        pdf.add(await createHeader(data.header, pdf));

            pdf.add([
        new Table([
                        [
            new Txt('Id').bold().color('white').end,
            new Txt('Nombre').bold().color('white').end,
            new Txt('Direcion').bold().color('white').end,
            new Txt('Telefono').bold().color('white').end,
            new Txt('Nit').bold().color('white').end,
    
            ],
            ...extracData(data.result)
        ])
            .widths([50,100,175,50,100])
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
        return data.map(row=>[row.id,row.nombre,row.direccion,row.telefono,row.nit])
    }

}