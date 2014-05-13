var categories;
var formElementNoCategories;
var formElementWithCategories;
var newNode;
var globalScoreData;
var finalGradeHTML;
var oldGrade;

var className;
var isWeighted;
var weightings;


function showOrHideCategories(){
  if(document.getElementsByName("weighted")[0].checked) {
    var htmlToInsert = '<form action=""><input type="checkbox" name="weighted" value="Weighted" checked="true">Weighted by category?<br><br>';
    htmlToInsert +='<table id="cats" border=1><tr><th align="center">Category</th><th align="center">Weighting</th><th align="center">Earned Points</th><th align="center">Total Points</th><th align="center">Percentage</th></tr>';
    console.log(globalScoreData);  
    for(var i = 0 ; i < categories.length ; i++) {
      htmlToInsert +='<tr><td align="center">' + categories[i]+'</td>';
      var weight = "";
      if(weightings[categories[i]] !== undefined) {
        weight = weightings[categories[i]];
      }
      var earned = "";
      var total  = "";
      var catPercent = "";
      htmlToInsert +='<td align="center"><input style="text-align:center" value="'+weight+'" type="text" id=\"'+categories[i]+ '\">%</td>';
      htmlToInsert +='<td align="center"><input style="text-align:center" value="'+earned+'" type="text" id=\"'+categories[i]+ 'Earn\"></td>';
      htmlToInsert +='<td align="center"><input style="text-align:center" value="'+total+'" type="text" id=\"'+categories[i]+ 'Tot\"></td>';
      htmlToInsert +='<td align="center" id=\"'+categories[i]+ 'Percent\">'+catPercent+'%</td>';
      htmlToInsert += '</tr>';
    }
    htmlToInsert += '<tr><td></td><td></td><td></td><td></td><td align="center"><input type="button" id="calcButton" value="Update Final Grade"></td></tr></table></form>';
    newNode.innerHTML = htmlToInsert;
    oldGrade = finalGradeHTML.innerHTML;
    document.getElementById("calcButton").addEventListener("click", reCalculate, false);
    document.getElementsByName("weighted")[0].addEventListener("change", showOrHideCategories, false);

  } else {
    isWeighted = false;
    htmlToInsert = '<form action=""><input type="checkbox" name="weighted" value="Weighted">Weighted by category?<br></form>';
    newNode.innerHTML = htmlToInsert;
    finalGradeHTML.innerHTML = oldGrade;
    document.getElementsByName("weighted")[0].addEventListener("change", showOrHideCategories, false);
    saveChanges();
  }
}
function reCalculate(){
  isWeighted = true;
  weightings = {};
  var categoryScores = new Array();
  categoryScores.length = categories.length;
  for(var i = 0 ; i < globalScoreData.length ; i++) {
    if(globalScoreData[i][0] != "NotACategory" && globalScoreData[i].length == 4) {
      var loc = categoryScores[categories.indexOf(globalScoreData[i][0])];
      if(loc === undefined) {
        loc = new Array();
        loc.length = 3;
        loc[0] = 0;
        loc[1] = 0;
        var temp = document.getElementById(""+globalScoreData[i][0]).value;
        temp = parseFloat(temp);
        if(!isNaN(temp)) {
          loc[2] = temp;
          weightings[globalScoreData[i][0]] = temp;
        } else {
          alert("Please enter weightings as numbers only");
        }
      }
      loc[0] += globalScoreData[i][2];
      loc[1] += globalScoreData[i][3];
      categoryScores[categories.indexOf(globalScoreData[i][0])] = loc;
    }
  }
  var newGrade = 0;
  for(var i = 0 ; i < categories.length; i++) {
    newGrade += (categoryScores[i][0]/categoryScores[i][1])*categoryScores[i][2]/100;
  }
  newGrade *= 100;
  newGrade = parseFloat(newGrade).toFixed(2);
  var orgGrade = finalGradeHTML.innerHTML;
  orgGrade = orgGrade.substring(0, orgGrade.indexOf("(") + 1) + newGrade + "%)";
  finalGradeHTML.innerHTML = orgGrade;
  saveChanges();
}
function main() {

  var tables = document.getElementsByTagName("table");
  var header;
  var headerIndex;
  var finalHeader;
  var finalHeaderIndex;
  for(var i = 0 ; i < tables.length ; i++) {
    if(tables[i].innerHTML.indexOf("Due Date") > -1) {
      header = tables[i];
      headerIndex = i;
    } else if(tables[i].innerHTML.indexOf("Course") > -1) {
      finalHeader = tables[i];
      finalHeaderIndex = i;
    }
  }
  var topRows = finalHeader.getElementsByTagName("tr");
  var topLocs = topRows[0].getElementsByTagName("th");
  var gradeIndex;
  var classNameIndex;
  for(var i = 0 ; i < topLocs.length ; i++){
    if(topLocs[i].innerHTML.indexOf("Final Grade") > -1){
      gradeIndex = i;
    }
    if(topLocs[i].innerHTML.indexOf("Course") > -1) {
      classNameIndex = i;
    }
  }
  var gradeHTML = topRows[1].getElementsByTagName("td")[gradeIndex];
  finalGradeHTML = gradeHTML;
  className = topRows[1].getElementsByTagName("td")[classNameIndex].innerHTML;

  var gradeText = gradeHTML.innerHTML;

  var loadingHTML = document.createElement("div");
  loadingHTML.id = "KDSPSLoading";
  var body = document.getElementsByTagName('body')[0];

  if(document.getElementById("KDSPSLoading") === null) {
    body.appendChild(loadingHTML);
    if(isWeighted === undefined) isWeighted = false;
    loadData();
  }
}

