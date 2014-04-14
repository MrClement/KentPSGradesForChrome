var tables = document.getElementsByTagName("table");
var header;
var headerIndex;
for(var i = 0 ; i < tables.length ; i++) {
   if(tables[i].innerHTML.indexOf("Due Date") > -1) {
     header = tables[i];
     headerIndex = i;
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

for(var i = 1 ; i < rows.length ; i++) {
  var parsedRows = rows[i].getElementsByTagName("td");
  var singleScore = new Array();
  singleScore[0] = parsedRows[categoryLoc].innerHTML;
  singleScore[1] = parsedRows[scoreLoc+4].getElementsByTagName("span").innerHTML;
  scoreData[i-1] singleScore;
}


console.log("Extension is loaded!")
