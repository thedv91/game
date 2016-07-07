<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8"/>
    <title>Memory Game</title>

    <link rel="stylesheet" type="text/css" href="css/style.css">

    <script type="text/javascript" src="https://code.jquery.com/jquery-3.0.0.min.js"></script>

    <script type="text/javascript" src="phaser.min.js"></script>
    <script type="text/javascript" src="bower_components/phaser-state-transition-plugin/dist/phaser-state-transition-plugin.min.js"></script>

    <script type="text/javascript" src="lib/canvasinput.js"></script>
    <script type="text/javascript" src="js/boot.js"></script>
    <script type="text/javascript" src="js/load.js"></script>
    <script type="text/javascript" src="js/menu.js"></script>
    <script type="text/javascript" src="js/play.js"></script>
    <script type="text/javascript" src="js/win.js"></script>
    <script type="text/javascript" src="js/game.js"></script>

    <style type="text/css">
        body {
            margin: 0;
        }
        /*canvas {
            margin: 0px auto;
        }*/
    </style>

</head>
<body>
    <div class="font_preload" style="opacity: 0">
        <span style="font-family: 'AvenirNextLTProBold', Arial, sans-serif;"></span>
        <span style="font-family: 'AvenirNextLTProBoldCn', Arial, sans-serif;"></span>
        <span style="font-family: 'AvenirNextLTProBoldCnIt', Arial, sans-serif;"></span>
        <span style="font-family: 'AvenirNextLTProCn', Arial, sans-serif;"></span>
        <span style="font-family: 'AvenirNextLTProCnIt', Arial, sans-serif;"></span>
        <span style="font-family: 'AvenirNextLTProDemi', Arial, sans-serif;"></span>
        <span style="font-family: 'AvenirNextLTProDemiCn', Arial, sans-serif;"></span>
        <span style="font-family: 'AvenirNextLTProDemiCnIt', Arial, sans-serif;"></span>
        <span style="font-family: 'AvenirNextLTProDemiIt', Arial, sans-serif;"></span>
        <span style="font-family: 'AvenirNextLTProHeavyCn', Arial, sans-serif;"></span>
        <span style="font-family: 'AvenirNextLTProHeavyCnIt', Arial, sans-serif;"></span>
        <span style="font-family: 'AvenirNextLTProIt', Arial, sans-serif;"></span>
        <span style="font-family: 'AvenirNextLTProMediumCn', Arial, sans-serif;"></span>
        <span style="font-family: 'AvenirNextLTProMediumCnIt', Arial, sans-serif;"></span>
        <span style="font-family: 'AvenirNextLTProRegular', Arial, sans-serif;"></span>
        <span style="font-family: 'AvenirNextLTProUltLtCn', Arial, sans-serif;"></span>
        <span style="font-family: 'AvenirNextLTProUltLtCnIt', Arial, sans-serif;"></span>
    </div>
    <!--<h3 style="font-family: AvenirNextLTProBold; font-size: 48px; ">MATCH THE PAIR</h3>-->
    <div id="gameDiv"></div>
</body>

</html>