@extends('layout')

@section('title','Game Development')

@section('content')

	<style>
		html, body {
			height: 100%;
		}

		body {
			margin: 0;
			padding: 0;
			width: 100%;
			display: table;
			font-weight: 100;
			font-family: 'Lato';
		}

		.container {
			text-align: center;
			display: table-cell;
			vertical-align: middle;
		}

		.content {
			text-align: center;
			display: inline-block;
		}

		.title {
			font-size: 96px;
		}
	</style>
    <div class="container">
		<div class="content">
			<div class="title">Game Development</div>
			<h1>Match the Wally</h1>
			<a href="{!! route('match-the-pair.kiosk') !!}">Kiosk</a> | <a href="{!! route('match-the-pair.arcade') !!}">Arcade</a>
			<h1>Fix the Pipes</h1>
			<a href="{!! route('fix-the-leak.kiosk') !!}">Kiosk</a> | <a href="{!! route('fix-the-leak.arcade') !!}">Arcade</a>
		</div>
	</div>
@endsection
