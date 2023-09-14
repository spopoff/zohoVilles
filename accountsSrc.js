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
/* global accounts */
function rowTabContactsAccountParent(table, accnt){
    var tr2 = document.createElement('tr'); 
    var tha = document.createElement('td');
    if(accnt.contacts !== undefined){
        if(accnt.contacts.length > 0){
        //boucle contacts
            accnt.contacts.forEach(function(cnt){
                const x1 = document.createElement("A");
                x1.text = cnt.Full_Name;
                x1.id = cnt.id;
                x1.href = zohoCVM+"tab/Contacts/"+cnt.id;
                x1.target = "_blank";
                tha.appendChild(x1);
                var txha = document.createTextNode(", ");
                tha.appendChild(txha);
            });
        }
    }else{
        var txha = document.createTextNode("None from Parent");
        tha.style.textAlign = "center";
        tha.appendChild(txha);
    }
    tr2.appendChild(tha);
    table.appendChild(tr2);
}
function rowTabContactsAccount(table, accnt){
    var tr = document.createElement('tr'); 
    var thi = document.createElement('td');
    const x1 = document.createElement("A");
    x1.text = accnt.Account_Name;
    x1.id = accnt.id;
    x1.href = zohoCVM+"tab/Accounts/"+accnt.id;
    x1.target = "_blank";
    thi.appendChild(x1);
    thi.style.textAlign = "center";
    tr.appendChild(thi);
    table.appendChild(tr);
    var tr2 = document.createElement('tr'); 
    var tha = document.createElement('td');
    if(accnt.contacts !== undefined){
        if(accnt.contacts.length > 0){
        //boucle contacts
            accnt.contacts.forEach(function(cnt){
                const x1 = document.createElement("A");
                x1.text = cnt.Full_Name;
                x1.id = cnt.id;
                x1.href = zohoCVM+"tab/Contacts/"+cnt.id;
                x1.target = "_blank";
                tha.appendChild(x1);
                var txha = document.createTextNode(", ");
                tha.appendChild(txha);
            });
        }
    }else{
        var txha = document.createTextNode("None");
        tha.style.textAlign = "center";
        tha.appendChild(txha);
    }
    tr2.appendChild(tha);
    table.appendChild(tr2);
}

function rowTabAccount(table, accnt){
    var tr = document.createElement('tr'); 
    var thi = document.createElement('td');
    const x1 = document.createElement("A");
    x1.text = accnt.Account_Name;
    x1.id = accnt.id;
    x1.href = zohoCVM+"tab/Accounts/"+accnt.id;
    x1.target = "_blank";
    thi.appendChild(x1);
    tr.appendChild(thi);
    var tha = document.createElement('td');
    var txha = document.createTextNode(accnt.Phone);
    tha.appendChild(txha);
    tr.appendChild(tha);
    var ths = document.createElement('td');
    var parent = "None";
    if(Object.hasOwn(accnt.Parent_Account, "name")){
        parent = accnt.Parent_Account.name;
        const x2 = document.createElement("A");
        x2.text = parent;
        x2.id = accnt.Parent_Account.id;
        x2.href = zohoCVM+"tab/Accounts/"+accnt.Parent_Account.id;
        x2.target = "_blank";
        ths.appendChild(x2);
    }else{
        var txhs = document.createTextNode(parent);
        ths.appendChild(txhs);
    }
    tr.appendChild(ths);
    var thp = document.createElement('td');
    var reseau = "";
    var sep = "";
    if(accnt.Reseau !== undefined){
        accnt.Reseau.forEach(function(rezo){
            reseau += sep + rezo.name;
            sep = "; ";
        });
    }
    var txhp = document.createTextNode(reseau);
    thp.appendChild(txhp);
    tr.appendChild(thp);
    var thr = document.createElement('td');
    var txhr = document.createTextNode(accnt.Billing_Street);
    thr.appendChild(txhr);
    tr.appendChild(thr);
    var tht = document.createElement('td');
    var txht = document.createTextNode(accnt.Account_Type);
    tht.appendChild(txht);
    tr.appendChild(tht);
    table.appendChild(tr);
}

