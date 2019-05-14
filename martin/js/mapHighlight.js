// Choose a counrty click events 
$(document).ready(function(){
    
});
// globals
var map = null;
var map, markersArray = [];    
var infoWindow = null;
var geoXml = null;
var geoXmlDoc = null;
var myLatLng = null;
var mapOptions = null;
var mapCenter = null;
var geocodeTheCountry = true;
var gpolygons = [];

// Fusion Table data ID
var FT_TableID = 420419;
var CountryName = "London, England"; // "United States of America";
var CountryName2 = "United Kingdom"; // "United States of America";
google.maps.event.addDomListener(window, 'load', initialize(52.3219,0.4394, 4));

//When user clicks "Germany" ...
    $('#london').click(function(){
        // Shows map
        $('.bigMap').css("display","block");
        CountryName = "London, England";
        CountryName2 = "United Kingdom";
        // calls map initialize function with Germany's latiitude and Longditude 
        initialize(52.3219,0.4394, 4);
    });
    //When user clicks "Austria" ...
    $('#austria').click(function(){
        // Shows map
        $('.bigMap').css("display","block");
        CountryName = "Austria";
        CountryName2 = "Austria";
        // calls map initialize function with Austria's latiitude and Longditude 
        initialize(47.5162,14.5501, 7);
    });
    //When user clicks "Swiss" ...
    $('#swiss').click(function(){
        // Shows map
        $('.bigMap').css("display","block");
        CountryName = "Switzerland";
        CountryName2 = "Switzerland";
        // calls map initialize function with Swiss's latiitude and Longditude 
        initialize(46.8182,8.2275, 7);
    });
    //When user clicks "France" ...
    $('#france').click(function(){
        // Shows map
        $('.bigMap').css("display","block");
        CountryName = "France";
        CountryName2 = "France";
        // calls map initialize function with France's latiitude and Longditude 
        initialize(46.2276,2.2137, 7);
    });

  google.load('visualization', '1', {'packages':['corechart', 'table', 'geomap']});
