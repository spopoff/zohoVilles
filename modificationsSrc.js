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
function rowTabModif(table, modif, prefix){
    var tr = document.createElement('tr'); 
    var thi = document.createElement('td');
    const x1 = document.createElement("A");
    if(modif.Email !== undefined){
        x1.text = modif.Email;
    }else{
        x1.text = "Zoho Id";
    }
    x1.id = modif.id;
    x1.href = zohoCVM+"tab/Leads/"+modif.id;
    x1.target = "_blank";
    thi.appendChild(x1);
    tr.appendChild(thi);
    var thm2 = document.createElement('td');
    var txhm2 = document.createTextNode(modif.Seconday_Email);
    thm2.appendChild(txhm2);
    tr.appendChild(thm2);
    var tha = document.createElement('td');
    var txha = document.createTextNode(modif.First_Name);
    tha.appendChild(txha);
    tr.appendChild(tha);
    var ths = document.createElement('td');
    var txhs = document.createTextNode(modif.Last_Name);
    ths.appendChild(txhs);
    tr.appendChild(ths);
	if("lid" === prefix){
		var thp = document.createElement('td');
		var txhp = document.createTextNode(modif.Company);
		thp.appendChild(txhp);
		tr.appendChild(thp);
	}else{
		var thp = document.createElement('td');
		var txhp = document.createTextNode(modif.Membre_du_R_seau);
		thp.appendChild(txhp);
		tr.appendChild(thp);
	}	
    var tht = document.createElement('td');
    var tags = "";
    modif.Tag.forEach(function(tag){
        tags += tag.name +" ";
    });
    var txht = document.createTextNode(tags);
    tht.appendChild(txht);
    tr.appendChild(tht);
    var thc = document.createElement('td');
    var txhc = document.createTextNode(modif.action);
    thc.appendChild(txhc);
    tr.appendChild(thc);
    table.appendChild(tr);
}


function headTabModif(prefix){
    var table = document.createElement('table');
    var tr = document.createElement('tr'); 
    var thi = document.createElement('th');
    var txhi = document.createTextNode('Email');
    thi.appendChild(txhi);
    tr.appendChild(thi);
    var thi2 = document.createElement('th');
    var txhi2 = document.createTextNode('Secondary_Email');
    thi2.appendChild(txhi2);
    tr.appendChild(thi2);
    var tha = document.createElement('th');
    var txha = document.createTextNode('First Name');
    tha.appendChild(txha);
    tr.appendChild(tha);
    var ths = document.createElement('th');
    var txhs = document.createTextNode('Last Name');
    ths.appendChild(txhs);
    tr.appendChild(ths);
	if("Leads" === prefix){
		var thp = document.createElement('th');
		var txhp = document.createTextNode('Company');
		thp.appendChild(txhp);
		tr.appendChild(thp);
	}else{
		var thp = document.createElement('th');
		var txhp = document.createTextNode('Membre_du_R_seau');
		thp.appendChild(txhp);
		tr.appendChild(thp);
	}	
    var tht = document.createElement('th');
    var txht = document.createTextNode('Tag');
    tht.appendChild(txht);
    tr.appendChild(tht);
    var thc = document.createElement('th');
    var txhc = document.createTextNode('Action');
    thc.appendChild(txhc);
    tr.appendChild(thc);
    table.appendChild(tr);
    return table;
}
function pendingModif(prefix, tab){
	var head = new Headers();
	head.append("Content-Type", "application/json");
	const url = document.getElementById("gqlCVM").value;
	mut = { query: 'query($rien: String){updating'+prefix+'(rien: $rien){'+
		'id,Last_Name,First_Name,Full_Name,Membre_du_R_seau,action,Tag {id,name}, action}}',
                variables: {rien: 'rien de rien'}
	};
	var param = {
		method: 'Post',
		headers: head,
		body: JSON.stringify(mut)
	};
	var req = new Request(url,param);
	fetch(req, param).then(function(response){
		if(response.ok){
			return response.clone().json();
		}else{
			setInfoTab(tableErr,'Error mutation: ' + response.status+" message="+response.statusText);
		}
	}).then(function(res){
            if(res !== undefined){
                if(Object.hasOwn(res, "errors")){
                    setInfoTab(tableErr,'Error query: ' + res.errors[0].message);
                }else{
                    var nbK = 0;
                    res.data["updating"+prefix].forEach(function(obj){
                        rowTabModif(tab, obj, prefix);
                        nbK++;
                    });
                    setInfoTab(tableRes, prefix+" nb="+nbK);
                    var div = document.getElementById("tablo");
                    div.appendChild(tab);
                }
            }
	})
	.catch(function(error) {
		setInfoTab(tableErr,'Error mutation: ' + error.message);
	});
	
}

function getReportModif(isFile, partInfo){
    var nbK = 0;
    var search = false;
    if(partInfo !== undefined && partInfo !== ""){
        search = true;
        partInfo = partInfo.toLowerCase();
    }
    if(!isFile){
        var tab = headTabModif("Contacts");
		pendingModif("Contacts", tab);
    }else{
    }
    return;
}

function pendingModification(){
    clearTablos();
    getReportModif(false, "");
}
