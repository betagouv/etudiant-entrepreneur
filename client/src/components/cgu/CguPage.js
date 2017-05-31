import React, { PropTypes } from 'react'
import Footer from '../footer/Footer.js'
import '../../styles/cgu.css'

const CguPage = () => {
  return (
    <div>
      <article className="text container">
        <div className="page-header">
          <h1>Conditions générales d'utilisation d'Étudiant Entrepreneur</h1>
        </div>


        <h2>Présentation</h2>


        <p>
          Ce service vous permet de déposer un dossier de candidature au <a href="http://www.etudiant.gouv.fr/pid33854/entrepreneuriat-etudiant.html" target="_blank">statut national étudiant entrepreneur</a>.
        </p>
        <p>
          Une fois rempli votre dossier est envoyé aux PEPITE (Pôle Etudiant pour l'Innovation, le Transfert et l'Entrepreneuriat) chargés de l’instruction des candidatures et de l’accompagnement des étudiants entrepreneurs.
          Ce service vous permet également de rester en lien avec des parties prenantes (tuteurs praticiens, pédagogiques et structures d’accompagnement) chargées d’appuyer l’étudiant dans son projet.
        </p>
        <p>
          Le <a href="https://github.com/sgmap/etudiant-entrepreneur" target="_blank">code du logiciel</a> est libre, sous lience AGPL, et peut donc être vérifié et amélioré par tout·e·s.
        </p>


        <h2>Vocabulaire</h2>


        <ul>
          <li>« Nous » se réfère à l’équipe en charge du service en ligne d'Étudiant Entrepreneur.</li>
          <li>« Vous » se réfère à un·e usager du service.</li>
          <li>« PEPITE » se réfère aux Pôle Etudiant pour l'Innovation, le Transfert et l'Entrepreneuriat chargés de l’instruction des candidatures et de l’accompagnement des étudiants.</li>
          <li>« Parties prenantes » se réfère aux tuteurs pédagogiques, praticiens et structures d’accompagnement qui appuient l’étudiant dans son projet d'entrepreneuriat.</li>
        </ul>


        <h2 id="absence-de-garantie">Absence de garantie</h2>

        <p>
          L’envoi de votre candidature aux PEPITE ne vous garantit pas que votre candidature sera acceptée lors du comité d’engagement.
          <small>Les comités d’engagement des PEPITE sont seuls décisionnaires de l’octroi du statut national étudiant.e entrepreneur.e.</small>
        </p>
        <p>
          Nous ne garantissons pas l'exactitude du contenu des sites externes vers lesquels nous faisons des liens.
          <small>Ces sites ne sont pas non plus régis par les mêmes conditions d'utilisation, notamment en ce qui concerne leur traitement des données à caractère personnel.</small>
        </p>
        <p>
          Nous mettons le service Étudiant Entrepreneur à disposition sans garantie sur sa disponibilité, en « best effort ».
          <small>Cela signifie que d'éventuelles indisponibilités n'ouvriront pas droit à compensation financière.</small>
        </p>


        <h2 id="donnees">Vos données</h2>


        <p>
          En utilisant le service Étudiant-Entrepreneur vous vous engagez sur la véracité des informations transmises lors du dépôt de votre candidature.
          Ces candidatures comportent des données nominatives (nom, prénom…) et de vie professionnelles (projet, diplômes…).
        </p>
        <p>
          Ces données à caractère personnel ont fait l’objet d’une déclaration auprès de la CNIL.
          <small>Le numéro de déclaration est 2010920v0.</small>
        </p>
        <p>
          Nous conservons ces données pendant 1 an à compter de l’envoi de la candidature pour analyser les usages, mesurer l'impact et la diffusion territoriale du service Étudiant Entrepreneur, et améliorer le service.
          <small>Ces données nous permettent par exemple de déterminer les options les plus pertinentes à vous proposer en fonction des usages les plus fréquents.</small>
        </p>
        <p>
          Vous avez un droit d'accès, de rectification et de suppression de vos données. Pour l'exercer, <a href="mailto:contact@etudiant-entrepreneur.beta.gouv.fr">envoyez-nous un courriel</a> en précisant vos noms et prénoms ainsi que l’adresse courriel renseigné lors du dépôt de votre candidature.
          <small>Comme nous ne demandons pas la création de compte, seuls ces éléments peuvent nous permettre de retrouver vos candidatures.</small>
        </p>
        <p>
          Nous nous engageons à ne jamais exploiter les informations que vous nous transmettrez dans un but commercial ou publicitaire.
          <small>De manière générale, le service Étudiant Entrepreneur n’accepte aucune forme de publicité.</small>
        </p>
        <p>
          Nous collectons également des données anonymes d'audience, indépendamment de l’envoi de candidature.
          <small>Cela nous permet par exemple de déterminer la durée d’une candidature et les pages à améliorer en priorité.</small>
        </p>

        <iframe id="tracking-optout" src="https://stats.data.gouv.fr/index.php?module=CoreAdminHome&action=optOut&language=fr">
          Vous pouvez choisir de <a href="https://stats.data.gouv.fr/index.php?module=CoreAdminHome&action=optOut&language=fr">refuser ce suivi</a>.
        </iframe>

        <p>
          Nous nous engageons à prendre les mesures nécessaires pour garantir la sécurité et la confidentialité des informations que vous nous fournissez.
          <small>Les données transmises sont chiffrées et stockées dans des centres de données situés en Europe</small>
        </p>

        <h2 id="evolutions">Évolutions</h2>


        <p>
          Nous pouvons faire évoluer le service étudiant-entrepreneur sans information préalable.
          <small>Nous ajoutons régulièrement des fonctionnalités, raffinons l'interface et modifions des formulations sur la base de vos retours et des évolutions règlementaires.</small>
        </p>
        <p>
          Nous pouvons suspendre l'accès au Étudiant-Entreprepreneur sans information préalable, notamment pour des raisons de maintenance.
          <small>Nous mettons l'application à jour plusieurs fois par semaine. L'indisponibilité ne dépasse généralement pas une dizaine de secondes.</small>
        </p>
        <p>
          Nous pouvons amender ces conditions d’utilisation. En cas de changement significatif, une notification s'affichera lors de l'accès au service Étudiant Entrepreneur.
          <small><a href="https://github.com/sgmap/etudiant-entrepreneur/commits/master/client/src/components/cgu/CguPage.js" target="_blank">Tout l'historique de ces conditions</a> est librement accessible.</small>
        </p>


        <h2 id="utilisation">Utilisation</h2>


        <p>
          Le service Étudiant Entrepreneur est en accès libre à l'adresse <a href="https://etudiant-entrepreneur.beta.gouv.fr/" target="_blank">etudiant-entrepreneur.beta.gouv.fr</a>.
          <small>Son utilisation est gratuite et facultative.</small>
        </p>
        <p>
          Si vous déposez une candidature vous acceptez ces conditions d'utilisation.
          <small>Comme indiqué dans l'article <a href="https://www.legifrance.gouv.fr/affichCodeArticle.do?idArticle=LEGIARTI000031367350&cidTexte=LEGITEXT000031366350&dateTexte=20160329" target="_blank">L. 112-9</a> du code des relations entre le public et l'administration.</small>
        </p>
        <p>
          L’utilisation de Étudiant-Entrepreneur requiert une connexion internet et un navigateur récent.
          <small>L'application affichera un message si le navigateur utilisé est trop ancien pour être compatible. En particulier, les versions d'Internet Explorer antérieures à la 10 ne sont pas compatibles.</small>
        </p>
        <p>
          Nous nous réservons le droit de bloquer, sans information préalable ni compensation financière, les usages mettant en péril l'utilisation du logiciel par d'autres usagers.
          <small>Cela nous permet d'anticiper d'éventuelles <a href="https://fr.wikipedia.org/wiki/Attaque_par_d%C3%A9ni_de_service" target="_blank">attaques par déni de service.</a></small>
        </p>


        <h2 id="mentions-legales">Mentions légales</h2>


        <h3>Éditeur</h3>

        <p>
          <a href="https://beta.gouv.fr" target="_blank">Incubateur de services numériques</a> du <a href="http://www.modernisation.gouv.fr" target="_blank">Secrétariat général pour la modernisation de l'action publique</a> (SGMAP).
          <small>39–43 quai André-Citroën</small>
          <small>75015&nbsp;Paris</small>
          <small>France</small>
          <small>Téléphone&nbsp;: +33&nbsp;1&nbsp;42&nbsp;75&nbsp;80&nbsp;00</small>
        </p>
        <p>
          Directeur de la publication&nbsp;: directeur interministériel du numérique et du système d’information et de communication de l’État, adjoint à la secrétaire générale pour la modernisation de l’action publique.
          <small>Henri Verdier</small>
        </p>

        <h3>Hébergeur</h3>

        <p>
          Le site est hébergé par la société <a href="https://scalingo.com/" target="_blank">Scalingo SAS </a>
          <small>15 avenue du Rhin</small>
          <small>67100&nbsp;Strasbourg</small>
          <small>France</small>
          <small>Téléphone&nbsp;: +33&nbsp;6&nbsp;75&nbsp;20&nbsp;41&nbsp;30</small>
        </p>
      </article>
      <Footer />
    </div>
  )
}

CguPage.propTypes = {
}

export default CguPage
