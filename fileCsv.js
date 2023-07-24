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
class APCSV{
    constructor(NAME,DESCRIPTION,SOURCE,OWNER,ENTITLEMENT,OWNERAPPROVAL,SSIAPPROVAL,appName){
        this.name = NAME;
        this.description = DESCRIPTION;
        this.source = SOURCE;
        this.owner = OWNER;
        this.entitlement = ENTITLEMENT;
        this.ownerApproval = OWNERAPPROVAL;
        this.ssiApproval = SSIAPPROVAL;
		this.ownerId = "";
		this.ownerName = "";
		this.entId = "";
		this.sourceId = "";
		this.appName = appName;
		this.accessProfileId = "";
		this.requested = false;
		this.created = false;
		this.appliId = "";
    }
}

APCSV.prototype.getJson = function(){
	var ent = [this.entId];
	var approv = "manager";
	if(this.ssiApproval === "1" || this.ssiApproval === 1){
		approv += ","+approvWrkg;
	}
	if(this.ownerApproval === "1" || this.ownerApproval === 1){
		approv += ",appOwner";
	}
	var aksPrf = {
		entitlements: ent,
		ownerId: this.ownerId,
		name: this.name,
		approvalSchemes: approv,
		requestCommentsRequired: false,
		description: this.description,
		sourceId: this.sourceId,
		deniedCommentsRequired: true
	};
	var ret = JSON.stringify(aksPrf);
	//console.log(ret);
	return ret;
};

function newTableApCsv(){
    var table = document.createElement('table');
    var tr = document.createElement('tr');   
    var th1 = document.createElement('th');
    var txh1 = document.createTextNode('AP name');
    th1.appendChild(txh1);
    tr.appendChild(th1);
    var thi = document.createElement('th');
    var txhi = document.createTextNode('AP description');
    thi.appendChild(txhi);
    tr.appendChild(thi);
    var th2 = document.createElement('th');
    var txh2 = document.createTextNode('Source Name');
    th2.appendChild(txh2);
    tr.appendChild(th2);
    var th3 = document.createElement('th');
    var txh3 = document.createTextNode('Owner');
    th3.appendChild(txh3);
    tr.appendChild(th3);
    var th4 = document.createElement('th');
    var txh4 = document.createTextNode('Entitlement');
    th4.appendChild(txh4);
    tr.appendChild(th4);
    var th5 = document.createElement('th');
    var txh5 = document.createTextNode('Owner Approval');
    th5.appendChild(txh5);
    tr.appendChild(th5);
    var th6 = document.createElement('th');
    var txh6 = document.createTextNode('SSI Approval');
    th6.appendChild(txh6);
    tr.appendChild(th6);
    table.appendChild(tr);
    var th7 = document.createElement('th');
    var txh7 = document.createTextNode('Application Name');
    th7.appendChild(txh7);
    tr.appendChild(th7);
    table.appendChild(tr);
	return table;
}

function createTableApCsv(aps){
    var table = newTableApCsv();
	aps.forEach(function(ap){
		var tr = document.createElement('tr');
		var td1 = document.createElement('td');
		var txd1 = document.createTextNode(ap.name);
		td1.appendChild(txd1);
		tr.appendChild(td1);
		var td2 = document.createElement('td');
		var txd2 = document.createTextNode(ap.description);
		td2.appendChild(txd2);
		tr.appendChild(td2);
		var td3 = document.createElement('td');
		var txd3 = document.createTextNode(ap.source);
		td3.appendChild(txd3);
		tr.appendChild(td3);
		var td4 = document.createElement('td');
		var txd4 = document.createTextNode(ap.owner);
		td4.appendChild(txd4);
		tr.appendChild(td4);
		var td5 = document.createElement('td');
		var txd5 = document.createTextNode(ap.entitlement);
		td5.appendChild(txd5);
		tr.appendChild(td5);
		var td6 = document.createElement('td');
		var txd6 = document.createTextNode(ap.ownerApproval);
		td6.appendChild(txd6);
		tr.appendChild(td6);
		var td7 = document.createElement('td');
		var txd7 = document.createTextNode(ap.ssiApproval);
		td7.appendChild(txd7);
		tr.appendChild(td7);
		var td8 = document.createElement('td');
		var txd8 = document.createTextNode(ap.appName);
		td8.appendChild(txd8);
		tr.appendChild(td8);
		table.appendChild(tr);
	});
    var div = document.getElementById("tablo");
    div.innerHTML = '';
    div.appendChild(table);
}

