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
/* global campaigns */

function rowTabSimilarCampaign(table, campaignSim, url){
    var tr = document.createElement('tr'); 
    var tha = document.createElement('td');
    const x1 = document.createElement("A");
    x1.text = campaignSim.Full_Name1;
    x1.id = campaignSim.id1;
    x1.href = zohoCVM+"tab/Campaigns/"+campaignSim.id1;
    x1.target = "_blank";
//    var txha = document.createTextNode(x1);
//    tha.appendChild(txha)
    tha.appendChild(x1);
    tr.appendChild(tha);
    var tha2 = document.createElement('td');
    const x2 = document.createElement("A");
    x2.text = campaignSim.Full_Name2;
    x2.id = campaignSim.id2;
    x2.href = zohoCVM+"tab/Campaigns/"+campaignSim.id2;
    x2.target = "_blank";
//    var txha2 = document.createTextNode(x2);
    tha2.appendChild(x2);
    tr.appendChild(tha2);
    var th3 = document.createElement('td');
    const x3 = document.createElement("A");
    var idLink = 'cmp;'+ campaignSim.id1+";" +campaignSim.id2+ ";"+url;
    x3.id = idLink;
    x3.text = "fusion";
    x3.href = "fusion.html#&fk="+idLink;
    //x3.href = "?fk="+idLink;
    x3.target = "_blank";
    //x3.onclick = function(e) { return fusionClick(e); };
    //x3.onclick = function(e) { window.dispatchEvent(new Event('locationchange')); };
//    var txha2 = document.createTextNode(x2);
    th3.appendChild(x3);
    tr.appendChild(th3);
    table.appendChild(tr);
}

//fields=Campaign_Name,Date_Heure_de_Fin,Type,Parent_Campaign,Tag

function rowTabCampaign(table, cmp){
    var tr = document.createElement('tr'); 
    var thi = document.createElement('td');
    const x1 = document.createElement("A");
    x1.text = cmp.Campaign_Name;
    x1.id = cmp.id;
    x1.href = zohoCVM+"tab/Campaigns/"+cmp.id;
    x1.target = "_blank";
    thi.appendChild(x1);
    tr.appendChild(thi);
    var tha = document.createElement('td');
    var txha = document.createTextNode(cmp.Date_Heure_de_Fin);
    tha.appendChild(txha);
    tr.appendChild(tha);
    var thf = document.createElement('td');
    var txhf = document.createTextNode(cmp.Type);
    thf.appendChild(txhf);
    tr.appendChild(thf);
    var ths = document.createElement('td');
    var parent = "";
    if(Object.hasOwn(cmp.Parent_Compaign,"id")){
        parent = cmp.Parent_Compaign.name;
    }
    var txhs = document.createTextNode(parent);
    ths.appendChild(txhs);
    tr.appendChild(ths);
    var tags = "";
    if(cmp.Tag.length > 0){
        cmp.Tag.forEach(function(tag){
            tags += tag.name +" ";
        });
    }
    var thg = document.createElement('td');
    var txhg = document.createTextNode(tags);
    thg.appendChild(txhg);
    tr.appendChild(thg);
    table.appendChild(tr);
}
function headTabSimilarCampaign(){
    var table = document.createElement('table');
    var tr = document.createElement('tr'); 
    var tha = document.createElement('th');
    var txha = document.createTextNode(translations[locale]["campaigns-sim-1"]);
    tha.appendChild(txha);
    tr.appendChild(tha);
    var tha2 = document.createElement('th');
    var txha2 = document.createTextNode(translations[locale]["campaigns-sim-2"]);
    tha2.appendChild(txha2);
    tr.appendChild(tha2);
    var th3 = document.createElement('th');
    var txh3 = document.createTextNode(translations[locale]["campaigns-sim-link"]);
    th3.appendChild(txh3);
    tr.appendChild(th3);
    table.appendChild(tr);
    return table;
}

