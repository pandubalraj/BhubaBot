var Botkit = require('./lib/Botkit.js')
var os = require('os')
var localtunnel = require('localtunnel')
var opn = require('opn')
var request = require('request');

// controller bot definition
var controller = Botkit.facebookbot({
    debug: true,
    log: true,
    access_token: process.env.page_token,
    verify_token: process.env.verify_token,
    app_secret: process.env.app_secret,
    validate_requests: true 
});
var bot = controller.spawn({});

// create webhook server
controller.setupWebserver(process.env.PORT || process.env.port || 3000, function (err, webserver) {
    controller.createWebhookEndpoints(webserver, bot, function () {
        console.log('ONLINE!');
    });
});

// thread settings
controller.api.thread_settings.greeting('Welcome to Bhuba-Bot I am here to assist you with bhubaneshwar');

controller.api.thread_settings.get_started('start_payload');

// default main menu for the facebook menu button
controller.api.thread_settings.menu([
    {
        "type":"postback",
        "title":"Event",
        "payload":"Conference Details"
    },
    {
        "type":"postback",
        "title":"Location",
        "payload":"Location Details"
    },
    {
      "type":"postback",
      "title":"Travel",
      "payload":"Travel"
    },
]);


// utterance declaration
var Utterances = {
    yes: new RegExp(/^(yes|yea|yup|yep|ya|sure|ok|y|yeah|yah|sounds good)/i),
    no: new RegExp(/^(no|nah|nope|n|never|not a chance)/i),
    quit: new RegExp(/^(quit|cancel|end|stop|nevermind|never mind)/i),
    greetings: new RegExp(/^(hi|hello|greetings|hi there|yo|was up|whats up)/)
}


// this is triggered when a user clicks the send-to-messenger plugin
controller.on('facebook_optin', function (bot, message) {
    bot.reply(message, 'Welcome To My Chatbot Thanks Alot!')
})

// default main menu display
function main_menu(convo) {
    convo.say('OK, Which of the below would you like to know about?')
    convo.ask({
        attachment: {
            'type': 'template',
            'payload': {
                'template_type': 'generic',
                'elements': [
                    {
                        'title': 'Bhubaneshwar-"City of Temples"',
                        'image_url': 'https://bhubabot.blob.core.windows.net/images/conference_1.png',
                        'subtitle': '',
                        'buttons': [
                            {
                                'type': 'postback',
                                'title': 'Local Attractions',
                                'payload': 'local attractions'
                            },
                            {
                                'type': 'postback',
                                'title': 'Accomodations',
                                'payload': 'accomodations'
                            },
                            {
                                'type': 'postback',
                                'title': 'Others',
                                'payload': 'others'
                            }
                        ]
                    }
                ]
            }
        }
    }, function(response, convo) {
        // whoa, I got the postback payload as a response to my convo.ask!
        convo.next();
    });
}




// starting with hi and start_payload
var welcome_message = ['^hi$','^start_payload$','^hello$','^start$','^hey$','^whatsup$','^howsu$']

controller.hears(welcome_message, 'message_received,facebook_postback', function(bot, message) {
    bot.startConversation(message, function(err, convo) {
        convo.say('Hi Geek, I am Bhuba-Bot. Nice to meet you ☺ ');
        convo.say('Namascara and Swaagta to my city Bhubaneshwar');
        convo.say('This is how we say hello and welcome in oriya.........language we speak here!! ☺');
        convo.say('I will be happy to tell you about Bhubaneshwar "The City Of Temples"');
        convo.say('This is a lovely place having a lot of history behind it. Food is awesome and a fantastic weather in April');
        convo.say('It has a great eateries wherein you could savor the original tastes of Odisha');
        convo.say('And don’t forget about shopping. You can get local styles of Sarees (The Indian Wrap Around) and Dhotis. I can tell you the best place to purchase these before you travel back home.');
        main_menu(convo);
    });
});



var again_payload = ["again_payload","^main menu$","^index$","^menu$","^content$"]
// again_payload on go back menu option
controller.hears(again_payload, 'message_received,facebook_postback', function(bot, message) {
    bot.startConversation(message, function(err, convo) {
        main_menu(convo);
    });
});

// callback main_menu
function main_callback_menu(convo) {
    convo.ask({
                "attachment":{
                "type":"template",
                "payload":{
                "template_type":"button",
                "text":"What do you want to do next?",
                "buttons":[
               {
                "type":"postback",
                "title":"Main Menu",
                "payload":"again_payload"
                }
                ]
                }
                }
    });
}

