/* 
Copyright Stéphane Georges Popoff, (juillet 2009 - juillet 2023)

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
function rowTabLead(table, lead){
    var tr = document.createElement('tr'); 
    var thi = document.createElement('td');
    var txhi = document.createTextNode(lead.Email);
    thi.appendChild(txhi);
    tr.appendChild(thi);
    var tha = document.createElement('td');
    var txha = document.createTextNode(lead.First_Name);
    tha.appendChild(txha);
    tr.appendChild(tha);
    var ths = document.createElement('td');
    var txhs = document.createTextNode(lead.Last_Name);
    ths.appendChild(txhs);
    tr.appendChild(ths);
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


function headTabLead(){
    var table = document.createElement('table');
    var tr = document.createElement('tr'); 
    var thi = document.createElement('th');
    var txhi = document.createTextNode('Email');
    thi.appendChild(txhi);
    tr.appendChild(thi);
    var tha = document.createElement('th');
    var txha = document.createTextNode('First Name');
    tha.appendChild(txha);
    tr.appendChild(tha);
    var ths = document.createElement('th');
    var txhs = document.createTextNode('Last Name');
    ths.appendChild(txhs);
    tr.appendChild(ths);
    var thp = document.createElement('th');
    var txhp = document.createTextNode('Company');
    thp.appendChild(txhp);
    tr.appendChild(thp);
    var tht = document.createElement('th');
    var txht = document.createTextNode('Tag');
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
function getReportLead(isFile){
    var nbK = 0;
    if(!isFile){
        var tab = headTabLead();
        leads.forEach(function(lead){
            rowTabLead(tab, lead);
            nbK++;
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
    setInfoTab(tableRes, "nb case="+nbK);
    var div = document.getElementById("tablo");
    div.appendChild(tab);
    return;
}

function showReportLead(){
    clearTablos();
    getReportLead(false);
}
