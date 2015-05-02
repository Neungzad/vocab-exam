<?php

class VocabController
{
    /**
     * Get all vocabulary
     *
     * @url GET /
     */
    public function kak()
    {
        $db = Database::connect();

        return $db;
    }   
}