/*
Copyright Stéphane Georges Popoff, (juillet 2009 - septembre 2023)

spopoff@rocketmail.com

Ce logiciel est un programme informatique servant à gérer des habilitations.

Ce logiciel est régi par la licence [CeCILL|CeCILL-B|CeCILL-C] soumise au droit français et
respectant les principes de diffusion des logiciels libres. Vous pouvez
utiliser, modifier et/ou redistribuer ce programme sous les conditions
de la licence [CeCILL|CeCILL-B|CeCILL-C] telle que diffusée par le CEA, le CNRS et l'INRIA
sur le site "http://www.cecill.info".

En contrepartie de l'accessibilité au code source et des droits de copie,
de modification et de redistribution accordés par cette licence, il n'est
offert aux utilisateurs qu'une garantie limitée.  Pour les mêmes raisons,
seule une responsabilité restreinte pèse sur l'auteur du programme,  le
titulaire des droits patrimoniaux et les concédants successifs.

A cet égard  l'attention de l'utilisateur est attirée sur les risques
associés au chargement,  à l'utilisation,  à la modification et/ou au
développement et à la reproduction du logiciel par l'utilisateur étant
donné sa spécificité de logiciel libre, qui peut le rendre complexe à
manipuler et qui le réserve donc à des développeurs et des professionnels
avertis possédant  des  connaissances  informatiques approfondies.  Les
utilisateurs sont donc invités à charger  et  tester  l'adéquation  du
logiciel à leurs besoins dans des conditions permettant d'assurer la
sécurité de leurs systèmes et ou de leurs données et, plus généralement,
à l'utiliser et l'exploiter dans les mêmes conditions de sécurité.

Le fait que vous puissiez accéder à cet en-tête signifie que vous avez
pris connaissance de la licence [CeCILL|CeCILL-B|CeCILL-C], et que vous en avez accepté les
termes.
 */
