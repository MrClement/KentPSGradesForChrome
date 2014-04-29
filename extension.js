var categories;
var formElementNoCategories;
var formElementWithCategories;
var newNode;
var globalScoreData;
var finalGradeHTML;

function showOrHideCategories(){
  if(document.getElementsByName("weighted")[0].checked) {
    var htmlToInsert = '<form action=""><input type="checkbox" name="weighted" value="Weighted" checked="true">Weighted by category?<br><br>';
    htmlToInsert +='<table id="cats" border=1><tr><th align="center">Category</th><th align="center">Weighting</th></tr>';
    for(var i = 0 ; i < categories.length ; i++) {
      htmlToInsert +='<tr><td align="center">' + categories[i]+'</td>';
      htmlToInsert +='<td align="center"><input type="text" id=\"'+categories[i]+ '\">%</td>';
      htmlToInsert += '</tr>';
    }
    htmlToInsert += '<tr><td></td><td align="center"><input type="button" id="calcButton" value="Update Final Grade"></td></tr></table></form>';
    newNode.innerHTML = htmlToInsert;
    document.getElementById("calcButton").addEventListener("click", reCalculate, false);
    document.getElementsByName("weighted")[0].addEventListener("change", showOrHideCategories, false);

  } else {
    htmlToInsert = '<form action=""><input type="checkbox" name="weighted" value="Weighted">Weighted by category?<br></form>';
    newNode.innerHTML = htmlToInsert;
    document.getElementsByName("weighted")[0].addEventListener("change", showOrHideCategories, false);
  }
}
function reCalculate(){
  var categoryScores = new Array();
  categoryScores.length = categories.length;
  for(var i = 0 ; i < globalScoreData.length ; i++) {
    var loc = categoryScores[categories.indexOf(globalScoreData[i][0])];
    if(loc === undefined) {
      loc = new Array();
      loc.length = 3;
      loc[0] = 0;
      loc[1] = 0;
      var temp = document.getElementById(""+globalScoreData[i][0]).value;
      temp = parseInt(temp);
      if(!isNaN(temp)) {
        loc[2] = temp;
        console.log("here");
      } else {
        alert("Please enter weightings as numbers only");
      }
    }
    loc[0] += globalScoreData[i][2];
    loc[1] += globalScoreData[i][3];
    categoryScores[categories.indexOf(globalScoreData[i][0])] = loc;
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
  for(var i = 0 ; i < topLocs.length ; i++){
    if(topLocs[i].innerHTML.indexOf("Final Grade") > -1){
      gradeIndex = i;
    }
  }
  var gradeHTML = topRows[1].getElementsByTagName("td")[gradeIndex];
  finalGradeHTML = gradeHTML;
  var gradeText = gradeHTML.innerHTML;

  if(gradeText.indexOf("%") == -1) {

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
      singleScore[0] = parsedRows[categoryLoc].innerHTML;
      if(categories.indexOf(singleScore[0]) == -1) {
        categories.push(singleScore[0]);
      }
      var purple = parsedRows[scoreLoc+2].innerHTML;
      var orange = parsedRows[scoreLoc+3].innerHTML;
      if(purple == "" && orange == "" ) {
        singleScore[1] = parsedRows[scoreLoc+4].getElementsByTagName("span")[0].innerHTML;
        var as = parsedRows[scoreLoc+4].getElementsByTagName("span")[0].getElementsByTagName("a");
        var newScore = singleScore[1].split("/");
        if(as.length > 0) {
          newScore[0] = newScore[0].substring(newScore[0].indexOf(">")+1, newScore[0].length-1);
          earnedPoints += parseInt(newScore[0]);
          singleScore[2] = parseInt(newScore[0]);
          totalPoints += parseInt(newScore[2]);
          singleScore[3] = parseInt(newScore[2]);
        } else if(newScore[0].indexOf("-") == -1) {
          earnedPoints += parseInt(newScore[0]);
          singleScore[2] = parseInt(newScore[0]);
          totalPoints += newScore.length == 1 ? 0 : parseInt(newScore[1]);
          singleScore[3] = newScore.length == 1 ? 0 : parseInt(newScore[1]);
        }
        scoreData[i-1] = singleScore;
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
    document.getElementsByName("weighted")[0].addEventListener("change", showOrHideCategories, false);


    console.log("Extension is loaded!");
  }
}

main();
