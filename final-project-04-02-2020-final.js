//phoebe's mapbox access token
mapboxgl.accessToken = 'pk.eyJ1IjoicGhvZWJlY2hvdyIsImEiOiJjazYyOW1uMngwNzU3M2xxdjg2djRla2ttIn0.3TfoZyTMstZ1O0t8SMzcNw'; //my mapbox account access token
var map = new mapboxgl.Map({
    container: 'map', //container id in HTML
    style: 'mapbox://styles/phoebechow/ck7kufr4s4mze1ips3u4i7ice', //stylesheet location
    center: [110.6197, 28.7047], // starting point = Asia, longitude/latitude
    zoom: 2.5 // starting zoom level
});

//list of colors of sector symbol icons for unclustered points 
const colors = ['#d11242','#e6536b', '#2ebe99', '#256a2e', '#dc8e28', '#262261', '#f37637', '#75437f', '#00818c'];  
//filters for each sector for clusters
const advm = ['==', ['get', 'TECHSEC'], 'Advanced Manufacturing'];
const digm = ['==', ['get', 'TECHSEC'], 'Digital and Media'];
const elep = ['==', ['get', 'TECHSEC'],'Electronics and Peripherals'];
const enct = ['==', ['get', 'TECHSEC'], 'Energy and Clean Technology'];
const lifs = ['==', ['get', 'TECHSEC'], 'Life Sciences'];
const mowc = ['==', ['get', 'TECHSEC'], 'Mobile, Web, and Cloud Integration'];
const sera = ['==', ['get', 'TECHSEC'], 'Services and Analytics'];
const soft = ['==', ['get', 'TECHSEC'], 'Software'];
const telw = ['==', ['get', 'TECHSEC'], 'Telecommunications and Wireless Technology'];