function headTabContactsAccount(){
    var table = document.createElement('table');
    var tr = document.createElement('tr'); 
    var thi = document.createElement('th');
    var txhi = document.createTextNode(translations[locale]["accounts-cntsaccnt"]);
    thi.appendChild(txhi);
    tr.appendChild(thi);
    table.appendChild(tr);
    return table;
}
function headTabAccount(){
    var table = document.createElement('table');
    var tr = document.createElement('tr'); 
    var thi = document.createElement('th');
    var txhi = document.createTextNode(translations[locale]["accounts-name"]);
    thi.appendChild(txhi);
    tr.appendChild(thi);
    var tha = document.createElement('th');
    var txha = document.createTextNode(translations[locale]["accounts-phone"]);
    tha.appendChild(txha);
    tr.appendChild(tha);
    var ths = document.createElement('th');
    var txhs = document.createTextNode(translations[locale]["accounts-parent"]);
    ths.appendChild(txhs);
    tr.appendChild(ths);
    var thp = document.createElement('th');
    var txhp = document.createTextNode(translations[locale]["accounts-reseau"]);
    thp.appendChild(txhp);
    tr.appendChild(thp);
    var thr = document.createElement('th');
    var txhr = document.createTextNode(translations[locale]["accounts-address"]);
    thr.appendChild(txhr);
    tr.appendChild(thr);
    var tht = document.createElement('th');
    var txht = document.createTextNode(translations[locale]["accounts-type"]);
    tht.appendChild(txht);
    tr.appendChild(tht);
    table.appendChild(tr);
    return table;
}
function getReportContactsAccount(partInfo){
    var nbK = 0;
    var search = false;
    var parts = [];
    if(partInfo !== undefined && partInfo !== ""){
        search = true;
        partInfo = partInfo.toLowerCase();
        parts = partInfo.split("|");
    }
    var tab = headTabContactsAccount();
    accounts.forEach(function(account){
        if(search){
            parts.forEach(function(part){
                if(account.contient(part.trim())){
                    rowTabContactsAccount(tab, account);
                    nbK++;
                    //si parent ?
                    if(Object.hasOwn(account.Parent_Account, "name")){
                        //on ajoute les identités du parent si valide la recherche
                        const parent = accounts.find(
                                accnt => accnt.id === account.Parent_Account.id);
                        
                        rowTabContactsAccountParent(tab, parent);
                        nbK++;
                    }
                }
            });
        }else{
            rowTabContactsAccount(tab, account);
            nbK++;
        }
    });
    setInfoTab(tableRes, translations[locale]["accounts-count"]+nbK);
    var div = document.getElementById("tablo");
    div.appendChild(tab);
    return;
}

function getReportAccount(isFile, partInfo, isNoContact, state){
    var nbK = 0;
    var search = false;
    var parts = [];
    if(partInfo !== undefined && partInfo !== ""){
        search = true;
        partInfo = partInfo.toLowerCase();
        parts = partInfo.split("|");
    }
    if(!isFile){
        var tab = headTabAccount();
        if("del" === state){
            accountsOld.forEach(function(old){
                const itm = accounts.find((lid) => lid.id === old.id);
                if(itm === undefined){
                    const del = new Account(old.id);
                    del.Name = old.id;
                    del.Modified_Time = old.Modified_Time;
                    rowTabLead(tab, del);
                    nbK++;
                }
            });
            setInfoTab(tableRes, translations[locale]["leads-count"]+nbK);
            var div = document.getElementById("tablo");
            div.appendChild(tab);
            return;
        }
        if("new" === state){
            accounts.forEach(function(account){
                const old = accountsOld.find((un) => un.id === account.id);
                if(old === undefined){
                    if(isNoContact){
                        if(account.contacts.length === 0){
                            rowTabAccount(tab, account);
                            nbK++;
                        }
                    }else{
                        rowTabAccount(tab, account);
                        nbK++;
                    }
                }
            });
            setInfoTab(tableRes, translations[locale]["leads-count"]+nbK);
            var div = document.getElementById("tablo");
            div.appendChild(tab);
            return;
        }
        accounts.forEach(function(account){
            var found = true;
            switch(state){
                case "all":
                    break;
                default:
                    found = inState(account.Modified_Time, account.id, state, "acc");
                    break;
            }
            if(search && found){
                parts.forEach(function(part){
                    if(account.contient(part.trim())){
                        if(isNoContact){
                            if(account.contacts.length === 0){
                                rowTabAccount(tab, account);
                                nbK++;
                            }
                        }else{
                            rowTabAccount(tab, account);
                            nbK++;
                        }
                    }
                });
            }else if(found){
                if(isNoContact){
                    if(account.contacts.length === 0){
                        rowTabAccount(tab, account);
                        nbK++;
                    }
                }else{
                    rowTabAccount(tab, account);
                    nbK++;
                }
            }
        });
    }else{
        text = "accontName;phone;accountParent;reseau;accountType;id\n";
        var sep = ";";
        accounts.forEach(function(attr){
            text += attr.Email + sep + attr.First_Name + sep + attr.Last_Name
             + sep + attr.Company + sep + attr.Tag + sep + attr.id + "\n";
        });
        text += "\n";
    }
    setInfoTab(tableRes, translations[locale]["accounts-count"]+nbK);
    var div = document.getElementById("tablo");
    div.appendChild(tab);
    return;
}

function showReportAccount(){
    clearTablos();
    var ine = document.getElementById("accountSearch").value;
    const isNoContact = document.getElementById("noContact").checked;
    const state = document.querySelector('input[name="accStates"]:checked').value;
    getReportAccount(false, ine, isNoContact, state);
}
function showReportContactsAccount(){
    clearTablos();
    const ine = document.getElementById("accountSearch").value;
    getReportContactsAccount(ine);
}
