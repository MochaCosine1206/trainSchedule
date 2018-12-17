
var config = {
  apiKey: "AIzaSyDg_p9N1Ji7vqqHwTcDSFd3iEbXxSj5VjY",
  authDomain: "trainsched-4520c.firebaseapp.com",
  databaseURL: "https://trainsched-4520c.firebaseio.com",
  projectId: "trainsched-4520c",
  storageBucket: "",
  messagingSenderId: "529334315327"
};

firebase.initializeApp(config);

var database = firebase.database();
var trainName;
var destination;
var firstTrain;
var freq;



$("#submitButton").on("click", function (event) { 

  event.preventDefault();

  trainName = $("#trainName").val().trim();
  destination = $("#destination").val().trim();
  firstTrain = $("#firstTrain").val().trim();
  freq = $("#freq").val().trim();

  console.log(trainName);


  database.ref().push({
    name: trainName,
    dest: destination,
    fTrain: firstTrain,
    freq: freq,
  });

  database.ref().on("child_added", function (snapshot) {

    console.log(snapshot.val().name);
    console.log(snapshot.val().dest);
    console.log(snapshot.val().fTrain);
    console.log(snapshot.val().freq);

    var firstTrainConverted = moment(snapshot.val().fTrain, "HH:mm").subtract(1, "years");
    // var currentTime = moment();
    var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
    var tRemainder = diffTime % freq;
    var tMinutesTillTrain = freq - tRemainder;
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    var nextTrainTime = moment(nextTrain).format("hh:mm")
    
    $("#trainTable").append("<tr><td>" + (snapshot.val().name) + "</td><td>" + (snapshot.val().dest) + "</td><td>" + (snapshot.val().freq) + "</td><td>" + nextTrainTime + "</td><td>"+ tMinutesTillTrain +"</td></tr>")

  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
  $("#submitButton").off("click");
});
