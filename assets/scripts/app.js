// Initialize Firebase
var config = {
  apiKey: "AIzaSyAMppaYiD8FimCWseu6gYK_5GsBfGWXzpE",
  authDomain: "trainscheduledb-ca1a5.firebaseapp.com",
  databaseURL: "https://trainscheduledb-ca1a5.firebaseio.com",
  projectId: "trainscheduledb-ca1a5",
  storageBucket: "",
  messagingSenderId: "455210231662"
};

firebase.initializeApp(config);
//initial values
var database = firebase.database();

var trainName = $("#train-input")
  .val()
  .trim();
var destination = $("#destin-input")
  .val()
  .trim();
//var arrival = moment().minutes().format("hh:mm");
//var frequency = moment(arrival).subtract(15, "minuties");
var trainStart = moment("04/05/1989", "MM/DD/YYYY").format("HH");

var currentTime = "CURRENT TIME: " + moment(currentTime).format("hh:mm");
console.log(currentTime);

var connectionsRef = database.ref("/connections");
var connectedRef = database.ref(".info/connected");

connectedRef.on("value", function(snap) {
  // If they are connected..
  if (snap.val()) {
    // Add user to the connections list.
    var con = connectionsRef.push(true);
    // Remove user from the connection list when they disconnect.
    con.onDisconnect().remove();
  }
});
console.log("we are connected!");

// Uploads train data to the database

// Capture Button Click
$("#sendit").on("click", function(event) {
  event.preventDefault();
  console.log("Send It works");
  // Code in the logic for storing and retrieving the most recent user.
  var trainName = $("#train-input")
    .val()
    .trim();
  // destination = frequency = $("#freq-input")
  //   .val()
  //   .trim();
  // arrival = $("#arrival-input")
  //   .val()
  //   .trim();

  var newTrain = {
    trainName: trainName,
    destination: destination,
    frequency: frequency
    //arrival: arrival
  };
  // Code for the push
  database.ref().push(newTrain);

  console.log(newTrain.trainName);
  // dateAdded: firebase.database.ServerValue.TIMESTAMP
});

database.ref().on(
  "child_added",
  function(childSnapshot) {
    console.log(childSnapshot.val());
    // console.log(snapshot.val().trainName);
    // console.log(snapshot.val().destination);
    // console.log(snapshot.val().frequency);

    var trainName = childSnapshot.val().trainName;

    var newRow = $("<tr>").append(
      $("<td>").text(trainName)
      // $("<td>").text(empRole),
      // $("<td>").text(empStartPretty),
      // $("<td>").text(empMonths),
      // $("<td>").text(empRate),
      // $("<td>").text(empBilled)
    );
    $("#train-table > tbody").append(newRow);
  }, //end  function
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  }
);

// // Current Time
// var currentTime = moment();
// console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

// // Difference between the times
// var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
// console.log("DIFFERENCE IN TIME: " + diffTime);

// // Time apart (remainder)
// var tRemainder = diffTime % tFrequency;
// console.log(tRemainder);

// // Minute Until Train
// var tMinutesTillTrain = tFrequency - tRemainder;
// console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// // Next Train
// var nextTrain = moment().add(tMinutesTillTrain, "minutes");
// console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

/*Make sure that your app suits this basic spec:
  
* When adding trains, administrators should be able to submit the following:
  
  * First Train Time -- in military time
  
  * Frequency -- in minutes

* Code this app to calculate when the next train will arrive; this should be relative to the current time.

* Users from many different machines must be able to view same train times.*/
