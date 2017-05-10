  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBDIaD1hC-jZbgXbnaJ7ibV0mve2Y69ZnI",
    authDomain: "my-train-scheduler.firebaseapp.com",
    databaseURL: "https://my-train-scheduler.firebaseio.com",
    projectId: "my-train-scheduler",
    storageBucket: "my-train-scheduler.appspot.com",
    messagingSenderId: "73989011162"
  };
  firebase.initializeApp(config);
  var database = firebase.database();
	
  // add on click funtion to add values
	$("#addUser").on("click",function() {
	 event.preventDefault();
	 var trainName = $("#name-input").val().trim();
	 var destination = $("#destination-input").val().trim();
	 var arrival = $("#traintime-input").val().trim();
	 var frequency = $("#frequency-input").val().trim();
   
	 database.ref().push({
 	 trainName : trainName,
 	 destination : destination,
 	 arrival : arrival,
   frequency : frequency
   
  });

	database.ref().on("child_added", function(childSnapshot, prevChildKey){
	console.log(childSnapshot.val());
	var trainData = childSnapshot.val().trainName;
	var destinationData = childSnapshot.val().destination;
	var frequencyData = childSnapshot.val().frequency;
	var arrivalData = childSnapshot.val().arrival;	
 	console.log(trainData);
	console.log(destinationData);
	console.log(frequencyData);
	console.log(arrivalData);
  // moment.js time converted and next arrival time calculated
  firstTimeConverted = moment(arrival, "hh:mm").subtract(1, "years");
  currentTime = moment();
  diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  tRemainder = diffTime % frequency;
  minutesTillTrain = frequency - tRemainder;
 var nextTrain = moment().add(minutesTillTrain, "minutes");
 var  nextTrainFormatted = moment(nextTrain).format("hh:mm");
  // appending the values to the browser
 $("#table > tbody").append("<tr><td>" + trainData + "</td><td>" + destinationData + "</td><td>" +
   arrivalData + "</td><td>" + frequencyData + "</td><td>"  + nextTrainFormatted +  "</td></tr>");
  });
})