map.on('load', function(){
    //add polygons of CDO relevant Asian countries (17) from Mapbox Vector Tile
    //add data map source of CDO relevant Asian countries (17)
    map.addSource('asia',{
        'type': 'vector',
        'url': 'mapbox://phoebechow.c713x4j4'
    });
    map.addLayer({
        'id': 'asia-fill',
        'type': 'fill',
        'source': 'asia',
        'layout': {},
        //show asian countries by number of locations
        'paint': {
            'fill-color': [
              'interpolate',
              ['linear'],
              ['to-number',['get', 'Locations'],0], // get a number, but if provided with a non-number default to 0
              //symbology classified into 6 quantiles
              0, '#eff3ff',
              1.67, '#c6dbef',
              31.33, '#9ecae1',
              41, '#6baed6',
              62.67, '#4292c6',
              106.33, '#2171b5', 
              298, '#084594'
            ],
            'fill-opacity': 0.3,
        },
        'source-layer': "Asia-boundary-17-5nirj9"
    });
    //change asian country outline width and color
    map.addLayer({
        'id': 'asia-border',
        'type': 'line',
        'source': 'asia',
        'layout': {},
        'paint': {
            'line-width': 1.5,
            //line color to match the quantile classification colors
            'line-color': [
                'interpolate',
                ['linear'],
                ['to-number',['get', 'Locations'],0], // get a number, but if provided with a non-number default to 0
                //line color classified into 6 quantiles
                0, '#eff3ff',
                1.67, '#c6dbef',
                31.33, '#9ecae1',
                41, '#6baed6',
                62.67, '#4292c6',
                106.33, '#2171b5', 
                298, '#084594'
              ],
        },
        'source-layer': "Asia-boundary-17-5nirj9"
    });

    //add points of Canadian Tech Company Locations from Mapbox Vector Tile
    //add map source of Canadian Tech Company Locations 
    map.addSource('company-locations-vector',{
        'type': 'vector', 
        'url': 'mapbox://phoebechow.a8gm1prp',
    });
    //add icon images for different canadian company tech sector/class
    //advanced manufacturing
    map.loadImage(
        'https://www.mastercam.com/wp-content/uploads/2019/02/Mill_Icon.png',
        function(error, image){
            if (error) throw error; 
            map.addImage('icon-am', image);
    });
    //digital and media
    map.loadImage(
        'https://cdn.iconscout.com/icon/free/png-256/social-media-advertising-digital-marketing-branding-announcement-1-6847.png',
        function(error, image){
            if (error) throw error; 
            map.addImage('icon-dm', image);
    });
    //electronics and peripherals 
    map.loadImage(
        'https://cdn1.iconfinder.com/data/icons/data-analytics-and-data-storage-circle-flat-vol-2/100/cpu__chip__processor__computer-512.png',
        function(error, image){
             if (error) throw error; 
             map.addImage('icon-ep', image);
    });
    //energy and clean technology 
    map.loadImage(
        'https://images.squarespace-cdn.com/content/v1/58588d72e6f2e1e1d54aa8e4/1484181711826-VGYED7M25NB4PG3LMKGK/ke17ZwdGBToddI8pDm48kODEHMGUBRgRRplOmqRomK1Zw-zPPgdn4jUwVcJE1ZvWhcwhEtWJXoshNdA9f1qD7Rb66VC8y5UmDKESC3gpGyXuuE80dFkeX9PanWgM3V4qRJePadRz66WmX0L5eMAEew/image-asset.png',
        function(error, image){
             if (error) throw error; 
             map.addImage('icon-ect', image);
    });
    //life sciences 
    map.loadImage(
        'https://health.wyo.gov/wp-content/uploads/2016/02/health-science-icon.png',
        function(error, image){
            if (error) throw error; 
            map.addImage('icon-ls', image);
    });
    //mobile, web, and cloud integration 
    map.loadImage(
        'https://lh3.googleusercontent.com/proxy/O_ip9Xzaaqk4lObbCnEw63XWs2TfIsEFMu44n_VgR_cZDd0DXW5bzCB5plOvGrLX7syTVmGw70791IbwcTMbgZ-a7YooGhedJfAS9Ic-QiLARtW0hs-Zit0QY5Zw_Y70ew',
        function(error, image){
            if (error) throw error; 
            map.addImage('icon-mwci', image);
    });
   //services and analytics 
    map.loadImage(
        'https://cdn0.iconfinder.com/data/icons/infographic-bar-10/512/1-512.png',
        function(error, image){
            if (error) throw error; 
            map.addImage('icon-sa', image);
    });
    //software 
    map.loadImage(
        'https://cdn1.iconfinder.com/data/icons/web-design-and-development-49/64/50-512.png',
        function(error, image){
            if (error) throw error; 
            map.addImage('icon-s', image);
    });
    //telecommunications
    map.loadImage(
        'https://cdn3.iconfinder.com/data/icons/media-50/614/7508_-_Signals_Tower_II-512.png',
        function(error, image){
            if (error) throw error; 
            map.addImage('icon-t', image);
    }); 

    //adding layers of canadian tech companies filtered by tech sector/class
    //advanced manufacturing 
    map.addLayer({
        'id': 'advanced-manufacturing', 
        'source': 'company-locations-vector',
        'source-layer': 'CDO-data-updated-03-29-2020-7okhvy',
        'type': 'symbol',
        'layout': {
            'icon-allow-overlap': true, 
            'icon-image': 'icon-am',
            'icon-size': 0.042,
            //attempt to set icon-size when hovered over (didnt work for icons)
            //"icon-size": ["case", ["boolean", ["feature-state", "hover"], false],  "interpolate", ["linear"], 0.042],
            //"icon-size": ["case", ["boolean", ["feature-state", "hover"], true],  "interpolate", ["linear"], 10]
        },
        'filter': ['==','TECHSEC', 'Advanced Manufacturing']
    });
    //digital and media 
    map.addLayer({
        'id': 'digital-media', 
        'source': 'company-locations-vector',
        'source-layer': 'CDO-data-updated-03-29-2020-7okhvy',
        'type': 'symbol',
        'layout': {
            'icon-image': 'icon-dm',
            'icon-size': 0.09,
            'icon-allow-overlap': true
        },
        'filter': ['==','TECHSEC', 'Digital and Media']
    });
    //electronics and peripherals
    map.addLayer({
        'id': 'electronics-peripherals', 
        'source': 'company-locations-vector',
        'source-layer': 'CDO-data-updated-03-29-2020-7okhvy',
        'type': 'symbol',
        'layout': {
            'icon-image': 'icon-ep',
            'icon-size': 0.035,
            'icon-allow-overlap': true
        },
        'filter': ['==','TECHSEC', 'Electronics and Peripherals']
    });
    //energy and clean tech
    map.addLayer({
        'id': 'energy-cleantech', 
        'source': 'company-locations-vector',
        'source-layer': 'CDO-data-updated-03-29-2020-7okhvy',
        'type': 'symbol',
        'layout': {
            'icon-image': 'icon-ect',
            'icon-size': 0.075,
            'icon-allow-overlap': true
        },
        'filter': ['==','TECHSEC', 'Energy and Clean Technology']
    });
    //life sciences
    map.addLayer({
        'id': 'life-sciences', 
        'source': 'company-locations-vector',
        'source-layer': 'CDO-data-updated-03-29-2020-7okhvy',
        'type': 'symbol',
        'layout': {
            //'icon-image': 'confectionery-15',
            //'icon-color': 'red'
            'icon-image': 'icon-ls',
            'icon-size': 0.1,
            'icon-allow-overlap': true
        },
        'filter': ['==','TECHSEC', 'Life Sciences']
    });
    //mobile, web, & cloud integration
    map.addLayer({
        'id': 'mobile-web-cloud', 
        'source': 'company-locations-vector',
        'source-layer': 'CDO-data-updated-03-29-2020-7okhvy',
        'type': 'symbol',
        'layout': {
            'icon-image': 'icon-mwci',
            'icon-size': 0.03,
            'icon-allow-overlap': true
        },
        'filter': ['==','TECHSEC', 'Mobile, Web, and Cloud Integration']
    });
    //services & analytics
    map.addLayer({
        'id': 'services-analytics', 
        'source': 'company-locations-vector',
        'source-layer': 'CDO-data-updated-03-29-2020-7okhvy',
        'type': 'symbol',
        'layout': {
            'icon-image': 'icon-sa',
            'icon-size': 0.034,
            'icon-allow-overlap': true
        },
        'filter': ['==','TECHSEC', 'Services and Analytics']
    });
    //software 
    map.addLayer({
        'id': 'software', 
        'source': 'company-locations-vector',
        'source-layer': 'CDO-data-updated-03-29-2020-7okhvy',
        'type': 'symbol',
        'layout': {
            'icon-image': 'icon-s',
            'icon-size': 0.035,
            'icon-allow-overlap': true
        },
        'filter': ['==','TECHSEC', 'Software']
    });
    //telecommunications and wireless
    map.addLayer({
        'id': 'telecommunications-wireless', 
        'source': 'company-locations-vector',
        'source-layer': 'CDO-data-updated-03-29-2020-7okhvy',
        'type': 'symbol',
        'layout': {
            'icon-image': 'icon-t',
            'icon-size': 0.035,
            'icon-allow-overlap': true
        },
        'filter': ['==','TECHSEC', 'Telecommunications and Wireless Technology']
    });

   //default sector layer properties to visible, so that user only clicks once to hide layer on toggle list
    map.setLayoutProperty ('advanced-manufacturing', 'visibility', 'visible');
    map.setLayoutProperty ('digital-media', 'visibility', 'visible');
    map.setLayoutProperty ('electronics-peripherals', 'visibility', 'visible');
    map.setLayoutProperty ('energy-cleantech', 'visibility', 'visible');
    map.setLayoutProperty ('life-sciences', 'visibility', 'visible');
    map.setLayoutProperty ('mobile-web-cloud', 'visibility', 'visible');
    map.setLayoutProperty ('services-analytics', 'visibility', 'visible');
    map.setLayoutProperty ('software', 'visibility', 'visible');
    map.setLayoutProperty ('telecommunications-wireless', 'visibility', 'visible');

   //add points of canadian tech company locations from local geojson file for clustering 
   //add map source of Canadian Tech Comapny Locations (geojson)
    map.addSource('company-locations-geojson',{
        type: 'geojson',
        data: companies, //variable created in geoJSON file 
        cluster: true,
        clusterMaxZoom: 8, // Max zoom to cluster points on
        clusterRadius: 80, // Radius of each cluster when clustering points
    });

    //add layer for clusters 
    map.addLayer({
        'id': 'clusters', 
        'type': 'circle',
        'source': 'company-locations-geojson',
        filter: ['has', 'point_count'],
        paint: {
        //four step clusters:
        //   * lightest orange: 25px circles when point count is less than 50
        //   * light orange: 35px circles when point count is between 50 and 100
        //   * orange: 45px circles when point count is between 100 and 400
        //   * dark orange: 55px circles when point count is greater than or equal to 300
        'circle-color': [
            'step',
            ['get', 'point_count'],
            '#ffd0b1',
            50,
            '#ff944e',
            100,
            '#ff6500',
            300,
            '#b14600'
            ],
        'circle-radius': [
            'step',
            ['get', 'point_count'],
            25,50,
            35,100,
            45,300,
            55],
        }
    });

    //add layer for clusters point count 
    map.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'company-locations-geojson',
        filter: ['has', 'point_count'],
        layout: {
            'text-field': '{point_count_abbreviated}',
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 14
        }
    });
    
    //add layer for individual companies (unclustered points)
    //add layer for dot (individual companies - unclustered points)
    map.addLayer({
        'id': 'companies_individual',
        'type': 'circle',
        'source': 'company-locations-geojson',
        'filter': ['!=', ['get', 'cluster'], true], //unclustered points
        'paint': {
            'circle-color': ['case',
                advm, colors[0],
                digm, colors[1],
                elep, colors[2],
                enct, colors[3],
                lifs, colors[4],
                mowc, colors[5],
                sera, colors[6],
                soft, colors[7],
                telw, colors[8], '#ffed6f'], //set each individual company with corresponding color to sector icon image
            'circle-radius': 4
        }
      });
    //add layer for outline (individual companies - unclustered points)
    map.addLayer({
        'id': 'companies_individual_outer',
        'type': 'circle',
        'source': 'company-locations-geojson',
        'filter': ['!=', ['get', 'cluster'], true], //unclustered points
        'paint': { 
            'circle-stroke-color': ['case',
                advm, colors[0],
                digm, colors[1],
                elep, colors[2],
                enct, colors[3],
                lifs, colors[4],
                mowc, colors[5],
                sera, colors[6],
                soft, colors[7],
                telw, colors[8], '#ffed6f'], //set each individual company with corresponding color to sector icon image
            'circle-stroke-width': 2.5,
            'circle-radius': 7, 
            'circle-color': "rgba(0, 0, 0, 0)"
        }
      });

    //hide cluster layers until user clicks on cluster option 
    map.setLayoutProperty ('clusters', 'visibility', 'none');
    map.setLayoutProperty('cluster-count', 'visibility', 'none');
    map.setLayoutProperty('companies_individual', 'visibility', 'none');
    map.setLayoutProperty('companies_individual_outer', 'visibility', 'none');
});

