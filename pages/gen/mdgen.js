
// hack to convert my markdown to a 'fancy' responsive web page
// using marked and jsdom.

var fs=require("fs");
var path=require("path");
var marked=require("marked");
var jsdom=require("jsdom");
var args=process.argv;

if (args.length>2) {
  var target=args[2];
  mkHtml("../index.md", target+"/index.html", 2);
  mkHtml("../download.md", target+"/download.html", 1);
  mkHtml("../syntax.md", target+"/syntax.html", 1);
  mkHtml("../history.md", target+"/history.html", 1);
  mkHtml("../try.html", target+"/try.html");
} else console.log("mdgen TARGET");

function mkHtml(source, target, type) {

  function save(html) {
    fs.writeFileSync(target, html);
    console.log("updated "+target);
  }

  var content=fs.readFileSync(source, "utf8");

  if (type>=1) {
    content=marked(content, {
      gfm: true,
      tables: true,
      breaks: true,
    });
  }

  var tpl=fs.readFileSync(__dirname+"/tpl.html", "utf8");
  var html=tpl.replace(/%%%/, content);

  if (type>=2) {
    jsdom.env({
      html: html,
      virtualConsole: jsdom.createVirtualConsole().sendTo(console),
      scripts: ["node_modules/jquery/dist/jquery.js", "dom.js"],
      done: function (errors, window) {
        var $=window.$;
        $(function() {
          html=window.document.documentElement.outerHTML;
          html=html.replace(/<\/body>.*<\/html>/g, '</body></html>');
          save(html);
        });
      },
    });
  } else save(html);

}
