<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Portfolio</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700;900&display=swap" rel="stylesheet">

        @vite(['resources/css/app.css', 'resources/js/app.jsx'])
    </head>
    <body class="bg-white dark:bg-black text-black dark:text-white antialiased transition-colors duration-700">
        <div id="app"></div>
    </body>
</html>
