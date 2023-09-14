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


function getAccessTokenTest(cliId, cliSt, code){
	var head = new Headers();
	head.append("Content-Type", "application/x-www-form-urlencoded");
	var body = {
            grant_type: 'authorization_code',
            client_id: cliId,
            client_secret: cliSt,
            code: code,
            redirect_url: 'https://cvm.spopoff.net:8443/login/oauth2/code/zoho'
	};
	var url = "https://accounts.zoho.com/oauth/v2/token";
	var param = {
            method: 'POST',
            body: JSON.stringify(body)
	};
	var req = new Request(url,param);
	fetch(req, param).then(function(response){
            if(response.ok){
                return response.clone().json();
            }else{
                tableInfos(tableErr, "tabloErr", "Errors");
                setInfoTab(tableErr,'Error fetch access token: ' + response.status+" message="+response.statusText);
            }
	}).then(function(res){
            if(res.access_token !== undefined){
                setInfoTab(tableRes,'Done :'+res.access_token);
            }else{
                tableInfos(tableErr, "tabloErr", "Errors");
                setInfoTab(tableErr,'Error fetch access token: ' + res.error);
            }
		
	})
	.catch(function(error) {
            setInfoTab(tableErr,'Error fetch access token: ' + error.message);
	});
}

function getAuthzCode(cliId, scope){
	var head = new Headers();
	head.append("Content-Type", "application/x-www-form-urlencoded");
	var url = "https://accounts.zoho.eu/signin?servicename=AaaServer&Serviceurl="+
                "https://accounts.zoho.eu/oauth/v2/token?scope="+scope+
                "&client_id="+cliId+"&response_type=code&access_type=online"+
                "&redirect_uri=http://spopoff.com";
	var param = {
            method: 'GET'
	};
	var req = new Request(url,param);
	fetch(req, param).then(function(response){
            if(response.ok){
                return response;
            }else{
                tableInfos(tableErr, "tabloErr", "Errors");
                setInfoTab(tableErr,'Error fetch access token: ' + response.status+" message="+response.statusText);
            }
	}).then(function(res){
            res.text().then(function(data){
                //const win = window.open("", "_blank", "popup");
                window.document.write(data);
            });
	})
	.catch(function(error) {
            setInfoTab(tableErr,'Error fetch access token: ' + error.message);
	});
}

function getAccessTokenRefresh(cliId, cliSt, aksTok){
	var head = new Headers();
	head.append("Content-Type", "application/x-www-form-urlencoded");
	var body = {
            grant_type: 'authorization_code',
            client_id: cliId,
            client_secret: cliSt,
            code: code,
            redirect_url: 'http://spopoff.com'
	};
	var url = "https://accounts.zoho.eu/oauth/v2/token";
	var param = {
            method: 'POST',
            body: JSON.stringify(body)
	};
	var req = new Request(url,param);
	fetch(req, param).then(function(response){
            if(response.ok){
                return response.clone().json();
            }else{
                tableInfos(tableErr, "tabloErr", "Errors");
                setInfoTab(tableErr,'Error fetch access token: ' + response.status+" message="+response.statusText);
            }
	}).then(function(res){
            if(res.access_token !== undefined){
                setInfoTab(tableRes,'Done :'+res.access_token);
            }else{
                tableInfos(tableErr, "tabloErr", "Errors");
                setInfoTab(tableErr,'Error fetch access token: ' + res.error);
            }
		
	})
	.catch(function(error) {
            setInfoTab(tableErr,'Error fetch access token: ' + error.message);
	});
}