//asian countries interactions: 
//create a popup object for number of company locations per country
    //will use same popup for company descriptions (vector points and geojson unclustered points)
    var popup = new mapboxgl.Popup({
        closeButton: true,  //allow users to close popup
        closeOnClick: null
    });
//popup for number of company locations per country 
    map.on('click','asia-fill',function(e){
        popup.remove();  //removes existing popup
        //get the rendered features that belong to the asia-fill layer
        var features = map.queryRenderedFeatures(e.point, {
            "layers": ["asia-fill"]}
        );
        //if there is a feature there, do the following
        if (features.length > 0){
            console.log(features[0]); //print out the first element of the features array that was selected
            var feature = features[0]; //store the first element as 'feature'
            popup.setLngLat(e.lngLat); //place the popup window at the lng and lat where your click event happened
            //add stuff to the pop up:
            popup.setHTML("<b>" + feature.properties.CNTRY_NAME + "</b><br> The number of Canadian Tech Company locations in " + feature.properties.CNTRY_NAME + " is: " + feature.properties.Locations);
            popup.addTo(map); //finally add the pop up to the map

        }
        //if there are no features under the click, then print this in the web browser console
        else{
            console.log("no features from layer here...")
        }
    });
//change mouse point when user hovers over clusters
    map.on('mouseenter','asia-fill',function(e){   //when your mouse enters the asia-fill layer
        map.getCanvas().style.cursor = 'pointer';    //change the mouse cursor to a pointer
    });
    map.on('mouseleave','asia-fill',function(e){
        map.getCanvas().style.cursor = '';              //when the mouse leaves the asia fill layer
    });

