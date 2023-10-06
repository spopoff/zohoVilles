/*
Copyright Stéphane Georges Popoff, (juillet 2009 - octobre 2023)

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


var tableRes = document.createElement('table');
var tableErr = document.createElement('table');
var leads = [];
var leadsOld = [];
var simLeads = [];
var simContacts = [];
var contacts = [];
var contactsOld = [];
var accounts = [];
var accountsOld = [];
var campaigns = [];
var campaignsOld = [];
var simCampaigns = [];
const zohoCVM = "https://crm.zoho.com/crm/org26538990/";
const spoCVM = "https://cvm.spopoff.net:8443/graphql";
// The active locale
let locale = "fr";

class LeadOld{
    constructor(id){
        this.id = id;
        this.Modified_Time = "";
    }
};
class Lead{
    constructor(id){
        this.First_Name = "";
        this.Last_Name = "";
        this.Email = "";
        this.secondary_Email = "";
        this.Company = "";
        this.Tag = [];
        this.id = id;
        this.infos = "";
    }
};
setInfosLead = function(){
    this.infos = this.First_Name.toLowerCase() + ' '
        + this.Last_Name.toLowerCase() + ' '
        + this.Company.toLowerCase() + ' '
        + this.Email.toLowerCase();
    this.infos = cleanAccent(this.infos);
};
Lead.prototype.contient = function(ine){
    if(this.infos.includes(ine)){
        return true;
    }
    return false;
};

class AccountOld{
    constructor(id){
        this.id = id;
        this.Modified_Time = "";
    }
};
class Account{
    constructor(id){
        this.Account_Name = "";
        this.Phone = "";
        this.Parent_Account = "";
        this.Reseau = [];
        this.Account_Type = {};
        this.id = id;
        this.infos = "";
        this.contacts = [];
        this.Billing_Street = "";
    }
    set addContact(contact){
        this.contacts.push(contact);
    }
};

setInfosAccount = function(){
    var rez = '';
    if(this.Reseau !== undefined){
        if(this.Reseau.length > 0){
            this.Reseau.forEach(function(rezo){
                    rez += ' ' + rezo.name.toLowerCase();
            });
        }
    }
    this.infos += rez;
    if(Object.hasOwn(this.Parent_Account,"id")){
        this.infos += ' ' + this.Parent_Account.name;
    }
    this.infos += ' ' + this.Account_Name.toLowerCase();
    if(this.Account_Type.toLowerCase() !== undefined){
        this.infos += ' ' + this.Account_Type.toLowerCase();
    }
    this.infos += ' '+this.Billing_Street;
    this.infos = cleanAccent(this.infos);
};
Account.prototype.contient = function(ine){
    if(this.infos.includes(ine)){
        return true;
    }
    return false;
};
class ContactOld{
    constructor(id){
        this.id = id;
        this.Modified_Time = "";
    }
};
class Contact{
    constructor(id){
        this.Last_Name = "";
        this.First_Name = "";
        this.Full_Name = "";
        this.Email = "";
        this.Account_Name = "";
        this.Owner = {};
        this.Membre_du_R_seau = "";
        this.Tag = [];
        this.id = id;
        this.infos = "";
        this.accounts = [];
        this.indic = "";
    }
    set addAccount(account){
        this.accounts.push(account);
        account.addContact = this;
    }
};
setInfosContact = function(){
    this.infos = this.First_Name.toLowerCase() + ' '
        + this.Last_Name.toLowerCase() + ' '
        + this.Full_Name.toLowerCase() + ' '
        + this.Email.toLowerCase() + ' '
        + this.Membre_du_R_seau + ' ';
    if(this.Account_Name !== undefined){
        this.infos += this.Account_Name.name + ' ';
    }
    if(Object.hasOwn(this.Owner,"id")){
        this.infos += this.Owner.name + ' ';
    }
    this.infos = cleanAccent(this.infos);
};

Contact.prototype.contient = function(ine){
    if(this.infos.includes(ine)){
        return true;
    }
    return false;
};
class CampaignOld{
    constructor(id){
        this.id = id;
        this.Modified_Time;
    }
};
class Campaign{
    constructor(id){
        this.Campaign_Name = "";
        this.Date_Heure_de_Fin = "";
        this.Type = "";
        this.Parent_Compaign = {};
        this.Tag = [];
        this.id = id;
		this.Modified_Time;
		this.infos = "";
    }
    set addAccount(account){
        this.accounts.push(account);
        account.addLead = this;
    }
};
setInfosCampaign = function(){
    this.infos = this.Campaign_Name.toLowerCase() + ' '
        + this.Modified_Time + ' ';
        + this.Type.toLowerCase();
    if(Object.hasOwn(this.Parent_Compaign,"id")){
        this.infos += ' ' + this.Parent_Compaign.name;
    }
    this.infos = cleanAccent(this.infos);
};

class SimLead{
    constructor(First_Name1, Last_Name1, id1, First_Name2, Last_Name2, id2){
        this.First_Name1 = First_Name1;
        this.Last_Name1 = Last_Name1;
        this.id1 = id1;
        this.First_Name2 = First_Name2;
        this.Last_Name2 = Last_Name2;
        this.id2 = id2;
        this.infos = First_Name1 + ' '+Last_Name1+' '+First_Name2 + ' '+Last_Name2;
        this.infos = this.infos.toLowerCase();
        this.infos = cleanAccent(this.infos);
        this.selected = true;
    }
};
SimLead.prototype.contient = function(ine){
    if(this.infos.includes(ine)){
        return true;
    }
    return false;
};
class SimContact{
    constructor(Full_Name1, id1, Full_Name2, id2){
        this.Full_Name1 = Full_Name1;
        this.id1 = id1;
        this.Full_Name2 = Full_Name2;
        this.id2 = id2;
        this.infos = Full_Name1 + ' '+Full_Name2;
        this.infos = this.infos.toLowerCase();
        this.infos = cleanAccent(this.infos);
        this.selected = true;
    }
};
SimContact.prototype.contient = function(ine){
    if(this.infos.includes(ine)){
        return true;
    }
    return false;
};
class SimCampaign{
    constructor(Full_Name1, id1, Full_Name2, id2){
        this.Full_Name1 = Full_Name1;
        this.id1 = id1;
        this.Full_Name2 = Full_Name2;
        this.id2 = id2;
        this.infos = Full_Name1 + ' '+Full_Name2;
        this.infos = this.infos.toLowerCase();
        this.infos = cleanAccent(this.infos);
        this.selected = true;
    }
};
SimCampaign.prototype.contient = function(ine){
    if(this.infos.includes(ine)){
        return true;
    }
    return false;
};

function cleanAccent(thisinfos){
        thisinfos = thisinfos.replaceAll('é', 'e');
        thisinfos = thisinfos.replaceAll('à', 'a');
        thisinfos = thisinfos.replaceAll('è', 'e');
        thisinfos = thisinfos.replaceAll('ê', 'e');
        thisinfos = thisinfos.replaceAll('ë', 'e');
        thisinfos = thisinfos.replaceAll('û', 'u');
        thisinfos = thisinfos.replaceAll('ù', 'u');
        thisinfos = thisinfos.replaceAll('ô', 'o');
        thisinfos = thisinfos.replaceAll('î', 'i');
        return thisinfos;
}

function getQueryString(href){
    var result = {};
    var qs = href.slice(1);
    var parts = qs.split("#");
    var prms = parts[1].split("&");
    if(prms.length > 1){
        for(var i = 0, len=prms.length; i<len; i++){
            var tokens = prms[i].split("=");
            result[tokens[0]] = tokens[1];
        }
    }else{
        var tokens = parts[1].split("=");
        result[tokens[0]] = tokens[1];
    }
    return result;
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

;(function() {
    var pushState = history.pushState;
    var replaceState = history.replaceState;

    history.pushState = function() {
        pushState.apply(history, arguments);
        window.dispatchEvent(new Event('pushstate'));
        window.dispatchEvent(new Event('locationchange'));
    };

    history.replaceState = function() {
        replaceState.apply(history, arguments);
        window.dispatchEvent(new Event('replacestate'));
        window.dispatchEvent(new Event('locationchange'));
    };

    window.addEventListener('popstate', function() {
        window.dispatchEvent(new Event('locationchange'));
    });
})();

window.addEventListener('locationchange', function(){
    console.log('onlocationchange event occurred!');
    var prms = getQueryString(location.href);
    if(prms.fk !== undefined){
        fusionLink(prms.fk);
    }
});
