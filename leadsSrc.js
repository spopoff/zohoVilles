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
function rowTabSimilarLead(table, leadSim, url){
    var tr = document.createElement('tr'); 
    var tha = document.createElement('td');
    const x1 = document.createElement("A");
    x1.text = leadSim.First_Name1;
    x1.id = leadSim.id1;
    x1.href = zohoCVM+"tab/Leads/"+leadSim.id1;
    x1.target = "_blank";
//    var txha = document.createTextNode(x1);
//    tha.appendChild(txha)
    tha.appendChild(x1);
    tr.appendChild(tha);
    var ths = document.createElement('td');
    var txhs = document.createTextNode(leadSim.Last_Name1);
    ths.appendChild(txhs);
    tr.appendChild(ths);
    var tha2 = document.createElement('td');
    const x2 = document.createElement("A");
    x2.text = leadSim.First_Name2;
    x2.id = leadSim.id2;
    x2.href = zohoCVM+"tab/Leads/"+leadSim.id2;
    x2.target = "_blank";
//    var txha2 = document.createTextNode(x2);
    tha2.appendChild(x2);
    tr.appendChild(tha2);
    var ths2 = document.createElement('td');
    var txhs2 = document.createTextNode(leadSim.Last_Name2);
    ths2.appendChild(txhs2);
    tr.appendChild(ths2);
    table.appendChild(tr);
}
function rowTabLead(table, lead){
    var tr = document.createElement('tr'); 
    var thi = document.createElement('td');
    const x1 = document.createElement("A");
    x1.text = lead.Email;
    x1.id = lead.id;
    x1.href = zohoCVM+"tab/Leads/"+lead.id;
    x1.target = "_blank";
    thi.appendChild(x1);
    tr.appendChild(thi);
    var tha = document.createElement('td');
    var txha = document.createTextNode(lead.First_Name);
    tha.appendChild(txha);
    tr.appendChild(tha);
    var ths = document.createElement('td');
    var txhs = document.createTextNode(lead.Last_Name);
    ths.appendChild(txhs);
    tr.appendChild(ths);
    var the2 = document.createElement('td');
    var txhe2 = document.createTextNode(lead.Secondary_Email);
    the2.appendChild(txhe2);
    tr.appendChild(the2);
    var thp = document.createElement('td');
    var txhp = document.createTextNode(lead.Company);
    thp.appendChild(txhp);
    tr.appendChild(thp);
    var tht = document.createElement('td');
    var tags = "";
    lead.Tag.forEach(function(tag){
        tags += tag.name +" ";
    });
    var txht = document.createTextNode(tags);
    tht.appendChild(txht);
    tr.appendChild(tht);
    table.appendChild(tr);
}

function headTabSimilarLead(){
    var table = document.createElement('table');
    var tr = document.createElement('tr'); 
    var tha = document.createElement('th');
    var txha = document.createTextNode('First Name 1');
    tha.appendChild(txha);
    tr.appendChild(tha);
    var ths = document.createElement('th');
    var txhs = document.createTextNode('Last Name 1');
    ths.appendChild(txhs);
    tr.appendChild(ths);
    var tha2 = document.createElement('th');
    var txha2 = document.createTextNode('First Name 2');
    tha2.appendChild(txha2);
    tr.appendChild(tha2);
    var ths2 = document.createElement('th');
    var txhs2 = document.createTextNode('Last Name 2');
    ths2.appendChild(txhs2);
    tr.appendChild(ths2);
    table.appendChild(tr);
    return table;
}


