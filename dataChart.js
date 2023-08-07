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

/*
 * 
 * Gestion des graphiques
 */

/* global chartSeul, color, lbls, crtds, itms, nots */
window.chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
};

class DatasChart{
    constructor(labels){
        this.labels = labels;
        this.datasets = [];
    }
}
class UnData7{
    constructor(label, data){
        this.label = label;
        this.backgroundColor = undefined;
        this.borderColor = undefined;
        this.borderWidth = 1;
        this.data = data;
	this.COLORS = [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
	];
        this.count = 0;
    }
}
UnData7.prototype.setColor = function(pos){
    if(pos < 6){
        this.backgroundColor = color(this.COLORS[pos]).alpha(0.5).rgbString();
        this.borderColor = this.COLORS[pos];
    }
};
/**
 * charge toutes les données statistiques et fabrique les graphiques
 * @param {string} code 
 * @param {string} label 
 * @returns {undefined}
 */
function loadGrafics(code, label){
    var grafic = new DataChart(code, parseInt(code.charAt(0)), label);
    grafic.subType = parseInt(code.split("_")[1]);
    renewGrafic(getBarChartData(grafic), grafic.label, grafic.type, "chartUn","container1");
    $("#chartUn").show();
}
/**
 * détruit (si existe) et refait graphique dans la bonne dimension
 * @param {data} barChartData 
 * @param {string} titre
 * @param {int} type 1 bar vertical, 2 bar horizontal
 * @param {string} ctxId 
 * @param {string] cntId
 * @returns {undefined}
 */
function renewGrafic(barChartData, titre, type, ctxId, cntId){
    try{
        chartSeul.destroy();
    }catch(ex){
        //meme pas mal
    }
    var typeG = '';
    if(type === 1){
        $('#'+cntId).css({width: '800px',height: '300px'});
        $('#Graphiques').css({height: '500px'});
        typeG = "bar";
    }else if(type === 2 || type === 3 || type === 5){
        $('#'+cntId).css({width: '800px',height: '800px'});
        typeG = "horizontalBar";
    }else if(type === 8){
        $('#'+cntId).css({width: '1200px',height: '1200px'});
        typeG = "horizontalBar";
    }else if(type === 6){
        $('#'+cntId).css({width: '800px',height: '800px'});
        typeG = "scatter";
    }else if(type === 7){
        $('#'+cntId).css({width: '800px',height: '800px'});
        typeG = "radar";
    }
    chartSeul = new Chart(ctxId, {
        type: typeG,
        data: barChartData,
        options: {
            responsive: true,
            legend: {
                position: 'top'
            },
            title: {
                display: true,
                text: titre
            }
        }
    });
    
    chartSeul.update(true);
}
/**
 * retourne l'objet données pour le graphique
 * @param {objGraficData} objGF
 * @returns {objChartData}
 */
