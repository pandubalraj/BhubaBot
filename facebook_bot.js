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
controller.api.thread_settings.menu([{
        "type": "postback",
        "title": "Local Attractions",
        "payload": "local attractions"
    },
    {
        "type": "postback",
        "title": "Accomodation",
        "payload": "accomodation"
    },
    {
        "type": "postback",
        "title": "Others",
        "payload": "others"
    },
]);


// utterance declaration
var Utterances = {
    yes: new RegExp(/^(yes|yea|yup|yep|ya|sure|ok|y|yeah|yah|sounds good)/i),
    no: new RegExp(/^(no|nah|nope|n|never|not a chance)/i),
    quit: new RegExp(/^(quit|cancel|end|stop|nevermind|never mind)/i),
    greetings: new RegExp(/^(hi|hello|greetings|hi there|yo|was up|whats up)/)
};


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
                'elements': [{
                    'title': 'Bhubaneshwar-"City of Temples"',
                    'image_url': 'http://www.indianetzone.com/photos_gallery/84/2_Mukteswara_Temple_4.jpg',
                    'subtitle': '',
                    'buttons': [{
                            'type': 'postback',
                            'title': 'Local Attractions',
                            'payload': 'local attractions'
                        },
                        {
                            'type': 'postback',
                            'title': 'Accomodation',
                            'payload': 'accomodation'
                        },
                        {
                            'type': 'postback',
                            'title': 'Others',
                            'payload': 'others'
                        }
                    ]
                }]
            }
        }
    }, function (response, convo) {
        // whoa, I got the postback payload as a response to my convo.ask!
        convo.next();
    });
};

function main_menuagain(convo) {
    convo.ask({
        attachment: {
            'type': 'template',
            'payload': {
                'template_type': 'generic',
                'elements': [{
                    'title': 'Bhubaneshwar-"City of Temples"',
                    'image_url': 'http://www.indianetzone.com/photos_gallery/84/2_Mukteswara_Temple_4.jpg',
                    'subtitle': '',
                    'buttons': [{
                            'type': 'postback',
                            'title': 'Local Attractions',
                            'payload': 'local attractions'
                        },
                        {
                            'type': 'postback',
                            'title': 'Accomodation',
                            'payload': 'accomodation'
                        },
                        {
                            'type': 'postback',
                            'title': 'Others',
                            'payload': 'others'
                        }
                    ]
                }]
            }
        }
    }, function (response, convo) {
        // whoa, I got the postback payload as a response to my convo.ask!
        convo.next();
    });
};


// ================== starting with hi and start_payload=====================================================================
var welcome_message = ['^hi$', '^start_payload$', '^hello$', '^start$', '^hey$', '^whatsup$', '^howsu$'];

controller.hears(welcome_message, 'message_received,facebook_postback', function (bot, message) {
    bot.startConversation(message, function (err, convo) {
        convo.say('Hi Geek, I am Bhuba-Bot. Nice to meet you ☺ ');
        convo.say('Namascara and Swaagta to my city Bhubaneshwar');
        convo.say('This is how we say hello and welcome in oriya.........language we speak here!! ☺');
        convo.ask({
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "button",
                    "text": "Are you gonna be bhubaneshwar First time???",
                    "buttons": [{
                        "type": "postback",
                        "title": "yeah",
                        "payload": "first"
                    }, {
                        "type": "postback",
                        "title": "No",
                        "payload": "not first"
                    }]
                }
            }
        });
        
    });
});
// ========================= Hi,start_payload ENDS ============================================================================

// ========================= option after introduction ========================================================================
function initialconvo(convo) {
     convo.say('This is a lovely place having a lot of history behind it. Food is awesome and a fantastic weather in April');
     convo.say('It has a great eateries wherein you could savor the original tastes of Odisha');
     convo.ask({
            attachment: {
                'type': 'template',
                'payload': {
                    'template_type': 'generic',
                    'elements': [{
                            'title': 'Rasagolas',
                            'image_url': 'https://bhubabot.blob.core.windows.net/images/Rasagolas.png'
                        }, {
                            "title": "Mishti Doi",
                            "image_url": "https://bhubabot.blob.core.windows.net/images/Mishti_Doi.png"
                        }, {
                            "title": "Arisa Sweet",
                            "image_url": "https://bhubabot.blob.core.windows.net/images/Arisa_Pitha.png"
                        },
                        {
                            "title": "Modaka",
                            "image_url": "https://bhubabot.blob.core.windows.net/images/Modaka.png"
                        }
                    ]
                }
            }
    });     
    convo.say('And don’t forget about shopping. You can get local styles of Sarees (The Indian Wrap Around) and Dhotis.');
     convo.ask({
            attachment: {
                'type': 'template',
                'payload': {
                    'template_type': 'generic',
                    'elements': [{
                            'title': 'Tussar Silk Sarees',
                            'image_url': 'https://bhubabot.blob.core.windows.net/images/Tussar_Silk_Sarees.png'
                        }, {
                            "title": "Paithni Sarees",
                            "image_url": "https://bhubabot.blob.core.windows.net/images/Paithani_Sarees.png"
                        }, {
                            "title": "Sambalpuri Silk Saree",
                            "image_url": "https://bhubabot.blob.core.windows.net/images/Sambalpuri_Saree.png"
                        },
                        {
                            "title": "Pochampally Ikat Saree",
                            "image_url": "https://bhubabot.blob.core.windows.net/images/Pochampally_Ikat_Saree.png"
                        }
                    ]
                }
            }
    });
    main_menu(convo);
};
controller.hears(["first"], 'message_received,facebook_postback', function (bot, message) {
    bot.startConversation(message, function (err, convo) {
        convo.say('No worries,I can introduce you the City');
        initialconvo(convo);
    });
});

