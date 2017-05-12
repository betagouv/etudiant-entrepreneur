const PdfPrinter = require('pdfmake')
const path = require('path')

const fonts = {
  Roboto: {
    normal: mapPath('fonts/Roboto-Regular.ttf'),
    bold: mapPath('fonts/Roboto-Medium.ttf'),
    italics: mapPath('fonts/Roboto-Italic.ttf'),
    bolditalics: mapPath('fonts/Roboto-MediumItalic.ttf')
  }
}

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
          width: 595,
          absolutePosition: { x: 0, y: -30 }
        }
      ]
    },
    content: [
      getLines(5),
      { text: `Vu la labellisation du Pôle Étudiant Pour l’Innovation, le Transfert et l’Entrepreneuriat PEPITE ${pepite.name} en date du 12 mars 2014 par décision du jury de sélection de l’appel à projets en faveur de l’entrepreneuriat étudiant,`, style: 'heading' },
      getLines(1),
      { text: 'Vu les textes sur les PEPITE, notamment la circulaire en date du 21 mai 2014 relative à la création du statut national d’étudiant entrepreneur et du diplôme d’étudiant entrepreneur (D2E),', style: 'heading' },
      getLines(5),
      { text: `Le STATUT NATIONAL ÉTUDIANT-ENTREPRENEUR est délivré pour l\'année universitaire ${getSchoolYear(application.contact.schoolYear)} à`, style: 'main' },
      { text: `${application.contact.firstname} ${application.contact.name.toUpperCase()}`, style: 'main' },
      { text: getBirthText(application.profile), style: 'main' },
      getLines(6),
      { text: 'Pour valoir ce que de droit', style: 'signature' },
      { image: 'stamp', width: 100, margin: [20, 0, 0, 0], style: 'signature' }
    ],
    footer: { text: 'Cette attestation doit être jointe à un certificat de scolarité en cours de validité.', style: 'footer' },
    styles: {
      heading: {
        fontSize: 12
      },
      main: {
        fontSize: 22,
        bold: true,
        alignment: 'center',
        margin: [0, 10]
      },
      signature: {
        alignment: 'left'
      },
      footer: {
        fontSize: 8,
        alignment: 'center'
      }
    },
    images: {
      certificateBakcground: mapPath('./images/certificateBakcground.png'),
      stamp: mapPath('./images/stamp.png')
    }
  })
}

function getBirthText(profile) {
  const months = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']
  const birthDate = new Date(profile.birthDate)
  const gender = (profile.gender == 'male') ? '' : 'e'
  return `né${gender} le ${birthDate.getDate()} ${months[birthDate.getMonth()]} ${birthDate.getFullYear()}`
}

function getSchoolYear(year) {
  return `${year}-${year + 1}`
}

function getLines(lines) {
  return '\n'.repeat(lines)
}

function mapPath(relativePath) {
  return path.resolve(__dirname, relativePath)
}

module.exports = certificatePdf
