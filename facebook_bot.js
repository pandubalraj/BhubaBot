var Botkit = require('./lib/Botkit.js')
var os = require('os')
var localtunnel = require('localtunnel')
var opn = require('opn')
var request = require('request')
var express = require('express')
var app = express()
var fs = require('fs')

app.get('/privacy_policy', function (req, res) {
fs.readFile(__dirname + '/privacy_policy.html', 'utf8', function(err, text){
        res.send(text);
    });
})

app.listen(process.env.port ||process.env.PORT || 3000 )

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
                    'image_url': 'https://bhubabot.blob.core.windows.net/images/cityOfTemples.png',
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
        convo.say('Hi, I am Bhuba-Bot. Nice to meet you ☺ ');
        convo.say('Namascara and Swaagta to my city Bhubaneshwar');
        convo.say('This is how we say hello and welcome in oriya..language we speak here!! ☺');
        convo.ask({
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "button",
                    "text": "Are you gonna be bhubaneshwar First time???",
                    "buttons": [{
                        "type": "postback",
                        "title": "Yeah",
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
     convo.say('This is a lovely place having a lot of history behind it'); 
     convo.say('Food is awesome and a fantastic weather in April');
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
        main_menuagain(convo);
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
                "text": "You can select the following to go back !!!!!!!!!",
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
                "text": "You can select the following to go back !!!!!!!!!",
                "buttons": [{
                    "type": "postback",
                    "title": "Attraction Menu",
                    "payload": "local attractions again"
                },{
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
        convo.say('Here Kalinga and Dhauli where the famous battle was fought between Emperor Ashoka and the Kalinga army');
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
var shop = ['^shopping$', '^shopes$']
controller.hears(shop, 'message_received,facebook_postback', function (bot, message) {
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
                        "title": "Sarees & Fabrics",
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
                    "text": "I am here again.what to want to buy ",
                    "buttons": [{
                        "type": "postback",
                        "title": "Sarees & Fabrics",
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
//================================ Main Menu  1. local attractions 1.1. Shopping  ENDS =======================================

//================================ Main Menu  1. local attractions 1.1. Shopping 1.1.1 Saree =======================================
var saree = ['^saree$','^sarees$']
 controller.hears(saree, 'message_received,facebook_postback', function (bot, message) {
   bot.startConversation(message, function (err, convo) {
        convo.say('To buy silk and cotton textiles, you can head out to shops Mahalakshmi Textiles that is stocked with interesting apparels');
        convo.say('It is less than a Km from Trident Hotel');
        convo.say('and just 6.4 Km away from Mayfair Lagoon Hotel');
        attractions_shopping_callback_menu(convo);
 });
});
//================================ Main Menu  1. local attractions 1.1. Shopping 1.1.1 Saree ENDS ==================================

//================================ Main Menu  1. local attractions 1.1. Shopping 1.1.1 Metal =======================================
var metal = ['^metal$','^sculpture$','^sculptures$']
controller.hears(metal, 'message_received,facebook_postback', function (bot, message) {
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
var food = ['^food$', "^trending foods$", "^dishes$", "^dish$", "^food$"]
controller.hears(food, 'message_received,facebook_postback', function (bot, message) {
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
                "text": "You can select the following to go back !!!!!!!!!",
                "buttons": [{
                    "type": "postback",
                    "title": "Go Back",
                    "payload": "tourist spots again"
                },{
                    "type": "postback",
                    "title": "Local Attraction Menu",
                    "payload": "local attractions again"
                },{
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
var attraction = ['^tourist spots$', "^sight seeing$", "^tourist$", "^place to visit$","^places to visit$", "^place to travel$","^places to travel$", "^refreshment$", "^place to see$","^places to see$"];

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
var konark = ['^konark$','^Konark Sun Temple$','^sun temple$']
