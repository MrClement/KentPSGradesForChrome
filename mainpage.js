var loadingHTML = document.createElement("div");
loadingHTML.id = "KDSPSLoading";
var body = document.getElementsByTagName('body')[0];

if(document.getElementById("KDSPSLoading") === null) {
  body.appendChild(loadingHTML);
  var classPages = new Array();
  var classPageHTML = new Array();
  console.log("mainpage");
  var table = document.getElementById("quickLookup").getElementsByTagName("table")[0];
  var as = table.getElementsByTagName("a");
  for(var i = 0 ; i < as.length ; i++) {
    var a = as[i];
    var text = a.innerHTML;
    var letter = text.substring(0,1);
    var isGrade = letter == 'A' || letter == 'B' || letter == 'C' || letter == 'D' || letter == 'F';
    if(a.href.indexOf("scores.html") != -1 && isGrade) {
      classPages.push(a);
    }
  }
  console.log(classPages);
  for(var i = 0 ; i < classPages.length ; i++) {
    var request = getHTML(classPages[i]);
    classPageHTML.push(request);
  }
  console.log(classPageHTML);
  var newwindow = window.open();
  newwindow.visible = "none";
  var newdoc = newwindow.document;
  newdoc.write(classPageHTML[1]);
  newdoc.close();
  var doc = newdoc;
  newwindow.close();
  console.log(doc);


}

function getHTML(page) {
  var response = "";
  var link = "" + page.href;
  $.ajax({type: "GET", url: link, async: false, success: function(text) {
    response = text;
  }});
  return response;
}
