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


var zohokali = [];

var color = Chart.helpers.color;
var chartSeul = {};

class DataChart{
    constructor(code, type, label){
        this.code = code;
        this.label = label;
        this.type = type;
        this.labels = [];
        this.datasets = [];
        this.subType = 0;
    }
    set addLabel(label){
        this.labels.push(label);
    }
    set addDataset(data7){
        this.datasets.push(data7);
    }
}
class DataSet{
    constructor(label){
        this.label = label;
        this.data = [];
    }
    set addData(data){
        this.data.push(data);
    }
}

/**
 * Affiche le contenu d'un onglet
 * @param {type} evt
 * @param {type} tabName
 * @returns {undefined}
 */
function openTab(evt, tabName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tabcontent = document.getElementsByClassName("tabcontent200");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    var tabGraph = document.getElementsByClassName("tabcontent500");
    tabGraph[0].style.display = "none";
    
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
    $("hr").show();
    clearTablos();
//    var div = document.getElementById("tablo");
//    div.innerHTML = '';
}
window.onhashchange = function( e ) {
    console.log( location.hash );
    if(location.hash !== ""){
        var prms = getQueryString(location.href);
        if(prms.pkl !== undefined){
            getLeadInfo(prms.pkl);
        }
        if(prms.pkc !== undefined){
            getContactInfo(prms.pkc);
        }
        if(prms.pka !== undefined){
            getAccountInfo(prms.pka);
        }
        if(prms.fk !== undefined){
            fusionLink(prms.fk);
        }
    }
};
if(!window.HashChangeEvent)(function(){
    var lastURL=document.URL;
    window.addEventListener("hashchange",function(event){
        Object.defineProperty(event,"oldURL",{enumerable:true,configurable:true,value:lastURL});
        Object.defineProperty(event,"newURL",{enumerable:true,configurable:true,value:document.URL});
        lastURL=document.URL;
    });
}());

document.addEventListener("DOMContentLoaded", () => {
    translatePage();
    simLeads.sort((a, b) => a.id2.localeCompare(b.id2));
    simContacts.sort((a, b) => a.id2.localeCompare(b.id2));
    simCampaigns.sort((a, b) => a.id2.localeCompare(b.id2));
});
