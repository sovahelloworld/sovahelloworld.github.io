  var app = angular.module("app", ["firebase"]);

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBd-vnNw9TReKy7ys_4P3-YNjuu2NtMcmA",
    authDomain: "hello-world-7828c.firebaseapp.com",
    databaseURL: "https://hello-world-7828c.firebaseio.com",
    projectId: "hello-world-7828c",
    storageBucket: "",
    messagingSenderId: "849081550225"
  };
 firebase.initializeApp(config);

// Vi skapar en kommentarer-fabrik som hämtar blogg-inlägg från firebase
app.factory("kommentarer", function($firebaseArray) {
    // skapa en referens till var i databasen kommentarerna finns
    var ref = firebase.database().ref().child("kommentarer");
    return $firebaseArray(ref);
  }
);

// Här i "controllern" så kan vi bestämma vad som ska hända med vår HTML
app.controller("KommentarCtrl", function($scope, kommentarer) {
    // Vi gör så att vi kan komma åt inläggen i kommentarer-fabriken med ng-model
    $scope.kommentarer = kommentarer;

    $scope.kommentar = {
        text: "",
        skribent: ""
    };
    // Vi skapar en funktion som vi kan köra i ng-submit för att skicka kommentaren till databasen
    $scope.addComment = function() {
        // Här lägger vi till vårt inlägg ($scope.kommentar) till listan med inlägg.
        // Det sparas automatiskt i Firebase-databasen.
        $scope.kommentarer.$add($scope.kommentar);

        // Tömmer texten i textfälten
        $scope.kommentar = {
            text: "",
            skribent: ""
        };
    };
  });