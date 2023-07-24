/*
Copyright Stéphane Georges Popoff, (juillet 2009 - septembre 2020)

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


/* global aps */

function getPersonalCred(idnNm, aksTok){
	var url = "https://" + idnNm + ".api.identitynow.com/beta/personal-access-tokens";
	var head = new Headers();
	head.append("Content-Type", "application/json");
	head.append("Authorization", "Bearer "+aksTok);
	pat = {
		name: "APCSV_AXA5"
	}
	var param = {
		method: 'Post',
		headers: head,
		body: JSON.stringify(pat)
	};
	var req = new Request(url,param);
	fetch(req, param).then(function(response){
		if(response.ok){
			return response.clone().json();
		}else{
			setInfoTab(tableErr,'Error get personnal access token: ' + response.status+" message="+response.statusText);
		}
	}).then(function(res){
		$('#idnAk').val("");
		$('#idnId').val(res.id);
		$('#idnSt').val(res.secret);
		alert("Save clientId and Client Secret for reuse");
	})
	.catch(function(error) {
		setInfoTab(tableErr,'Error get personnal access token: ' + error.message);
	});
	
}
/**
* il faut en plus récupérer les accessProfileId pour encuite
* retourner dans la boucle normale des applis
*/
function getAccessTokenForApplisForced(idnId, idnSt, idnNm){
	var head = new Headers();
	head.append("Content-Type", "application/json");
	var body = {
		grant_type: 'client_credentials',
		client_id: idnId,
		client_secret: idnSt
	};
	var url = "https://" + idnNm + ".api.identitynow.com/oauth/token";
	url += "?client_id="+idnId+"&client_secret="+idnSt+"&grant_type=client_credentials"
	var param = {
		method: 'POST'
	};
	var req = new Request(url,param);
	fetch(req, param).then(function(response){
		if(response.ok){
			return response.clone().json();
		}else{
			tableInfos(tableErr, "tabloErr", "Errors");
			setInfoTab(tableErr,'Error fetch getAccessTokenForApplis: ' + response.status+" message="+response.statusText);
		}
	}).then(function(res){
		if(res !== undefined){
			//va mettre à jour les identifiants d' accessProfile
			setAccessProfilesAP(res.access_token, idnNm, aps);
		}else{
			setInfoTab(tableErr,'Error fetch getAccessTokenForApplis: no access token');
		}
	})
	.catch(function(error) {
		setInfoTab(tableErr,'Error fetch getAccessTokenForApplis: ' + error.message);
	});
}

/**
* retour sur le forçage des applis
* on doit boucler sur 20 entrées pour éviter le 429
*/
function getAccessTokenForApplis(idnId, idnSt, idnNm){
	var head = new Headers();
	head.append("Content-Type", "application/json");
	var body = {
		grant_type: 'client_credentials',
		client_id: idnId,
		client_secret: idnSt
	};
	var url = "https://" + idnNm + ".api.identitynow.com/oauth/token";
	url += "?client_id="+idnId+"&client_secret="+idnSt+"&grant_type=client_credentials"
	var param = {
		method: 'POST'
	};
	var req = new Request(url,param);
	fetch(req, param).then(function(response){
		if(response.ok){
			return response.clone().json();
		}else{
			tableInfos(tableErr, "tabloErr", "Errors");
			setInfoTab(tableErr,'Error fetch getAccessTokenForApplis: ' + response.status+" message="+response.statusText);
		}
	}).then(function(res){
		if(res !== undefined){
			//retour vers la mise à jours des 20 prochaines applis
			setAppAccessProfile(res.access_token, idnNm, aps);
		}else{
			setInfoTab(tableErr,'Error fetch getAccessTokenForApplis: no access token');
		}
	})
	.catch(function(error) {
		setInfoTab(tableErr,'Error fetch getAccessTokenForApplis: ' + error.message);
	});
}


function getAccessTokenV3(idnId, idnSt, idnNm){
	var head = new Headers();
	head.append("Content-Type", "application/json");
	var body = {
		grant_type: 'client_credentials',
		client_id: idnId,
		client_secret: idnSt
	};
	var url = "https://" + idnNm + ".api.identitynow.com/oauth/token";
	url += "?client_id="+idnId+"&client_secret="+idnSt+"&grant_type=client_credentials"
	var param = {
		method: 'POST'
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
		getAccessProfilesV3(res.access_token, aps, idnNm);
		
	})
	.catch(function(error) {
		setInfoTab(tableErr,'Error fetch access token: ' + error.message);
	});
}
/**
* récupère l'accès token et charge la liste des applis 'voir applis.getAppsOld)
*/
function getAccessTokenOldAP(idnId, idnSt, idnNm, oaps, tab){
	var head = new Headers();
	head.append("Content-Type", "application/json");
	var body = {
		grant_type: 'client_credentials',
		client_id: idnId,
		client_secret: idnSt
	};
	var url = "https://" + idnNm + ".api.identitynow.com/oauth/token";
	url += "?client_id="+idnId+"&client_secret="+idnSt+"&grant_type=client_credentials"
	var param = {
		method: 'POST'
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
		if(res !== undefined){
			loadOldAccessProfile(res.access_token, oaps, idnNm, tab);
		}
		
	})
	.catch(function(error) {
		setInfoTab(tableErr,'Error fetch access token: ' + error.message);
	});
}