//Campaign_Name,Date_Heure_de_Fin,Type,Parent_Campaign,Tag
function headTabCampaign(){
    var table = document.createElement('table');
    var tr = document.createElement('tr'); 
    var thi = document.createElement('th');
    var txhi = document.createTextNode(translations[locale]["campaigns-name"]);
    thi.appendChild(txhi);
    tr.appendChild(thi);
    var tha = document.createElement('th');
    var txha = document.createTextNode(translations[locale]["campaigns-end-time"]);
    tha.appendChild(txha);
    tr.appendChild(tha);
    var ths = document.createElement('th');
    var txhs = document.createTextNode(translations[locale]["campaigns-type"]);
    ths.appendChild(txhs);
    tr.appendChild(ths);
    var tht = document.createElement('th');
    var txht = document.createTextNode(translations[locale]["campaigns-parent"]);
    tht.appendChild(txht);
    tr.appendChild(tht);
    var thg = document.createElement('th');
    var txhg = document.createTextNode(translations[locale]["campaigns-tag"]);
    thg.appendChild(txhg);
    tr.appendChild(thg);
    table.appendChild(tr);
    return table;
}
function getSimilarCampaigns(partInfo, url){
    var tab = headTabSimilarCampaign();
    var nbK = 0;
    var search = false;
    if(partInfo !== undefined && partInfo !== ""){
        search = true;
        partInfo = partInfo.toLowerCase();
    }
    simCampaigns.forEach(function(campaignSim){
        if(search){
            if(campaignSim.contient(partInfo)){
                rowTabSimilarCampaign(tab, campaignSim, url);
                nbK++;
            }
        }else{
            rowTabSimilarCampaign(tab, campaignSim, url);
            nbK++;
        }
    });
    setInfoTab(tableRes, translations[locale]["campaigns-count-sim"]+nbK);
    var div = document.getElementById("tablo");
    div.appendChild(tab);
    return;
}

function getReportCampaign(isFile, partInfo, state){
    var nbK = 0;
    var search = false;
    var parts = [];
    if(partInfo !== undefined && partInfo !== ""){
        search = true;
        partInfo = partInfo.toLowerCase();
        parts = partInfo.split("|");
    }
    if(!isFile){
        var tab = headTabCampaign();
        if("del" === state){
            campaignsOld.forEach(function(old){
                const itm = campaigns.find((lid) => lid.id === old.id);
                if(itm === undefined){
                    const del = new Campaign(old.id);
                    del.Name = old.id;
                    del.Modified_Time = old.Modified_Time;
                    rowTabCampaign(tab, del);
                    nbK++;
                }
            });
            setInfoTab(tableRes, translations[locale]["leads-count"]+nbK);
            var div = document.getElementById("tablo");
            div.appendChild(tab);
            return;
        }
        if("new" === state){
            campaigns.forEach(function(lid){
                const old = campaignsOld.find((un) => un.id === lid.id);
                if(old === undefined){
                    rowTabCampaign(tab, lid);
                    nbK++;
                }
            });
            setInfoTab(tableRes, translations[locale]["leads-count"]+nbK);
            var div = document.getElementById("tablo");
            div.appendChild(tab);
            return;
        }
        campaigns.forEach(function(campaign){
            var found = true;
            switch(state){
                case "all":
                    break;
                default:
                    found = inState(campaign.Modified_Time, campaign.id, state, "cmp");
                    break;
            }
            if(search && found){
                $.each(parts, function(index, value){
                    if(campaign.contient(value.trim())){
                        rowTabCampaign(tab, campaign);
                        nbK++;
                    }
                });
            }else if(found){
                rowTabCampaign(tab, campaign);
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
    setInfoTab(tableRes, translations[locale]["campaigns-count"]+nbK);
    var div = document.getElementById("tablo");
    div.appendChild(tab);
    return;
}

function showReportCampaign(){
    clearTablos();
    var ine = document.getElementById("campaignSearch").value;
    const state = document.querySelector('input[name="cmpStates"]:checked').value;
    getReportCampaign(false, ine, state);
}
function showSimilarCampaign(){
    clearTablos();
    var ine = document.getElementById("campaignSearch").value;
    getSimilarCampaigns(ine, "");
}