function getBarChartData(objGF){
    var data = {};
	objGF = getData(objGF);
    if(objGF.type === 3){
        data = {
            labels: objGF.labels,
            datasets: [{
                label: objGF.datasets[0].label,
                backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
                borderColor: window.chartColors.red,
                borderWidth: 1,
                data: objGF.datasets[0].data
            },{
                label: objGF.datasets[1].label,
                backgroundColor: color(window.chartColors.blue).alpha(0.5).rgbString(),
                borderColor: window.chartColors.blue,
                borderWidth: 1,
                data: objGF.datasets[1].data
            }]
        };
    }else if(objGF.type === 5){
        data = {
            labels: objGF.labels,
            datasets: [{
                label: objGF.datasets[0].label,
                backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
                borderColor: window.chartColors.red,
                borderWidth: 1,
                data: objGF.datasets[0].data
            },{
                label: objGF.datasets[1].label,
                backgroundColor: color(window.chartColors.blue).alpha(0.5).rgbString(),
                borderColor: window.chartColors.blue,
                borderWidth: 1,
                data: objGF.datasets[1].data
            },{
                label: objGF.datasets[2].label,
                backgroundColor: color(window.chartColors.green).alpha(0.5).rgbString(),
                borderColor: window.chartColors.green,
                borderWidth: 1,
                data: objGF.datasets[2].data
            },{
                label: objGF.datasets[3].label,
                backgroundColor: color(window.chartColors.purple).alpha(0.5).rgbString(),
                borderColor: window.chartColors.purple,
                borderWidth: 1,
                data: objGF.datasets[3].data
            }]
        };
        
    }else if(objGF.type === 6 || objGF.type === 7){
        var labels = [];
        if(objGF.type === 6){
            itms.forEach(function(itm){
                labels.push(itm.name);
            });
        }else{
            var lvls = getLevel14Lab(lbls[objGF.subType]);
            lvls.forEach(function(lvl){
                labels.push(lvl.name);
            });
        }
        data = new DatasChart(labels);
        var i = 0;
        objGF.datasets.forEach(function(d7){
            var unD7 = new UnData7(d7.label, d7.data);
            unD7.setColor(i);
            i++;
            if(i > 6) i = 0;
            data.datasets.push(unD7);
        });
    }else{
        data = {
            labels: objGF.labels,
            datasets: [{
                label: objGF.datasets[0].label,
                backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
                borderColor: window.chartColors.red,
                borderWidth: 1,
                data: objGF.datasets[0].data
            }]
        };
    }
    return data;
}
function getData(objGF){
    switch(objGF.code){
        case "2_1":
            //Nb Leads Contacts Accounts
            var ids = new DataSet("nbLCA");
            objGF.addLabel = "Leads nb";
            ids.addData = getMapSize(leads);
            objGF.addLabel = "Accounts nb";
            ids.addData = getMapSize(accounts);
            objGF.addLabel = "Contacts nb";
            ids.addData = getMapSize(contacts);
            objGF.addDataset = ids;
        break;
        case "2_2":
            //nb leads per tags
            var ids = new DataSet("nbTags");
            var tags = new Map();
            leads.forEach(function(lid){
                lid.Tag.forEach(function(tag){
                    var inc = tags.get(tag.name);
                    if(inc === undefined){
                        tags.set(tag.name, 1);
                    }else{
                        inc++;
                        tags.set(tag.name, inc);
                    }
                });
            });
            tags.forEach(function(value, key, map){
                objGF.addLabel = key;
                ids.addData = value;
            });
            objGF.addDataset = ids;
        break;
        case "2_3":
            //nb account per type
            var ids = new DataSet("nbAccountType");
            var tags = new Map();
            accounts.forEach(function(accnt){
                var inc = tags.get(accnt.Account_Type);
                if(inc === undefined){
                    tags.set(accnt.Account_Type, 1);
                }else{
                    inc++;
                    tags.set(accnt.Account_Type, inc);
                }
            });
            tags.forEach(function(value, key, map){
                objGF.addLabel = key;
                ids.addData = value;
            });
            objGF.addDataset = ids;
        break;
        case "2_4":
            //nb account per reseau
            var ids = new DataSet("nbReseau");
            var tags = new Map();
            accounts.forEach(function(accnt){
                accnt.Reseau.forEach(function(tag){
                    var inc = tags.get(tag.name);
                    if(inc === undefined){
                        tags.set(tag.name, 1);
                    }else{
                        inc++;
                        tags.set(tag.name, inc);
                    }
                });
            });
            tags.forEach(function(value, key, map){
                objGF.addLabel = key;
                ids.addData = value;
            });
            objGF.addDataset = ids;
        break;
        case "2_5":
            //nb contacts per account
            var ids = new DataSet("nbContact");
            var types = new Map();
            accounts.forEach(function(accnt){
                    var inc = types.get(accnt.Account_Name);
                    if(inc === undefined && accnt.contacts.length > 0){
                        types.set(accnt.Account_Name, accnt.contacts.length);
                    }
            });
            const mapSort1 = new Map([...types.entries()].sort((a, b) => b[1] - a[1]));
            var inc = 0;
            mapSort1.forEach(function(value, key, map){
                if(inc < 10){
                    objGF.addLabel = key;
                    ids.addData = value;
                }
                inc++;
            });
            objGF.addDataset = ids;
        break;
        case "2_9":
            //Nb First and second level hierarchy by Labels
            var ids = new DataSet("nbLev12");
            lbls.forEach(function(lbl){
                objGF.addLabel = lbl.name;
                var lev12 = getItemLevelX(true);
                ids.addData = lev12.filter(function(l){return l.oidLbl === lbl.oid;}).length;
            });
            objGF.addDataset = ids;
        break;
        case "6_4":
            //Scatter 2 Labels (1 X 2 Y)
            itms.forEach(function(itm){
                var ids = new DataSet(itm.name);
                objGF.addLabel = itm.name;
                var x = getNoteLabelItem(itm, lbls[0]);
                var y = getNoteLabelItem(itm, lbls[1]);
                ids.addData = {x: x, y:y};
                objGF.addDataset = ids;
            });
        break;
        case "6_5":
            //Scatter 2 Labels (1 X 2 Y)
            itms.forEach(function(itm){
                var ids = new DataSet(itm.name);
                objGF.addLabel = itm.name;
                var y = getNoteLabelItem(itm, lbls[0]);
                var x = getNoteLabelItem(itm, lbls[1]);
                ids.addData = {x: x, y:y};
                objGF.addDataset = ids;
            });
        break;
    case "7_0":
    case "7_1":
        //Radar: Level 1 of first Label
        //autant de dataSet que d'item, les valeurs: les notes au level1
        //les labels du graphe le nom des chapitres pour le premier label
            itms.forEach(function(itm){
                var ids = new DataSet(itm.name);
                objGF.addLabel = itm.name;
                //les notes de level1 pour label 0
                var notes = getNote4ItmLabLevel1(itm, lbls[objGF.subType]);
                notes.forEach(function(not){
                    ids.addData = not; 
                });
                objGF.addDataset = ids;
            });
        break;
    }
    return objGF;
}
function getMapSize(x) {
    var len = 0;
    x.forEach(function(un){
        len++;
    });
    return len;
}
/**
 * 
 * @param {Item} oItm
 * @param {Label} oLab
 * @returns {htmlDiv|Function}
 */
function getNoteLabelItem(oItm, oLab){
    const lblRoots = nots.filter(function(not){
        if(not.root === true && not.hiera === false && not.oidLbl === oLab.oid
                && not.oidItm === oItm.oid){
            return not;
        }
    });
    return lblRoots[0].note;
}

/**
 * fabrique le graphe sélectionné
 * @returns {htmlDiv}
 */
function showGraph(){
    var choix = $("#grafs :selected").val();
    var label = $("#grafs :selected").text();
    loadGrafics(choix, label);
}


