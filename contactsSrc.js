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
/* global accounts */

//Last_Name,First_Name,Full_Name,Email,Account_Name,Owner,Membre_du_R_seau,Tag,id
function rowTabSimilarContact(table, contactSim, url){
    var tr = document.createElement('tr'); 
    var tha = document.createElement('td');
    const x1 = document.createElement("A");
    x1.text = contactSim.Full_Name1;
    x1.id = contactSim.id1;
    x1.href = zohoCVM+"tab/Contacts/"+contactSim.id1;
    x1.target = "_blank";
//    var txha = document.createTextNode(x1);
//    tha.appendChild(txha)
    tha.appendChild(x1);
    tr.appendChild(tha);
    var tha2 = document.createElement('td');
    const x2 = document.createElement("A");
    x2.text = contactSim.Full_Name2;
    x2.id = contactSim.id2;
    x2.href = zohoCVM+"tab/Contacts/"+contactSim.id2;
    x2.target = "_blank";
//    var txha2 = document.createTextNode(x2);
    tha2.appendChild(x2);
    tr.appendChild(tha2);
    table.appendChild(tr);
}

function rowTabContact(table, cntc){
    var tr = document.createElement('tr'); 
    var thi = document.createElement('td');
    var txhi = document.createTextNode(cntc.Last_Name);
    thi.appendChild(txhi);
    tr.appendChild(thi);
    var tha = document.createElement('td');
    var txha = document.createTextNode(cntc.First_Name);
    tha.appendChild(txha);
    tr.appendChild(tha);
    var thf = document.createElement('td');
    var txhf = document.createTextNode(cntc.Full_Name);
    thf.appendChild(txhf);
    tr.appendChild(thf);
    var thm = document.createElement('td');
    const x1 = document.createElement("A");
    x1.text = cntc.Email;
    x1.id = cntc.id;
    x1.href = zohoCVM+"tab/Contacts/"+cntc.id;
    x1.target = "_blank";
    thm.appendChild(x1);
    tr.appendChild(thm);
    var the2 = document.createElement('td');
    var txhe2 = document.createTextNode(cntc.Secondary_Email);
    the2.appendChild(txhe2);
    tr.appendChild(the2);
    var ths = document.createElement('td');
    var parent = "";
    if(cntc.Account_Name !== undefined){
        parent = cntc.Account_Name.name;
    }
    var txhs = document.createTextNode(parent);
    ths.appendChild(txhs);
    tr.appendChild(ths);
    var tho = document.createElement('td');
    var owner = "";
    if(cntc.Owner !== undefined){
        owner = cntc.Owner.name;
    }
    var txho = document.createTextNode(owner);
    tho.appendChild(txho);
    tr.appendChild(tho);
    var tht = document.createElement('td');
    var txht = document.createTextNode(cntc.Membre_du_R_seau);
    tht.appendChild(txht);
    tr.appendChild(tht);
    var thg = document.createElement('td');
    var tags = "";
    if(cntc.Tag.length > 0){
        cntc.Tag.forEach(function(tag){
            tags += tag.name +" ";
        });
    }
    var txhg = document.createTextNode(tags);
    thg.appendChild(txhg);
    tr.appendChild(thg);
    var thid = document.createElement('td');
    var txhid = document.createTextNode(cntc.identityID);
    thid.appendChild(txhid);
    tr.appendChild(thid);
    table.appendChild(tr);
}
function headTabSimilarContact(){
    var table = document.createElement('table');
    var tr = document.createElement('tr'); 
    var tha = document.createElement('th');
    var txha = document.createTextNode(translations[locale]["contacts-sim-1"]);
    tha.appendChild(txha);
    tr.appendChild(tha);
    var tha2 = document.createElement('th');
    var txha2 = document.createTextNode(translations[locale]["contacts-sim-2"]);
    tha2.appendChild(txha2);
    tr.appendChild(tha2);
    table.appendChild(tr);
    return table;
}