function bindInfoWindow(marker, map, location) {
        google.maps.event.addListener(marker, 'click', function() {
            function close(location) {
                location.ib.close();
                location.infoWindowVisible = false;
                location.ib = null;
            }

            if (location.infoWindowVisible === true) {
                close(location);
            } else {
                markersArray.forEach(function(loc, index){
                    if (loc.ib && loc.ib !== null) {
                        close(loc);
                    }
                });

                var boxText = document.createElement('div');
                boxText.style.cssText = 'background: #fff;';
                boxText.classList.add('md-whiteframe-2dp');

                function buildPieces(location, el, part, icon) {
                    if (location[part] === '') {
                        return '';
                    } else if (location.iw[part]) {
                        switch(el){
                            case 'photo':
                                if (location.photo){
                                    return '<div class="iw-photo" style="background-image: url(' + location.photo + ');"></div>';
                                 } else {
                                    return '';
                                }
                                break;
                            case 'iw-toolbar':
                                return '<div class="iw-toolbar"><h3 class="md-subhead">' + location.title + '</h3></div>';
                                break;
                            case 'div':
                                switch(part){
                                    case 'email':
                                        return '<div class="iw-details"><i class="material-icons" style="color:#4285f4;"><img src="//cdn.mapkit.io/v1/icons/' + icon + '.svg"/></i><span><a href="mailto:' + location.email + '" target="_blank">' + location.email + '</a></span></div>';
                                        break;
                                    case 'web':
                                        return '<div class="iw-details"><i class="material-icons" style="color:#4285f4;"><img src="//cdn.mapkit.io/v1/icons/' + icon + '.svg"/></i><span><a href="' + location.web + '" target="_blank">' + location.web_formatted + '</a></span></div>';
                                        break;
                                    case 'desc':
                                        return '<label class="iw-desc" for="cb_details"><input type="checkbox" id="cb_details"/><h3 class="iw-x-details">Details</h3><i class="material-icons toggle-open-details"><img src="//cdn.mapkit.io/v1/icons/' + icon + '.svg"/></i><p class="iw-x-details">' + location.desc + '</p></label>';
                                        break;
                                    default:
                                        return '<div class="iw-details"><i class="material-icons"><img src="//cdn.mapkit.io/v1/icons/' + icon + '.svg"/></i><span>' + location[part] + '</span></div>';
                                    break;
                                }
                                break;
                            case 'open_hours':
                                var items = '';
                                for (var i = 0; i < location.open_hours.length; ++i) {
                                    if (i !== 0){
                                        items += '<li><strong>' + location.open_hours[i].day + '</strong><strong>' + location.open_hours[i].hours +'</strong></li>';
                                    }
                                    var first = '<li><label for="cb_hours"><input type="checkbox" id="cb_hours"/><strong>' + location.open_hours[0].day + '</strong><strong>' + location.open_hours[0].hours +'</strong><i class="material-icons toggle-open-hours"><img src="//cdn.mapkit.io/v1/icons/keyboard_arrow_down.svg"/></i><ul>' + items + '</ul></label></li>';
                                }
                                return '<div class="iw-list"><i class="material-icons first-material-icons" style="color:#4285f4;"><img src="//cdn.mapkit.io/v1/icons/' + icon + '.svg"/></i><ul>' + first + '</ul></div>';
                                 break;
                         }
                    } else {
                        return '';
                    }
                }

                boxText.innerHTML = 
                    buildPieces(location, 'photo', 'photo', '') +
                    buildPieces(location, 'iw-toolbar', 'title', '') +
                    buildPieces(location, 'div', 'address', 'location_on') +
                    buildPieces(location, 'div', 'web', 'public') +
                    buildPieces(location, 'div', 'email', 'email') +
                    buildPieces(location, 'div', 'tel', 'phone') +
                    buildPieces(location, 'div', 'int_tel', 'phone') +
                    buildPieces(location, 'open_hours', 'open_hours', 'access_time') +
                    buildPieces(location, 'div', 'desc', 'keyboard_arrow_down');

                var myOptions = {
                    alignBottom: true,
                    content: boxText,
                    disableAutoPan: true,
                    maxWidth: 0,
                    pixelOffset: new google.maps.Size(-140, -40),
                    zIndex: null,
                    boxStyle: {
                        opacity: 1,
                        width: '280px'
                    },
                    closeBoxMargin: '0px 0px 0px 0px',
                    infoBoxClearance: new google.maps.Size(1, 1),
                    isHidden: false,
                    pane: 'floatPane',
                    enableEventPropagation: false
                };

                location.ib = new InfoBox(myOptions);
                location.ib.open(map, marker);
                location.infoWindowVisible = true;
            }
        });
    }
/* function  createSidebar() {
  // set the query using the parameters
var FT_Query2 = "SELECT 'name_0', 'name_1', 'kml_4326' FROM "+FT_TableID+" WHERE name_0 = '"+CountryName+"' ORDER by 'name_1'";
document.getElementById("FTquery2").innerHTML = FT_Query2; 
  var queryText = encodeURIComponent(FT_Query2);
  // alert("createSidebar query="+FT_Query2);
  var query = new google.visualization.Query('https://www.google.com/fusiontables/gvizdata?tq='  + queryText);
  
  //set the callback function
  query.send(getData);
} 

  // Set a callback to run when the Google Visualization API is loaded.
  google.setOnLoadCallback(createSidebar);
*/


