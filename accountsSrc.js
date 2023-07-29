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
/* global accounts */

function rowTabAccount(table, accnt){
    var tr = document.createElement('tr'); 
    var thi = document.createElement('td');
    var txhi = document.createTextNode(accnt.Account_Name);
    thi.appendChild(txhi);
    tr.appendChild(thi);
    var tha = document.createElement('td');
    var txha = document.createTextNode(accnt.Phone);
    tha.appendChild(txha);
    tr.appendChild(tha);
    var ths = document.createElement('td');
    var parent = "";
    if(accnt.Parent_Account !== undefined){
        parent = accnt.Parent_Account.name;
    }
    var txhs = document.createTextNode(parent);
    ths.appendChild(txhs);
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
    var tht = document.createElement('td');
    var txht = document.createTextNode(accnt.Account_Type);
    tht.appendChild(txht);
    tr.appendChild(tht);
    table.appendChild(tr);
}


function headTabAccount(){
    var table = document.createElement('table');
    var tr = document.createElement('tr'); 
    var thi = document.createElement('th');
    var txhi = document.createTextNode('Account_Name');
    thi.appendChild(txhi);
    tr.appendChild(thi);
    var tha = document.createElement('th');
    var txha = document.createTextNode('Phone');
    tha.appendChild(txha);
    tr.appendChild(tha);
    var ths = document.createElement('th');
    var txhs = document.createTextNode('Account_Parent');
    ths.appendChild(txhs);
    tr.appendChild(ths);
    var thp = document.createElement('th');
    var txhp = document.createTextNode('Reseau');
    thp.appendChild(txhp);
    tr.appendChild(thp);
    var tht = document.createElement('th');
    var txht = document.createTextNode('Account_Type');
    tht.appendChild(txht);
    tr.appendChild(tht);
    table.appendChild(tr);
    return table;
}

function getReportAccount(isFile){
    if(!isFile){
        var tab = headTabAccount();
        accounts.forEach(function(account){
            rowTabLead(tab, account);
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
    var div = document.getElementById("tablo");
    div.appendChild(tab);
    return;
}

function showReportAccount(){
    getReportAccount(false);
}
