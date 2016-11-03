@extends('layout')

@section('title','Match The Pairs - Arcade')

@section('content')
    <div id="game"></div>
@endsection

@push('scripts')
    <script>
        QsoftGame.MatchThePairArcade('game');
    </script>
@endpush