var FTresponse = null;

      myLatLng = new google.maps.LatLng(51.1657,10.4515);
      // these set the initial center, zoom and maptype for the map 
      // if it is not specified in the query string
      var lat = 51.1657;
      var lng = 10.4515;
      var zoom = 7;
      var maptype = google.maps.MapTypeId.ROADMAP;

      // If there are any parameters at eh end of the URL, they will be in  location.search
      // looking something like  "?marker=3"
 
      // skip the first character, we are not interested in the "?"
      var query = location.search.substring(1);
 
      // split the rest at each "&" character to give a list of  "argname=value"  pairs
      var pairs = query.split("&");
      for (var i=0; i<pairs.length; i++) {
        // break each pair at the first "=" to obtain the argname and value
	var pos = pairs[i].indexOf("=");
	var argname = pairs[i].substring(0,pos).toLowerCase();
	var value = pairs[i].substring(pos+1);
        if (argname == "country") {CountryName = unescape(value);}
	value = pairs[i].substring(pos+1).toLowerCase();
 
        // process each possible argname  -  use unescape() if theres any chance of spaces
	if (argname == "geocode") {geocodeTheCountry = (value != "false");}
        if (argname == "id") {id = unescape(value);}
        if (argname == "filename") {filename = unescape(value);}
        if (argname == "marker") {index = parseFloat(value);}
        if (argname == "lat") {lat = parseFloat(value);}
        if (argname == "lng") {lng = parseFloat(value);}
        if (argname == "zoom") {
	  zoom = parseInt(value);
	  myGeoXml3Zoom = false;
	}
        if (argname == "type") {
// from the v3 documentation 8/24/2010
// HYBRID This map type displays a transparent layer of major streets on satellite images. 
// ROADMAP This map type displays a normal street map. 
// SATELLITE This map type displays satellite images. 
// TERRAIN This map type displays maps with physical features such as terrain and vegetation. 
          if (value == "m") {maptype = google.maps.MapTypeId.ROADMAP;}
          if (value == "k") {maptype = google.maps.MapTypeId.SATELLITE;}
          if (value == "h") {maptype = google.maps.MapTypeId.HYBRID;}
          if (value == "t") {maptype = google.maps.MapTypeId.TERRAIN;}

        }
      }
      if (!isNaN(lat) && !isNaN(lng)) {
        myLatLng = new google.maps.LatLng(lat, lng);
      }
      infoWindow = new google.maps.InfoWindow();



//define callback function, this is called when the results are returned
function getData(response) {
if (!response) {
  alert('no response');
  return;
}
if (response.isError()) {
  alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
  return;
} 
  FTresponse = response;
  //for more information on the response object, see the documentation
  //https://code.google.com/apis/visualization/documentation/reference.html#QueryResponse
  numRows = response.getDataTable().getNumberOfRows();
  numCols = response.getDataTable().getNumberOfColumns();
  
  //concatenate the results into a string, you can build a table here
  fusiontabledata = "<table><tr>";
//  for(i = 0; i < numCols; i++) {
    fusiontabledata += "<th>" + response.getDataTable().getColumnLabel(1) + "</th>";
//   }
  fusiontabledata += "</tr><tr>";
  
  for(i = 0; i < numRows; i++) {
//    for(j = 0; j < numCols; j++) {
   /*
   var kml =  response.getDataTable().getValue(i,2);
   geoXml.parseKmlString("<Placemark>"+kml+"</Placemark>");
   */    
      fusiontabledata += "<td><a href='javascript:myFTclick("+i+")'>"+response.getDataTable().getValue(i, 1) + "</a></td>";
//    }
    fusiontabledata += "</tr><tr>";
  }
  fusiontabledata += "</table>"  
  //display the results on the page
  // document.getElementById('sidebar').innerHTML = fusiontabledata;
}

function infoWindowContent(name, description) {
   content =   '<div class="FT_infowindow"> <h3><a href="/martin/tourentipps.html?area='+name+'">' + name + '</a></h3> <div>' + description + '</div></div>';
   return content;
}
function myFTclick(row) {
   var description = FTresponse.getDataTable().getValue(row,0);
   var name = FTresponse.getDataTable().getValue(row,1);
   if (!gpolygons[row]) {
     var kml =  FTresponse.getDataTable().getValue(row,2);
     // create a geoXml3 parser for the click handlers
     var geoXml = new geoXML3.parser({
                    map: map,
		    zoom: false,
                    infoWindow: infoWindow,
                    singleInfoWindow: true
                });

     geoXml.parseKmlString("<Placemark>"+kml+"</Placemark>");
     geoXml.docs[0].gpolygons[0].setMap(null);
     gpolygons[row] = geoXml.docs[0].gpolygons[0].bounds.getCenter();
   }
   var position = gpolygons[row];
/*
   var lat =  FTresponse.getDataTable().getValue(row,4);
   var lng =  FTresponse.getDataTable().getValue(row,5);
   var position = new google.maps.LatLng(lat, lng);
*/
   // Set up and create the infowindow
   if (!infoWindow) infoWindow = new google.maps.InfoWindow({});
   infoWindow.setOptions({
      content: infoWindowContent(name, description),
      pixelOffset: new google.maps.Size(0, 2),
      position: position
    });
    // Infowindow-opening event handler
    infoWindow.open(map);
}

