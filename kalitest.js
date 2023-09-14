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
/* global zohokali, tableRes, tooltip, Tooltips */
class KalitestResult{
    constructor(qualState, name, reasons, prefix){
        this.qualState = qualState;
        this.dataObject = {};
        this.name = name;
        this.reasons = reasons;
        this.prefix = prefix;
    }
}
function headListKali(){
    var table = document.createElement('table');
    var tr = document.createElement('tr');   
    var thu = document.createElement('th');
    var txhu = document.createTextNode(translations[locale]["quality-state"]);
    thu.appendChild(txhu);
    tr.appendChild(thu);
    var thv = document.createElement('th');
    var txhv = document.createTextNode(translations[locale]["quality-data"]);
    thv.appendChild(txhv);
    tr.appendChild(thv);
    table.appendChild(tr);
    return table;
}
function objectToString(obj){
    return obj.infos;
}
function getLink(obj, td, prefix){
    const xe = document.createElement("A");
    var found = true;
    xe.id = obj.id;
    xe.target ="_blank";
    xe.text = " "+translations[locale]["zoho-link"];
    switch (prefix) {
        case "accn":
            xe.href = zohoCVM+"tab/Accounts/"+obj.id;
            break;
        case "cnt":
            xe.href = zohoCVM+"tab/Contacts/"+obj.id;
            break;
        case "lid":
            xe.href = zohoCVM+"tab/Leads/"+obj.id;
            break;
        case "cmp":
            xe.href = zohoCVM+"tab/Campaigns/"+obj.id;
            break;
        default:
            found = false;
    }
    if(found){
        td.appendChild(xe);
    }else{
        var txd = document.createTextNode("Error on prefix value '"+prefix+"'");
        td.appendChild(txd);
    }
}
/**
 * Ajoute une ligne par Job dans le tableau
 * @param {htmlDom} tab 
 * @param {KalitestResult} unK
 * @returns {undefined}
 */
function printRowKali(tab, unK){
    var tr = document.createElement('tr');   
    var tdu = document.createElement('td');
    var txdu = document.createTextNode(translations[locale][unK.qualState]+" "+unK.reasons);
    tdu.appendChild(txdu);
    tr.appendChild(tdu);
    var tdv = document.createElement('td');
    var txdv = document.createTextNode(objectToString(unK.dataObject));
    tdv.appendChild(txdv);
    getLink(unK.dataObject, tdv, unK.prefix);
    tr.appendChild(tdv);
    tab.appendChild(tr);
}
function isInQuery(obj, query){
    Object.keys(obj).forEach(key=>{
        if(obj[key] !== null){
            if(obj[key] !== undefined){
                if(typeof obj[key] === "string" || obj[key] instanceof String){
                    if(obj[key].includes(query)){
                        return true;
                    }
                }
            }
        }
    });
    return false;
}
/**
 * Fait la liste des Jobs
 * @param {string} kaliName
 * @param {string} filter
 * @param {string} query
 * @returns {undefined}
 */
function getKaliTest(kaliName, filter, query){
    var tab = headListKali();
    var nbK = 0;
    var sel = [];
    zohokali.forEach(function(unK){
        var select = true;
        if(kaliName === unK.name && filter === "ALL"){
            if(query !== ""){
                select = unK.dataObject.infos.includes(query);
            }
            if(select){
                sel.push(unK);
                nbK++;
            }
        }else if(kaliName === unK.name && filter === unK.qualState){
            if(query !== ""){
                select = unK.dataObject.infos.includes(query);
            }
            if(select){
                sel.push(unK);
                nbK++;
            }
        }
    });
    sel = sel.sort((k1, k2) => (k1.qualState > k2.qualState) ? 1 : -1);
    sel.forEach(function(unK){
        printRowKali(tab, unK);
    });
    setInfoTab(tableRes, "nb case="+nbK);
    var div = document.getElementById("tablo");
    div.appendChild(tab);
    
}
/**
* Donne le rapport pour un test qualité
*/
function showKaliTest(){
    var choix = $("#kali :selected").val();
    var filter = $("#kaliState :selected").val();
    const query = document.getElementById("kaliQ").value;
    clearTablos();
    getKaliTest(choix, filter, query);
}	