controller.hears(["not first"], 'message_received,facebook_postback', function (bot, message) {
    bot.startConversation(message, function (err, convo) {
        convo.say('Oh great then its going to be more friendly.. ');
        convo.say('Still i can assist you for few things');
        initialconvo(convo);
    });
});
// ========================= option after introduction ENDS ===================================================================

// ================================= again_payload for ========================================================================
var again_payload = ["again_payload", "^main menu$", "^index$", "^menu$", "^content$"];
// again_payload on go back menu option
controller.hears(again_payload, 'message_received,facebook_postback', function (bot, message) {
    bot.startConversation(message, function (err, convo) {
        main_menu(convo);
    });
});
// ================================== again_payload ENDS =======================================================================

// ============================= Attractions_callback_menu ========================================================================
function attractions_callback_menu(convo) {
    convo.ask({
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "button",
                "text": "What do you want to do next?",
                "buttons": [{
                    "type": "postback",
                    "title": "Go Back",
                    "payload": "local attractions again"
                }, {
                    "type": "postback",
                    "title": "Main Menu",
                    "payload": "again_payload"
                }]
            }
        }
    });
};
function attractions_shopping_callback_menu(convo) {
    convo.ask({
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "button",
                "text": "What do you want to do next?",
                "buttons": [{
                    "type": "postback",
                    "title": "Go Back",
                    "payload": "shopping again"
                }, {
                    "type": "postback",
                    "title": "Main Menu",
                    "payload": "again_payload"
                }]
            }
        }
    });
};
// ============================= Attractions_callback_menu ENDS ===================================================================

// ====================================== Main Menu  1. local attractions==========================================================
var event = ['^local attractions$', '^Attractions$']
controller.hears(event, 'message_received,facebook_postback', function (bot, message) {
    bot.startConversation(message, function (err, convo) {
        convo.say('By the way do you know something about Bhubaneshwar!!');
        convo.say('It was ancient temple of Kalinga and Dhauli where the famous battle was fought between Emperor Ashoka and the Kalinga army');
        convo.say('So yeah, what is it you would like to know about?');
        convo.ask({
            attachment: {
                'type': 'template',
                'payload': {
                    'template_type': 'generic',
                    'elements': [{
                        'title': 'Local Attractions in Bhubaneshwar',
                        'image_url': 'https://bhubabot.blob.core.windows.net/images/Local_attractions.png',
                        'subtitle': '',
                        'buttons': [{
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
                    }]
                }
            }
        });
    });
});
controller.hears(['^local attractions again$'], 'message_received,facebook_postback', function (bot, message) {
    bot.startConversation(message, function (err, convo) {
        convo.ask({
            attachment: {
                'type': 'template',
                'payload': {
                    'template_type': 'generic',
                    'elements': [{
                        'title': 'Local Attractions in Bhubaneshwar',
                        'image_url': 'https://bhubabot.blob.core.windows.net/images/Local_attractions.png',
                        'subtitle': '',
                        'buttons': [{
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
                    }]
                }
            }
        });
    });
});
// =====================================Main Menu  1. local attractions ENDS =====================================================

// ============================== Main Menu  1. local attractions 1.1. Shopping ===================================================
controller.hears(['^shopping$', '^shopes$'], 'message_received,facebook_postback', function (bot, message) {
    bot.startConversation(message, function (err, convo) {
        convo.say('I can help you with shopping all the time............');
        convo.say('For those who are fond of traditional fabrics......then this is the place to shop');
        convo.say('The city is well known for Ikat fabrics.I have few pics for you of the fabric.');
        convo.ask({
            'attachment': {
                'type': 'template',
                'payload': {
                    'template_type': 'generic',
                    'elements': [{
                        'title': 'Ikat Fabrics',
                        'image_url': 'https://bhubabot.blob.core.windows.net/images/Ikat_Cloth.png',
                        "buttons": [{
                            "type": "web_url",
                            "url": "https://en.wikipedia.org/wiki/Ikat",
                            "title": "Click here to know more of the IKAT...... "
                        }]
                    }]
                }
            }
        });
        convo.say('Other best buys include Tussar Silk,Sambalpuri Silk and Cotton ');
        convo.say('Apart from fabric different kind of metal sculptures known as Dhokra is famous');
        convo.ask({
            "attachment": {
                "type": "image",
                "payload": {
                    "url": "http://www.indianetzone.com/photos_gallery/100/2_Dhokra_Art___Crafts.jpg"
                }
            }
        });
        convo.say('I can guide from where to shop these things.')
        convo.ask({
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "button",
                    "text": "What do you want to buy???",
                    "buttons": [{
                        "type": "postback",
                        "title": "Saree & Fabrics",
                        "payload": "saree"
                    }, {
                        "type": "postback",
                        "title": "Metal Sculptures",
                        "payload": "metal"
                    }]
                }
            }
        });
    });
});
controller.hears(['^shopping again$'], 'message_received,facebook_postback', function (bot, message) {
    bot.startConversation(message, function (err, convo) {
        convo.ask({
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "button",
                    "text": "What do you want to buy???",
                    "buttons": [{
                        "type": "postback",
                        "title": "Saree & Fabrics",
                        "payload": "saree"
                    }, {
                        "type": "postback",
                        "title": "Metal Sculptures",
                        "payload": "metal"
                    }]
                }
            }
        });
     attractions_callback_menu(convo) 
    });
});
//================================ Main Menu  1. local attractions 1.1. Shopping  ENDS =======================================

