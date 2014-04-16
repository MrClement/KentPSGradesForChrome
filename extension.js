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
  singleScore[1] = parsedRows[scoreLoc+4].getElementsByTagName("span")[0].innerHTML;
  var newScore = singleScore[1].split("/");
  if(i != 1) {
  earnedPoints += parseInt(newScore[0]);
} else {
  earnedPoints += parseInt("100");
}
  totalPoints += parseInt(newScore[1]);
  scoreData[i-1] = singleScore;
}
var studentPercentage = earnedPoints / totalPoints *100;
studentPercentage = parseFloat(studentPercentage).toFixed(2);

var topRows = finalHeader.getElementsByTagName("tr");
var topLocs = topRows[0].getElementsByTagName("th");
var gradeIndex;
for(var i = 0 ; i < topLocs.length ; i++){
  if(topLocs[i].innerHTML.indexOf("Final Grade") > -1){
  gradeIndex = i
}
}
topRows[1].getElementsByTagName("td")[gradeIndex].innerHTML += studentPercentage;


console.log("Extension is loaded!")