function initialize(lat,long,zoom) {
  mapOptions = {
                center: new google.maps.LatLng(lat,long),
                zoom: zoom,
                mapTypeId: maptype,
                gestureHandling: 'auto',
                fullscreenControl: false,
                zoomControl: true,
                disableDoubleClickZoom: false,
                mapTypeControl: true,
                mapTypeControlOptions: {
                    style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
                },
                scaleControl: true,
                scrollwheel: false,
                streetViewControl: true,
                draggable : true,
                clickableIcons: true,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: [
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "saturation": 36
            },
            {
                "color": "#000000"
            },
            {
                "lightness": 40
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#000000"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 17
            },
            {
                "weight": 1.2
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 21
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 17
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 29
            },
            {
                "weight": 0.2
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 18
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 19
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#1b3d4b"
            },
            {
                "lightness": 17
            }
        ]
    }
]
              };

        var mapElement = document.getElementById('mapkit-8499');
        var map = new google.maps.Map(mapElement, mapOptions);
        
        var locations = [
            {"title":"Parc Naturel Régional du Morvan","address":"","tel":"","int_tel":"","email":"","web":"","web_formatted":"","open":"","time":"","lat":47.2747998,"lng":4.098828499999968,"vicinity":"Maison du Parc, Saint-Brisson","open_hours":[{"day":"Monday","hours":"open24hours"},{"day":"Tuesday","hours":"open24hours"},{"day":"Wednesday","hours":"open24hours"},{"day":"Thursday","hours":"open24hours"},{"day":"Friday","hours":"open24hours"},{"day":"Saturday","hours":"open24hours"},{"day":"Sunday","hours":"open24hours"}],"marker":{"fillColor":"#4FC3F7","fillOpacity":1,"strokeWeight":0,"scale":1,"path":"M10.2,2.5v4.2c0,0,0,0,0,0L10.2,2.5c-6,0-10.9,4.9-10.9,10.9s10.9,23.8,10.9,23.8v0c0,0,10.9-17.8,10.9-23.8 S16.2,2.5,10.2,2.5z M10.2,17.9c-2.5,0-4.6-2.1-4.6-4.6s2.1-4.6,4.6-4.6s4.6,2.1,4.6,4.6S12.8,17.9,10.2,17.9z M16.8,14.1 c0-0.2,0-0.3,0-0.5C16.9,13.8,16.9,14,16.8,14.1z","anchor":{"x":10,"y":30},"origin":{"x":0,"y":0},"style":0},"iw":{"address":true,"desc":true,"email":true,"enable":true,"int_tel":true,"open":true,"open_hours":true,"photo":true,"tel":true,"title":true,"web":true}},
            {"title":"Parco del Valentino","address":"","tel":"","int_tel":"","email":"","web":"","web_formatted":"","open":"","time":"","lat":45.0548469,"lng":7.686736099999962,"vicinity":"Corso Massimo d'Azeglio, Torino","open_hours":[{"day":"Monday","hours":"open24hours"},{"day":"Tuesday","hours":"open24hours"},{"day":"Wednesday","hours":"open24hours"},{"day":"Thursday","hours":"open24hours"},{"day":"Friday","hours":"open24hours"},{"day":"Saturday","hours":"open24hours"},{"day":"Sunday","hours":"open24hours"}],"marker":{"fillColor":"#4FC3F7","fillOpacity":1,"strokeWeight":0,"scale":1,"path":"M10.2,2.5v4.2c0,0,0,0,0,0L10.2,2.5c-6,0-10.9,4.9-10.9,10.9s10.9,23.8,10.9,23.8v0c0,0,10.9-17.8,10.9-23.8 S16.2,2.5,10.2,2.5z M10.2,17.9c-2.5,0-4.6-2.1-4.6-4.6s2.1-4.6,4.6-4.6s4.6,2.1,4.6,4.6S12.8,17.9,10.2,17.9z M16.8,14.1 c0-0.2,0-0.3,0-0.5C16.9,13.8,16.9,14,16.8,14.1z","anchor":{"x":10,"y":30},"origin":{"x":0,"y":0},"style":0},"iw":{"address":true,"desc":true,"email":true,"enable":true,"int_tel":true,"open":true,"open_hours":true,"photo":true,"tel":true,"title":true,"web":true}}
        ]; 
        for (i = 0; i < locations.length; i++) {
            marker = new google.maps.Marker({
                icon: locations[i].marker,
                position: new google.maps.LatLng(locations[i].lat, locations[i].lng),
                map: map,
                title: locations[i].title,
                address: locations[i].address,
                desc: locations[i].desc,
                tel: locations[i].tel,
                int_tel: locations[i].int_tel,
                vicinity: locations[i].vicinity,
                open: locations[i].open,
                open_hours: locations[i].open_hours,
                photo: locations[i].photo,
                time: locations[i].time,
                email: locations[i].email,
                web: locations[i].web,
                iw: locations[i].iw
            });
            markersArray.push(marker);

            if (locations[i].iw.enable === true){
                bindInfoWindow(marker, map, locations[i]);
            }
        }
    
  var geocoder = new google.maps.Geocoder();
    if (geocoder && geocodeTheCountry) {
      geocoder.geocode( { 'address': CountryName }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
          map.setCenter(results[0].geometry.location);
          map.fitBounds(results[0].geometry.viewport);
          } else {
            alert("No results found");
          }
        } else {
          alert("Geocode was not successful for the following reason: " + status);
        }
      });
    }