//================================ Main Menu  1. local attractions 1.1. Shopping 1.1.1 Saree =======================================
 controller.hears(['^saree$'], 'message_received,facebook_postback', function (bot, message) {
   bot.startConversation(message, function (err, convo) {
        convo.say('To buy silk and cotton textiles, head out to shops like Mahalakshmi Textiles that is stocked with interesting apparels');
        convo.say('It is less than a Km from Trident Hotel');
        convo.say('and just 6.4 Km away from Mayfair Lagoon Hotel');
        attractions_shopping_callback_menu(convo)
 });
});
//================================ Main Menu  1. local attractions 1.1. Shopping 1.1.1 Saree ENDS ==================================

//================================ Main Menu  1. local attractions 1.1. Shopping 1.1.1 Metal =======================================
controller.hears(['^metal$'], 'message_received,facebook_postback', function (bot, message) {
    bot.startConversation(message, function (err, convo) {
        convo.say('Utkalika is one stop for buying Orissa handicrafts');
        convo.say('It is just 10 Km away from Trident Hotel');
        convo.say('and just 4.6 Km away from Mayfair Lagoon Hotel');
        convo.say('Orissa Art And Craft is another place to browse through the collection of metallic works that are locally known as Tarakashi');
        convo.say('This is just a Km away from trident Hotel');
        convo.say('Around 7.4 km from Mayfair lagoon Hotel');
        attractions_shopping_callback_menu(convo)
 });
});
//================================ Main Menu  1. local attractions 1.1. Shopping 1.1.1 Metal ENDS ==================================

// ============================ Main Menu  1. local attractions 1.2. Food =====================================================     

controller.hears(['^food$', "^trending foods$", "^dishes$", "^dish$", "^food$"], 'message_received,facebook_postback', function (bot, message) {
    bot.startConversation(message, function (err, convo) {
        convo.say('Bhubaneshwar has the traditional Odisha delicacies as a major tourism center in India');
        convo.say('Panchana Phutana special mixture used in most of dishes,Typically Odisha Meal tastes awsome too. ');
        convo.ask({
            "attachment": {
                "type": "image",
                "payload": {
                    "url": "https://s3-eu-west-1.amazonaws.com/sosnewbucketforlive/blog_img/strand_of_silk_-_journey_map_-_exploring_the_cuisine_of_odisha_-_lunch_thali.jpg"
                }
            }
        });
        convo.say('Did you know how to calculate the Volume of a Sphere? Well it is (Pie * Radius /3). ')
        convo.say('Yeah, you will see a lot of white spheres in Bhubaneshwar dipped in sugary syrup. ')
        convo.say('When you see \'em dont sit and calculate the volume. Also, you are welcome to invoke selective amnesia about your weight or what the Blood Sugar reading says. ')
        convo.say('Just Pick-it and Gobble it.Thats it… ')
        convo.say('These white spheres soaked with ambrosia take you directly to a place called Heaven. It is unbelievable. ')
        convo.say('You cannot forget Rasgolla,Chamcham..');
        attractions_callback_menu(convo);
    });
});
// ================================== Main Menu  1. local attractions 1.2. Food  ENDS =========================================

// =================================== tourists spots menu callback ============================================================
function tourist_callback_menu(convo) {
    convo.ask({
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "button",
                "text": "What do you want to do next?",
                "buttons": [{
                    "type": "postback",
                    "title": "Go Back",
                    "payload": "tourist spots again"
                }, {
                    "type": "postback",
                    "title": "Main Menu",
                    "payload": "again_payload"
                }]
            }
        }
    });
}
//================================== tourists spots menu callback  ENDS ========================================================

//  ============================ Main Menu  1. local attractions 1.3. Tourist Spots ============================================
var attraction = ['^tourist spots$', "^sight seeing$", "^tourist$", "^place to visit$", "^place to travel$", "^refreshment$", "^place to see$"];

