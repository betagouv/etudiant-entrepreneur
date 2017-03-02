const RESSOURCE_PATH = 'api/components/pdf/'
const fonts = {
  Roboto: {
    normal: RESSOURCE_PATH + 'fonts/Roboto-Regular.ttf',
    bold: RESSOURCE_PATH + 'fonts/Roboto-Medium.ttf',
    italics: RESSOURCE_PATH + 'fonts/Roboto-Italic.ttf',
    bolditalics: RESSOURCE_PATH + 'fonts/Roboto-MediumItalic.ttf'
  }
}
const PdfPrinter = require('pdfmake')

class certificatePdf {
  static generate(application, pepite, res) {
    const printer = new PdfPrinter(fonts)
    const pdfDoc = printer.createPdfKitDocument(getCertificateDocDefinition(application, pepite))
    pdfDoc.pipe(res)
    pdfDoc.end()
  }
}

function getCertificateDocDefinition(application, pepite) {
  return ({
    background: function () {
      return [
        {
          image: 'certificateBakcground',
          width: 595
        }
      ]
    },
    content: [
      `PEPITE ${pepite.name}`,
      `STUDENT ${application.contact.name}`,
      'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines',
    ],

    images: {
      certificateBakcground: RESSOURCE_PATH + 'images/certificateBakcground.png'
    }
  })
}

module.exports = certificatePdf