//canadian company locations interactions: 
//variables for hovering over locations to show relevant description 
    //target the relevant span tags in the location-description div 
    var compDisplay = document.getElementById('com');
    var provDisplay = document.getElementById('prov');
    var multicDisplay = document.getElementById('multic');
    var secDisplay = document.getElementById('sec');
    var cityDisplay = document.getElementById('city');
    var countryDisplay = document.getElementById('country');

    //list of CDO Techmap sector layers 
    var seclist = ['advanced-manufacturing', 'digital-media', 'electronics-peripherals', 'energy-cleantech', 'life-sciences', 'mobile-web-cloud', 'services-analytics','software', 'telecommunications-wireless'];
    var locID = null;

//loop through all sector layers to minimize code
    for (var b = 0; b < seclist.length; b++) {

        var id1 = seclist[b];
    
        //hover description for each sector layer
        map.on('mouseenter', id1, (e) => {
            
            map.getCanvas().style.cursor = 'pointer';
            // Set variables equal to the current feature's magnitude, location, and time
            var locCompany = e.features[0].properties.CADPARCOMP;
            var locProv = e.features[0].properties.CADPROVHQ;
            var locMultic = e.features[0].properties.MULTICOUNT;
            var locSec = e.features[0].properties.TECHSEC;
            var locCity = e.features[0].properties.CITY;
            var locCountry = e.features[0].properties.COUNTRY;
    
            // Check whether features exist
            if (e.features.length > 0) {
                // Display the magnitude, location, and time in the sidebar
                compDisplay.textContent = locCompany; 
                provDisplay.textContent = locProv; 
                multicDisplay.textContent = locMultic; 
                secDisplay.textContent = locSec; 
                cityDisplay.textContent = locCity; 
                countryDisplay.textContent = locCountry; 
        
                // If quakeID for the hovered feature is not null,
                // use removeFeatureState to reset to the default behavior
                if (locID) {
                    map.removeFeatureState({
                    source: "company-locations-vector",
                    id: id1
                    });
                }
        
                locID = e.features[0].id;
                
                // When the mouse moves over the earthquakes-viz layer, set the
                // feature state for the feature under the mouse
                map.setFeatureState({
                    source: 'company-locations-vector',
                    id: id1
                }, {
                    hover: true
                });
            }
        });

        //popup for each sector layer
        map.on('click', id1, function(e){
            //removes existing popup 
            popup.remove();
            map.flyTo({ center: e.features[0].geometry.coordinates, zoom:12});
            var coordinates = e.features[0].geometry.coordinates.slice();
            var name = e.features[0].properties.CADPARCOMP; 
            var address = e.features[0].properties.ADDRESS; 
            var sector = e.features[0].properties.TECHSEC; 

            //var description = e.features[0].properties.TECHSEC;
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }
                popup
                .setLngLat(coordinates)
                .setHTML("<b>"+ name + "<br><br> Address: </b>" + address)
                .addTo(map);
        });
    }

