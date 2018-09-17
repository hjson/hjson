// see mdgen.js

$(function() {
  var g;

  $("h3").each(function() {
    var x=$(this);

    if (!g || x.prev().is("h2")) {
      g=$("<div>").addClass("sam");
      g.insertBefore(x);
    } else $("<hr>").appendTo(g);

    var t=$("<div>").appendTo(g);
    var a=$("<div>").addClass("aa").appendTo(g);
    var b=$("<div>").addClass("bb").appendTo(g);
    $("<div>").addClass("clear").appendTo(g);

    var first=true;
    var add=a;
    for (var i=0; i<10; i++) {

      var y=x.next();
      x.remove();

      if (first && x.is("h3")) {
        first=false;
        x.appendTo(t);
      } else {
        if (x.is("pre") || x.hasClass('col2')) add=b;
        x.appendTo(add);
      }
      x=y;

      if (!x || !x.prop("nodeName") || x.is("h3") || x.is("h2")) break;
    }
  });

  var first=$($("h3")[0]);
  if (first.text()==="Intro") {
    first.remove();
    // var icon=$("<div>").addClass("hicon hicon2");
    // icon.insertBefore($("code")[0]);
  }

});
