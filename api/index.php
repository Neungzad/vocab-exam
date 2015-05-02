<?php

require 'RestServer.php';
require 'Database.php';
// require 'TestController.php';
require 'VocabController.php';

$mode = 'debug'; // 'debug' or 'production'
$server = new RestServer($mode);
// $server->refreshCache(); // uncomment momentarily to clear the cache if classes change in production mode

//$server->addClass('TestController');

$server->addClass('VocabController', '/vocabs');

$server->handle();