controller.hears(attraction, 'message_received,facebook_postback', function (bot, message) {
    bot.startConversation(message, function (err, convo) {
        convo.say('I am still awestruck at the marvelous creations in this part of the Universe.')
        convo.ask({
            'attachment': {
                'type': 'template',
                'payload': {
                    'template_type': 'generic',
                    'elements': [{
                        'title': 'Tourist Spots',
                        'image_url': 'https://bhubabot.blob.core.windows.net/images/MondayFalls2.png',
                        "buttons": [{
                                "type": "postback",
                                "title": "Konark Sun Temple",
                                "payload": "konark"
                            }, {
                                "type": "postback",
                                "title": "Lingaraja temple",
                                "payload": "lingaraja"
                            },
                            {
                                "type": "postback",
                                "title": "Udaygiri And Khandagiri caves",
                                "payload": "udaygiri"
                            }
                        ]
                    }]
                }
            }
        });
    });
});
controller.hears(['^tourist spots again$'], 'message_received,facebook_postback', function (bot, message) {
    bot.startConversation(message, function (err, convo) {
        convo.ask({
            'attachment': {
                'type': 'template',
                'payload': {
                    'template_type': 'generic',
                    'elements': [{
                        'title': 'Tourist Spots',
                        'image_url': 'https://bhubabot.blob.core.windows.net/images/MondayFalls2.png',
                        "buttons": [{
                                "type": "postback",
                                "title": "Konark Sun Temple",
                                "payload": "konark"
                            }, {
                                "type": "postback",
                                "title": "Lingaraja temple",
                                "payload": "lingaraja"
                            },
                            {
                                "type": "postback",
                                "title": "Udaygiri And Khandagiri caves",
                                "payload": "udaygiri"
                            }
                        ]
                    }]
                }
            }
        });
    attractions_callback_menu(convo);
    });
});
// ============================= Main Menu  1. local attractions 1.3. Tourist Spots  ENDS =========================================

// ============================ Main Menu  1. local attractions 1.3. Tourist Spots 1.3.1. Kunark Sun Temple ====================
controller.hears(['^konark$'], 'message_received,facebook_postback', function (bot, message) {
    bot.startConversation(message, function (err, convo) {
        convo.say('Konark Sun Temple was built in the 13th Century and is among the Seven Wonders of India. It’s also a UNESCO World Heritage Site. ')
        convo.say('Did you know an interesting fact? The wheels of the temple are sundials which can be used to calculate time accurately to a minute including day and night!!!')
        convo.say('😲');
        convo.ask({
            'attachment': {
                'type': 'template',
                'payload': {
                    'template_type': 'generic',
                    'elements': [{
                        'title': 'Konark Sun Temple',
                        'image_url': 'https://upload.wikimedia.org/wikipedia/commons/a/a1/Konark_sun_temple_from_the_front.jpg',
                        'subtitle': 'The temple is UNESCO World Heritage Site.',
                        "buttons": [{
                            "type": "web_url",
                            "url": "https://en.wikipedia.org/wiki/Konark_Sun_Temple",
                            "title": "View More Details... "
                        }, ]
                    }]
                }

            }
        });
        convo.ask({
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "button",
                    "text": "Do want know its location on google map???",
                    "buttons": [{
                        "type": "postback",
                        "title": "yeah",
                        "payload": "klocation"
                    }, {
                        "type": "postback",
                        "title": "No",
                        "payload": "noklocation"
                    }]
                }
            }
        });
    });
});
// ============================ Main Menu  1. local attractions 1.3. Tourist Spots 1.3.1. Kunark Sun Temple ENDS ==================

// ============================ Main Menu  1. local attractions 1.3. Tourist Spots 1.3.1. Kunark Sun Temple--location ==================
controller.hears(['^klocation$'], 'message_received,facebook_postback', function (bot, message) {
    bot.startConversation(message, function (err, convo) {
         convo.ask({
            'attachment': {
                'type': 'template',
                'payload': {
                    'template_type': 'generic',
                    'elements': [{
                        'title': 'Konark Sun Temple Map',
                        'image_url': 'https://maps.googleapis.com/maps/api/staticmap?center=konark+sun+temple&zoom=12&scale=false&size=600x300&maptype=roadmap&format=png&visual_refresh=true&markers=size:small%7Ccolor:0xff0000%7Clabel:1%7Ckonark+sun+temple&markers=size:mid%7Ccolor:0xff0000%7Clabel:1%7Ckonark+sun+temple',
                        "buttons": [{
                            "type": "web_url",
                            "url": "https://www.google.co.in/maps/place/Konark+Sun+Temple/@19.8876003,86.0923477,17z/data=!3m1!4b1!4m5!3m4!1s0x3a19f2a097819bbf:0xed9983ca391e3247!8m2!3d19.8875953!4d86.0945364?hl=en (https://www.google.co.in/maps/place/Konark+Sun+Temple/@19.8876003,86.0923477,17z/data=%213m1%214b1%214m5%213m4%211s0x3a19f2a097819bbf:0xed9983ca391e3247%218m2%213d19.8875953%214d86.0945364?hl=en)",
                            "title": "Click here to view it on google maps.. "
                        } ]
                    }]
                }

            }
        });
        tourist_callback_menu(convo)
    });
}); 
controller.hears(['^noklocation$'], 'message_received,facebook_postback', function (bot, message) {
    bot.startConversation(message, function (err, convo) {
        tourist_callback_menu(convo)
    });
}); 
// ============================ Main Menu  1. local attractions 1.3. Tourist Spots 1.3.1. Kunark Sun Temple--location ENDS ==================

