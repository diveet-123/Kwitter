
//ADD YOUR FIREBASE LINKS HERE

// Your web app's Firebase configuration
const firebaseConfig = {
      apiKey: "AIzaSyClij_Lql8AOn88tlME4ylmEjep2sQQ_Xc",
      authDomain: "kwitter-c0bec.firebaseapp.com",
      databaseURL: "https://kwitter-c0bec-default-rtdb.firebaseio.com",
      projectId: "kwitter-c0bec",
      storageBucket: "kwitter-c0bec.appspot.com",
      messagingSenderId: "719130931862",
      appId: "1:719130931862:web:20d8a49447428d19b988b7"
    };
    
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    name_user = localStorage.getItem("user_name");
    document.getElementById("name_of_user").innerHTML = "Welcome " + name_user + " !";

    function addroom()
    {
          room_name = document.getElementById("room_name").value;
          firebase.database().ref("/").child(room_name).update({
                purpose:"adding room name"
          });
          localStorage.setItem("room_name" , room_name);
          window.location = "kwitter_page.html";
    }

      function getData() {
         firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
          Room_names = childKey;
      //Start code
       console.log("Room names -" + Room_names);
       row = "<div class='name_of_room' id = "+Room_names + " onclick = 'redirectToRoomName(this.id)' ># "+ Room_names + "</div><hr>";
       document.getElementById("output").innerHTML += row;
      //End code
      });});}
getData();

function redirectToRoomName(name)
{
      console.log(name);
      localStorage.setItem("room_name" , name);
        window.location ="kwitter_page.html";
}

function logout()
{
      localStorage.removeItem("name");
      localStorage.removeItem("room_name");
      window.location="index.html";
}