const translations = {
    "en":{
        "DEFECT": "Defect",
        "CONFORM": "Conform",
        "NA": "No Applicable",
        "DB_DEFECT": "Data source Defect",
        "page-title": "ZOHO Access API",
        "app-title": "ZOHO Access API",
        "data-quality": "Data Quality",
        "data-campaigns": "Campaigns",
        "data-modifs": "Modifications",
        "modifs-launch": "Pending Modifications !",
        "data-leads": "Leads",
        "data-contacts": "Contacts",
        "data-accounts": "Accounts",
        "data-graphics": "Graphics",
        "data-params": "Parameters",
        "quality-state": "Niveau de qualité",
        "quality-test": "Data Quality Test:",
        "quality-level": "State filter:",
        "quality-data": "Datas tested",
        "quality-test-1": "Legal Leads Categories",
        "quality-test-2": "Leads Email",
        "quality-test-3": "Leads Email in Full Name",
        "quality-test-4": "Contacts Email",
        "quality-test-5": "Deputies Contact check",
        "quality-test-6": "Senators Contact check",
        "quality-test-7": "Mayors or Elected Contact check",
        "quality-test-8": "First name Contact check",
        "quality-test-9": "Last Modified Contact since March 2014",
        "quality-test-10": "Last Modified Account since March 2014",
        "quality-test-11": "First name Lead since March 2014",
        "quality-test-12": "Account with Address",
        "quality-test-13": "Last Modified Campaign since March 2014",
        "quality-test-14": "Leads with Contact",
        "quality-test-15": "Contact with Address",
        "quality-all": "All test results",
        "quality-conform": "Conform",
        "quality-defect": "Defect",
        "quality-na": "Non applicable",
        "quality-button": "Shows Test results!",
        "quality-query": "Found as:",
        "leads-query":"Found as:",
        "leads-data":"report Leads !",
        "leads-sim":"report Leads Similar !",
        "leads-email":"Email",
        "leads-1name":"First Name",
        "leads-lname":"Last Name",
        "leads-2email":"Secondary Email",
        "leads-company":"Company",
        "leads-tag":"Tag",
        "leads-count":"Leads nb=",
        "leads-count-sim":"Similar Leads nb=",
        "zoho-link":"Link to Zoho",
        "campaigns-query":"Found as:",
        "campaigns-data":"report Campaigns !",
        "campaigns-sim":"report Campaigns Similar !",
        "campaigns-sim-1":"Campaign Name 1",
        "campaigns-sim-2":"Campaign Name 2",
        "campaigns-sim-link":"Link to fusion",
        "campaigns-name":"Name",
        "campaigns-end-time":"End Time",
        "campaigns-type":"Type",
        "campaigns-parent":"Parent",
        "campaigns-tag":"Tag",
        "campaigns-count":"Campaigns nb=",
        "campaigns-count-sim":"Similar Campaigns nb=",
        "contacts-query":"Found as:",
        "contacts-data":"report Contacts !",
        "contacts-sim":"report Contacts Similar !",
        "contacts-csv":"Export Contacts !",
        "contacts-lname":"Last Name",
        "contacts-1name":"First Name",
        "contacts-fullname":"Full Name",
        "contacts-email":"Email",
        "contacts-2email":"Secondary Email",
        "contacts-account":"Account",
        "contacts-owner":"Owner",
        "contacts-mbrreseau":"Network Member",
        "contacts-tag":"Tag",
        "contacts-count":"Contacts nb=",
        "contacts-count-sim":"Similar Contacts nb=",
        "contacts-sim-1":"Similar full name 1",
        "contacts-sim-2":"Similar full name 2",
        "contacts-sim-link":"Link to fusion",
        "accounts-query":"Found as:",
        "accounts-data":"report Accounts !",
        "accounts-sim":"report Accounts Similar !",
        "accounts-cntbyaccnt":"report Contact's Accounts !",
        "accounts-cntsaccnt":"Account Name & Contacts",
        "accounts-name":"Accounts Name",
        "accounts-phone":"Phone",
        "accounts-parent":"Account Parent",
        "accounts-reseau":"Network",
        "accounts-type":"Type",
        "accounts-address":"Street",
        "accounts-count":"Accounts nb=",
        "accounts-count-sim":"Accounts Similar nb=",
        "accounts-nocontact":"Accounts without Contact",
        "graphics-metric": "Select Metric:",
        "graphics-metric-2_1": "Nb of Datas",
        "graphics-metric-2_2": "Leads by Tags",
        "graphics-metric-2_3": "Accounts by Type",
        "graphics-metric-2_4": "Contacts by Network",
        "graphics-metric-2_5": "top ten of Contacts per Accounts",
        "graphics-metric-2_6": "Items state of freshness",
        "graphics-metric-2_7": "Accounts and Contacts",
        "graphics-metric-2_8": "Change on Items since last report",
        "graphics-run": "Show Graphic !",
        "params-gql-host":"GraphQL Server:",
        "params-clientId":"Client ID:",
        "params-clientSecret":"Client Secret:",
        "params-authCode":"Scopes or Code:",
        "params-get-akstok":"Request Access Token !",
        "params-authz-code":"Request Authz Code !",
        "params-re-akstok":"Refresh Access Token !",
        "page-fuz-title": "ZOHO Fusion",
        "app-fuz-title": "ZOHO Fusion",
        "fusion-button-1": "fusion in object ",
        "fusion-button-2": "fusion all in object 2",
        "fusion-itmseldel": "Item selected for deletion",
        "fusion-link": "Link to ZOHO",
        "fusion-attrname": "Attribute name",
        "fusion-value1": "Value Item 1",
        "fusion-value2": "Value Item 2",
        "fusion-operation": "Operation",
        "fusion-fusion": "Value to update",
        "fusion-copy": "copy value ",
        "delta-all":"All states",
        "delta-idem":"Idem",
        "delta-del":"Deleted",
        "delta-updt":"Updated",
        "delta-new":"New",
        "deleted":"Deleted"
    },
    "fr":{
        "DEFECT": "Défaut",
        "CONFORM": "Conforme",
        "NA": "Non Applicable",
        "DB_DEFECT": "Défaut de données",
        "zoho-link":"Lien vers Zoho",
        "page-title": "Données de ZOHO via API",
        "app-title": "Données de ZOHO via API",
        "data-quality": "Qualité des données",
        "data-leads": "Pistes",
        "data-contacts": "Contacts",
        "data-campaigns": "Evévements",
        "data-accounts": "Comptes",
        "data-modifs": "Modifications",
        "modifs-launch": "Modifications en attente !",
        "data-graphics": "Graphiques",
        "data-params": "Paramètres",
        "quality-state": "Niveau de qualité",
        "quality-level": "Choix du Niveau:",
        "quality-data": "Données évaluées",
        "quality-test": "Test de la qualité des données:",
        "quality-test-1": "Catégories des Pistes",
        "quality-test-2": "Mail des Pistes",
        "quality-test-3": "Nom complet dans les mails des Pistes",
        "quality-test-4": "Mail des Contacts",
        "quality-test-5": "Contact qui sont députés",
        "quality-test-6": "Contact qui sont sénateurs",
        "quality-test-7": "Contact Maires ou élus",
        "quality-test-8": "Prénom des Contacts",
        "quality-test-9": "Contact dernière modification depuis mars 2014",
        "quality-test-10": "Compte dernière modification depuis mars 2014",
        "quality-test-11": "Piste dernière modification depuis mars 2014",
        "quality-test-12": "Compte avec adresse",
        "quality-test-13": "Evénement dernière modification depuis mars 2014",
        "quality-test-14": "Piste avec un Contact",
        "quality-test-15": "Contact avec adresse",
        "quality-all": "Tous les cas",
        "quality-conform": "Conforme au test",
        "quality-defect": "Test échoué",
        "quality-na": "Test non applicable",
        "quality-button": "Résultats du Test!",
        "quality-query": "Contient:",
        "leads-query":"Contient :",
        "leads-data":"Rapport des Pistes !",
        "leads-sim":"Rapport des doublons de Piste !",
        "leads-email":"Mél",
        "leads-1name":"Prénom",
        "leads-lname":"Nom",
        "leads-2email":"Deuxième Mél",
        "leads-company":"Administration / Société",
        "leads-tag":"Tag",
        "leads-count":"Pistes nb=",
        "leads-count-sim":"Pistes similaires nb=",
        "campaigns-query":"Contient :",
        "campaigns-data":"Rapport des Evénements !",
        "campaigns-sim":"Rapport des Evénements similaires !",
        "campaigns-sim-1":"Nom événement 1",
        "campaigns-sim-2":"Nom événement 2",
        "campaigns-sim-link":"Lien pour fusionner",
        "campaigns-name":"Nom",
        "campaigns-end-time":"Doit finir le",
        "campaigns-type":"Type",
        "campaigns-parent":"Parent",
        "campaigns-tag":"Tag",
        "campaigns-count":"Evénements nb=",
        "campaigns-count-sim":"Evénements similaires nb=",
        "contacts-query":"Contient :",
        "contacts-data":"Rapport des Contacts !",
        "contacts-csv":"Export des  Contacts !",
        "contacts-sim":"Rapport des doublons de Contact !",
        "contacts-lname":"Nom",
        "contacts-1name":"Prénom",
        "contacts-fullname":"Nom complet",
        "contacts-email":"Mèl",
        "contacts-2email":"Mèl secondaire",
        "contacts-account":"Compte",
        "contacts-owner":"Propriétaire",
        "contacts-mbrreseau":"Membre du réseau",
        "contacts-tag":"Tag",
        "contacts-count":"Contacts nb=",
        "contacts-count-sim":"Contacts similaires nb=",
        "contacts-sim-1":"Contact similaire 1",
        "contacts-sim-2":"Contact similaire 2",
        "contacts-sim-link":"Lien pour fusionner",
        "accounts-query":"Contient :",
        "accounts-data":"Rapport des Comptes !",
        "accounts-sim":"Rapport des doublons de Compte !",
        "accounts-cntbyaccnt":"Rapport des Contacts par Compte !",
        "accounts-cntsaccnt":"Comptes et leurs Contacts",
        "accounts-name":"Nom du Compte",
        "accounts-phone":"Téléphone",
        "accounts-parent":"Parent du Compte",
        "accounts-reseau":"Réseau",
        "accounts-type":"Type",
        "accounts-address":"Voie",
        "accounts-count":"Comptes nb=",
        "accounts-count-sim":"Comptes Similaires nb=",
        "accounts-nocontact":"Comptes sans Contact",
        "graphics-metric": "Choisir une mesure:",
        "graphics-metric-2_1": "Total des données",
        "graphics-metric-2_2": "Pistes par Tags",
        "graphics-metric-2_3": "Comptes par Type",
        "graphics-metric-2_4": "Contact par Réseau",
        "graphics-metric-2_5": "10 premiers Comptes par nombre de Contacts",
        "graphics-metric-2_6": "Etat de fraîcheur des données",
        "graphics-metric-2_7": "Comptes avec ou sans Contact",
        "graphics-metric-2_8": "Changements depuis dernier rapport",
        "graphics-run": "Lance le graphique !",
        "params-gql-host":"Serveur GraphQL:",
        "params-clientId":"Client ID :",
        "params-clientSecret":"Client Secret:",
        "params-authCode":"Scopes ou Code d'authorisation:",
        "params-get-akstok":"Demande un Access Token !",
        "params-authz-code":"Demande un Code !",
        "params-re-akstok":"Rafraîchir un Access Token !",
        "page-fuz-title": "Fusion des doublons",
        "app-fuz-title": "Fusion des doublons",
        "fusion-button-1": "fusion dans l'objet ",
        "fusion-button-2": "fusionne tout dans l'object 2",
        "fusion-itmseldel": "Item 1 selectionné pour suppression",
        "fusion-link": "Lien vers ZOHO",
        "fusion-attrname": "Proriété",
        "fusion-value1": "Valeur Item 1",
        "fusion-value2": "Valeur Item 2",
        "fusion-operation": "Operation",
        "fusion-fusion": "Valeur à changer",
        "fusion-copy": "copier valeur ",
        "delta-all":"Tous les états",
        "delta-idem":"Identiques",
        "delta-del":"Supprimés",
        "delta-updt":"Modifiés",
        "delta-new":"Nouveaux",
        "deleted":"Supprimé"
    }
};
function translateElement(element) {
  const key = element.getAttribute("data-i18n-key");
  const translation = translations[locale][key];
  element.innerText = translation;
}

function translatePage() {
  document
    .querySelectorAll("[data-i18n-key]")
    .forEach(translateElement);
}
