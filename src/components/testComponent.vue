<template>
    <div class="row">
        <div class="col-sm-6 mr-5" style="border: 2px solid #e9ecef;border-radius: 10px;">
            <button @click="ReloadChart" type="button" class="btn btn-outline-primary">Reload Chart</button>
            <div id="chartdiv" style="width: 100%; height: 400px;">

            </div>
            <div id="curtain">
                <span><h1>Chart is loading...</h1></span>
            </div>
        </div>
        <div class="col-sm-5" style="border: 0px solid #e9ecef;border-radius: 10px;">
            <div id="chartdivClock"></div>
        </div>
    </div>
</template>




<script>
        export default {
            beforeCreate: function() {
                console.log(this.$_serverName)
            },
            created(){
                this.CreateChart();
                this.createClock();

            },
            mounted(){
                console.log("Mounting Finished");

            },
            methods:{
                ReloadChart(){
                    console.log("Reloading Chart");
                    this.CreateChart();
                },

                /*
                    # Pie Chart
                    # With elastic Start Effect
                    Pie Chart ------------- START --------------------------
                */
                CreateChart()
                {
                    var chart =  AmCharts.makeChart("chartdiv", {
                        "type": "pie",
                        "theme": "light",   // dark , light

                        "addClassNames": true,
                        "legend": {
                            "position": "right",
                            "markerType":"circle",   //square, circle, diamond, triangleUp, triangleDown, triangleLeft, triangleDown, bubble, line
                            "valueAlign":"right",
                            "markerSize":25,
                            "useMarkerColorForValues":true,
                            "valueWidth":80

                        },
                        "innerRadius": "30%",
                        "defs": {
                            "filter": [{
                                "id": "shadow",
                                "width": "200%",
                                "height": "200%",
                                "feOffset": {
                                    "result": "offOut",
                                    "in": "SourceAlpha",
                                    "dx": 0,
                                    "dy": 0
                                },
                                "feGaussianBlur": {
                                    "result": "blurOut",
                                    "in": "offOut",
                                    "stdDeviation": 5
                                },
                                "feBlend": {
                                    "in": "SourceGraphic",
                                    "in2": "blurOut",
                                    "mode": "normal"
                                }
                            }]
                        },
                        "dataLoader": {
                            "url": "http://" + this.$_serverName + ":8855/api/testDataFroPieChart",
                            "format": "json",
                            "init": function (options, chart) {
                                console.log('Loading started');
                            },
                            "load": function (options, chart) {
                                console.log('Loaded file: ' + options.url);
                            },
                            "complete": function (chart) {
                                console.log('Woohoo! Finished loading');
                            },
                            "error": function (options, chart) {
                                console.log('Ummm something went wrong loading this file: ' + options.url);
                            },
                            "progress": function (totalPercent, filePercent, url) {
                                console.log('Total percent loaded: ' + Math.round(totalPercent));
                            }
                        },
                        "valueField": "population",
                        "titleField": "name",
                        "startEffect": "elastic",       // easeOutSine, easeInSine, elastic, bounce
                        "startDuration": 2,
                        "labelRadius": 15,

                        "export": {
                            "enabled": true
                        },
                        "listeners": [{
                            "event": "rendered",
                            "method": function(e) {
                                var curtain = document.getElementById("curtain");
                                curtain.parentElement.removeChild(curtain);
                            }
                        }],
                        "titles": [
                            {
                                "text": "CountryName Vs Population",
                                "size": 18,
                                "alpha":1,
                                "color" : "red"
                            }
                        ]

                    });



                    chart.addListener("init", handleInit);

                    chart.addListener("rollOverSlice", function(e) {
                        handleRollOver(e);
                    });

                    function handleInit(){
                        chart.legend.addListener("rollOverItem", handleRollOver);
                    }

                    function handleRollOver(e){
                        var wedge = e.dataItem.wedge.node;
                        wedge.parentNode.appendChild(wedge);
                    }
                },

                // Pie Chart ------------- END --------------------------

                createClock(){
                    var chart = AmCharts.makeChart( "chartdivClock", {
                         "type": "gauge",
                          "theme": "dark",
                          "startDuration": 0.3,
                          "marginTop": 0,
                          "marginBottom": 0,
                          "axes": [ {
                            "axisAlpha": 0.3,
                            "endAngle": 360,
                            "endValue": 12,
                            "minorTickInterval": 0.2,
                            "showFirstLabel": false,
                            "startAngle": 0,
                            "axisThickness": 2,
                            "valueInterval": 1
                          } ],
                          // Hour
                          "arrows": [ {
                            "radius": "50%",
                            "innerRadius": 0,
                            "clockWiseOnly": true,
                            "nailRadius": 2,
                            "startWidth": 10,
                            "nailAlpha": 1
                          }, {
                            // Mintue
                            "nailRadius": 0,
                            "radius": "80%",
                            "startWidth": 5,
                            "innerRadius": 0,
                            "clockWiseOnly": true
                          }, {
                            // Second
                            "color": "#CC0000",
                            "nailRadius": 5,
                            "startWidth": 6,
                            "innerRadius": 0,
                            "clockWiseOnly": true,
                            "nailAlpha": 1
                          } ],
                          "export": {
                            "enabled": false
                          }
                    } );

// update each second
                    setInterval( updateClock, 1000 );

// update clock
                    function updateClock() {
                        if(chart.arrows.length > 0){
                            // get current date
                            var date = new Date();
                            var hours = date.getHours();
                            var minutes = date.getMinutes();
                            var seconds = date.getSeconds();

                            if(chart.arrows[ 0 ].setValue){
                                // set hours
                                chart.arrows[ 0 ].setValue( hours + minutes / 60 );
                                // set minutes
                                chart.arrows[ 1 ].setValue( 12 * ( minutes + seconds / 60 ) / 60 );
                                // set seconds
                                chart.arrows[ 2 ].setValue( 12 * date.getSeconds() / 60 );
                            }
                        }
                    }
                }

            }

        }


</script>

<style>
    #chartdiv {
        width: 100%;
        height: 500px;
        font-size: 11px;
    }
    #chartdivClock {
        width	: 100%;
	      height	: 150px;
    }

    .amcharts-pie-slice {
        transform: scale(1);
        transform-origin: 50% 50%;
        transition-duration: 0.3s;
        transition: all .3s ease-out;
        -webkit-transition: all .3s ease-out;
        -moz-transition: all .3s ease-out;
        -o-transition: all .3s ease-out;
        cursor: pointer;
        box-shadow: 0 0 30px 0 #000;
    }

    .amcharts-pie-slice:hover {
        transform: scale(1.1);
        filter: url(#shadow);
    }
</style>