// ============================ Main Menu  1. local attractions 1.3. Tourist Spots 1.3.2.Lingaraja Temple =========================
controller.hears(['^lingaraja$'], 'message_received,facebook_postback', function (bot, message) {
    bot.startConversation(message, function (err, convo) {
        convo.say('Dont miss the Lingaraja Temple - Amazing architecture')
        convo.say('This is a great place to visit as well. It represents the quintessence of the Kalinga Architecture and is the most prominent mark of the city. ')
        convo.ask({
            'attachment': {
                'type': 'template',
                'payload': {
                    'template_type': 'generic',
                    'elements': [{
                        'title': 'Lingaraja temple',
                        'image_url': 'https://bhubabot.blob.core.windows.net/images/bhubaneshwar_1.png',
                        'subtitle': 'Temple is the most prominent mark of the city.Is the largest temple i the city..',
                        "buttons": [{
                            "type": "web_url",
                            "url": "https://en.wikipedia.org/wiki/Lingaraja_Temple",
                            "title": "View More Details... "
                        }, ]
                    }]
                }

            }
        });
         convo.ask({
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "button",
                    "text": "Do want know its location on google map???",
                    "buttons": [{
                        "type": "postback",
                        "title": "yeah",
                        "payload": "llocation"
                    }, {
                        "type": "postback",
                        "title": "No",
                        "payload": "nollocation"
                    }]
                }
            }
        });
    });
});
// ===========================  Main Menu  1. local attractions 1.3. Tourist Spots 1.3.2.Lingaraja Temple ENDS =================

// ============================ Main Menu  1. local attractions 1.3. Tourist Spots 1.3.2.Lingaraja Templelocation ==================
controller.hears(['^llocation$'], 'message_received,facebook_postback', function (bot, message) {
    bot.startConversation(message, function (err, convo) {
    convo.ask({
            'attachment': {
                'type': 'template',
                'payload': {
                    'template_type': 'generic',
                    'elements': [{
                        'title': 'Lingaraja temple',
                        'image_url': 'https://maps.googleapis.com/maps/api/staticmap?center=lingaraja+temple&zoom=15&scale=false&size=600x300&maptype=roadmap&format=png&visual_refresh=true&markers=size:small%7Ccolor:0xff0000%7Clabel:1%7Ckonark+sun+temple&markers=size:mid%7Ccolor:0xff0000%7Clabel:1%7Ckonark+sun+temple&markers=size:mid%7Ccolor:0xff0000%7Clabel:1%7Clingaraja+temple',
                        "buttons": [{
                            "type": "web_url",
                            "url": "https://www.google.co.in/maps/place/Lingaraj+Temple/@20.2382433,85.8315622,17z/data=!3m1!4b1!4m5!3m4!1s0x3a19a726c8ffc807:0x212845f89456a2cd!8m2!3d20.2382383!4d85.8337509?hl=en (https://www.google.co.in/maps/place/Lingaraj+Temple/@20.2382433,85.8315622,17z/data=%213m1%214b1%214m5%213m4%211s0x3a19a726c8ffc807:0x212845f89456a2cd%218m2%213d20.2382383%214d85.8337509?hl=en)",
                            "title": "Click here to view.. "
                        }, ]
                    }]
                }

            }
        });
        tourist_callback_menu(convo)
    });
}); 
controller.hears(['^nollocation$'], 'message_received,facebook_postback', function (bot, message) {
    bot.startConversation(message, function (err, convo) {
        tourist_callback_menu(convo)
    });
}); 
// ============================ Main Menu  1. local attractions 1.3. Tourist Spots 1.3.2.Lingaraja Temple--location ENDS ==================

//============================ Main Menu  1. local attractions 1.3. Tourist Spots 1.3.3. Udayagiri and Khandagiri caves====
controller.hears(['^udaygiri$'], 'message_received,facebook_postback', function (bot, message) {
    bot.startConversation(message, function (err, convo) {
        convo.say('I learnt natural caves were created without hand or shaping tools.')
        convo.say('Many Saintly embodiments takes shelter here to realize true nature with the undeterred self. ')
        convo.say('These caves are partly natural and party artificial and were believed to be carved out as residential blocks for Jain monks in 2nd Century BC');
        convo.ask({
            'attachment': {
                'type': 'template',
                'payload': {
                    'template_type': 'generic',
                    'elements': [{
                        'title': 'Udayagiri and Khandagiri caves',
                        'image_url': 'https://bhubabot.blob.core.windows.net/images/udayagiri_1.png',
                        'subtitle': 'Theses caves are partly natural and partly artificial caves of archaeological, historical and religious importance.. ',
                        "buttons": [{
                            "type": "web_url",
                            "url": "https://en.wikipedia.org/wiki/Udayagiri_and_Khandagiri_Caves",
                            "title": "View More Details... "
                        }, ]
                    }]
                }

            }
        });
        convo.ask({
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "button",
                    "text": "Do want know its location on google map???",
                    "buttons": [{
                        "type": "postback",
                        "title": "yeah",
                        "payload": "ulocation"
                    }, {
                        "type": "postback",
                        "title": "No",
                        "payload": "noulocation"
                    }]
                }
            }
        });
    });
});
// =========================== Main Menu  1. local attractions 1.3. Tourist Spots 1.3.3. Udayagiri and Khandagiri caves ENDS =======

