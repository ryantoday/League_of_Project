var sumName = "";
var APIKEY = "e53b51e8-f11c-4533-bdbf-8b50a0455f1c";
var image = "";
var champName="";
function summonerLookUp() {   
    sumName = $("#summonerName").val();
    //APIKEY = $("#APIKey").val();

    
    if (sumName !== "") {

        $.ajax({
            url: 'https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/' + sumName + '?api_key=' + APIKEY,
            type: 'GET',
            dataType: 'json',
            data: {

            },
            success: function (json) {
                var sumNamenospace = sumName.replace(" ", "");

                sumNamenospace = sumNamenospace.toLowerCase().trim();

                summonerLevel = json[sumNamenospace].summonerLevel;
                summonerID = json[sumNamenospace].id;

                document.getElementById("sLevel").innerHTML = summonerLevel;
                document.getElementById("sID").innerHTML = summonerID;

                // NEW FUNCTION!
                letsGetMatches(summonerID);
                

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("error getting Summoner data 1!");
            }
        });
    } else {}
}

function letsGetMatches(summonerID) {
    $.ajax({
        url: "https://na.api.pvp.net/api/lol/na/v2.2/matchlist/by-summoner/" + summonerID + "?beginIndex=1&endIndex=10&api_key=" + APIKEY,
        type: 'GET',
        dataType: 'json',
        data: {
	
        },
        success: function (json) {
            
        	//firstMatchId = json['matches'][1].matchId;
          //champId = json['matches'][1].champion;
          for(x=1;x<6;x++){
          	matches = json['matches'][x].matchId;
            champId = json['matches'][x].champion;
            getChampName(champId); 
            alert(image); //this won't stay in the code. It's just helping to debug.
            document.getElementById("matchList").innerHTML = document.getElementById("matchList").innerHTML + matches + "<br />"; 							  document.getElementById("champId").innerHTML = document.getElementById("champId").innerHTML + champId + "<br />";
            document.getElementById("champName").innerHTML = document.getElementById("champName").innerHTML + champName + "<br />";
            document.getElementById("image").innerHTML = document.getElementById("image").innerHTML + image + "<br />";
            
          };
         
         // document.getElementById("1stMatchId").innerHTML = firstMatchId;
          //document.getElementById("champId").innerHTML = champId;
          //getChampName(champId);
          //getMatchStats(firstMatchId);

          
            
        },

        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("error getting Summoner data 2!");
        }
    });
}

function getChampName(champId) {
    $.ajax({
        url: "https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion/" + champId + "?api_key=" + APIKEY,
        type: 'GET',
        dataType: 'json',
        data: {

        },
        success: function (resp) {
          champName = resp['name'];
          //document.getElementById("champName").innerHTML = champName;
          imageUrl = 'http://ddragon.leagueoflegends.com/cdn/6.4.2/img/champion/'+champName+'.png';
          image = '<img src=' + imageUrl + ' width="50" height="50">';
          //document.getElementById("image").innerHTML = image;
          
        },

        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("error getting Summoner data 2!");
        }
    });
}

function getMatchStats(firstMatchId) {
    $.ajax({
        url: "https://na.api.pvp.net/api/lol/na/v2.2/match/" + firstMatchId + "?api_key=" + APIKEY,
        type: 'GET',
        dataType: 'json',
        data: {

        },
        success: function (json) {
            
		  firstMatchId = json['matches'][1].matchId;
          champId = json['matches'][1].champion;
          document.getElementById("1stMatchId").innerHTML = firstMatchId;
          document.getElementById("champId").innerHTML = champId;
          getChampName(champId);  
          
            
        },

        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("error getting Summoner data 2!");
        }
    });
}