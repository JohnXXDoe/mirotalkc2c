document.getElementById("join-button").addEventListener("click", function() {  
  var roomId = document.getElementById("room-id").value;  
  console.log("Button clicked with room ID", roomId)
  meeting_body = {
    "meeting": roomId
  }
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

  fetch("https://3202-35-236-148-45.ngrok-free.app/api/v1/join", {  
    method: "POST",  
    headers: {  
      "accept": "application/json",  
      "authorization": "mirotalkc2c_default_secret",  
      "Content-Type": "application/json"  
    },  
    body: JSON.stringify({  
      "room": roomId,  
      "name": "Havells Expert"  
    })  
  })  
  .then(function(response) {  
    return response.json();  
  })  
  .then(function(data) {
    var joinUrl = data.join;  
    console.log("Final room URL", joinUrl)

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
        
        "1" :[joinUrl]
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
    var iframe = document.createElement("iframe");  
    iframe.allow = "camera; microphone; display-capture; fullscreen; clipboard-read; clipboard-write; autoplay";  
    iframe.src = joinUrl;  
    iframe.style.height = "50vh";  
    iframe.style.width = "50vw";  
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
  .catch(function(error) {  
    console.error("Error calling WebRTC join API:", error);  
  });  
}); 