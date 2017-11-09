    var admin = require('firebase-admin')
    
    var serverKey = require('./testfcm-3859c-firebase-adminsdk-jrx5h-5fd8ed763d.json') //put the generated private key path here    
    
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://testfcm-3859c.firebaseio.com"
    });
    
    // See the "Managing device groups" link above on how to generate a
    // notification key.
    var topic = "highScores";
    
    // See the "Defining the message payload" section below for details
    // on how to define a message payload.
    var payload = {
        data: {
            score: "850",
            time: "2:45"
        }
    };
    
    
    
    exports.handler = (event, context, callback) => {
        
        // Send a message to the device group corresponding to the provided
        // notification key.
        admin.messaging().sendToDeviceGroup(notificationKey, payload)
        .then(function(response) {
            // See the MessagingDeviceGroupResponse reference documentation for
            // the contents of response.
            console.log("Successfully sent message:", response);
        })
        .catch(function(error) {
            console.log("Error sending message:", error);
        });
    };