//second loop to remove previously hovered information and remove mouse point 
    for (var c = 0; c < seclist.length; c++) {

        var id2 = seclist[c];
    
        map.on('mouseleave', id2, function() {
            if (locID) {
                map.setFeatureState({
                source: 'company-locations-vector',
                id: id2
                }, {
                hover: false
                });
            }
            locID = null;
            // Remove the information from the previously hovered feature from the sidebar
            compDisplay.textContent = ''; 
            provDisplay.textContent = ''; 
            multicDisplay.textContent = ''; 
            secDisplay.textContent = ''; 
            cityDisplay.textContent = ''; 
            countryDisplay.textContent = ''; 

            map.getCanvas().style.cursor = '';
        }); 
    }

//create toggle layer for different canadian tech company sectors
    //list of tech sector layers 
    var toggleLayerIds = ['advanced-manufacturing', 'digital-media', 'electronics-peripherals', 'energy-cleantech', 'life-sciences', 'mobile-web-cloud', 'services-analytics','software', 'telecommunications-wireless'];
    
    function showLayers(layer_ids) {

        for (var i = 0; i < layer_ids.length; i++) {

            var id = layer_ids[i];

            var link = document.createElement('a');
            link.href = '#';
            link.className = 'active'; //default toggle list to active
            link.textContent = id; 

            //set toggle list name
            if (id === 'advanced-manufacturing'){
                link.textContent = "Advanced Manufacturing";
            } else if (id === 'digital-media'){
                link.textContent = "Digital and Media";
            } else if (id === 'electronics-peripherals'){
                link.textContent = "Electronics and Peripherals";
            } else if (id === 'energy-cleantech'){
                link.textContent = "Energy and Cleantech";
            } else if (id === 'life-sciences'){
                link.textContent = "Life Sciences";
            } else if (id === 'mobile-web-cloud'){
                link.textContent = "Mobile, Web, and Cloud Integration";
            } else if (id === 'services-analytics'){
                link.textContent = "Services and Analytics";
            } else if (id === 'software'){
                link.textContent = "Software";
            } else if (id === 'telecommunications-wireless'){
                link.textContent = "Telecommunications and Wireless";
            } 

            link.onclick = function(e) {
                // Retrieve the clicked layer
                    var clickedLayer = null;
                if (this.textContent === 'Advanced Manufacturing'){
                    clickedLayer = "advanced-manufacturing";
                } else if (this.textContent === 'Digital and Media'){
                    clickedLayer = "digital-media";
                } else if (this.textContent === 'Electronics and Peripherals'){
                    clickedLayer = "electronics-peripherals";
                } else if (this.textContent === 'Energy and Cleantech'){
                    clickedLayer = "energy-cleantech";
                } else if (this.textContent === 'Life Sciences'){
                    clickedLayer = "life-sciences";
                } else if (this.textContent === 'Mobile, Web, and Cloud'){
                    clickedLayer = "mobile-web-cloud";
                } else if (this.textContent === 'Services and Analytics'){
                    clickedLayer = "services-analytics";
                } else if (this.textContent === 'Software'){
                    clickedLayer = "software";
                } else if (this.textContent === 'Telecommunications and Wireless'){
                    clickedLayer = "telecommunications-wireless";
                } 
                
                e.preventDefault();
                e.stopPropagation();
                var visibility = map.getLayoutProperty(clickedLayer, 'visibility');
                //if clicked layer is visible hide, else show hidden layer
                if (visibility === 'visible') {
                        map.setLayoutProperty(clickedLayer, 'visibility', 'none');
                        this.className = '';
                } else {
                        this.className = 'active';
                        map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
                }
            };
            var layers = document.getElementById('filter-group');
            layers.appendChild(link);
        }
    } showLayers(toggleLayerIds);

