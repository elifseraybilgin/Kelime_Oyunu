<?php

//https://github.com/umitkayacan/Json-Turce-Karakter-Sorunu
//Turkce Karakter Sorunu
function json_Duzelt($str)
{
	$json_karakterler = array("\u00fc","\u011f","\u0131","\u015f","\u00e7","\u00f6","\u00dc","\u011e","\u0130","\u015e","\u00c7","\u00d6","\u201c","\u201d","\u2019","\/");
	$tr_karakterler = array("ü","ğ","ı","ş","ç","ö","Ü","Ğ","İ","Ş","Ç","Ö","“","”","’","/");
	$turkce = str_replace($json_karakterler, $tr_karakterler, $str);
	return $turkce;
}
       
if($_POST){

    header('Location: http://'.$_SERVER['HTTP_HOST'].'/KelimeOyunu/index.html', TRUE, 303);     

    $oadi=$_POST['oadi'];
    $opuan=$_POST['opuan'];
    $okalansure=$_POST['okalansure'];
    $otarihi=$_POST['otarihi'];
    $ozamani=$_POST['ozamani'];

    $str = file_get_contents('sonuclar.json');
    $arr=json_decode($str,true);
    array_push($arr['kisiler'], array('Adi' => $oadi,'Puani' => $opuan,'KalanSure' => $okalansure,'Tarih' => $otarihi,'Zaman' => $ozamani));
    echo "<pre>";
    $str= json_encode($arr, JSON_PRETTY_PRINT);
    echo "<pre>";
    if (json_Duzelt($str) != null)
    {              
        $file = fopen('sonuclar.json','w+');
        $str1=json_Duzelt($str);
        fwrite($file, $str1);
        fclose($file);
    }
}

else{
    echo "hata";
}


?>