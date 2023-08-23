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
/* global accounts */

//Last_Name,First_Name,Full_Name,Email,Account_Name,Owner,Membre_du_R_seau,Tag,id
function rowTabSimilarContact(table, contactSim){
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
    var th3 = document.createElement('td');
    const x3 = document.createElement("A");
    var idLink = 'cnt;'+ contactSim.id1+";" +contactSim.id2;
    x3.id = idLink;
    x3.text = "fusion";
    x3.href = "#";
    //x3.href = "?fk="+idLink;
    //x3.target = "_blank";
    x3.onclick = function(e) { return fusionClick(e); };
    //x3.onclick = function(e) { window.dispatchEvent(new Event('locationchange')); };
//    var txha2 = document.createTextNode(x2);
    th3.appendChild(x3);
    tr.appendChild(th3);
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
    cntc.Tag.forEach(function(tag){
        tags += tag.name +" ";
    });
    var txhg = document.createTextNode(tags);
    thg.appendChild(txhg);
    tr.appendChild(thg);
    table.appendChild(tr);
}
function headTabSimilarContact(){
    var table = document.createElement('table');
    var tr = document.createElement('tr'); 
    var tha = document.createElement('th');
    var txha = document.createTextNode('Full Name 1');
    tha.appendChild(txha);
    tr.appendChild(tha);
    var tha2 = document.createElement('th');
    var txha2 = document.createTextNode('Full Name 2');
    tha2.appendChild(txha2);
    tr.appendChild(tha2);
    var th3 = document.createElement('th');
    var txh3 = document.createTextNode('Fusion !');
    th3.appendChild(txh3);
    tr.appendChild(th3);
    table.appendChild(tr);
    return table;
}

//Last_Name,First_Name,Full_Name,Email,Account_Name,Owner,Membre_du_R_seau,Tag,id
function headTabContact(){
    var table = document.createElement('table');
    var tr = document.createElement('tr'); 
    var thi = document.createElement('th');
    var txhi = document.createTextNode('Last_Name');
    thi.appendChild(txhi);
    tr.appendChild(thi);
    var tha = document.createElement('th');
    var txha = document.createTextNode('First_Name');
    tha.appendChild(txha);
    tr.appendChild(tha);
    var ths = document.createElement('th');
    var txhs = document.createTextNode('Full_Name');
    ths.appendChild(txhs);
    tr.appendChild(ths);
    var thp = document.createElement('th');
    var txhp = document.createTextNode('Email');
    thp.appendChild(txhp);
    tr.appendChild(thp);
    var tht = document.createElement('th');
    var txht = document.createTextNode('Account_Name');
    tht.appendChild(txht);
    tr.appendChild(tht);
    var tho = document.createElement('th');
    var txho = document.createTextNode('Owner');
    tho.appendChild(txho);
    tr.appendChild(tho);
    var thr = document.createElement('th');
    var txhr = document.createTextNode('Membre_du_Reseau');
    thr.appendChild(txhr);
    tr.appendChild(thr);
    var thg = document.createElement('th');
    var txhg = document.createTextNode('Tag');
    thg.appendChild(txhg);
    tr.appendChild(thg);
    table.appendChild(tr);
    return table;
}
function getSimilarContacts(partInfo){
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
                rowTabSimilarContact(tab, contactSim);
                nbK++;
            }
        }else{
            rowTabSimilarContact(tab, contactSim);
            nbK++;
        }
    });
    setInfoTab(tableRes, "contacts similar nb="+nbK);
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

function getReportContact(isFile, partInfo){
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
        contacts.forEach(function(contact){
            if(search){
                $.each(parts, function(index, value){
                    if(contact.contient(value.trim())){
                        rowTabContact(tab, contact);
                        nbK++;
                    }
                });
            }else{
                rowTabContact(tab, contact);
                nbK++;
            }
        });
    }else{
        text = "lastName,firstName,fullName,email,accountName,owner,memberReseau,tags,id\n";
        var sep = ";";
        accounts.forEach(function(attr){
            text += attr.Email + sep + attr.First_Name + sep + attr.Last_Name
             + sep + attr.Company + sep + attr.Tag + sep + attr.id + "\n";
        });
        text += "\n";
    }
    setInfoTab(tableRes, "contacts nb="+nbK);
    var div = document.getElementById("tablo");
    div.appendChild(tab);
    return;
}

function showReportContact(){
    clearTablos();
    var ine = document.getElementById("contactSearch").value;
    getReportContact(false, ine);
}
function showSimilarContact(){
    clearTablos();
    var ine = document.getElementById("contactSearch").value;
    getSimilarContacts(ine);
}
