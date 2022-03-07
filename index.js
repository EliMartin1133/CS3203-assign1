const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const favs = require('./favs.json');
var http = require('http');
var fs = require('fs');


app.use(express.static(__dirname));


app.get('/', function (req, res) {          // loads the html file
    res.sendFile(path.join(__dirname, 'index.html'));
});


function DisplayTweets() {              //this function is used to complete task 1, which displays tweet text and time
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'favs.json', true);


    xhr.onload = function () {
        if (this.status == 200) {
            var tweets = JSON.parse(this.responseText);
        }

        var output = ' ';
        for (var i in tweets) {
            output += '<br style="border:1px solid darkslateblue; border-radius:8px">' + tweets[i].text + '</br' + '<br style="border:1px solid darkslateblue; border-radius:8px">' + tweets[i].created_at + '</br>';
        }
        document.getElementById('tweets').innerHTML = output;

    }

    xhr.send();
}

function GetUserIDs() {                //this function is used to get the userID's for task 2
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'favs.json', true);


    xhr.onload = function () {
        if (this.status == 200) {
            var tweets = JSON.parse(this.responseText);
        }

        var output = ' ';
        for (var i in tweets) {
            output += '<br>' + tweets[i].user.id + '</br>';
        }
        document.getElementById('users').innerHTML = output;
    }

    xhr.send();
}


function GetTweetsFromID() {                    //this function takes user input and returns the tweet associated with it.
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'favs.json', true);


    xhr.onload = function () {
        if (this.status == 200) {
            var tweets = JSON.parse(this.responseText);
        }

        var output = ' ';
        for (var i in tweets) {
            if (tweets[i].id == document.getElementById('IDinput').value) {
                output +='<li>' + tweets[i].text + ' ' + tweets[i].created_at + '</li>';
            }

        }
        output += '</br>'
        document.getElementById('tweet').innerHTML = output;
    }

    xhr.send();
}

function fillTable() {                  // this function fills the table of user names
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'favs.json', true);


    xhr.onload = function () {
        if (this.status == 200) {
            var tweets = JSON.parse(this.responseText);
        }
        var output = '<tr>';
        for (var i in tweets) {
                output += '<td>' + tweets[i].user.screen_name + '</td>';

        }
        output += '</tr>';
        document.getElementById('firstRow').innerHTML = output;
    }

    xhr.send();
}
app.listen(port, () => {                // used to confirm the file is loading.
    console.log(`Example app listening on port ${port}`)
});



