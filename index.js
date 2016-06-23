/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, ask Space Geek for a space fact"
 *  Alexa: "Here's your space fact: ..."
 */

/**
 * App ID for the skill
 */
var APP_ID = "amzn1.echo-sdk-ams.app.abc49f37-df32-41df-95e4-6d8981a0d4f7";

/**
 * Array containing space facts.
 */
var SPACE_FACTS = [
    "Approximate 80,000 components come together to make an F1 car.",
    "Formula 1 car engines complete their life in about two hours of racing.",
    "The brake discs in a Formula 1 car have to withstand the operating temperature of approximately 1000 degrees Centigrade.",
    "Most racing cars have their tires filled with nitrogen.",
    "During a Formula 1 race a driver will experience up to 5G under braking and cornering.",
    "A grand prix driver changes gears between 2,500 and 4,000 times a race.",
    "Over a certain speed, Formula 1 cars generate more downforce than their weight, so they could drive upside down.",
    "Formula 1 engines idle around 5,000 rpm.",
    "The best Formula 1 pit crews can change tires in under 3 seconds.",
    "Formula 1 car can accelerate from 0 to 100 miles per hour and decelerate back to 0 in just four seconds.",
    "A Formula One car has more than 0.6 miles of cable in its bodywork.",
    "A Formula One car has a minimum weight of 1,415 pounds, excluding fuel.",
    "A Formula One car can go from 0 to 100 mph in 1.5 seconds.",
    "A Formula One driver loses about 6.5 pounds of weight during a race as a result of high G-forces and temperatures.",
    "The average cockpit temperature is around 122 fahrenheit, rising even further at races in the hottest countries.",
    "A Formula 1 cars cockpit is so tight that it requires the driver to remove the steering wheel in order to get in or out of it.",
    "In a street course race like the Monaco, the downforce provides enough suction to lift drain covers.",
    "There has not been a number 13 Formula 1 car since 1976 due to wide belief that the number is bad luck.",
    "Formula 1 car only has two pedals which are shaped to fit drivers feet.",
    "Emerson Fittipaldi was the only driver who refused to start at 1975 Spanish Grand Prix.",
    "The Toro Rossos bull design is carefully painted on every single car.",
    "For timing purposes the lap is split into three sections, each of which is roughly a third of the lap. These sections are officially known as Sector 1, Sector 2 and Sector 3.",
    "Jim Clark won four times in a row Belgian Grand Prix even though he hated Spa circuit very much.",
    "The first Safety Car in Formula One racing was used in 1973 at the Canadian Grand Prix.",
    "The first can of Red Bull energy drink was sold in the same year as Sebastian Vettel was born, 1987.",
    "When Stirling Moss and Juan Manuel Fangio were team mates, they used to be called The Train because they dared to drive so close behind each other.",
    "Since 1985 all F1 cars are required to be fitted with cameras or camera housings which are used to provide on-board TV footage.",
    "Diffuser is the rear section of the cars floor or undertray where the air flowing under the car exits.",
    "In 2005, Sergio Perez moved to Europe to compete in Formula BMW, spending four months living in a restaurant owned by his team boss.",
    "Colin Chapman is regarded as one of the greatest designers in F1 history. He pioneered the monocoque chassis, front wings, rear wings, ground effect aerodynamics, side mounted radiators, active suspension, gas turbines, four wheel drive, and carbon fibre bodywork.",
    "A chicane is a tight sequence of corners in alternate directions.",
    "Al Pease was the only driver ever to have been disqualified for being too slow.",
    "2009 Formula One season was the first one ever without a race in North America.",
    "Jody Scheckter and Damon Hill are the only drivers to have ever competed with car number zero in a World Championship race.",
    "Louis Chiron was the oldest driver who has ever taken part in a Formula One Grand Prix at 58.",
    "The job of front jack man of the pit crew is considered the most hazardous, as it requires standing directly in front of the car as it enters its pit stall.",
    "For Monaco Grand Prix 2004 Jaguar Racing positioned diamonds in the nose of both racing cars.",
    "During a race, a driver has a bag of isotonic drink attached to the side of the cockpit.",
    "For a monocoque, about 30 square metres of carbon fiber mats are processed, in which the individual fibres are five times thinner than a human hair.",
    "The fireproof gloves are made as thin as possible, to ensure that the driver has the greatest possible amount of feel to the steering wheel.",
    "Red Bull Racings Sebastian Vettel became Formula Ones youngest triple world champion at the age of 25 after a wet and wild 2012 Brazilian Grand Prix .",
    "It is highly common for Formula One stars to take up residence in Switzerland or Monaco to reduce their tax bills.",
    "In the early days of Formula One the pit stops took almost 4 minutes and only two people were involved in the process.",
    "There was an engine used by the Arrows team for the 1987 and 1988 seasons, as well as Ligier for 1987 that was called Megatron.",
    "The colour on Ferrari cars has its origin in a shade of red known as rosso corsa being the national racing colour of Italy.",
    "Hermann Tilke is one of four designers recognised by the FIA but has predominantly been the only one to be commissioned to design Formula One tracks.",
    "Pastor Maldonado became the first Venezuelan to win a Formula One Grand Prix when he won the 2012 Spanish Grand Prix from his first pole position.",
    "In addition to the usual track marshals, medics and doctors, several divers are present at the Monaco Grand Prix in case a driver crashes into the harbour and needs rescuing.",
    "During his high-speed crash at the Canadian Grand Prix in 2007, Robert Kubica was subjected to more than 28 times the acceleration of gravity.",
    "Approximately 15 hospitals are placed on alert during a race weekend. As a special service at the circuit, sometimes a dentist is also available.",
    "Stefan Johansson hit a deer during Friday practise for the Austrian GP in 1987.",
    "Green is Britains racing color as it was in thanks to Ireland for hosting the first British race.",
    "Jenson Button failed his first driving test for getting too close to a parked vehicle.",
    "Helmut Marko lost sight in one eye to a peeble in the 1972 French Grand Prix.",
    "The downforce plays an important part. 10% improvement in downforce is worth about a second a race lap.",
    "Scuderia Ferrari have entered every FIA Formula One season, since 1950, but ironically did not enter the first official race at Silverstone.",
    "Desiree Wilson became the only woman to win a Formula One race of any kind when she won at Brands Hatch in the British Aurora F1 series on April 7th,1980.",
    "Enzo Ferrari used to drive for Alfa Romeo.",
    "Spa 1997 was the first race ever to start behind the safety car.",
    "Lewis Hamilton won the 2015 Championship.",
    "Lewis Hamilton won the 2014 Championship.",
    "Sebastian Vettel won the 2013 Championship.",
    "Sebastian Vettel won the 2012 Championship.",
    "Sebastian Vettel won the 2011 Championship.",
    "Sebastian Vettel won the 2010 Championship.",
    "Jenson Button won the 2009 Championship.",
    "Lewis Hamilton won the 2008 Championship.",
    "Kimi Raikkonen won the 2007 Championship.",
    "Fernando Alonso won the 2006 Championship.",
    "Fernando Alonso won the 2005 Championship.",
    "Michael Schumacher won the 2004 Championship.",
    "Michael Schumacher won the 2003 Championship.",
    "Michael Schumacher won the 2002 Championship.",
    "Michael Schumacher won the 2001 Championship.",
    "Michael Schumacher won the 2000 Championship.",
    "Mika Hakkinen won the 1999 Championship.",
    "Mika Hakkinen won the 1998 Championship.",
    "Jacques Villeneuve won the 1997 Championship.",
    "Damon Hill won the 1996 Championship.",
    "Michael Schumacher won the 1995 Championship.",
    "Michael Schumacher won the 1994 Championship.",
    "Alain Prost won the 1993 Championship.",
    "Nigel Mansell won the 1992 Championship.",
    "Ayrton Senna won the 1991 Championship.",
    "Ayrton Senna won the 1990 Championship.",
    "Alain Prost won the 1989 Championship.",
    "Ayrton Senna won the 1988 Championship.",
    "Nelson Piquet won the 1987 Championship.",
    "Alain Prost won the 1986 Championship.",
    "Alain Prost won the 1985 Championship.",
    "Niki Lauda won the 1984 Championship.",
    "Nelson Piquet won the 1983 Championship.",
    "Keke Rosberg won the 1982 Championship.",
    "Nelson Piquet won the 1981 Championship.",
    "Alan Jones won the 1980 Championship.",
    "Jody Scheckter won the 1979 Championship.",
    "Mario Andretti won the 1978 Championship.",
    "Niki Lauda won the 1975 Championship.",
    "Emerson Fittipaldi won the 1974 Championship.",
    "Jackie Stewart won the 1973 Championship."
    
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * SpaceGeek is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var SpaceGeek = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
SpaceGeek.prototype = Object.create(AlexaSkill.prototype);
SpaceGeek.prototype.constructor = SpaceGeek;

SpaceGeek.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("SpaceGeek onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

SpaceGeek.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("SpaceGeek onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
SpaceGeek.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("SpaceGeek onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

SpaceGeek.prototype.intentHandlers = {
    "GetNewFactIntent": function (intent, session, response) {
        handleNewFactRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can ask Space Geek tell me a space fact, or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleNewFactRequest(response) {
    // Get a random space fact from the space facts list
    var factIndex = Math.floor(Math.random() * SPACE_FACTS.length);
    var fact = SPACE_FACTS[factIndex];

    // Create speech output
    var speechOutput = "Here's your Formula 1 fact: " + fact;

    response.tellWithCard(speechOutput, "Formula 1 Geek", speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the SpaceGeek skill.
    var spaceGeek = new SpaceGeek();
    spaceGeek.execute(event, context);
};