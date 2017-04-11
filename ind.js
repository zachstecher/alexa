var APP_ID = undefined;

//Env Config

var config = {};
config.IOT_BROKER_ENDPOINT = "a1ftttk3ucqy90.iot.us-east-1.amazonaws.com".toLowerCase();
config.IOT_BROKER_REGION = "us-east-1";
config.IOT_THING_NAME = "wago";

// Loading AWS SDK libraries

var ANS = require('aws-sdk');
AWS.config.region = config.IOT_BROKER_REGION;
//Intializing client for IOT
var iotData = new AWS.IotData({endpoint:config.IOT_BROKER_ENDPOINT});
var AlexaSkill = require('./AlexaSkill');
var HelloWorld = function ()
{
AlexaSkill.call(this, APP_ID);
};

//Extend AlexaSkill
HelloWorld.prototype = Object.create(AlexaSkill.prototype);
HelloWorld.prototype.constructor = HelloWorld;

HelloWorld.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session)
{
console.log("HelloWorld onSessionStarted requestID:" + sessionStartedRequest.requestID + ".sessionID: " + session.sessionID);

// any kind of initialization 

HelloWorld.prototype.eventHandlers.onLaunch = function (launchRequest,session,response)
{
console.log("HelloWorld onLaunch requestID: " + launchRequest.requestID +",sessionID:"+session.sessionID);
var speechOutput = "Welcome to the Alexa skills, say hello";
var repromptText = "You can say Hello";
response.ask(speechOutput,repromptText);
// logic cleanup 
};

HelloWorld.prototype.intendHandlers = {

// register custom intend handlers
"RaspberryControlOnIntent": function(intent, session,response)
{

// response.tellWithCard("Hello World!","Hello World");
console.log("FB started");

var repromptText = null;
var sessionAttributes = {};
var shouldEndSession = true;
var speechOutput = "";
var payloadObj=1; //On
//preparing parameters of the update call

var paramsUpdate = {
topic:"/wago",
payload: JSON.strimgify(payloadObj),
qos:0
};
iotData.publish(paramsUpdate, function(err, data)
{
if (err)
{
//Handle the error here

console.log("MQTT Error", + data);
}
else
{
speechOutput = "Turning RaspberryPi on now.";
console.log(data);
response.tell(speechOutput);
//callback(sessionAttributes,buildSpeechletRespnse(intent.name,speechOutput,repromptText)
}
});
},




"RaspberryControlOffIntent": function(intent,session,response)
{
console.log("FB started");
var repromptText = null;
var sessionAttrivutes = {};
var shouldEndSession = true;
var speechOutput = "";

//Setting the Raspberry to 0 for activating the device
var pyloadObj=0;     //Off
var paramsUpdate = {
topic:"/wago",
payload: JSON.strimgify(payloadObj),
qos:0
};
iotData.publish(paramsUpdate, function(err, data)
{
if (err)
{
//Handle the error here

console.log("MQTT Error", + data);
}
else
{
speechOutput = "Turning Raspberry off now.";
console.log(data);
//callback(sessionAttributes,buildSpeechletRespnse(intent.name,speechOutput,repromptText)
}
});
},

"AMAZON.HelpIntent": function (intend,session,response)
{
response.ask("You can ask me to turn on or off", "You can ask me to turn on or off")
}
};

//Creating handler that reponds to Alexa's Reequest
exports.handler = function (event, context)
{

// creating an instance of the HelloWorld Skill.

var Hello = new Hello();
Hello.execute(event,context);
};


