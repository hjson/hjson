
var fs=require("fs");
var path=require("path");
var util=require("util");

var hjsonParser=require("./hjson-parser.js");

var rootDir=path.normalize(path.join(__dirname, "../../testCases"));
var dbgDir=path.join(__dirname, "dbg");

var args={}, argv=[];
process.argv.slice(2).forEach(function(x) { if (x[0]==="-") { var i=x.indexOf("="); args[x.substr(1, i>0?i-1:undefined)]=i>0?x.substr(i+1):true; } else argv.push(x); });
var filter=args.f;
var fail=false;

try { fs.mkdirSync(dbgDir); } catch (e) { }

function failErr(name, type) {
  fail=true;
  console.log(name+" "+type+" FAILED!");
}

function load(file) {
  var text=fs.readFileSync(path.join(rootDir, file), "utf8");
  return text.replace(/\r/g, ""); // make sure we have unix style text regardless of the input
}

function test(name, file) {
  var text=load(file);
  var shouldFail=name.substr(0, 4) === "fail";

  try {
    var res=hjsonParser(text, args.d);

    var trace="Source<pre>\n"+text+"\n</pre>";
    trace+="Output<pre>\n"+util.inspect(res.output)+"\n</pre>";
    trace+="<p>Success: "+res.success+"</p>";
    trace+=res.trace;

    fs.writeFileSync(path.join(dbgDir, name+".html"), trace, "utf8");

    if (res.success==shouldFail) {
      return failErr(name, "should "+(shouldFail?"fail":"succeed"));
    }
  }
  catch (err) {
    return failErr(name, "exception", err.toString(), "");
  }
  console.log("- "+name+" OK");
}

function runTests() {
  console.log("Testing grammar...");

  var tests=fs.readdirSync(rootDir);
  tests.forEach(function(file) {
    var name=file.split("_test.");
    if (name.length < 2) return;
    name=name[0];

    if (filter && name.indexOf(filter) < 0) return; // ignore
    test(name, file);
  });

  console.log("result: "+(fail?"FAILED":"SUCCESS"));
  console.log("TODO: compare result to hjson-js");
  process.exit(fail?1:0);
}

runTests();
