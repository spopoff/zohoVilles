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
/* global desti */

$desti = {};
var prefixe = "";

function headTabFusion(){
    var table = document.createElement('table');
    var tr = document.createElement('tr'); 
    var th1 = document.createElement('th');
    var txh1 = document.createTextNode('Attribute name');
    th1.appendChild(txh1);
    tr.appendChild(th1);
    var th2 = document.createElement('th');
    var txh2 = document.createTextNode('Value 1');
    th2.appendChild(txh2);
    tr.appendChild(th2);
    var th3 = document.createElement('th');
    var txh3 = document.createTextNode('Operation');
    th3.appendChild(txh3);
    tr.appendChild(th3);
    var th4 = document.createElement('th');
    var txh4 = document.createTextNode('Value 2');
    th4.appendChild(txh4);
    tr.appendChild(th4);
    var th5 = document.createElement('th');
    var txh5 = document.createTextNode('Fusion');
    th5.appendChild(txh5);
    tr.appendChild(th5);
    table.appendChild(tr);
    return table;
}
function getStringValObjet(obj){
    var value = "";
    var sep = "";
    if(obj !== undefined && typeof obj !== 'object' && !(obj instanceof Array)){
        value = obj;
    }else if(typeof obj === 'object' && !(obj instanceof Array)){
        value = getVal(obj);
    }else if(obj instanceof Array){
        obj.forEach(function(o){
            value += sep + getVal(o);
            sep = "; ";
        });
    }else{
        value = "none";
    }
    return value;
}
function extractVal(obj){
    return document.createTextNode(getStringValObjet(obj));
}
function getVal(obj){
    for(var prop in obj){
        if (obj.hasOwnProperty(prop)) {
            if("id" === prop){
                continue;
            }
            return obj[prop];
        }
    }
}
function insertInput(name){
    var feld = document.createElement("input");
    feld.setAttribute("id",'desti'+name);
    feld.setAttribute("value", "...");
    return feld;
}
function insertFusionButton(name, idUpdate, idDelete, prefix){
    var feld = document.createElement("input");
    feld.setAttribute("id",prefix+';'+idUpdate+";"+idDelete);
    feld.setAttribute("type", "button");
    feld.setAttribute("value", "fusion in object "+name);
    feld.onclick = function(e) { return fusionWithObject(e); };
    return feld;
}
function fusionWithObject(e){
    var parts = [];
    parts = e.currentTarget.id.split(";");
    var prefix = parts[0];
    var idUpdate = parts[1];
    var idDelete = parts[2];
    console.log("update id="+idUpdate+" delete id="+idDelete+ " prefix="+prefix);
    $.desti["id"] = idUpdate;
    switch(prefix){
        case "cnt":
          mutation("Contact", $.desti);
          break;
        case "lif":
          mutation("Lead", $.desti);
          break;
    }
}
function mutation(prefix, fusion){
	var url = spoCVM;
	var head = new Headers();
	head.append("Content-Type", "application/json");
	mut = { query: 'mutation {update'+prefix+'('+prefix.lowerCase()+': '+JSON.stringify(fusion)+')}'
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
                alert("Save update "+prefix);
            }else{
                alert("Send update "+prefix);
            }
	})
	.catch(function(error) {
		setInfoTab(tableErr,'Error mutation: ' + error.message);
	});
	
}

function rowsTabFusion(table, obj1, obj2, prfx){
    for(var prop1 in obj1){
        if (obj1.hasOwnProperty(prop1)) {
            if("id" === prop1 || "infos" === prop1){
                continue;
            }
            var tr = document.createElement('tr'); 
            var th1 = document.createElement('td');
            var txh1 = document.createTextNode(prop1);
            th1.appendChild(txh1);
            tr.appendChild(th1);
            var th2 = document.createElement('td');
            th2.appendChild(extractVal(obj1[prop1]));
            tr.appendChild(th2);
            var th3 = document.createElement('td');
            th3.appendChild(copyLinkValCase("1", prop1, obj1.id, prfx));
            var txh3 = document.createTextNode(" ");
            th3.appendChild(txh3);
            th3.appendChild(copyLinkValCase("2", prop1, obj2.id, prfx));
            tr.appendChild(th3);
            const prop2 = obj2[prop1];
            var th4 = document.createElement('td');
            th4.appendChild(extractVal(prop2));
            tr.appendChild(th4);
            var th5 = document.createElement('td');
            th5.appendChild(insertInput(prop1));
            tr.appendChild(th5);
            table.appendChild(tr);
        }
    }
}
function copyLinkValCase(col, name, id, prfx){
    const x3 = document.createElement("A");
    x3.id = col + ";" + name + ";" + id + ";" + prfx;
    x3.text = "copy value "+col;
    x3.href = "#";
    x3.onclick = function(e) { return copyValCase(e); };
    return x3;
}
function copyValCase(e){
    var parts = [];
    parts = e.currentTarget.id.split(";");
    var name = parts[1];
    //col + ";" + name + ";" + id + ";" + prfx;
    var obj = getOneObject(parts[3], parts[2])[name];
    $.desti[name] = obj;
    var inp = document.getElementById('desti'+name);
    inp.value = getStringValObjet(obj);
}
function getOneObject(prefix, id){
    switch(prefix){
        case "accn":
            return accounts.find((obj) => {
                return obj.id === id;
            });
        case "cnt":
            return contacts.find((obj) => {
                return obj.id === id;
            });
        case "lid":
            return leads.find((obj) => {
                return obj.id === id;
            });
    }
}
function compareObjs(prefix, id1, id2){
    var tab = headTabFusion();
    $objA = getOneObject(prefix, id1);
    $objB = getOneObject(prefix, id2);
    rowsTabFusion(tab, $objA, $objB, prefix);
    var div = document.getElementById("tablo");
    div.appendChild(tab);
    //bouton de choix
    div.appendChild(document.createElement('br'));
    div.appendChild(insertFusionButton("1", id1, id2, prefix));
    div.appendChild(document.createTextNode( '\u00A0\u00A0' ));
    div.appendChild(insertFusionButton("2", id2, id1, prefix));
}
function fusionClick(e){
    $.desti = new Object();
    var parts = [];
    parts = e.currentTarget.id.split(";");
    clearTablos();
    compareObjs(parts[0], parts[1], parts[2]);
}