//cluster interactions: 
//inspect a cluster and zoom in on click
    map.on('click', 'clusters', function(e) {
        popup.remove(); 
        var features = map.queryRenderedFeatures(e.point, {
            layers: ['clusters']
        });
        var clusterId = features[0].properties.cluster_id;
        map.getSource('company-locations-geojson').getClusterExpansionZoom(
            clusterId,
            function(err, zoom) 
            { if (err) return;
                map.easeTo({
                    center: features[0].geometry.coordinates,
                    zoom: zoom
                });
            }
        );
    });
//change mouse point when user hovers over clusters
    map.on('mouseenter','clusters',function(e){ 
        map.getCanvas().style.cursor = 'pointer'; 
        });
    map.on('mouseleave','clusters',function(e){
        map.getCanvas().style.cursor = '';  
    });

//popup description for each unclustered point 
    map.on('click', 'companies_individual', function(e) {
        popup.remove();
        map.flyTo({ center: e.features[0].geometry.coordinates, zoom:12});

        var coordinates = e.features[0].geometry.coordinates.slice();
        var name = e.features[0].properties.CADPARCOMP; 
        var address = e.features[0].properties.ADDRESS; 
        var sector = e.features[0].properties.TECHSEC;

        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
        // Ensure that if the map is zoomed out such that multiple copies of the feature are visible, the
        // popup appears over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
        
        popup
        .setLngLat(coordinates)
            .setHTML("<b>"+ name + "<br> Tech Sector: </b>" + sector + "<br> <b> Address: </b>" + address)
            .addTo(map);
    });