// Here is where the states are defined. Simply add them in the array below. For example if you were to add Salzburg you would add:
// -->  ,"\'Salzburg'\" <--
// after Bern.
// The full list of states can be found here: https://fusiontables.google.com/DataSource?dsrcid=576292 (Filter all results where name_0 = Germany or Austria or Switzerland or France)
var states = ["\'Bayern\'", "\'Bavaria\'", "\'Berlin\'", "\'Bern\'", "\'Croydon\'", "\'Tower Hamlets\'", "\'Westminster\'", "\'Ealing\'", "\'Islington\'", "\'Kensington and Chelsea\'", "\'Merton\'", "\'Wandsworth\'", "\'Southwark\'", "\'Barking and Dagenham\'", "\'Bexley\'", "\'Camden\'", "\'Greenwich\'", "\'Harrow\'", "\'Lewisham\'", "\'Bromley\'", "\'Hammersmith and Fulham\'", "\'Redbridge\'", "\'Sutton\'", "\'Haringey\'", "\'Brent\'", "\'Richmond upon Thames\'", "\'Hounslow\'", "\'Hillingdon\'", "\'Waltham Forest\'", "\'Newham\'", "\'Enfield\'", "\'Havering\'", "\'Kingston upon Thames\'", "\'Hackney\'", "\'Lambeth\'"];
var FT_Query = "SELECT 'kml_4326' FROM "+FT_TableID+" WHERE 'name_0' in ('"+CountryName2+"') AND 'name_1' in ("+states+");";
var FT_Options = { suppressInfoWindows: true, query:FT_Query };
// alert("FTquery="+FT_Query);
//document.getElementById("FTquery").innerHTML = FT_Query; 
  layer = new google.maps.FusionTablesLayer(FT_TableID, FT_Options);
  layer.setMap(map);

  google.maps.event.addListener(layer, "click", function(event) {
    infoWindow.close();
// alert("click:"+event.latLng+","+event.infoWindowHtml);
    infoWindow.setContent(infoWindowContent(event.row.name_1.value,event.row.name_0.value));
    infoWindow.setPosition(event.latLng);
    infoWindow.open(map);
  });


//  createSidebar();
}
