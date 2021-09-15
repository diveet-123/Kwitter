//YOUR FIREBASE LINKS

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

    user_name = localStorage.getItem("user_name");
    room_name = localStorage.getItem("room_name");

    function send()
    {
        message = document.getElementById("Message").value;
        firebase.database().ref(room_name).push({
              name : user_name,
              message : message,
              like : 0
        });
        document.getElementById("Message").value = "";
    }

function getData() 
{ 
      firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
//Start code
             console.log(firebase_message_id);
             console.log(message_data);
             name_of_user = message_data['name'];
             message = message_data['message'];
             like = message_data['like'];
             name_with_tag = "<h4> "+ name_of_user +"<img class='user_tick' src='tick.png'></h4>"; 
             message_with_tag="<h4 class='message_h4'>"+ message + "</h4>";
             like_button="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
             span_with_tag= "<span class='glyphicon glyphicon-thumbs-up'>Like: "+ like +"</span></button><hr>";

             row = name_with_tag + message_with_tag +like_button + span_with_tag;
             document.getElementById("output").innerHTML += row;
//End code
      } });  }); }
getData();

function updateLike(message_id)
{
      console.log("clicked on like button - " + message_id);
      button_id = message_id;
      likes = document.getElementById(button_id).value;
      updated_likes = Number(likes) + 1;
      console.log(updated_likes);

      firebase.database().ref(room_name).child(message_id).update({
            like : updated_likes
      });
}

function logout()
{
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location.replace("index.html");
}