function clearTablos(){
    tableRes = document.createElement('table');
    tableErr = document.createElement('table');
    var div = document.getElementById("tabloRes");
    div.innerHTML = '';
    div.appendChild(tableRes);
    var div2 = document.getElementById("tabloErr");
    div2.appendChild(tableErr);
    div2.innerHTML = '';
    var div3 = document.getElementById("tablo");
    div3.innerHTML = '';
}
function tableInfos(tab, divName, title){
    if(tab.childNodes.length === 0){
        var tr = document.createElement('tr');   
        var th1 = document.createElement('th');
        var txh1 = document.createTextNode(title);
        th1.appendChild(txh1);
        tr.appendChild(th1);
        tab.appendChild(tr);
    }
    var div = document.getElementById(divName);
    div.innerHTML = '';
    div.appendChild(tab);
    $(div).hide();
}
function setInfoTab(tab, info){
    $(tab.parentNode).show();
    var tr = document.createElement('tr');   
    var th1 = document.createElement('td');
    var txh1 = document.createTextNode(info);
    th1.appendChild(txh1);
    tr.appendChild(th1);
    tab.appendChild(tr);
}
function test(){
    clearTablos();
    zohoUrl = document.getElementById('zohoUrl').value;
    zohoAk = document.getElementById('zohoAk').value;
    if(zohoUrl !==  undefined && zohoUrl !== "" && zohoAk !==  undefined && zohoAk !== ""){
	var url = zohoUrl + "settings/modules";
	var head = new Headers();
	head.append("Authorization", "Zoho-oauthtoken "+zohoAk);
        head.append("If-Modified-Since", "2020-05-15T12:00:00+05:30");
	var param = {
		method: 'GET',
		headers: head
	};
	var req = new Request(url,param);
	fetch(req, param).then(function(response){
		if(response.ok){
                    return response.clone().json();
		}else{
                    alert("Test API KO !");
                    setInfoTab(tableErr,'Error test access token: '
                            + response.status+' message='+response.statusText);
		}
	}).then(function(res){
            if(res !== undefined){
		alert("Test API OK");
            }
	})
	.catch(function(error) {
		setInfoTab(tableErr,'Error test access token: ' + error.message);
	});
    }else{
        setInfoTab(tableErr,'Error ZOHO API URL empty or Access Token empty');
    }
}
function getGrantToken(){
    clearTablos();
    zohoUrl = document.getElementById('zohoUrl').value;
    zohoSc = document.getElementById('zohoSc').value;
    zohoRd = document.getElementById('zohoRd').value;
    zohoId = document.getElementById('zohoId').value;

    if(zohoUrl !== "" && zohoSc !== "" && zohoRd !== "" && zohoId !== ""){
	document.location.assign(zohoUrl+'/signin?service_language=fr&servicename=ZohoCRM&signupurl=https://www.zoho.eu/fr/crm/signup.html&serviceurl=https%3A%2F%2Fcrm.zoho.eu%2Fcrm%2FShowHomePage.do%3Fref_value%3D%252C%252C%252CDesktop%252Chttps%253A%252F%252Fwww.zoho.eu%252Ffr%252Fcrm%252Fdeveloper%252F');
    }else{
        alert("Update params for Grant Token");
    }
}
function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

function requestAkstok(){
    clearTablos();
    const cliId = document.getElementById("cliId").value;
    const cliSec = document.getElementById("cliSec").value;
    const code = document.getElementById("authCode").value;
    getAccessTokenTest(cliId, cliSec, code);
}
function refreshAkstok(){
    clearTablos();
    const cliId = document.getElementById("cliId").value;
    const cliSec = document.getElementById("cliSec").value;
    const code = document.getElementById("authCode").value;
    getAccessTokenRefresh(cliId, cliSec, code);
}
function requestAuthzCode(){
    clearTablos();
    const cliId = document.getElementById("cliId").value;
    const scope = document.getElementById("authCode").value;
    getAuthzCode(cliId, scope);
}
function inState(modified_Time, id, state, objType){
    switch(objType){
        case "lid":
            return inCollState(modified_Time, id, state, leadsOld);
            break;
        case "cnt":
            return inCollState(modified_Time, id, state, contactsOld);
            break;
        case "acc":
            return inCollState(modified_Time, id, state, accountsOld);
            break;
        case "cmp":
            return inCollState(modified_Time, id, state, campaignsOld);
            break;
    }

}
function inCollState(modified_Time, id, state, oldStates){
    var item = undefined;
    const modifOld = new Date(modified_Time);
    switch(state){
        case "idm":
            item = oldStates.find((itm) => itm.id === id && itm.Modified_Time === modified_Time);
            break;
        case "upd":
            item = oldStates.find((itm) => itm.id === id);
            if(item !== undefined){
                const modifNow = new Date(item.Modified_Time);
                if(modifNow > modifOld){
                    return true;
                }else{
                    return false;
                }
            }
            break;
    }
    if(item === undefined){
        return false;
    }
    return true;
}
/**
 * le nombre de changement
 * @param {type} state new, del, upt, idm
 * @param {type} olds le dernier rappor
 * @param {type} actuals données actuelles
 * @param {type} type cnt, acc, cmp, lid
 * @returns {Number}
 */
function getNb4States4Type(state, olds, actuals, type){
    var nbK = 0;
    if("del" === state){
        olds.forEach(function(old){
            const itm = actuals.find((lid) => lid.id === old.id);
            if(itm === undefined){
                nbK++;
            }
        });
        return nbK;
    }
    if("new" === state){
        actuals.forEach(function(lid){
            const old = olds.find((un) => un.id === lid.id);
            if(old === undefined){
                nbK++;
            }
        });
        return nbK;
    }
    actuals.forEach(function(contact){
        var found = true;
        switch(state){
            case "all":
                break;
            default:
                found = inState(contact.Modified_Time, contact.id, state, type);
                break;
        }
        if(found){
            nbK++;
        }
    });
    return nbK;
}

