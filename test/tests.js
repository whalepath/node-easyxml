// vim: noai:ts=2:sw=2
/*jshint strict:false*/
/*global __dirname describe it require*/

var assert  = require("chai").assert,
    fs      = require("fs"),
    path    = require("path"),

    easyXML = require("../index.js");

describe("Node EasyXML", function () {
   var undefinedJson = {
       undef: undefined,
       undefObj: {
           undefSubKey: undefined,
       },
       undefs: [
           undefined,
           null,
           'not-null'
       ],
       undef1s:[
           undefined,
           null,
       ]
   };
   var should = {
        "names"  : {
            mochaDesc: "should parse a JSON object into XML",
            config: {
                singularizeChildren: true,
                unwrappedArrays: false
            },
        },
        "names1" : {
            mochaDesc: "should parse a JSON object with attrs into XML",
            config: {
                singularizeChildren: true,
                unwrappedArrays: false
            },
        },
        "names2" : {
            mochaDesc: "should parse a JSON object with attrs and text node into XML",
            config: {
                singularizeChildren: true,
                unwrappedArrays: false
            },
        },
        "singularizeChildren" : {
            mochaDesc: "should parse a JSON object without singularizeChildren to XML",
            config: {
                singularizeChildren: false,
                unwrappedArrays: false
            },
        },
        "singularizeChildren2" : {
            mochaDesc: "should parse a JSON object without singularizeChildren to XML (with object)",
            config: {
                singularizeChildren: false,
                unwrappedArrays: false
            },
        },
        "singularizeChildren3" : {
            mochaDesc: "should parse a JSON object with correct captalization",
            config: {
                singularizeChildren: true,
                unwrappedArrays: false
            },
        },
        "complex" : {
            mochaDesc: "testing a more complex XML object",
            config: {
                singularizeChildren: true,
                unwrappedArrays: false
            },
        },
        "unwrappedArrays" : {
            mochaDesc: "should be able to use unwrapped child nodes to represent an array",
            config: {
                singularizeChildren: true,
                unwrappedArrays: true
            },
            jsonFile: "wrappedArrays"
        },
        "wrappedArrays" : {
            mochaDesc: "should normally wrap array elements in a single parent element",
            config: {
                singularizeChildren: true,
                unwrappedArrays: false
            },
            jsonFile: "wrappedArrays"
        },
        "null"    : {
            mochaDesc: "should parse a null value",
            config: {
                singularizeChildren: true,
                unwrappedArrays: false
            },
        },
        undefinedHandling: { 
            mochaDesc: "Handling undefine in arrays and as elements",
            json: undefinedJson,
            config: {
                singularizeChildren: true,
                unwrappedArrays: false,
                filterNulls: false
            }
        },
        undefinedHandlingFiltered: { 
            mochaDesc: "Handling undefine in arrays and as elements (filter out nulls) ",
            json: undefinedJson,
            config: {
                singularizeChildren: true,
                unwrappedArrays: false,
                filterNulls: true
            }
        },
        undefinedHandlingNoSing: { 
            mochaDesc: "Handling undefine in arrays and as elements (No filtering of nulls,No singularize of children)",
            json: undefinedJson,
            config: {
                singularizeChildren: false,
                unwrappedArrays: false,
                filterNulls: false
            }
        },
        undefinedHandlingFilteredNoSing: { 
            mochaDesc: "Handling undefine in arrays and as elements (filter out nulls,No singularize of children)",
            json: undefinedJson,
            config: {
                singularizeChildren: false,
                unwrappedArrays: false,
                filterNulls: true
            }
        }
      };

  Object.keys(should)
    .forEach(function(name){
      var testDesc = should[name];
      it(testDesc.mochaDesc, function (done) {
        easyXML.configure(testDesc.config);

        var fixtureDir = __dirname + "/fixtures/" ;
        var file = fixtureDir+ name;

        fs.readFile(file + ".xml", "UTF-8", function (err, data) {
          if (err) {
            throw err;
          }

          var json = should[name].json || require(fixtureDir + (testDesc.jsonFile || name)+ ".json");

debugger;
          var xmlOutput = easyXML.render(json);
          assert.equal(xmlOutput, data, "EasyXML should create the correct XML from a JSON data structure.");
          assert.strictEqual(xmlOutput, data, "EasyXML should create the correct XML from a JSON data structure.");

          done();
        });
      });
    });
});
