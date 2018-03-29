<template>
    <div>
        <button @click="ReloadChart">Reload Chart</button>
        <div id="chartdiv" style="width: 100%; height: 400px;"></div>
        <div id="curtain"><span><h1>Chart is loading...</h1></span></div>
    </div>

</template>




<script>
        export default {
            beforeCreate: function() {
                console.log(this.$_serverName)
            },
            created(){
                this.CreateChart();

            },
            mounted(){
                console.log("Mounting Finished");

            },
            methods:{
                ReloadChart(){
                    console.log("Reloading Chart");
                    this.CreateChart();
                },
                CreateChart()
                {
                    var chart =  AmCharts.makeChart("chartdiv", {
                        "type": "pie",
                        "theme": "light",   // dark , light

                        "addClassNames": true,
                        "legend": {
                            "position": "right",
                            "marginRight": 100,
                            "autoMargins": false
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
                        }]

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