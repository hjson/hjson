
// hack to convert my markdown to a 'fancy' responsive web page
// using marked and jsdom.

var fs=require("fs");
var path=require("path");
var marked=require("marked");
var jsdom=require("jsdom");
var args=process.argv;

if (args.length>2) mkHtml("../index.md", args[2]);
else console.log("mdgen TARGET");

function mkHtml(source, target)
{
  var md=fs.readFileSync(source, "utf8");

  var content=marked(md,
  {
    gfm: true,
    tables: true,
    breaks: true,
  });

  var tpl=fs.readFileSync(__dirname+"/tpl.html", "utf8");
  var html=tpl.replace(/%%%/, content);

  jsdom.env(html, ["node_modules/jquery/dist/jquery.js", "dom.js"], function (errors, window)
  {
    var $=window.$;
    $(function()
    {
      html=window.document.documentElement.outerHTML;
      fs.writeFileSync(target, html);
      console.log(target);
    });
  });
}
