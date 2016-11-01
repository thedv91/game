<!DOCTYPE html>
<html lang="en">

<head>	
	<meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
	<title>@yield('title')</title>
	<link rel="stylesheet" type="text/css" href="/styles/css/app.css">
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
	<span style="position: absolute; left: -2000px; top : -2000px;">
        <p class="load-font AvenirNextLTPro-HeavyCn">FAP</p>
        <p class="load-font AvenirNextLTPro-UltLtCn">FAP</p>
        <p class="load-font AvenirNextLTPro-DemiCn">FAP</p>
        <p class="load-font AvenirNextLTPro-BoldCn">FAP</p>
        <p class="load-font AvenirNextLTPro-Regular">FAP</p>
    </span>
	@yield('content')
	<script src="/dist/app.bundle.js"></script>
	@yield('script')
    @stack('scripts')
</body>

</html>