@extends('layout')

@section('title','Match The Pairs - Kiosk')

@section('content')
    <div id="game"></div>
@endsection

@push('scripts')
    <script>
        QsoftGame.MatchThePairKiosk('game');
    </script>
@endpush

