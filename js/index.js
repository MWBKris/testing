/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();

    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
		
		document.addEventListener("deviceready", function(){
			alert("123");
		},true);
		
		
        document.addEventListener('deviceready', this.onDeviceReady, false);
         document.addEventListener('push-notification', function(event) {
            console.log('push-notification!:'+JSON.stringify(event.notification.message));
            navigator.notification.alert(event.notification.message);
        });
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        alert("START");
		var pushNotification = window.pushNotification;
		 alert("START2");
        var gcmOptions = {
            gcmSenderId:"395880463247"
        };
		
		if(pushNotification){
			alert("GOT HERE");
		}
		else{
			alert("NOT");
		}
		
        pushNotification.registerDevice(gcmOptions, function(device){
            var options = {
                provider:"apigee",
                orgName:"krisMWB",
                appName:"sandbox",
                notifier:"android",
                deviceId:device.deviceId
            };


            console.log(JSON.stringify(options));
            
            pushNotification.registerWithPushProvider(options, function(result){
                console.log(result);
            })
        });
        $("#push").on("click", function(e){
            //push here
            var options = {
             provider:"apigee",
             orgName:"krisMWB",
             appName:"sandbox",
             notifier:"android",
             message:"Hello!"
            };
            
            pushNotification.pushNotificationToDevice(options, function(result){
                console.log(result);
            });
        });
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
