
// hack to convert my markdown to a 'fancy' responsive web page
// using marked and jsdom.

var fs=require("fs");
var path=require("path");
var marked=require("marked");
var jsdom=require("jsdom");
var minify=require("html-minifier").minify;
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
        // remove injected scripts
        $("script[class='jsdom']").remove();
        $(function(){ save(extractDoc(window)); });
      },
    });
  }

  mkHtml("../index.md", target+"/index.html", { exec: prepIntro });
  mkHtml("../faq.md", target+"/faq.html", { exec: prepIntro });

  mkHtml("../download.md", target+"/download.html");
  mkHtml("../users.md", target+"/users.html");
  mkHtml("../users-bin.md", target+"/users-bin.html");
  mkHtml("../users-src.md", target+"/users-src.html");
  mkHtml("../users-cs.md", target+"/users-cs.html");
  mkHtml("../users-go.md", target+"/users-go.html");
  mkHtml("../users-java.md", target+"/users-java.html");
  mkHtml("../users-node.md", target+"/users-node.html");
  mkHtml("../users-python.md", target+"/users-python.html");
  mkHtml("../users-rust.md", target+"/users-rust.html");

  mkHtml("../history.md", target+"/history.html");

  mkHtml("../try.html", target+"/try.html", { type: "html", nomin: true });

  mkHtml("../syntax.md", target+"/syntax.html", { exec: function(syntax, save) {
    mkHtml("../diagram.html", target+"/diagram.html", { type: "html", prep: function(html) {
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
            // remove the script that generated the page
            $("script").remove();
            save(syntax.replace(/%%%/, unwrapDoc(extractDoc(window))));
          });
        },
      });
    }});
  }});

} else console.log("mdgen TARGET");

function mkHtml(source, target, opt) {
  opt=opt||{};

  function save(html) {
    if (!opt.nomin)
      html=minify(html, { minifyJS: true, removeComments: true, collapseWhitespace: true });
    fs.writeFileSync(target, html);
    console.log("updated "+target);
  }

  var content=fs.readFileSync(source, "utf8");

  if (opt.type==="raw") {
    save(content);
    return;
  }
  else if (!opt.type || opt.type==="md") {
    content=marked(content, {
      gfm: true,
      tables: true,
      breaks: true,
    });
    content='<div class="content">'+content+'</div>';
  }

  var tpl=fs.readFileSync(__dirname+"/tpl.html", "utf8");

  if (opt.prep) {
    opt.prep(content, function(content) {
      save(tpl.replace(/%%%/, content));
    });
  }
  else {
    var html=tpl.replace(/%%%/, content);
    if (opt.exec) opt.exec(html, save)
    else save(html);
  }
}