// ============================ Main Menu  1. local attractions 1.3. Tourist Spots 1.3.3. Udayagiri and Khandagiri caves--location ==================
controller.hears(['^ulocation$'], 'message_received,facebook_postback', function (bot, message) {
    bot.startConversation(message, function (err, convo) {
     convo.ask({
            'attachment': {
                'type': 'template',
                'payload': {
                    'template_type': 'generic',
                    'elements': [{
                        'title': 'Udayagiri and Khandagiri caves',
                        'image_url': 'https://maps.googleapis.com/maps/api/staticmap?center=udaygiri+and+khandigiri&zoom=13&scale=false&size=600x300&maptype=roadmap&format=png&visual_refresh=true&markers=size:small%7Ccolor:0xff0000%7Clabel:1%7Ckonark+sun+temple&markers=size:mid%7Ccolor:0xff0000%7Clabel:1%7Ckonark+sun+temple&markers=size:mid%7Ccolor:0xff0000%7Clabel:1%7Clingaraja+temple&markers=size:mid%7Ccolor:0xff0000%7Clabel:1%7Cudaygiri+and+khandigiri&markers=size:small%7Ccolor:0xff0000%7Clabel:1%7Cudaygiri+and+khandigiri&markers=size:mid%7Ccolor:0xff0000%7Clabel:1%7Cudaygiri+and+khandigiri',
                        "buttons": [{
                            "type": "web_url",
                            "url": "https://www.google.co.in/maps/place/Udayagiri+Jain+Caves/@20.2631202,85.7835363,17z/data=!3m1!4b1!4m5!3m4!1s0x3a19a7ec9910c597:0xc1d179a6679058f3!8m2!3d20.2631152!4d85.785725?hl=en",
                            "title": "Click here to view it on google maps.. "
                        }, ]
                    }]
                }
            }
        });
        tourist_callback_menu(convo)
    });
}); 
controller.hears(['^noulocation$'], 'message_received,facebook_postback', function (bot, message) {
    bot.startConversation(message, function (err, convo) {
        tourist_callback_menu(convo)
    });
}); 
// ============================ Main Menu  1. local attractions 1.3. Tourist Spots 1.3.3. Udayagiri and Khandagiri caves--location ENDS ==================

