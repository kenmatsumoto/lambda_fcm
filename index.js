    var admin = require('firebase-admin')
    
    var serviceAccount = require('./testfcm-3859c-firebase-adminsdk-jrx5h-5fd8ed763d.json') //put the generated private key path here    
    
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://testfcm-3859c.firebaseio.com"
    });
    
    // See the "Managing device groups" link above on how to generate a
    // notification key.
    var topic = "news";
    var dt = new Date();
    // See the "Defining the message payload" section below for details
    // on how to define a message payload.
    var payload = {
        data: {
            title: "New coffee order received!",
            time: dt.toTimeString()
        }
    };
    
    
    function fcm_send () {
        return admin.messaging().sendToTopic(topic, payload)
        .then(function(response) {
            // See the MessagingDeviceGroupResponse reference documentation for
            // the contents of response.
            console.log("Successfully sent message:", response.message);
        })
        .catch(function(error) {
            console.log("Error sending message:", error);
        });
    }
    

    exports.handler = (event, context, callback) => {
        context.callbackWaitsForEmptyEventLoop = false;
        // Send a message to the device group corresponding to the provided
        // notification key.
        
        admin.messaging().sendToTopic(topic, payload)
        .then(function(response) {
            // See the MessagingDeviceGroupResponse reference documentation for
            // the contents of response.
            console.log("Successfully sent message:", response);
            callback(null, "some success message" + response);
        })
        .catch(function(error) {
            console.log("Error sending message:", error);
            callback(null, "some error message" + error);
        });
        
        //var message = fcm_send();
        var message = " ok";
        callback(null, "some success message" + message);
    };