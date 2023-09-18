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
            .widths([50,150,150,50,100])
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
        let credito 
        let diascredito
        let limite
        const array:any[] = []
        data.forEach(elemento =>{
            if (elemento.credito[0]=== null) {
                credito = 'No'
                diascredito = '-'
                limite = '-'
            }else{
                credito = 'Si'
                diascredito = elemento.credito[0].diasCredito
                limite = elemento.credito[0].limite
            }

        array.push([ elemento.id, elemento.nombre,elemento.nit,elemento.telefono,elemento.correo,credito,diascredito,limite])
        })

        return array
    }

}