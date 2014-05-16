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

var globalEarnedPoints;
var globalTotalPoints;

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
      var earnedPts = 0;
      var totalPts = 0;
      for(var j = 0 ; j < globalScoreData.length ; j++) {
        var score = globalScoreData[j];
        if(score[0] == categories[i] && score[0] != "NotACategory" && score.length == 4) {
          earnedPts += score[2];
          totalPts += score[3];
        }
      }
      earned += earnedPts;
      total += totalPts;
      catPercent = earnedPts / totalPts *100;
      catPercent = parseFloat(catPercent).toFixed(2);
      htmlToInsert +='<td align="center"><input style="text-align:center" value="'+weight+'" type="text" id=\"'+categories[i]+ '\">%</td>';
      htmlToInsert +='<td align="center"><input style="text-align:center" value="'+earned+'" type="text" id=\"'+categories[i]+ 'Earn\"></td>';
      htmlToInsert +='<td align="center"><input style="text-align:center" value="'+total+'" type="text" id=\"'+categories[i]+ 'Tot\"></td>';
      htmlToInsert +='<td align="center" id=\"'+categories[i]+ 'Percent\">'+catPercent+'%</td>';
      htmlToInsert += '</tr>';
    }
    htmlToInsert += '<tr><td></td><td></td><td></td><td></td><td align="center"><input type="button" id="calcButton" value="Update Final Grade"></td></tr></table></form>';
    newNode.innerHTML = htmlToInsert;
    oldGrade = finalGradeHTML.innerHTML;

    for(var i = 0 ; i < categories.length ; i++){

      document.getElementById(categories[i] + "Earn").addEventListener("change", recalculateWeightedPercent(categories[i]+"earn"), false);
      document.getElementById(categories[i] + "Tot").addEventListener("change", recalculateWeightedPercent(categories[i]+"tot"), false);

    }

    document.getElementById("calcButton").addEventListener("click", reCalculate, false);
    document.getElementsByName("weighted")[0].addEventListener("change", showOrHideCategories, false);

  } else {
    isWeighted = false;
    var earned = globalEarnedPoints;
    var total = globalTotalPoints;
    var percent = parseFloat((earned/total) * 100).toFixed(2);
    htmlToInsert = '<form action=""><input type="checkbox" name="weighted" value="Weighted">Weighted by category?<br></form>';
    htmlToInsert +='<table id="points" border=1><tr><th align="center">Earned Points</th><th align="center">Total Points</th><th align="center">Percentage</th></tr>';
    htmlToInsert +='<tr><td align="center"><input style="text-align:center" value="'+earned+'" type="text" id=\"Earn\"></td>';
    htmlToInsert +='<td align="center"><input style="text-align:center" value="'+total+'" type="text" id=\"Tot\"></td>';
    htmlToInsert +='<td align="center"><input style="text-align:center" value="'+percent+'%" type="text" id=\"Percent\"></td>';
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
  var newGrade = 0;

  for(var i = 0 ; i < categories.length; i++) {
    var allEarned = parseFloat(document.getElementById(categories[i] + "Earn").value);
    var allTotal =  parseFloat(document.getElementById(categories[i] + "Tot").value);
    var allWeight = parseFloat(document.getElementById(categories[i]).value);
    temp = parseFloat(allWeight);
    if(!isNaN(temp)) {
      weightings[categories[i]] = temp;
    } else {
      alert("Please enter weightings as numbers only.");
    }
    var newPercent =  (allEarned/allTotal)*allWeight/100;
    newGrade += newPercent;
    document.getElementById(categories[i] + "Percent").innerHTML = "" + parseFloat(allEarned/allTotal*100).toFixed(2) + "%";

  }
  newGrade *= 100;
  newGrade = parseFloat(newGrade).toFixed(2);
  var orgGrade = finalGradeHTML.innerHTML;
  orgGrade = orgGrade.substring(0, orgGrade.indexOf("(") + 1) + newGrade + "%)";
  finalGradeHTML.innerHTML = orgGrade;
  saveChanges();
}

function reCalculateUnweightedPoints(){

  var allEarned = parseFloat(document.getElementById("Earn").value);
  var allTotal =  parseFloat(document.getElementById("Tot").value);
  var percent = parseFloat(document.getElementById("Percent").value);

  var newEarned = parseFloat((percent / 100) * allTotal).toFixed(2);

  (document.getElementById("Earn").value) = newEarned;

}

function reCalculateUnweightedPercent(){

  var allEarned = parseFloat(document.getElementById("Earn").value);
  var allTotal =  parseFloat(document.getElementById("Tot").value);

  var newPercent = parseFloat((allEarned/allTotal) * 100).toFixed(2) + "%";

  (document.getElementById("Percent").value) = newPercent;

}

function recalculateWeightedPercent(evt){

  console.log(evt);

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
  globalEarnedPoints = earnedPoints;
  globalTotalPoints = totalPoints;
  var studentPercentage = earnedPoints / totalPoints *100;
  studentPercentage = parseFloat(studentPercentage).toFixed(2);

  globalScoreData = scoreData;
  if(gradeText.indexOf("%") == -1) {
    gradeHTML.innerHTML += "(" + studentPercentage + "%)";
  }

  htmlToInsert = '<form action=""><input type="checkbox" name="weighted" value="Weighted">Weighted by category?<br></form>';
  htmlToInsert +='<table id="points" border=1><tr><th align="center">Earned Points</th><th align="center">Total Points</th><th align="center">Percentage</th></tr>';
  htmlToInsert +='<tr><td align="center"><input style="text-align:center" value="'+earnedPoints+'" type="text" id=\"Earn\"></td>';
  htmlToInsert +='<td align="center"><input style="text-align:center" value="'+totalPoints+'" type="text" id=\"Tot\"></td>';
  htmlToInsert +='<td align="center"><input style="text-align:center" value="'+studentPercentage+'%" type="text" id=\"Percent\"></td>';

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
  document.getElementById("Earn").addEventListener("change", reCalculateUnweightedPercent, false);
  document.getElementById("Tot").addEventListener("change", reCalculateUnweightedPercent, false);
  document.getElementById("Percent").addEventListener("change", reCalculateUnweightedPoints, false);

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
