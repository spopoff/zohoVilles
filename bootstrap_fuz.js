/*
Copyright Stéphane Georges Popoff, (juillet 2009 - août 2023)

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
var simLeads = [];
var simContacts = [];
var contacts = [];
const zohoCVM = "https://crm.zoho.com/crm/org26538990/";
const spoCVM = "http://localhost:8099/graphql";

class Lead{
    constructor(First_Name, Last_Name, Email, Company, Tag, id){
        this.First_Name = First_Name;
        this.Last_Name = Last_Name;
        this.Email = Email;
        this.Company = Company;
        this.Tag = Tag;
        this.id = id;
        this.infos = First_Name.toLowerCase() + ' '
            + Last_Name.toLowerCase() + ' '
            + Company.toLowerCase() + ' '
            + Email.toLowerCase();
        this.infos = cleanAccent(this.infos);
    }
    set addAccount(account){
        this.accounts.push(account);
        account.addLead = this;
    }
}
Lead.prototype.contient = function(ine){
    if(this.infos.includes(ine)){
        return true;
    }
    return false;
};
class Account{
    constructor(Account_Name, Phone, Parent_Account, Reseau, Account_Type, id){
        this.Account_Name = Account_Name;
        this.Phone =  Phone;
        this.Parent_Account = Parent_Account;
        this.Reseau = Reseau;
        this.Account_Type = Account_Type;
        this.id = id;
        this.infos = Account_Name.toLowerCase() + ' '
            + Account_Type.toLowerCase();
        var rez = '';
        if(Reseau !== undefined){
            Reseau.forEach(function(rezo){
                rez += ' ' + rezo.name.toLowerCase();
            });
        }
        this.infos += rez;
        if(Parent_Account !== undefined){
            this.infos += ' ' + Parent_Account.name;
        }
        this.infos = cleanAccent(this.infos);
        this.contacts = [];
    }
    set addContact(contact){
        this.contacts.push(contact);
    }
}
Account.prototype.contient = function(ine){
    if(this.infos.includes(ine)){
        return true;
    }
    return false;
};
class Contact{
    constructor(Last_Name,First_Name,Full_Name,Email,Account_Name,Owner,Membre_du_R_seau,Tag,id){
        this.Last_Name =  Last_Name;
        this.First_Name =  First_Name;
        this.Full_Name =  Full_Name;
        this.Email =  Email;
        this.Account_Name =  Account_Name;
        this.Owner =  Owner;
        this.Membre_du_R_seau =  Membre_du_R_seau;
        this.Tag =  Tag;
        this.id = id;
        this.infos = First_Name.toLowerCase() + ' '
            + Last_Name.toLowerCase() + ' '
            + Full_Name.toLowerCase() + ' '
            + Email.toLowerCase() + ' '
            + Membre_du_R_seau + ' ';
        if(Account_Name !== undefined){
            this.infos += Account_Name.name + ' ';
        }
        if(Owner !== undefined){
            this.infos += Owner.name + ' ';
        }
        this.infos = cleanAccent(this.infos);
    }
}
Contact.prototype.contient = function(ine){
    if(this.infos.includes(ine)){
        return true;
    }
    return false;
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

document.addEventListener("DOMContentLoaded", () => {
  simLeads.sort((a, b) => a.id2.localeCompare(b.id2));
  simContacts.sort((a, b) => a.id2.localeCompare(b.id2));
});
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