function getAccessTokenTest(idnId, idnSt, idnNm, aps){
	var head = new Headers();
	head.append("Content-Type", "application/json");
	var body = {
		grant_type: 'client_credentials',
		client_id: idnId,
		client_secret: idnSt
	};
	var url = "https://" + idnNm + ".api.identitynow.com/oauth/token";
	url += "?client_id="+idnId+"&client_secret="+idnSt+"&grant_type=client_credentials"
	var param = {
		method: 'POST'
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
		getAppsTest(res.access_token, aps, idnNm);
		
	})
	.catch(function(error) {
		setInfoTab(tableErr,'Error fetch access token: ' + error.message);
	});
}
/**
* import d'un fichier AP
*/
function getAccessToken(idnId, idnSt, idnNm, aps){
	var head = new Headers();
	head.append("Content-Type", "application/json");
	var body = {
		grant_type: 'client_credentials',
		client_id: idnId,
		client_secret: idnSt
	};
	var url = "https://" + idnNm + ".api.identitynow.com/oauth/token";
	url += "?client_id="+idnId+"&client_secret="+idnSt+"&grant_type=client_credentials"
	var param = {
		method: 'POST'
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
		if(res !== undefined){
			idnAk = res.access_token;
			getSrcs(idnAk, aps, idnNm);
		}else{
			$("#intAP").show();
		}
		
	})
	.catch(function(error) {
		setInfoTab(tableErr,'Error fetch access token: ' + error.message);
		$("#intAP").show();
	});
}
function clearTablos(){
	tableRes = document.createElement('table');
	tableErr = document.createElement('table');
    var div = document.getElementById("tabloRes");
    div.innerHTML = '';
    div = document.getElementById("tabloErr");
    div.innerHTML = '';
    div = document.getElementById("tablo");
    div.innerHTML = '';
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
	head.append("Content-Type", "application/json");
	head.append("Authorization", "Zoho-oauthtoken "+zohoAk);
	var param = {
		method: 'Get',
		headers: head
	};
	var req = new Request(url,param);
	fetch(req, param).then(function(response){
		if(response.ok){
			return response.clone().json();
		}else{
                    alert("Test API KO !");
                    setInfoTab(tableErr,'Error test access token: ' + response.status+" message="+response.statusText);
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
function CSVToArray( strData, strDelimiter ){
	// Check to see if the delimiter is defined. If not,
	// then default to comma.
	strDelimiter = (strDelimiter || ",");

	// Create a regular expression to parse the CSV values.
	var objPattern = new RegExp(
		(
			// Delimiters.
			"(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
			// Quoted fields.
			"(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

			// Standard fields.
			"([^\\" + strDelimiter + "\\r\\n]*))"
		),
		"gi"
		);
	// Create an array to hold our data. Give the array
	// a default empty first row.
	var arrData = [[]];
	// Create an array to hold our individual pattern
	// matching groups.
	var arrMatches = null;
	// Keep looping over the regular expression matches
	// until we can no longer find a match.
	while (arrMatches = objPattern.exec( strData )){
		// Get the delimiter that was found.
		var strMatchedDelimiter = arrMatches[ 1 ];

		// Check to see if the given delimiter has a length
		// (is not the start of string) and if it matches
		// field delimiter. If id does not, then we know
		// that this delimiter is a row delimiter.
		if (
			strMatchedDelimiter.length &&
			(strMatchedDelimiter != strDelimiter)
			){
			// Since we have reached a new row of data,
			// add an empty row to our data array.
			arrData.push( [] );

		}
		// Now that we have our delimiter out of the way,
		// let's check to see which kind of value we
		// captured (quoted or unquoted).
		if (arrMatches[ 2 ]){
			// We found a quoted value. When we capture
			// this value, unescape any double quotes.
			/*var strMatchedValue = arrMatches[ 2 ].replace(
				new RegExp( "\"\"", "g" ),
				"\""
				);
			*/
		} else {
			// We found a non-quoted value.
			var strMatchedValue = arrMatches[ 3 ];

		}
		// Now that we have our value string, let's add
		// it to the data array.
		arrData[ arrData.length - 1 ].push( strMatchedValue );
	}

	// Return the parsed data.
	return( arrData );
}
function setButtons(chk){
	if(chk.checked && aps.length > 0){
		$("#updApp").show();
		$("#intAP").hide();
	}else if(!chk.checked && aps.length > 0){
		$("#updApp").hide();
		$("#intAP").show();
	}
}