// ====================================== Main Menu  2.Accomodation ===============================================================
controller.hears(['^accomodation$', '^stay$', '^rooms$', '^room details$', '^acomodation$', '^accommodation$'], 'message_received,facebook_postback', function (bot, message) {
    bot.startConversation(message, function (err, convo) {
        convo.ask({
            attachment: {
                'type': 'template',
                'payload': {
                    'template_type': 'generic',
                    'elements': [{
                        'title': 'Accomodation Hotels',
                        'image_url': 'http://farm6.staticflickr.com/5297/5493666299_782b25d2f7_z.jpg',
                        'subtitle': '',
                        "buttons": [{
                           'type': 'postback',
                            'title': 'Trident Hotel',
                            'payload': 'trident'
                        },{
                            'type': 'postback',
                            'title': 'Mayfair Hotel',
                            'payload': 'mayfair'
                        }
                         ]
                    }]
                }
            }
        });
    });
});
//==================================== Main Menu  2.Accomodations ENDS =====================================
function accomodation_callback_menu(convo) {
    convo.ask({
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "button",
                "text": "What do you want to do next?",
                "buttons": [{
                    "type": "postback",
                    "title": "Go Back",
                    "payload": "accomodation"
                }, {
                    "type": "postback",
                    "title": "Main Menu",
                    "payload": "again_payload"
                }]
            }
        }
    });
}
// ====================================== Main Menu  2.Accomodations 2.1. Trident Hotel ===============================================================
controller.hears(['^trident$'], 'message_received,facebook_postback', function (bot, message) {
    bot.startConversation(message, function (err, convo) {
        convo.say('A true 5 star with the attention to the detail, elegant service and absolutely stunning cuisine');
        convo.say('Trident Bhubaneswar is a 15-minute drive from Bhubaneswar Airport. Bhubaneswar Railway Station is 6 km away');
        convo.say('Let me take you to the Gallery');
        convo.ask({
            attachment: {
                'type': 'template',
                'payload': {
                    'template_type': 'generic',
                    'elements': [{
                            'title': 'Around View of Trident Hotel',
                            'image_url': 'https://bhubabot.blob.core.windows.net/images/trident_1.png'
                        }, {
                            "title": "Delux Rooms",
                            "image_url": "https://bhubabot.blob.core.windows.net/images/trident_2.png"
                        }, {
                            "title": "Spacious Dinning Hall",
                            "image_url": "https://bhubabot.blob.core.windows.net/images/trident_3.png"
                        },
                        {
                            "title": "Amazing & Beautiful Living Hall",
                            "image_url": "https://bhubabot.blob.core.windows.net/images/trident_5.png"
                        }
                    ]
                }
            }
        });
       accomodation_callback_menu(convo)
    });
});
//==================================== Main Menu  2.Accomodations 2.1. Trident Hotel ENDS =====================================
// ====================================== Main Menu  2.Accomodations 2.2.Mayfair ===============================================================
controller.hears(['^mayfair$'], 'message_received,facebook_postback', function (bot, message) {
    bot.startConversation(message, function (err, convo) {
        convo.say('The Mayfair hotel is a 5 Star Delux hotel. It offers world class facilities. ');
        convo.say('And by the way, did you know, it has a well-equipped gymnasium and a lovely pool? ');
        convo.say('Oh yeah, forgot to mention, it is very vibrant at night :)  ');
        convo.say('Just Check this : http://www.mayfairhotels.com/ for more details');
        convo.say('Let me take you to the Gallery 😎');
        convo.ask({
            attachment: {
                'type': 'template',
                'payload': {
                    'template_type': 'generic',
                    'elements': [{
                            'title': 'Aerial View of Cottages with Lagoon',
                            'image_url': 'https://bhubabot.blob.core.windows.net/images/hotel_1.png'
                        }, {
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
       accomodation_callback_menu(convo)
    });
});
//==================================== Main Menu  2.Accomodations  2.2.Mayfair ENDS =====================================


// ====================================== Main Menu 3. Others ===============================================      
controller.hears(['^others$'], 'message_received,facebook_postback', function (bot, message) {
    bot.reply(message, 'What would you like to know');
    var attachment = {
        'type': 'template',
        'payload': {
            'template_type': 'generic',
            'elements': [{
                'title': 'Other Details',
                'image_url': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Malatipatpur_Bus_Stand.jpg/400px-Malatipatpur_Bus_Stand.jpg',
                'buttons': [{
                        'type': 'postback',
                        'title': 'Weather',
                        'payload': 'climate'
                    },
                    {
                        'type': 'postback',
                        'title': 'Night Life',
                        'payload': 'night'
                    },
                    {
                        'type': 'postback',
                        'title': 'Local Travel',
                        'payload': 'travel'
                    }
                ]
            }]
        }
    };
    bot.reply(message, {
        attachment: attachment
    });
});
controller.hears(['^others again$'], 'message_received,facebook_postback', function (bot, message) {
    bot.startConversation(message, function (err, convo) {
        convo.ask({
         "attachment" : {
            'type': 'template',
            'payload': {
                    'template_type': 'generic',
                    'elements': [{
                        'title': 'Other Details',
                        'image_url': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Malatipatpur_Bus_Stand.jpg/400px-Malatipatpur_Bus_Stand.jpg',
                        'buttons': [{
                                'type': 'postback',
                                'title': 'Weather',
                                'payload': 'climate'
                            },
                            {
                                'type': 'postback',
                                'title': 'Night Life',
                                'payload': 'night'
                            },
                            {
                                'type': 'postback',
                                'title': 'Local Travel',
                                'payload': 'travel'
                            }
                        ]
                    }]
                }
          }
      });
    });
    main_menuagain(convo);
});
// ==================================== Main Menu 3. Others  ENDS ===================================================

// ==================================== others_callback_menu ========================================================
function others_callback_menu(convo) {
    convo.ask({
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "button",
                "text": "What do you want to do next?",
                "buttons": [{
                    "type": "postback",
                    "title": "Go Back",
                    "payload": "others again"
                }, {
                    "type": "postback",
                    "title": "Main Menu",
                    "payload": "again_payload"
                }]
            }
        }
    });
};
// ==================================== others_callback_menu ENDS ========================================================
    
// ============================ Main Menu 3. Others 3.1. Weather =========================================================     
controller.hears(['^climate$', "^temperature$", '^weather$'], 'message_received,facebook_postback', function (bot, message) {
    bot.startConversation(message, function (err, convo) {
        request('http://apidev.accuweather.com/currentconditions/v1/1-189781_1_AL.json?language=en&apikey=hoArfRosT1215', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var forecast = JSON.stringify(JSON.parse(body)[0].WeatherText).replace(/"/g, "");
                var temp = JSON.stringify(JSON.parse(body)[0].Temperature.Metric.Value);
                var degree = JSON.stringify(JSON.parse(body)[0].Temperature.Metric.Unit).replace(/"/g, "");
                convo.say('The weather in Bhubaneshwar is next to perfect.');
                convo.say('My Machine Learning Forecasting algorithm says that the temperature is going to hover around  27C - Sunny for all three days.');
                convo.say('Night seems to be cooler at <20*>, and with cool breeze smearing aside, sets out to be perfect weather for a cozy walk.');
                convo.say('So yeah, its not even next to perfect. Its perfect weather condition');
                others_callback_menu(convo);
        }
        });
        
    });
});
// ============================== Main Menu 3. Others 3.1. Weather ENDS ==================================================

// ====================================== Main Menu 3. Others 3.2.Night Life ===============================================      
controller.hears(['^night$'], 'message_received,facebook_postback', function (bot, message) {
    bot.startConversation(message, function (err, convo) {
        convo.say('want to get crazy and adventurous at night!You can try out the following places');
        convo.ask({
            attachment: {
                'type': 'template',
                'payload': {
                    'template_type': 'generic',
                    'elements': [{
                        'title': 'Xstacy Lounge',
                        'image_url': 'https://bhubabot.blob.core.windows.net/images/Xstacy_Lounge.png',
                        'subtitle': 'Xstacy lounge is a very hot and happening club that is usually filled with youngsters ',
                        "buttons": [{
                            "type": "web_url",
                            "url": "https://www.zomato.com/bhubaneswar/club-xstacy-chandrasekharpur/reviews",
                            "title": "Click here to know its reviews..... "
                        }]
                    },{
                        'title': 'Plaza Club - Swosti Premium',
                        'image_url': 'https://bhubabot.blob.core.windows.net/images/Plaza_Club.png',
                        'subtitle': 'The club comes with a discotheque, indoor games like pool, billiards, indoor gulf, skee ball and regular family program packages which make it a day/night hot spot',
                        "buttons": [{
                            "type": "web_url",
                            "url": "https://www.zomato.com/bhubaneswar/plaza-club-swosti-premium-jayadev-vihar-bhubaneshwar/reviews",
                            "title": "Click here to know its reviews...... "
                        }]
                    },{
                        'title': '10 Downing Street',
                        'image_url': 'https://bhubabot.blob.core.windows.net/images/10_Drowning_street.png',
                        'subtitle': ' It is one of the most happening places of Bhubaneswar. It is broadly known as TDS among the nightlife community',
                        "buttons": [{
                            "type": "web_url",
                            "url": "http://www.jantareview.com/Bhubaneswar/biz_9033/10-Downing-Street",
                            "title": "Click here to know its reviews...... "
                        }]
                    }]
                }
            }
        });
        others_callback_menu(convo);
    });   
});
// ======================================= Main Menu 3. Others 3.2.Night Life ENDS =========================================

// ====================================== Main Menu 3. Others 3.3.Local travel ===============================================      
controller.hears(['^travel$'], 'message_received,facebook_postback', function (bot, message) {
    bot.startConversation(message, function (err, convo) {
       convo.say('Want to get crazy and adventurous at night!You can try out the following places');
        convo.ask({
            attachment: {
                'type': 'template',
                'payload': {
                    'template_type': 'generic',
                    'elements': [{
                        'title': 'Ekamra Haat',
                        'image_url': 'https://upload.wikimedia.org/wikipedia/commons/7/75/Odia_Handicraft_At_Ekamra_haat_Bhubaneswar.jpg',
                        'subtitle': 'It is has nice ambience and very quite place ',
                        "buttons": [{
                            "type": "web_url",
                            "url": "https://www.tripadvisor.in/ShowUserReviews-g297661-d4138735-r317160648-Ekamra_Kanan-Bhubaneswar_Odisha.html",
                            "title": "Click here to know its reviews by Tripadvisor..... "
                        }]
                    },{
                        'title': 'Regional Plant Resource Centre (aka Botanical Garden)',
                        'image_url': 'https://bhubabot.blob.core.windows.net/images/Botanical_Garden.png',
                        'subtitle': ' Enjoy the company of a galaxy of plants and flowers from around the world and no one\'s gonna bother you there',
                        "buttons": [{
                            "type": "web_url",
                            "url": "https://www.tripadvisor.in/ShowUserReviews-g297661-d4155055-r416020048-Regional_Plant_Resource_Centre-Bhubaneswar_Odisha.html",
                            "title": "Click here to know its reviews by Tripadvisor....."
                        }]
                    },{
                        'title': 'Nandankanan',
                        'image_url': 'https://bhubabot.blob.core.windows.net/images/Nandankanan.png',
                        'subtitle': ' Nanadanakan is not a zoo, rather  it\'s a zoological garden.It has acres and acres of greenery.You\'ll love it',
                        "buttons": [{
                            "type": "web_url",
                            "url": "https://www.tripadvisor.in/ShowUserReviews-g297661-d1206653-r347617728-Nandankanan_Zoological_Park-Bhubaneswar_Odisha.html",
                            "title": "Click here to know its reviews by Tripadvisor....."
                        }]
                    }]
                }
            }
        });  
        others_callback_menu(convo);
    });
});
// ======================================= Main Menu 3. Others 3.3.Local travel ENDS =========================================

// ============================================ TRIAL=====================================================================       

controller.hears(['quick'], 'message_received', function (bot, message) {
    bot.startConversation(message, function (err, convo) {
        bot.reply(message, {
            text: 'Hey! This message has some quick replies attached.',
            quick_replies: [{
                    "content_type": "text",
                    "title": "Yes",
                    "payload": "who",
                },
                {
                    "content_type": "text",
                    "title": "No",
                    "payload": "no",
                }, {
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
controller.hears(['^who are you$', "^tell me about yourself$", "^what do you know$", "^why are you created$", "^what are you doing$"], 'message_received,facebook_postback', function (bot, message) {
    bot.startConversation(message, function (err, convo) {
        convo.say('I am BhubaBot.');
        convo.say('I am here');
        convo.say('You know why?');
        convo.say('To give you Geeks some valuable info ☺ and also, to savor the lovely Bhubaneshwar delicacies- Especially the Rosgollas.');
    });
});

controller.hears(["^who created you$", "^who is your father$"], 'message_received,facebook_postback', function (bot, message) {
    bot.startConversation(message, function (err, convo) {
        convo.say('I have been created by');
        convo.say('Pandu Balraj');
        convo.say('Neetu Mishra');
    });
});

controller.hears(["^what do you know about me$", "^do you know me$"], 'message_received,facebook_postback', function (bot, message) {
    bot.reply(message, "Right now I am learning about you!!!");
});

controller.hears(["^what else$", "^what else do you know$"], 'message_received,facebook_postback', function (bot, message) {
    bot.reply(message, "I hope you might be looking among these");
    bot.startConversation(message, function (err, convo) {
        main_menu(convo);
    });
});
// ===============================TRIAL===========================================================================       


// Default error message       
controller.on('message_received,facebook_postback', function (bot, message) {
    bot.reply(message, 'I am not sure what you are looking for. May be you can choose one of these');
    bot.startConversation(message, function (err, convo) {
        main_menuagain(convo);
    });
    return false;
});