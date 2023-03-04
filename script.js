// Wait for the page to load before adding event listeners
window.addEventListener("load", function() {

    // Add event listener to U2F button
    var button = document.getElementById("u2f-button");
    button.addEventListener("click", function() {
  
      // Check if the browser supports the U2F API
      if (!window.u2f || !window.u2f.register) {
        alert("The U2F API is not available on this browser.");
        return;
      }
  
      // Send a U2F request to the browser
      var challenge = "test challenge";
      var appId = "https://testmyu2f.com";
      var registerRequests = [{
        version: "U2F_V2",
        challenge: challenge
      }];
  
      u2f.register(appId, registerRequests, [], function(result) {
  
        // Handle U2F API response
        if (result.errorCode) {
          switch (result.errorCode) {
            case 1:
              alert("U2F key unauthorized.");
              break;
            case 2:
              alert("U2F key denied.");
              break;
            case 3:
              alert("Error communicating with U2F key.");
              break;
            default:
              alert("Unknown error occurred.");
              break;
          }
        } else if (result.hasOwnProperty("registrationData")) {
          alert("U2F key accepted. Name: " + result.keyHandle);
        } else {
          alert("Unknown response received from U2F key.");
        }
  
      });
  
    });
  
  });  