document.getElementById("join-button").addEventListener("click", function() {  
    var roomId = document.getElementById("room-id").value;  
    console.log("Button clicked with room ID", roomId)
    const joinUrl = window.location.origin + '/join?room=' + roomId + '&name=' + "Havells Expert";

    // meeting_body = {
    //   "meeting": roomId
    // }
    // Call API-1  
    //   fetch("http://localhost:8080/api/v1/meeting", {  
    //     method: "POST",  
    //     headers: {  
    //       "accept": "application/json",  
    //       "authorization": "mirotalkc2c_default_secret"  
    //     },  
    //     body: meeting_body 
    //   })  
    //   .then(function(response) {  
    //     console.log("Resposne", response)
    //     return response.json();  
    //   })  
    //   .then(function(data) {  
    //     var meetingId = data.meeting;  
    //     console.log("data", data)
    //     console.log("meetingId", meetingId)
    //     console.log("roomId", roomId)
    //     // Call API-2  
    //     fetch("http://localhost:8080/api/v1/join", {  
    //       method: "POST",  
    //       headers: {  
    //         "accept": "application/json",  
    //         "authorization": "mirotalkc2c_default_secret",  
    //         "Content-Type": "application/json"  
    //       },  
    //       body: JSON.stringify({  
    //         "room": roomId,  
    //         "name": "Havells Expert"  
    //       })  
    //     })  
    //     .then(function(response) {  
    //       return response.json();  
    //     })  
    //     .then(function(data) {  
    //       var joinUrl = data.join;  
    //       console.log("Final room URL", joinUrl)  
    //       // Open join URL in a new window  
    //       window.open(joinUrl);  
    //     })  
    //     .catch(function(error) {  
    //       console.error("Error calling API-2:", error);  
    //     });  
    //   })  
    //   .catch(function(error) {  
    //     console.error("Error calling API-1:", error);  
    //   });  
    
    
    // fetch("https://24a7-35-236-148-45.ngrok-free.app/api/v1/join", {  
    //   method: "POST",  
    //   headers: {  
    //     "accept": "application/json",  
    //     "authorization": "mirotalkc2c_default_secret",  
    //     "Content-Type": "application/json"  
    //   },
    //   body: JSON.stringify({  
    //     "room": roomId,  
    //     "name": "Havells Expert"  
    //   })  
    // })  
    // .then(function(response) {  
    //   return response.json();  
    // })  
    // .then(function(data) {
    //   var joinUrl = data.join;  
    //   console.log("Final room URL", joinUrl)
    
    fetch("https://api.interakt.ai/v1/public/message/", {  
    method: "POST",  
    headers: {  
        "accept": "application/json",  
        "authorization": "Basic a3Q3VFFLU2ZJM2Y3aU5OMmNESDBPdDJHZjNRZUJGeE4tVUtwZEFWQlF4STo=",  
        "Content-Type": "application/json"  
    },  
    body: JSON.stringify({
        "countryCode": "+91",
        "phoneNumber": roomId,
        "callbackData": "P2P video link",
        "type": "Template",
        "template": {
        "name": "web_rtc_test",
        "languageCode": "en",
        "headerValues": [
        " bnj"
        ],
        "bodyValues": [
        "bbn"
        ],
        "buttonValues":{
        
        "1" :[window.location.origin + '/join?room=' + roomId + '&name=' + "Customer"]
        }
        }})  
    })
    .then(function(response) {  
    return response.json();  
    })  
    .then(function(data) {
    console.log("WA link sent to user", data.result)
    console.log("Final room URL", joinUrl)
        
    // Open join URL in a new window  
    // window.open(joinUrl);
    // Open join URL in an iframe 
    
    
    window.history.pushState({ url: joinUrl }, roomId, joinUrl);
    window.localStorage.room = roomId.value;
    window.localStorage.name = "Havells Expert";

    var iframe = document.createElement("iframe");  
    iframe.allow = "camera; microphone; display-capture; fullscreen; clipboard-read; clipboard-write; autoplay";  
    iframe.src = joinUrl;  
    iframe.style.height = "50%";  
    iframe.style.width = "50%";  
    iframe.style.border = "0px";  

    // Replace the existing content with the iframe  
    var body = document.getElementsByTagName("body")[0];  
    body.innerHTML = "";  
    body.appendChild(iframe);  
    })
    .catch(function(error) {  
    console.error("Error calling WA sided:", error);  
    }); 
})
// .catch(function(error) {  
//     console.error("Error calling WebRTC join API:", error);  
// });  
//   }); 

// 'use strict';

// console.log('Location', window.location);
// console.log('LocalStorage', window.localStorage);

// const roomId = filterXSS(new URLSearchParams(window.location.search).get('room') || '');

// const roomIdIn = document.getElementById('roomIdInput');
// const userNameIn = document.getElementById('userNameInput');
// const joinBtn = document.getElementById('joinBtn');
// const supportBtn = document.getElementById('supportBtn');

// const config = {
//     support: true,
//     //...
// };

// function initHome() {
//     roomIdIn.value = roomId ? roomId : filterXSS(window.localStorage.room) || '';
//     userNameIn.value = filterXSS(window.localStorage.name) || '';

//     joinBtn.onclick = () => {
//         if (roomIdIn.value && userNameIn.value) {
//             const joinUrl = window.location.origin + '/join?room=' + roomIdIn.value + '&name=' + userNameIn.value;
//             window.history.pushState({ url: joinUrl }, roomIdIn.value, joinUrl);
//             window.localStorage.room = roomIdIn.value;
//             window.localStorage.name = userNameIn.value;
//         }
//     };
//     supportBtn.onclick = () => {
//         window.open('https://codecanyon.net/user/miroslavpejic85', '_blank');
//     };

//     !config.support && elementDisplay(supportBtn, false);
//     //...
// }

// function elementDisplay(elem, display) {
//     elem.style.display = display ? 'block' : 'none';
// }