function headTabLead(){
    var table = document.createElement('table');
    var tr = document.createElement('tr'); 
    var thi = document.createElement('th');
    var txhi = document.createTextNode(translations[locale]["leads-email"]);
    thi.appendChild(txhi);
    tr.appendChild(thi);
    var tha = document.createElement('th');
    var txha = document.createTextNode(translations[locale]["leads-1name"]);
    tha.appendChild(txha);
    tr.appendChild(tha);
    var ths = document.createElement('th');
    var txhs = document.createTextNode(translations[locale]["leads-lname"]);
    ths.appendChild(txhs);
    tr.appendChild(ths);
    var the2 = document.createElement('th');
    var txhe2 = document.createTextNode(translations[locale]["leads-2email"]);
    the2.appendChild(txhe2);
    tr.appendChild(the2);
    var thp = document.createElement('th');
    var txhp = document.createTextNode(translations[locale]["leads-company"]);
    thp.appendChild(txhp);
    tr.appendChild(thp);
    var tht = document.createElement('th');
    var txht = document.createTextNode(translations[locale]["leads-tag"]);
    tht.appendChild(txht);
    tr.appendChild(tht);
    table.appendChild(tr);
    return table;
}
function getLeadInfo(id){
    clearTablos();
    var lead = undefined;
    leads.forEach(function(lid){
        if(id === "lid"+lid.id){
            lead = lid;
        }
    });
    if(lead !== undefined){
        var tab = headTabLead();
        rowTabLead(tab, lead);
        var div = document.getElementById("tablo");
        div.appendChild(tab);
    }
}
function getSimilarLeads(partInfo, url){
    var tab = headTabSimilarLead();
    var nbK = 0;
    var search = false;
    if(partInfo !== undefined && partInfo !== ""){
        search = true;
        partInfo = partInfo.toLowerCase();
    }
    simLeads.forEach(function(leadSim){
        if(search){
            if(leadSim.contient(partInfo)){
                rowTabSimilarLead(tab, leadSim, url);
                nbK++;
            }
        }else{
            rowTabSimilarLead(tab, leadSim, url);
            nbK++;
        }
    });
    setInfoTab(tableRes, translations[locale]["leads-count-sim"]+nbK);
    var div = document.getElementById("tablo");
    div.appendChild(tab);
    return;
}
function getReportLead(isFile, partInfo, state){
    var nbK = 0;
    var search = false;
    if(partInfo !== undefined && partInfo !== ""){
        search = true;
        partInfo = partInfo.toLowerCase();
    }
    if(!isFile){
        var tab = headTabLead();
        if("del" === state){
            leadsOld.forEach(function(old){
                const itm = leads.find((lid) => lid.id === old.id);
                if(itm === undefined){
                    const del = new Lead(old.id);
                    del.Email = old.id;
                    del.Modified_Time = old.Modified_Time;
                    del.First_Name = translations[locale]["deleted"];
                    del.Last_Name = translations[locale]["deleted"];
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
            leads.forEach(function(lid){
                const old = leadsOld.find((un) => un.id === lid.id);
                if(old === undefined){
                    rowTabLead(tab, lid);
                    nbK++;
                }
            });
            setInfoTab(tableRes, translations[locale]["leads-count"]+nbK);
            var div = document.getElementById("tablo");
            div.appendChild(tab);
            return;
        }
        leads.forEach(function(lead){
            var found = true;
            switch(state){
                case "all":
                    break;
                default:
                    found = inState(lead.Modified_Time, lead.id, state, "lid");
                    break;
            }
            if(search && found){
                if(lead.contient(partInfo)){
                    rowTabLead(tab, lead);
                    nbK++;
                }
            }else if(found){
                rowTabLead(tab, lead);
                nbK++;
            }
        });
    }else{
        text = "email;firstName;lastName;company;tag;id\n";
        var sep = ";";
        leads.forEach(function(attr){
            text += attr.Email + sep + attr.First_Name + sep + attr.Last_Name
             + sep + attr.Company + sep + attr.Tag + sep + attr.id + "\n";
        });
        text += "\n";
    }
    setInfoTab(tableRes, translations[locale]["leads-count"]+nbK);
    var div = document.getElementById("tablo");
    div.appendChild(tab);
    return;
}

function showReportLead(){
    clearTablos();
    var ine = document.getElementById("leadSearch").value;
    const state = document.querySelector('input[name="lidStates"]:checked').value;
    getReportLead(false, ine, state);
}
function showSimilarLead(){
    clearTablos();
    var ine = document.getElementById("leadSearch").value;
    getSimilarLeads(ine, "");
}
