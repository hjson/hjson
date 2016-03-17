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
    for (;;) {
      var y=x.next();
      x.remove();

      if (first && !x.is("h3")) {
        first=false;
        x=$('<h4>'+x.html()+'</h4>');
      }

      x.appendTo(x.is("pre")?b:a);
      x=y;

      if (!x || x.is("h3") || x.is("h2")) break;
    }
  });

  g.insertAfter($("h2").first());

  /*
  var getIt=$("<div>").addClass("get");
  $('<a class="xbt" href="#platforms">Get Hjson!</a>').appendTo(getIt);
  $('<a class="xbt xbt2" href="try.html">Try It!</a>').appendTo(getIt);

  getIt.insertBefore($("h2").first());

  var info=$("<div>").addClass("info");
  $('<a href="#tools">Tools</a>').appendTo(info);
  info.append(" - ");
  $('<a href="#cheat-sheet">Cheat Sheet</a>').appendTo(info);
  info.insertBefore($("h2").first());
  */

  //footnote
  $("a[href='#syntax']").addClass("ref");

});