// attractions_callback_menu
function attractions_callback_menu(convo){
        convo.ask({
          "attachment":{
          "type":"template",
          "payload":{
            "template_type":"button",
            "text":"What do you want to do next?",
            "buttons":[
            {
                "type":"postback",
                "title":"Go Back",
                "payload":"local attractions"
              },{
                "type":"postback",
                "title":"Main Menu",
                "payload":"again_payload"
              }
            ]
          }
        }
    });
}
// ====================================== Main Menu  1. local attractions================================
var event = ['^local attractions$','^Attractions$']
controller.hears(event, 'message_received,facebook_postback', function(bot, message) {
    bot.startConversation(message, function(err, convo) {
    convo.say('By the way do you the fact about Bhubaneshwar that ');
    convo.say('It was ancient temple of Kalinga and Dhauli where the famous battle was fought between Emperor Ashoka and the Kalinga army'); 
    convo.say('So yeah, what is it you would like to know about?');
        convo.ask({
            attachment : {
                'type': 'template',
                'payload': {
                    'template_type': 'generic',
                    'elements': [
                        {
                            'title': 'Local Attractions in Bhubaneshwar',
                            'image_url': 'https://bhubabot.blob.core.windows.net/images/conference.jpg',
                            'subtitle': '',
                            'buttons': [
                                {
                                    'type': 'postback',
                                    'title': 'Shopping',
                                    'payload': 'shopping'
                                },
                                {
                                    'type': 'postback',
                                    'title': 'Food',
                                    'payload': 'food'
                                },
                                {
                                    'type': 'postback',
                                    'title': 'Tourist Spots',
                                    'payload': 'tourist spots'
                                }
                            ]
                        }
                    ]
                }
            }
        });
     });
});
// ====================================================================================================
// ==============================Main Menu  1. local attractions 1.1. Shopping ===========================
controller.hears(['^shopping$','^shopes$'], 'message_received,facebook_postback', function (bot, message) {
    bot.startConversation(message, function (err, convo) {
         convo.say('I can help you with shopping all the time............');
         convo.say('For those who are fond of traditional fabrics......then this is the place to shop');
         convo.say('The city is well known for Ikat fabrics.I have few pics for you of the fabric.');
        convo.ask({
              'attachment': {
                'type': 'template',
                'payload': {
                    'template_type': 'generic',
                    'elements': [
                        {
                            'title': 'Ikat Fabrics',
                            'image_url': 'https://s-media-cache-ak0.pinimg.com/736x/07/35/9b/07359b30c334d4a45fee523041fa78e2.jpg', 
                            "buttons":[
                                        {
                                            "type":"web_url",
                                            "url":"https://en.wikipedia.org/wiki/Ikat",
                                            "title":"Click here to know more of the IKAT...... "
                                        }
                            ]
                        }
                    ]
                }
            }
        });
        convo.say('Other best buys include Tussar Silk,Sambalpuri Silk and Cotton ');
        convo.say('Apart from fabric different kind of metal sculptures known as Dhokra is famous');
        convo.ask({        
             "attachment":{     
             "type":"image",        
             "payload":{        
             "url":"http://www.indianetzone.com/photos_gallery/100/2_Dhokra_Art___Crafts.jpg"       
             }      
             }      
         }); 
         attractions_callback_menu(convo); 
});
//======================================================================================================
        
 // ============================ Main Menu  1. local attractions 1.2. Food =============================     
        
 controller.hears(['^food$',"^trending foods$","^dishes$","^dish$","^food$"], 'message_received,facebook_postback', function (bot, message) {       
     bot.startConversation(message, function (err, convo) {     
         convo.say('Bhubaneshwar has the traditional Odisha delicacies as a major tourism center in India');        
         convo.say('Panchana Phutana special mixture used in most of dishes,Typically Odisha Meal tastes awsome too. ');        
         convo.ask({        
             "attachment":{     
             "type":"image",        
             "payload":{        
             "url":"https://s3-eu-west-1.amazonaws.com/sosnewbucketforlive/blog_img/strand_of_silk_-_journey_map_-_exploring_the_cuisine_of_odisha_-_lunch_thali.jpg"       
             }      
             }      
         });        
         convo.say('Did you know how to calculate the Volume of a Sphere? Well it is (Pie * Radius /3). ')      
         convo.say('Yeah, you will see a lot of white spheres in Bhubaneshwar dipped in sugary syrup. ')        
        convo.say('When you see \'em dont sit and calculate the volume. Also, you are welcome to invoke selective amnesia about your weight or what the Blood Sugar reading says. ')        
         convo.say('Just Pick-it and Gobble it.Thats it… ')     
         convo.say('These white spheres soaked with ambrosia take you directly to a place called Heaven. It is unbelievable. ')     
         convo.say('You cannot forget Rasgolla,Chamcham..');        
         convo.ask({        
             "attachment":{     
             "type":"image",        
            "payload":{     
             "url":"http://images.mapsofindia.com/my-india/Rasgulla-665x453.jpg"        
                 }      
             }      
         });        
       attractions_callback_menu(convo);      
     });        
 });
// =====================================================================================================
// tourists spots menu callback
function tourist_callback_menu(convo){
        convo.ask({
          "attachment":{
          "type":"template",
          "payload":{
            "template_type":"button",
            "text":"What do you want to do next?",
            "buttons":[
            {
                "type":"postback",
                "title":"Go Back",
                "payload":"tourist spots"
              },{
                "type":"postback",
                "title":"Main Menu",
                "payload":"again_payload"
              }
            ]
          }
        }
    });
}
//  ============================ Main Menu  1. local attractions 1.3. Tourist Spots =================== 
var attraction = ['^tourist spots$',"^sight seeing$","^tourist$","^place to visit$","^place to travel$","^refreshment$","^place to see$"]

controller.hears(attraction, 'message_received,facebook_postback', function (bot, message) {
    bot.startConversation(message, function (err, convo) {
        convo.say('I am still awestruck at the marvelous creations in this part of the Universe.')
        convo.say('I am running multiple advanced algorithms across multiple cloud vendors in trying to figure out “The Master Algorithm” used by the Creator. Hopefully the algorithm will help me understand time travel and destiny. ');
        convo.say('I am still not done. However I wisely recommend to Visit Lingaraja Temple and suggest me a cue.')
         convo.ask({
              'attachment': {
                'type': 'template',
                'payload': {
                    'template_type': 'generic',
                    'elements': [
                        {
                            'title': 'Location Attraction',
                            "buttons":[
                                        {
                                        "type":"postback",
                                        "title":"Konark Sun Temple",
                                        "payload":"nandankanan"
                                        },{
                                        "type":"postback",
                                        "title":"Lingaraja temple",
                                        "payload":"lingaraja"
                                        },
                                        {
                                        "type":"postback",
                                        "title":"Udaygiri And Khandagiri caves",
                                        "payload":"udaygiri"
                                        }
                            ]
                        }
                    ]
                }
            }
        });
    });
});
// ======================================================================================================

// ============================ Main Menu  1. local attractions 1.3. Tourist Spots 1.3.1. Kunark Sun Temple
controller.hears(['^konark$'], 'message_received,facebook_postback', function (bot, message) {
    bot.startConversation(message, function (err, convo) {
        convo.say('You dont get to see amazing life forms as you see here. ')
        convo.say('It has a botanical garden and has been declared a sanctuary.')
        convo.say('The purpose of your life will be fullfilled only if you step into this Park. So please plan accordingly')
         convo.ask({
            'attachment': {
                'type': 'template',
                'payload': {
                    'template_type': 'generic',
                    'elements': [
                       {
                            'title': 'Konark Sun Temple',
                            'image_url': 'https://upload.wikimedia.org/wikipedia/commons/a/a1/Konark_sun_temple_from_the_front.jpg',
                            'subtitle': 'The temple is UNESCO World Heritage Site.',
                             "buttons":[
                                        {
                                            "type":"web_url",
                                            "url":"https://en.wikipedia.org/wiki/Konark_Sun_Temple",
                                            "title":"View More Details... "
                                        },
                             ]
                        }
                    ]
                }
                    
            }
        });
        tourist_callback_menu(convo)
    });
});
// ========================================================================================================

// ============================ Main Menu  1. local attractions 1.3. Tourist Spots 1.3.2.Lingaraja Temple 
controller.hears(['^lingaraja$'], 'message_received,facebook_postback', function (bot, message) {
    bot.startConversation(message, function (err, convo) {
        convo.say('Dont miss the Lingaraja Temple - Amazing architecture')
        convo.say('Its the most prominant mark of the city. Do take selfies and post it on Whatsapp.')
        convo.say('Else you will not be considered Human anymore ')
         convo.ask({
            'attachment': {
                'type': 'template',
                'payload': {
                    'template_type': 'generic',
                    'elements': [
                        {
                            'title': 'Lingaraja temple',
                            'image_url': 'https://bhubabot.blob.core.windows.net/images/bhubaneshwar_1.png',
                            'subtitle': 'Temple is the most prominent mark of the city.Is the largest temple i the city..',
                            "buttons":[
                                        {
                                            "type":"web_url",
                                            "url":"https://en.wikipedia.org/wiki/Lingaraja_Temple",
                                            "title":"View More Details... "
                                        },
                            ]
                        }
                    ]
                }
                    
            }
        });
        tourist_callback_menu(convo)
    });
});
// ========================================================================================================

//============================ Main Menu  1. local attractions 1.3. Tourist Spots 1.3.3. Udayagiri and Khandagiri caves
controller.hears(['^udaygiri$'], 'message_received,facebook_postback', function (bot, message) {
   bot.startConversation(message, function (err, convo) {
       convo.say('I learnt natural caves were created without hand or shaping tools.')
       convo.say('Many Saintly embodiments takes shelter here to realize true nature with the undeterred self. ')
        convo.say('Even your earthly being Alibaba prospered by snooping into the cave with magical word where the treasures robbed by folly Thieves were stored.')      
         convo.say('You can also snoop out a secret code and in Udayagiri and Khandhagiri caves and share it to me..')      
         convo.say('Not to forget, this is a mind boggling place. It is an archeological gem. ')        
         convo.say('Its partly natural and partly artificial ')     
         convo.say('Hmmm, should I say "Hybrid" so that you Techie creatures understand better :) Well go see it to figure it yourself')        
          convo.ask({       
            'attachment': {     
                 'type': 'template',        
                 'payload': {       
                     'template_type': 'generic',        
                     'elements': [      
                         {      
                             'title': 'Udayagiri and Khandagiri caves',     
                             'image_url': 'https://bhubabot.blob.core.windows.net/images/udayagiri_1.png',      
                             'subtitle': 'Theses caves are partly natural and partly artificial caves of archaeological, historical and religious importance.. ',       
                              "buttons":[       
                                         {      
                                             "type":"web_url",      
                                             "url":"https://en.wikipedia.org/wiki/Udayagiri_and_Khandagiri_Caves",      
                                             "title":"View More Details... "        
                                         },     
                              ]     
                         }      
                     ]      
                 }      
                            
             }      
         });  
         tourist_callback_menu(convo)      
     });        
});        
// =========================================================================================================

// ====================================== Main Menu  2.Accomodations =======================================
controller.hears(['^accomodations$','^stay$','^rooms$','^room details$','^acomodation$','^accommodation$'], 'message_received,facebook_postback', function (bot, message) {
    bot.startConversation(message, function (err, convo) {
    convo.say('The Mayfair hotel is a 5 Star Delux hotel. It offers world class facilities. ');
        convo.say('And by the way, did you know, it has a well-equipped gymnasium and a lovely pool? ');
        convo.say('Oh yeah, forgot to mention, it is very vibrant at night :)  ');
        convo.say('It is so vibrant that I could spot this hotel from Planet Mars! ');
        convo.say('But trust me, it’s a great place');
        convo.say('Just Check this : http://www.mayfairhotels.com/ for more details');
        convo.say('Let me take you to the Gallery');
        convo.ask({
                        attachment: {
                            'type': 'template',
                            'payload': {
                                'template_type': 'generic',
                                'elements': [
                                    {
                                        'title': 'Aerial View of Cottages with Lagoon',
                                        'image_url': 'https://bhubabot.blob.core.windows.net/images/hotel_1.png'
                                    },{
                                        "title": "Evening View of Lagoon",
                                        "image_url": "https://bhubabot.blob.core.windows.net/images/hotel_2.png"
                                    }, {
                                        "title": "Lobby Mayfair Lagoon",
                                        "image_url": "https://bhubabot.blob.core.windows.net/images/hotel_3.png"
                                    },
                                    {
                                        "title": "Evening View MAYFAIR Lagoon",
                                        "image_url": "https://bhubabot.blob.core.windows.net/images/hotel_4.png"
                                    }
                                ]
                            }
                        }                     
        });
    main_menu(convo);
    });
});
//==========================================================================================================

// ====================================== Main Menu 3. Others===============================================      
 controller.hears(['^others$'], 'message_received,facebook_postback', function(bot, message) {       
     bot.reply(message,'What would you like to know');      
     var  attachment = {        
                 'type': 'template',        
                 'payload': {       
                     'template_type': 'generic',        
                     'elements': [      
                         {      
                             'title': 'Other Details',     
                             'image_url': 'https://bhubabot.blob.core.windows.net/images/travel.jpg',       
                             'buttons': [       
                                 {      
                                    'type': 'postback',     
                                     'title': 'Weather',        
                                     'payload': 'weather'      
                                 },     
                                 {      
                                     'type': 'postback',        
                                    'title': 'Night Life',      
                                     'payload': 'flight_timings'        
                                 },     
                                 {      
                                     'type': 'postback',        
                                     'title': 'Local Travel',      
                                     'payload': 'flight_status'     
                                 }      
                             ]                      
                         }      
                     ]      
                 }      
             } ;        
             bot.reply(message, {       
             attachment: attachment     
             });            
 });  
 // ======================================================================================================= 
// others_callback_menu
function others_callback_menu(convo){
        convo.ask({
          "attachment":{
          "type":"template",
          "payload":{
            "template_type":"button",
            "text":"What do you want to do next?",
            "buttons":[
              {
                "type":"postback",
                "title":"Go Back",
                "payload":"others"
              },{
                "type":"postback",
                "title":"Main Menu",
                "payload":"again_payload"
              }
            ]
          }
        }
    });
}

  // ============================ Main Menu 3. Others 3.1. Weather =========================================     
 controller.hears(['^weather$','^climate$',"^temperature$","^weather condition$"], 'message_received,facebook_postback', function (bot, message) {      
     bot.startConversation(message, function (err, convo) {     
         request('http://apidev.accuweather.com/currentconditions/v1/1-189781_1_AL.json?language=en&apikey=hoArfRosT1215', function (error, response, body) {       
         if (!error && response.statusCode == 200) {        
             var  forecast = JSON.stringify(JSON.parse(body)[0].WeatherText).replace( /"/g, "" );       
             var  temp     = JSON.stringify(JSON.parse(body)[0].Temperature.Metric.Value);      
             var degree    = JSON.stringify(JSON.parse(body)[0].Temperature.Metric.Unit).replace( /"/g, "" );       
             convo.say('Do you know the temperature in Mars? ');        
             convo.say('It is not too bad for human occupation, though a bit unpredictable weather sometimes. Don’t be scared, you are welcome to colonize .');        
            convo.say('We will sure enjoy your company. Btw, the weather in Bhubaneshwar is next to perfect.');         
             convo.say('My Machine Learning Forecasting algorithm says that the temperature is going to hover around  27C - Sunny for all three days.');        
             convo.say('Night seems to be cooler at <20*>, and with cool breeze smearing aside, sets out to be perfect weather for a cozy walk.');      
             convo.say('So yeah, its not even next to perfect. Its perfect weather condition')      
         }      
         });  
        others_callback_menu(convo);      
      });       
 });        
 // =========================================================================================================    
 // ===============================TRIAL=====================================================================       
        
 controller.hears(['quick'], 'message_received', function(bot, message) {       
     bot.startConversation(message, function (err, convo) {     
     bot.reply(message, {       
         text: 'Hey! This message has some quick replies attached.',        
         quick_replies: [       
             {      
                 "content_type": "text",        
                 "title": "Yes",        
                 "payload": "who",      
             },     
             {      
                 "content_type": "text",        
                 "title": "No",     
                 "payload": "no",       
             },          {      
                 "content_type": "text",        
                 "title": "True",       
                 "payload": "yes",      
             },     
             {      
                 "content_type": "text",        
                 "title": "False",      
                 "payload": "no",       
             }      
         ]      
     });        
   });      
 });        
        
// ==== general =====
controller.hears(['^who are you$',"^tell me about yourself$","^what do you know$","^why are you created$","^what are you doing$"],'message_received,facebook_postback', function(bot, message) {        
     bot.startConversation(message, function(err, convo) {
     convo.say('I am BhubaBot.');       
     convo.say('I am here');
     convo.say('You know why?');
     convo.say('To give you Geeks some valuable info ☺ and also, to savor the lovely Bhubaneshwar delicacies- Especially the Rosgollas.');
     });
 });        
        
controller.hears(["^who created you$","^who is your father$"],'message_received,facebook_postback', function(bot, message) {        
    bot.startConversation(message, function(err, convo) {
     convo.say('I have been created by');       
     convo.say('Pandu Balraj');
     convo.say('Neetu Mishra');
    });
});        

controller.hears(["^what do you know about me$","^do you know me$"],'message_received,facebook_postback', function(bot, message) {      
    bot.reply(message, "Right now I am learning about you!!!");
});

controller.hears(["^what else$","^what else do you know$"],'message_received,facebook_postback', function(bot, message) {       
    bot.reply(message, "I hope you might be looking among these");
    bot.startConversation(message, function(err, convo) {
             main_menu(convo);
         });
});
 // ===============================TRIAL===========================================================================       
        
        
 // Default error message       
 controller.on('message_received,facebook_postback', function(bot, message) {       
     bot.reply(message, 'I am not sure what you are looking for. May be you can choose one of these');
         bot.startConversation(message, function(err, convo) {
             main_menu(convo);
         });
     return false;      
 });        
 

