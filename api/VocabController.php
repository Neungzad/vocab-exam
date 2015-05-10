<?php

class VocabController
{
    /**
     * Get all vocabulary
     *
     * @url GET /
     */
    public function getAllVocab()
    {
        $resultArray = array();

        $conn = Database::connect(); 

        $sql = "SELECT * FROM vocabulary";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {            
            while($row = $result->fetch_assoc()) {          
                $resultArray[] = array(
                    'id'=>$row['id'],
                    'name_th'=>$row['name_th'],
                    'name_eng'=>$row['name_eng']
                    );
            }       
        } 

        return $resultArray;
    }

    /**
     * Get all vocabulary [Format List]
     *
     * @url GET /list
     */
    public function getAllVocabList()
    {
        $resultArray = array();

        $conn = Database::connect(); 

        $sql = "SELECT * FROM vocabulary ORDER BY name_th";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {            
            while($row = $result->fetch_assoc()) {
                $resultArray[$row['name_th']][] = $row['name_eng'];                
            }       
        } 

        return $resultArray;
    }    

    /**    
    * Save score
    *
    * @url POST /save
    */
    public function saveScore()
    {
        $conn = Database::connect(); 

        $sql = "INSERT INTO score SET
                username = '".$_POST['username']."', 
                score = '".$_POST['score']."',
                vocab_id_wrong = '".$_POST['vocab_id_wrong']."',
                create_time = '".date('Y-m-d H:i:s')."'";
        $resultQuery = $conn->query($sql);

        if($resultQuery){
            $result = array("status" => "Success, score saved.");
        }else{
            $result = array("status" => "Fail, can't save score.");
        }

        return $result;
    }

}