//change mouse point when user hovers over unclustered points
    map.on('mouseenter','companies_individual',function(e){  
        map.getCanvas().style.cursor = 'pointer';    
    });
    map.on('mouseleave','companies_individual',function(e){
        map.getCanvas().style.cursor = '';             
    });

//cluster option to enable and disable clustering 
    var link2 = document.createElement('a');
    link2.href = '#';
    link2.className = ' ';
    link2.textContent = 'Clusters'; //name of cluster option button
    
    //if users click on cluster option 
    link2.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        var visibility2 = map.getLayoutProperty('clusters', 'visibility');
        
    //if clustering is enabled on click (user is trying to turn off clustering)
        if (visibility2 === 'visible') {
        //hide cluster layers 
            map.setLayoutProperty('clusters', 'visibility', 'none');
            map.setLayoutProperty('cluster-count', 'visibility', 'none');
            map.setLayoutProperty('companies_individual', 'visibility', 'none');
            map.setLayoutProperty('companies_individual_outer', 'visibility', 'none');
        //show sector layers (vector)
            map.setLayoutProperty ('advanced-manufacturing', 'visibility', 'visible');
            map.setLayoutProperty ('digital-media', 'visibility', 'visible');
            map.setLayoutProperty ('electronics-peripherals', 'visibility', 'visible');
            map.setLayoutProperty ('energy-cleantech', 'visibility', 'visible');
            map.setLayoutProperty ('life-sciences', 'visibility', 'visible');
            map.setLayoutProperty ('mobile-web-cloud', 'visibility', 'visible');
            map.setLayoutProperty ('services-analytics', 'visibility', 'visible');
            map.setLayoutProperty ('software', 'visibility', 'visible');
            map.setLayoutProperty ('telecommunications-wireless', 'visibility', 'visible');
        //show sector filters and hover descriptions
            document.getElementById('filter-group').style.visibility = '';
            document.getElementById('location-description').style.visibility = '';
        //attempt to reset sector filter class
            //document.getElementById('filter-group').className = 'active'; 
            
            this.className = ' '; // reset 

        } else { //else clustering is disabled on click (user is trying to turn on clustering)
        //show cluster layers
            map.setLayoutProperty('clusters', 'visibility', 'visible');
            map.setLayoutProperty('cluster-count', 'visibility', 'visible');
            map.setLayoutProperty('companies_individual', 'visibility', 'visible');
            map.setLayoutProperty('companies_individual_outer', 'visibility', 'visible');
        //hide sector layers (vector)
            map.setLayoutProperty ('advanced-manufacturing', 'visibility', 'none');
            map.setLayoutProperty ('digital-media', 'visibility', 'none');
            map.setLayoutProperty ('electronics-peripherals', 'visibility', 'none');
            map.setLayoutProperty ('energy-cleantech', 'visibility', 'none');
            map.setLayoutProperty ('life-sciences', 'visibility', 'none');
            map.setLayoutProperty ('mobile-web-cloud', 'visibility', 'none');
            map.setLayoutProperty ('services-analytics', 'visibility', 'none');
            map.setLayoutProperty ('software', 'visibility', 'none');
            map.setLayoutProperty ('telecommunications-wireless', 'visibility', 'none');
        //hide sector filters and hover descriptions
            document.getElementById('location-description').style.visibility = 'hidden';
            document.getElementById('filter-group').style.visibility = 'hidden';
            
            this.className = 'active';
        }
    };
    var layers2 = document.getElementById('cluster-option');
    layers2.appendChild(link2);

//add full screen, zoom, and rotation controls to the bottom left corner of map
map.addControl(new mapboxgl.FullscreenControl(), 'bottom-left'); 
map.addControl(new mapboxgl.NavigationControl(), 'bottom-left');
