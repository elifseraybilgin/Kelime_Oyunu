<?php

//https://github.com/umitkayacan/Json-Turce-Karakter-Sorunu
//Turkce Karakter Sorunu
function json_Duzelt($str)
{
	$json_karakterler = array("\u00fc","\u011f","\u0131","\u015f","\u00e7","\u00f6","\u00dc","\u011e","\u0130","\u015e","\u00c7","\u00d6","\u201c","\u201d","\u2019");
	$tr_karakterler = array("ü","ğ","ı","ş","ç","ö","Ü","Ğ","İ","Ş","Ç","Ö","“","”","’");
	$turkce = str_replace($json_karakterler, $tr_karakterler, $str);
	return $turkce;
}
    if($_POST){
        
      header('Location: http://'.$_SERVER['HTTP_HOST'].'/KelimeOyunu/index.html', TRUE, 303);     

        $soru = $_POST['soru'];
        $cevap = $_POST['cevap'];
        

        if(trim(strlen($cevap))==4){
            $str = file_get_contents('sorular.json');
            $arr=json_decode($str,true);
            array_push($arr['level1'], array('question' => $soru,'answer' => strtoupper($cevap)));
            echo "<pre>";
            $str= json_encode($arr, JSON_PRETTY_PRINT);
            echo "<pre>";
           if (json_Duzelt($str) != null)
            {              
              $file = fopen('sorular.json','w');
              $str1=json_Duzelt($str);
              fwrite($file, $str1);
              fclose($file);
            }
        }    
        if(trim(strlen($cevap))==5){
          $str = file_get_contents('sorular.json');
          $arr=json_decode($str,true);
          array_push($arr['level2'], array('question' => $soru,'answer' => strtoupper($cevap)));
          echo "<pre>";
          $str= json_encode($arr, JSON_PRETTY_PRINT);
          echo "<pre>";
         if (json_Duzelt($str) != null)
          {              
            $file = fopen('sorular.json','w');
            $str1=json_Duzelt($str);
            fwrite($file, $str1);
            fclose($file);
          }
        }
        if(trim(strlen($cevap))==6){
          $str = file_get_contents('sorular.json');
          $arr=json_decode($str,true);
          array_push($arr['level3'], array('question' => $soru,'answer' => strtoupper($cevap)));
          echo "<pre>";
          $str= json_encode($arr, JSON_PRETTY_PRINT);
          echo "<pre>";
         if (json_Duzelt($str) != null)
          {              
            $file = fopen('sorular.json','w');
            $str1=json_Duzelt($str);
            fwrite($file, $str1);
            fclose($file);
          }      
        }
        if(trim(strlen($cevap))==7){
          $str = file_get_contents('sorular.json');
          $arr=json_decode($str,true);
          array_push($arr['level4'], array('question' => $soru,'answer' => strtoupper($cevap)));
          echo "<pre>";
          $str= json_encode($arr, JSON_PRETTY_PRINT);
          echo "<pre>";
         if (json_Duzelt($str) != null)
          {              
            $file = fopen('sorular.json','w');
            $str1=json_Duzelt($str);
            fwrite($file, $str1);
            fclose($file);
          }       
        }
        if(trim(strlen($cevap))==8){
          $str = file_get_contents('sorular.json');
          $arr=json_decode($str,true);
          array_push($arr['level5'], array('question' => $soru,'answer' => strtoupper($cevap)));
          echo "<pre>";
          $str= json_encode($arr, JSON_PRETTY_PRINT);
          echo "<pre>";
         if (json_Duzelt($str) != null)
          {              
            $file = fopen('sorular.json','w');
            $str1=json_Duzelt($str);
            fwrite($file, $str1);
            fclose($file);
          }       
        }
        if(trim(strlen($cevap))==9){
          $str = file_get_contents('sorular.json');
          $arr=json_decode($str,true);
          array_push($arr['level6'], array('question' => $soru,'answer' => strtoupper($cevap)));
          echo "<pre>";
          $str= json_encode($arr, JSON_PRETTY_PRINT);
          echo "<pre>";
         if (json_Duzelt($str) != null)
          {              
            $file = fopen('sorular.json','w');
            $str1=json_Duzelt($str);
            fwrite($file, $str1);
            fclose($file);
          }      
        }        
        if(trim(strlen($cevap))==10){
          $str = file_get_contents('sorular.json');
          $arr=json_decode($str,true);
          array_push($arr['level7'], array('question' => $soru,'answer' => strtoupper($cevap)));
          echo "<pre>";
          $str= json_encode($arr, JSON_PRETTY_PRINT);
          echo "<pre>";
         if (json_Duzelt($str) != null)
          {              
            $file = fopen('sorular.json','w');
            $str1=json_Duzelt($str);
            fwrite($file, $str1);
            fclose($file);
          }
        }        
    }

?>