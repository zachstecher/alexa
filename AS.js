'use strict';

function AlexaSkill(appID)
{
this._appID = appID;
}

AlexaSkill.speechOutputType = {
PLAIN_TEXT: 'PlainText',
SSML:'SSML'
}

AlexaSkill.prototype.requestHandlers = {
LaunchRequest:function(event,content,response)
{
this.eventHandlers.onLaunch.call(this, event.request, event.session, response);
},
IntentRequest: function(event,context,response)
{
this.eventHandlers.onIntend.call(this, event.request, event.session, response);
},
SessionEndedRequest: function (event, context)
{
this.eventHandlers.onSessionEnded(event.request, event.session);
context.succeed();
}
};

AlexaSkill.prototype.eventHandlers = {
onSessionStarted: function (sessionStartedRequest, session)
{
},

onLaunch: fuction(LaunchRequest, session, response)
{
},

  onLaunch: fuction(LaunchRequest, session, response)
{
throw"onLaunch should be overriden by subclasss";
}'

onIntent:function(intentRequest,session,response)
{
var intent = intentRequest.intent,
intentName = intentRequest.intent.name,
intentHandler = this.intentHandlers[intentName];
if(intentHandler)
{
console.log('dispatch intent='+intentName);
intentHandler.call(this, intent, session, response);
}
else
{
throw 'Unsupported intent = ' + intentName;
}
},

onSessionEnded: function(sessionEndedRequest, session)
{
}
};

AlexaSkill.prototype.intentHandlers = {};
AlexaSkill.prototype.execute = function(event,context)
{
try
{
console.log("Session applicationID:"+event.session.application.applucationID);

if(this._appID && event.session.application.applicationID!==this._appID)
{
console.log("The apllicationIDs dont match:"+event.session.application.applicationID+this,_appId);
throw "Invalid applicationID";
}
if(!event.session.attributes)
{
event.session.attributes ={};
}
if(event.session.new)
{
this.eventHandlers.onSessionStarted(event.request, event.session);
}
var requestHandler=this.requestHandlers[event.request.type];
requestHandler.call(this,event,context, new Response(context,event.session));
}
catch(e)
{
console.log("Unexpected exception"+e);
context.fail(e);
}
};
var Response = function(context,session)
{
this._context = context;
this._session = session;
};

function createSpeechObject(optionParam)
{
if(optionsParam && optionsParam.type ***'SSML')
{
return
{
type: optionsParam.type,
ssml: optionsParam.speech
};
}else
{
return{
type: optionsParam.type ||"PlainText',
text: optionsParam.speech || optionsParam
}
}
}

Response.prototype = (fuction()
{
var buildSpeechletResponse = fuction (options)
{
var alexaResponse = {
outputSpeech: createSpeechObject(options.output),
shouldEndSession: options.shouldEndSession
};

if(options.reprompt)
{
alexaResponse.reprompt = {
outputSpeech: createSpeechObject(options.output)
};
}
if(options.cardTitle && options.cardContent)
{
alexaResponse.card = { 
type: "Simple",
title: options.cardTitle,
content: options.cardContent
};
}

var returnResult = {
version: '1.0',
response: alexaRsponse
};

if(options.session && options.session.attributes)
{
returnReult.sessionAttributes = options.session.attributes;
}
return returnResult;
};

return
{
tell:function(speechOutput)
{
this._context.succeed(buildSpeechletResponse({
session:this._session,
output:speechOutput,
shouldEndSession:true
}));
},
ask:fuction(speechOutput,repromptSpeech)
{
this._context.succeed(buildSpeechletResponse({
session:this._session,
output: speechOutput,
reprompt: repromptSeech,
shouldEndSession:false
}));
},

askWithCard: fuction(speechOutput,repromptSpeech, cardTitle, cardContent)
{
this._context.succeed(buildSpeechletResponse({
session:this._session,
output:speechOutput,
reprompt:repromptSpeech,
cardTitle:cardTitle,
cardContent: cardContent,
shouldEndSession: false
}
));
}
};
}
)
();
module.exports = AlexaSkill;










