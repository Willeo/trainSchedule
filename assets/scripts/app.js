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
//var destination = $("#destin-input")
// .val()
// .trim();

// Capture Button Click
$("#sendit").on("click", function(event) {
  event.preventDefault();
  console.log("Send It works");
  // Code in the logic for storing and retrieving the most recent user.
  var trainName = $("#train-input")
    .val()
    .trim();
  var tFrequency = $("#freq-input");
  //   .val()
  //   .trim();
  var tMinutesTillTrain = $("#arrival-input");
  //   .val()
  //   .trim();

  var newTrain = {
    trainName: trainName,
    tFrequency: tFrequency,
    tMinutesTillTrain: tMinutesTillTrain
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
      $("<td>").text(trainName),
      $("<td>").text(firstTrain),
      $("<td>").text(tFrequency),
      $("<td>").text(tMinutesTillTrain)
    );
    $("#train-table > tbody").append(newRow);
  }, //end  function
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  }
);
var tFrequency = 15;

// Time is 3:30 AM
var firstTrain = "03:30";

// First Time (pushed back 1 year to make sure it comes before current time)
var firstTrainConverted = moment(firstTrain, "HH:mm");
// .subtract(1, "years");
console.log(firstTrainConverted);

// Current Time
var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

// Difference between the times
var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);

// Time apart (remainder)
var tRemainder = diffTime % tFrequency;
console.log(tRemainder);

// Minute Until Train
var tMinutesTillTrain = tFrequency - tRemainder;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// Next Train
var nextTrain = moment().add(tMinutesTillTrain, "minutes");
console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

/* When adding trains, administrators should be able to submit the following:
  
  * First Train Time -- in military time
  
  * Frequency -- in minutes

* Code this app to calculate when the next train will arrive; this should be relative to the current time.

* Users from many different machines must be able to view same train times.*/
