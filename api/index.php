<?php

// Create directory for compiled views on Vercel
$compiledPath = '/tmp/storage/framework/views';
if (!is_dir($compiledPath)) {
    mkdir($compiledPath, 0755, true);
}

// Create directory for sessions on Vercel
$sessionsPath = '/tmp/storage/framework/sessions';
if (!is_dir($sessionsPath)) {
    mkdir($sessionsPath, 0755, true);
}

require __DIR__ . '/../public/index.php';