//Last_Name,First_Name,Full_Name,Email,Account_Name,Owner,Membre_du_R_seau,Tag,id
function headTabContact(){
    var table = document.createElement('table');
    var tr = document.createElement('tr'); 
    var thi = document.createElement('th');
    var txhi = document.createTextNode(translations[locale]["contacts-lname"]);
    thi.appendChild(txhi);
    tr.appendChild(thi);
    var tha = document.createElement('th');
    var txha = document.createTextNode(translations[locale]["contacts-1name"]);
    tha.appendChild(txha);
    tr.appendChild(tha);
    var ths = document.createElement('th');
    var txhs = document.createTextNode(translations[locale]["contacts-fullname"]);
    ths.appendChild(txhs);
    tr.appendChild(ths);
    var thp = document.createElement('th');
    var txhp = document.createTextNode(translations[locale]["contacts-email"]);
    thp.appendChild(txhp);
    tr.appendChild(thp);
    var th2e = document.createElement('th');
    var txh2e = document.createTextNode(translations[locale]["contacts-2email"]);
    th2e.appendChild(txh2e);
    tr.appendChild(th2e);
    var tht = document.createElement('th');
    var txht = document.createTextNode(translations[locale]["contacts-account"]);
    tht.appendChild(txht);
    tr.appendChild(tht);
    var tho = document.createElement('th');
    var txho = document.createTextNode(translations[locale]["contacts-owner"]);
    tho.appendChild(txho);
    tr.appendChild(tho);
    var thr = document.createElement('th');
    var txhr = document.createTextNode(translations[locale]["contacts-mbrreseau"]);
    thr.appendChild(txhr);
    tr.appendChild(thr);
    var thg = document.createElement('th');
    var txhg = document.createTextNode(translations[locale]["contacts-tag"]);
    thg.appendChild(txhg);
    tr.appendChild(thg);
    var thid = document.createElement('th');
    var txhid = document.createTextNode(translations[locale]["contacts-idntID"]);
    thid.appendChild(txhid);
    tr.appendChild(thid);
    table.appendChild(tr);
    return table;
}
function getSimilarContacts(partInfo, url){
    var tab = headTabSimilarContact();
    var nbK = 0;
    var search = false;
    if(partInfo !== undefined && partInfo !== ""){
        search = true;
        partInfo = partInfo.toLowerCase();
    }
    simContacts.forEach(function(contactSim){
        if(search){
            if(contactSim.contient(partInfo)){
                rowTabSimilarContact(tab, contactSim, url);
                nbK++;
            }
        }else{
            rowTabSimilarContact(tab, contactSim, url);
            nbK++;
        }
    });
    setInfoTab(tableRes, translations[locale]["contacts-count-sim"]+nbK);
    var div = document.getElementById("tablo");
    div.appendChild(tab);
    return;
}
function getContactInfo(id){
    clearTablos();
    var contact = undefined;
    contacts.forEach(function(cnt){
        if(id === "cnt"+cnt.id){
            contact = cnt;
        }
    });
    if(contact !== undefined){
        var tab = headTabContact();
        rowTabContact(tab, contact);
        var div = document.getElementById("tablo");
        div.appendChild(tab);
    }
}

function getReportContact(isFile, partInfo, state, isGen){
    var nbK = 0;
    var search = false;
    var parts = [];
    if(partInfo !== undefined && partInfo !== ""){
        search = true;
        partInfo = partInfo.toLowerCase();
        parts = partInfo.split("|");
    }
    if(!isFile){
        var tab = headTabContact();
        if("del" === state){
            contactsOld.forEach(function(old){
                const itm = contacts.find((lid) => lid.id === old.id);
                if(itm === undefined){
                    const del = new Contact(old.id);
                    del.Email = old.id;
                    del.Modified_Time = old.Modified_Time;
                    rowTabContact(tab, del);
                    nbK++;
                }
            });
            setInfoTab(tableRes, translations[locale]["leads-count"]+nbK);
            var div = document.getElementById("tablo");
            div.appendChild(tab);
            return;
        }
        if("new" === state){
            contacts.forEach(function(lid){
                const old = contactsOld.find((un) => un.id === lid.id);
                if(old === undefined){
                    rowTabContact(tab, lid);
                    nbK++;
                }
            });
            setInfoTab(tableRes, translations[locale]["leads-count"]+nbK);
            var div = document.getElementById("tablo");
            div.appendChild(tab);
            return;
        }
        contacts.forEach(function(contact){
            var found = true;
            switch(state){
                case "all":
                    break;
                default:
                    found = inState(contact.Modified_Time, contact.id, state, "cnt");
                    break;
            }
            if(search && found){
                $.each(parts, function(index, value){
                    if(contact.contient(value.trim())){
                        rowTabContact(tab, contact);
                        nbK++;
                    }
                });
            }else if(found){
                if((isGen && contact.indic === '&') || !isGen){
                    rowTabContact(tab, contact);
                    nbK++;
                }
            }
        });
    }else{
        text = "email;secondaryEmail;firstName;lastName;fullName;company;tags;id\n";
        var sep = ";";
        var nbK = 0;
        contacts.forEach(function(attr){
            if(search){
                $.each(parts, function(index, value){
                    if(attr.contient(value.trim())){
                        text += toContactRow(attr, sep);
                        nbK++;
                    }
                });
            }else{
                text += toContactRow(attr, sep);
                nbK++;
            }
        });
        text += "\n";
        download("contacts.csv", text);
        setInfoTab(tableRes, translations[locale]["contacts-count"]+nbK);
        return;
    }
    setInfoTab(tableRes, translations[locale]["contacts-count"]+nbK);
    var div = document.getElementById("tablo");
    div.appendChild(tab);
    return;
}
function toContactRow(attr, sep){
    var tags = "";
    if(attr.Tag.length > 0){
        var sp = "";
        attr.Tag.forEach(function(tag){
            tags += sp+tag.name;
            sp = "|";
        });
    }
    return attr.Email + sep + attr.Secondary_Email+ sep + 
        attr.First_Name + sep + attr.Last_Name+ sep + attr.Full_Name
        + sep + attr.Company + sep + tags + sep + attr.id + "\n";

}
function showReportContact(){
    clearTablos();
    var ine = document.getElementById("contactSearch").value;
    const state = document.querySelector('input[name="cntStates"]:checked').value;
    const isGen = document.getElementById("genContact").checked;
    getReportContact(false, ine, state, isGen);
}
function printReportContact(){
    clearTablos();
    var ine = document.getElementById("contactSearch").value;
    getReportContact(true, ine, undefined, undefined);
}
function showSimilarContact(){
    clearTablos();
    var ine = document.getElementById("contactSearch").value;
    getSimilarContacts(ine, "");
}
