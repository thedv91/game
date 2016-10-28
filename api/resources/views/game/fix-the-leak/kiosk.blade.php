@extends('layout')

@section('title','Fix The Leak - Kiosk')

@section('content')
    <div id="game"></div>
@endsection

@push('scripts')
    <script>
        QsoftGame.FixTheLeakKiosk('game');
    </script>
@endpush