function checkField( strData ){

	// Create a regular expression to parse the CSV values.
	var objPattern = new RegExp(
		(
			// Delimiters.
			"(,)|(\")"
		),
		"gi"
		);
	var arrMatches = null;
	var msg = "";
	while (arrMatches = objPattern.exec( strData )){

		// Get the delimiter that was found.
		var strMatchedVirg = arrMatches[ 1 ];
		var strMatchedCote = arrMatches[ 2 ];
		if(strMatchedVirg === ","){
			msg += " found comma";
		}
		if(strMatchedCote == "\""){
			msg += " found quote";
		}
	}
	return msg;
}

function validateLoad(arrCsv){
	var once = false;
	var nbFields = 0;
	if(arrCsv.length === 0){
		setInfoTab(tableErr,"Error csv is empty could'nt parse file with ; separtor");
		return;
	}
	try{
		arrCsv.forEach(function(arrLine){
			var err = false;
			if(!once){
				once = true;
				nbFields = arrLine.length;
				if(nbFields === 1){
					setInfoTab(tableErr,"Error csv is corrupted couldn't parse file with ; separtor");
					throw 'Erreur parsing';
				}
				if(arrLine.length !== NB_FIELDS ){
					setInfoTab(tableErr,'Error nb fields='+nbFields+' different to ' + NB_FIELDS );
					throw 'Erreur parsing';
				}
			}else{
				if(!err){
					if(arrLine.length !== NB_FIELDS && arrLine.length > 1){
						setInfoTab(tableErr,'Error nb fields='+nbFields+' different to ' + NB_FIELDS + ' on AP name=' + arrLine[0]);
						err = true;
					}
					if(arrLine[0] === ""){
						err = true;
					}
				}
				//accessProfileName;accessProfileDescription;sourceId;accessProfileOwner;entitlement;ownerApproval;ssiApproval;appName
				if(!err){
					if(arrLine[0].length > 128){
						setInfoTab(tableErr,'Error name size greater than 128 on AP name=' + arrLine[0]);
						err = true;
					}
				}
				if(!err){
					if(arrLine[1].length > 2000){
						setInfoTab(tableErr,'Error description size greater than 2000 on AP name=' + arrLine[0]);
						err = true;
					}
				}
				if(!err){
					if(arrLine[5] === "" || arrLine[6] === ""){
						setInfoTab(tableErr,'Error approval(s) empty on AP name=' + arrLine[0]);
						err = true;
					}
				}
				var msg = "";
				if(!err){
					arrLine.forEach(function(field){
						var msg = checkField(field);
						if(msg !== ""){
							setInfoTab(tableErr,'Error '+ msg + ' on AP name=' + arrLine[0]);
							err = true;
						}
					});
				}
				if(!err){
					var ap = new APCSV(arrLine[0],arrLine[1],arrLine[2],arrLine[3],arrLine[4],arrLine[5],arrLine[6],arrLine[7]);
					aps.push(ap);
					nbAP++;
				}
			}
		});
	}catch(ex){
		console.log(ex);
	}
}

function readAP(){
	var force = $('input[id=idnFc]:checked').val();
	$("#intAP").hide();
	if(force !== "on"){
		$("#updApp").hide();
	}else{
		$("#updApp").show();
	}	
	clearTablos();
	var csv = document.getElementById('idnCv');
	var file = csv.files[0];
	if (!file) {
		return;
	}
	aps = [];
	tableInfos(tableErr, "tabloErr", "Errors");
	var reader = new FileReader();
	reader.onload = function(e) {
		var contents = e.target.result;
		var arrCsv = CSVToArray(contents, ";");
		validateLoad(arrCsv);
		if(aps.length > 0){
			createTableApCsv(aps);
			if(force !== "on"){
				$("#intAP").show();
			}else{
				$("#intAP").hide();
			}
			$("#readAP").hide();
		}
	};
	reader.readAsText(file);
	document.getElementById('idnCv').value = null;
}
