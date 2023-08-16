import { Columns, Img, PdfMakeWrapper, Txt } from 'pdfmake-wrapper'
import { Header } from '../interfaces/report-interfaces';

export async function createHeader(propiedad:Header, pdf:PdfMakeWrapper){
        const {documento, sucursal, empleado, periodo} = propiedad
       pdf.header([
           new Txt('A Dios sea la Gloria!').alignment('center').fontSize(14).color('#047886').margin(20).end
       ])        
       pdf.rawContent([
           new Columns([
               await new Img('https://images.freeimages.com/images/large-previews/c58/for-sale-1582326.jpg').fit([100, 100]).build(),
               [
                   new Txt(`${documento}`).alignment('center').end,
                   /* new Columns([
                       new Txt(`Serie:\nNo:`).alignment('right').end,
                       new Txt(`${serie}\n${numero}`).alignment('left').end
                   ]).margin([50,0]).end */
               ],
           ]).columnGap(20).margin(5).end,
           new Columns([
               new Txt(`${sucursal.nombre}\n${sucursal.direccion}`).alignment('left').end,
               pdf.add(''),
           ]).columnGap(20).margin(5).end,
           new Columns([
               new Txt(['Usuario: ', new Txt(`${empleado.nombre} ${empleado.apellido}`).bold().end]).alignment('left').end,
               '',
               new Txt(`Periodo: ${periodo}`).alignment('left').end,
           ]).columnGap(10).margin(5).end,
       ]);  
}

export function createFooter(pdf:PdfMakeWrapper){
        pdf.footer((currentPage:number, pageCount:string) => {
            return new Columns([
                new Txt('').end,
                new Txt('Pagina ' + currentPage.toString() + ' de ' + pageCount).alignment('center')./* margin([0,0,45,0]). */end,
                new Txt(`${new Date().toLocaleDateString("es-gt", 
                {
                    weekday: 'short', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric', 
                    hour: "numeric", 
                    minute: "numeric", 
                    formatMatcher: "best fit"
                }
                )}`).alignment('center').end,
            ]).end;
        });

}

export function config(pdf:PdfMakeWrapper){
        /* ###################################################### CONFIGURACIONES. ###################################################### */
    pdf.defaultStyle({
        fontSize: 10
    });
    pdf.pageMargins(40);
    pdf.pageSize('LETTER');
}


