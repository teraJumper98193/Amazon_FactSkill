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
var APP_ID = "amzn1.echo-sdk-ams.app.3157704b-f2e7-4190-95b4-6fa259193fc4";

/**
 * Array containing space facts.
 */
var SPACE_FACTS = [
    "Did you hear about the Polak who thought his wife was trying to kill him? On her dressing table he found a bottle of Polish Remover.",
    "How do you sink a polish battleship? Put it in the water.",
    "Why did the Polak put ice in his condom? To keep the swelling down.",
    "What happened to the Polish hockey team? They all drowned in spring training.",
    "Why don't polish women use vibrators? It chips their teeth.",
    "Did you hear about the winner of the Polish beauty contest? Me neither.",
    "Why wasn't Christ born in Poland? Because they couldn't find three wisemen and a virgin.",
    "What time was it when the monster ate the Polish prime minister? Eight P.M.",
    "How did the Germans conquer Poland so fast? They marched in backwards and the Polish thought they were leaving.",
    "How do you tell which is the Groom at a Polish wedding? He's the one with the CLEAN bowling shirt.",
    "How do you stop a Polish army on horseback? Turn off the carousel.",
    "How do you know if your in front of a Polish firing squad? They are standing in a circle.",
    "What do you do if a Polak throws a pin at you? Run like hell, he's still got a hand grenade between his teeth.",
    "What do you do if a Polak throws a hand grenade at you? Take the pin out and throw it back.",
    "How do you know if a Polak has been using a computer? There's whiteout on the screen.",
    "How did the Polish mother teach her son which way to put his underwear on? Yellow in the front, Brown in the back!",
    "How do you know you're flying over Poland? Toilet paper hanging on the clotheslines.",
    "Did you hear about the Polak who married an Amish woman? He drove her buggy.",
    "Did you see the polish submarine with a screen door? Dont laugh, it keeps the fish out.",
    "Do you know why the new football stadium they built in Warsaw could not be used? No matter where you sat you were behind a Pole.",
    "Did you hear about the Polish Helicopter crash? The pilot got cold, so he turned off the fan.",
    "How do you get a Polak out of the bath tub? Throw in a bar of soap.",
    "Why are there no ice cubes in Poland? They forgot the recipe.",
    "What happens when a Polak doesn't pay his garbage bill? They stop delivering.",
    "How do you ruin a Polish party? Flush the punch bowl.",
    "What is long and hard that a Polish bride gets on her wedding night? A new last name.",
    "What happened to the Polish National Library? Someone stole the book.",
    "Why did the Polish couple decide to have only 4 children? They had read in the newspaper that one out of every five babies born in the world today is Hindu.",
    "What did the Polish mother say when her daughter announced that she was pregnant? Are you sure it's yours?",
    "Why did the Polak sell his water skis? He couldn't find a lake with a hill in it.",
    "What do Poles do with all their gold medals? Go home and get them bronzed.",
    "Did you hear in the news that a seven forty seven recently crashed in a cemetery in Poland? The Polish officials have so far retrieved 2000 bodies.",
    "Did you hear about the Polish family that froze to death outside a theater? They were waiting to see the movie titled Closed for the Winter.",
    "Polish kamikaze flew 48 successful missions.",
    "Polish loan shark lends out all his money, skips town.",
    "A Polish and an Italian are hunting in the woods. Suddenly a naked woman appears. Italian says: Boy, I could eat her! The Polish guy shot her.",
    "Did you hear about the latest Polish invention? It's a solar powered flashlight.",
    "Question: How many Polaks does it take to change a light bulb? Answer: 3. One to stand on a chair and hold the bulb and the other two to spin the chair.",
    "Why do Polish airplanes fly so low? So the pilots can read the street signs.",
    "Did you hear about the Polish Admiral who wanted to be buried at sea when he died? Five sailors died digging his grave.",
    "How do you get a one-armed Polak out of a tree? Wave to him.",
    "Did you hear about the Pole that broke his leg at the golf course? He fell off the ball washer.",
    "Hear about the Polish guy that bought his wife a toy poodle? He accidentally killed it putting the batteries in.",
    "What did they find when the Berlin Wall came down? The Polish hide and seek champion.",
    "How can you spot a Polish fur coat? It's got tire marks on it.",
    "How can you spot a Polish helicopter? It's equipped with an ejection seat.",
    "Hear about the Polish Siamese twins? They weren't joined.",
    "How can you spot a Polish airplane in a snowstorm? It's the one with snow chains on the propellers.",
    "Hear about the polish woman who died the same day she bought an exercise bike? She tried to ride it home.",
    "Did you hear about the new automatic Polish parachutes? They open on impact."

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
    var speechOutput = "Here's your Old Polish Joke: " + fact;

    response.tellWithCard(speechOutput, "Old Polish Joke", speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the SpaceGeek skill.
    var spaceGeek = new SpaceGeek();
    spaceGeek.execute(event, context);
};