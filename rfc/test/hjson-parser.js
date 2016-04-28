
var hjsonGrammar=new (require("./hjson-grammar.js"))();
var startRule="Hjson-text";
//var startRule="JSON-text";

var apglib=require("apg-lib");
var utils=apglib.utils;

var id=apglib.ids; // result state
// - *ACTIVE* indicates that the parser is visiting this node on the way down the parse tree.
// At this point there is no matched phrase - it is not even known whether a phrase will be matched or not.
// - *EMPTY* indicates that the parser is visiting this node on the way up the parse tree and an empty phrase has been matched.
// - *MATCH* indicates that the parser is visiting this node on the way up the parse tree
// and a phrase of `result.phraseLength` (\> 0) has been matched.
// - *NOMATCH* indicates that the parser is visiting this node on the way up the parse tree
// and the parser failed to match any phrase at all.

function parse(text, debug) {

  var parser=new apglib.parser();

  // (see the apg-js2-examples/trace/setup.html example for details on filtering the records).
  if (debug) {
    parser.trace=new apglib.trace();
    parser.trace.setMaxRecords(100000);
    if (debug!=-1) {
      var r=parser.trace.filter.rules;
      r["array"]=true;
      r["begin-array"]=true;
      r["begin-object"]=true;
      r["comma-separator"]=true;
      r["comment"]=true;
      r["end-array"]=true;
      r["end-object"]=true;
      r["false"]=true;
      r["hjson-text"]=true;
      r["json-string"]=true;
      r["keyname"]=true;
      r["lf-separator"]=true;
      r["member"]=true;
      r["ml-string"]=true;
      r["name"]=true;
      r["name-separator"]=true;
      r["null"]=true;
      r["number"]=true;
      r["object"]=true;
      r["ql-string"]=true;
      r["root-object"]=true;
      r["string"]=true;
      r["true"]=true;
      r["value"]=true;
      r["value-separator"]=true;
    }
  }

  var output=[];

  function addMatch(name) {
    var match=function(result, chars, phraseIndex, data) {
      if (result.state === id.MATCH) {
        data.push(name+"="+utils.charsToString(chars, phraseIndex, result.phraseLength));
      }
    }
    parser.callbacks[name]=match;
  }

  ["object", "array", "member", "value"].forEach(name => addMatch(name));
  ["name", "comment"].forEach(name => addMatch(name));
  ["number", "ql-string", "ml-string", "json-string"].forEach(name => addMatch(name));

  var result=parser.parse(hjsonGrammar, startRule, utils.stringToChars(text), output);
  result.output=output;

  if (debug)
    result.trace=parser.trace.toHtmlPage("ascii", "default trace");

  return result; // see result.success
}

module.exports=parse;