function main2(){
  var tables = document.getElementsByTagName("table");
  var header;
  var headerIndex;
  var finalHeader;
  var finalHeaderIndex;
  for(var i = 0 ; i < tables.length ; i++) {
    if(tables[i].innerHTML.indexOf("Due Date") > -1) {
      header = tables[i];
      headerIndex = i;
    } else if(tables[i].innerHTML.indexOf("Course") > -1) {
      finalHeader = tables[i];
      finalHeaderIndex = i;
    }
  }
  var topRows = finalHeader.getElementsByTagName("tr");
  var topLocs = topRows[0].getElementsByTagName("th");
  var gradeIndex;
  var classNameIndex;
  for(var i = 0 ; i < topLocs.length ; i++){
    if(topLocs[i].innerHTML.indexOf("Final Grade") > -1){
      gradeIndex = i;
    }
    if(topLocs[i].innerHTML.indexOf("Course") > -1) {
      classNameIndex = i;
    }
  }
  var gradeHTML = topRows[1].getElementsByTagName("td")[gradeIndex];
  finalGradeHTML = gradeHTML;
  className = topRows[1].getElementsByTagName("td")[classNameIndex].innerHTML;

  var gradeText = gradeHTML.innerHTML;

  categories = new Array();
  var rows = header.getElementsByTagName("tr");
  var locs = rows[0].getElementsByTagName("th");
  var locTitles = new Array();
  for(var i = 0 ; i < locs.length ; i++){
    locTitles[i] = locs[i].innerHTML;
  }

  var scoreData = new Array();
  var categoryLoc = locTitles.indexOf("Category");
  var scoreLoc = locTitles.indexOf("Score");
  var totalPoints = 0;
  var earnedPoints = 0;

  for(var i = 1 ; i < rows.length ; i++) {
    var parsedRows = rows[i].getElementsByTagName("td");
    var singleScore = new Array();
    var purple = parsedRows[scoreLoc+2].innerHTML;
    var orange = parsedRows[scoreLoc+3].innerHTML;
    if(purple == "" && orange == "" && parsedRows[scoreLoc+4].innerHTML.indexOf("Score Not Published") == -1) {
      singleScore[0] = parsedRows[categoryLoc].innerHTML;
      if(singleScore[0].indexOf(">") > -1) {
        singleScore[0] = singleScore[0].substring(singleScore[0].indexOf(">") + 1, singleScore[0].indexOf("</"));
      }

      singleScore[1] = parsedRows[scoreLoc+4].getElementsByTagName("span")[0].innerHTML;
      var as = parsedRows[scoreLoc+4].getElementsByTagName("span")[0].getElementsByTagName("a");
      var newScore = singleScore[1].split("/");
      if(as.length > 0) {
        newScore[0] = newScore[0].substring(newScore[0].indexOf(">")+1, newScore[0].length-1);
        if(newScore[0].indexOf("-") == -1) {
          earnedPoints += parseFloat(newScore[0]);
          singleScore[2] = parseFloat(newScore[0]);
          totalPoints += parseFloat(newScore[2]);
          singleScore[3] = parseFloat(newScore[2]);
        }
      } else if(newScore[0].indexOf("-") == -1) {
        earnedPoints += parseFloat(newScore[0]);
        singleScore[2] = parseFloat(newScore[0]);
        totalPoints += newScore.length == 1 ? 0 : parseFloat(newScore[1]);
        singleScore[3] = newScore.length == 1 ? 0 : parseFloat(newScore[1]);
      }
      if(categories.indexOf(singleScore[0]) == -1 && newScore[0].indexOf("-") == -1) {
        categories.push(singleScore[0]);
      }
      scoreData[i-1] = singleScore;
    } else {
      scoreData[i-1] = ["NotACategory", "", "", ""];
    }
  }
  var studentPercentage = earnedPoints / totalPoints *100;
  studentPercentage = parseFloat(studentPercentage).toFixed(2);

  globalScoreData = scoreData;
  if(gradeText.indexOf("%") == -1) {
    gradeHTML.innerHTML += "(" + studentPercentage + "%)";
  }

  var htmlToInsert = '<form action=""><input type="checkbox" name="weighted" value="Weighted">Weighted by category?<br></form>';

  var content = document.getElementById("content-main");
  var newNode = document.createElement("div");
  newNode.innerHTML = htmlToInsert;
  this.newNode = newNode;

  var target = content.getElementsByTagName("table")[1];
  content.insertBefore(newNode, target);
  if(isWeighted) {
    document.getElementsByName("weighted")[0].checked = true;
    showOrHideCategories();
    reCalculate();
  }
  document.getElementsByName("weighted")[0].addEventListener("change", showOrHideCategories, false);

}

function saveChanges() {
  // Get a value saved in a form.
  var theValue = "textarea.value";
  // Check that there's some code there.
  if (!theValue) {
    alert('Error: No value specified');
    return;
  }
  // Save it using the Chrome extension storage API.
  var objectToStore = {name: className, weighted : isWeighted, weightings : weightings};
  var jsonfile = {};
  jsonfile[className] = objectToStore;
  chrome.storage.sync.set(jsonfile, function() {
    // Notify that we saved.
    //alert('Settings saved' + chrome.runtime.lastError);
  });
}

function loadData() {
  chrome.storage.sync.get(className, function(object) {
    var realData = object[className];
    if(realData !== undefined) {
      isWeighted = realData.weighted;
      weightings = realData.weightings;
      className = realData.name;
      main2();
    } else {
      isWeighted = false;
      weightings = {};
      main2();
    }
  });

}

main();
