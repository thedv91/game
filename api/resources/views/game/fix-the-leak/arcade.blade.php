@extends('layout')

@section('title','Fix The Leak - Arcade')

@section('content')
    <div id="game"></div>
@endsection

@push('scripts')
    <script>
        QsoftGame.FixTheLeakArcade('game');
    </script>
@endpush

