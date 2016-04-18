// see mdgen.js

$(function() {
  var g;

  $("h3").each(function() {
    var x=$(this);

    if (!g) g=$("<div>").addClass("sam");
    else $("<hr>").appendTo(g);

    var a=$("<div>").addClass("aa").appendTo(g);
    var b=$("<div>").addClass("bb").appendTo(g);
    $("<div>").addClass("clear").appendTo(g);

    var first=true;
    for (var i=0; i<10; i++) {

      var y=x.next();
      x.remove();

      if (first && !x.is("h3")) {
        first=false;
        x=$('<h4>'+x.html()+'</h4>');
      }

      x.appendTo(x.is("pre")?b:a);
      x=y;

      if (!x || !x.prop("nodeName") || x.is("h3") || x.is("h2")) break;
    }

  });

  if (g) g.insertAfter($("h2").first());

});
