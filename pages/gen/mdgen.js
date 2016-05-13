
// hack to convert my markdown to a 'fancy' responsive web page
// using marked and jsdom.

var fs=require("fs");
var path=require("path");
var marked=require("marked");
var jsdom=require("jsdom");
var args=process.argv;

function extractDoc(window) {
  html=window.document.documentElement.outerHTML;
  return html.replace(/<\/body>.*<\/html>/g, '</body></html>');
}

function unwrapDoc(html) {
  ['html', 'body', 'head'].forEach(function(name){
    html=html.replace(new RegExp("<"+name+">"), "");
    html=html.replace(new RegExp("<\\/"+name+">"), "");
  });
  return html;
}

if (args.length>2) {
  var target=args[2];

  function prepIntro(html, save) {
    jsdom.env({
      html: html,
      virtualConsole: jsdom.createVirtualConsole().sendTo(console),
      scripts: ["node_modules/jquery/dist/jquery.js", "intro.js"],
      done: function (errors, window) {
        var $=window.$;
        $(function(){ save(extractDoc(window)); });
      },
    });
  }

  mkHtml("../index.md", target+"/index.html", "md", prepIntro);
  mkHtml("../faq.md", target+"/faq.html", "md", prepIntro);

  mkHtml("../download.md", target+"/download.html", "md");
  mkHtml("../history.md", target+"/history.html", "md");

  mkHtml("../try.html", target+"/try.html", "html");
  mkHtml("../shirt.html", target+"/shirt.html", "html");
  mkHtml("../shirt-eu.html", target+"/shirt-eu.html", "html");
  mkHtml("../why.html", target+"/why.html", "raw");

  mkHtml("../syntax.md", target+"/syntax.html", "md", function(syntax, save) {
    mkHtml("../diagram.html", target+"/diagram.html", "html", null, function(html) {
      jsdom.env({
        html: html,
        virtualConsole: jsdom.createVirtualConsole().sendTo(console),
        scripts: ["node_modules/jquery/dist/jquery.js"],
        features: {
          FetchExternalResources: ["script"],
          ProcessExternalResources: ["script"],
        },
        done: function (errors, window) {
          var $=window.$;
          $(function() {
            var svg=$("svg");
            svg.addClass("img-responsive");
            $("script", $("#rr")).each(function(i) {
              $(this).replaceWith($(svg[i]));
            });
            $("script").remove();
            save(syntax.replace(/%%%/, unwrapDoc(extractDoc(window))));
          });
        },
      });
    });
  });

} else console.log("mdgen TARGET");

function mkHtml(source, target, type, exec, prep) {

  function save(html) {
    fs.writeFileSync(target, html);
    console.log("updated "+target);
  }

  var content=fs.readFileSync(source, "utf8");

  if (type==="raw") {
    save(content);
    return;
  }
  else if (type==="md") {
    content=marked(content, {
      gfm: true,
      tables: true,
      breaks: true,
    });
    content='<div class="content">'+content+'</div>';
  }


  var tpl=fs.readFileSync(__dirname+"/tpl.html", "utf8");

  if (prep) {
    prep(content, function(content) {
      save(tpl.replace(/%%%/, content));
    });
  }
  else {
    var html=tpl.replace(/%%%/, content);
    if (exec) exec(html, save)
    else save(html);
  }
}
