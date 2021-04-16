$.fn.kelimeOyunu = function() {

//-----------------------------------------------------DEGISKENLER-----------------------------------------------------//
    var oyunZamaniMS = 240000 ; 
    var Tahmin = false;
    var Baslama = false;
    var Durdurma = false;
    var Pasif = true;
    var MevcutSoruSayisi = 1; 
    var ToplamSoruSayisi = 14; 
    var MevcutLevel = 1; 
    var Puan = 0;
    var MevcutAnahtarKelime = "";
    var MevcutSoru = "";
    var KullanilanAnahtarKelime = []; 
    var EkstraZaman = false;
    var Soru=false;
    var OyunIciSure;

    // Kok
    var root = this;

    var Puani = "PUAN : ";

    // Oyun Zamani D-M-Y / H-M-S
    var today = new Date();
    var date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
//-----------------------------------------------------DEGISKENLER-----------------------------------------------------//

//-------------------------------------------------OYUN ALANI UST ALAN-------------------------------------------------//
    // Oyun Alani Tasarimi Ust Alan
    oyunAlani();
    function oyunAlani()
    {
        // Puan Zaman ve Butonlar
        root.append("<div class='UstAlan'><div class='Puan'><span><em>" + Puani + "</em>0</span></div><div class='SureSayac'><span class='Sure'>04:00</span></div><div class='Butonlar'><button disabled class='HarfIste'>"+"HARF ISTE (SPACE)"+"</button><button disabled class='TahminEt'>"+ "TAHMIN ET (ENTER)" +"</button></div></div>");
    }
//-------------------------------------------------OYUN ALANI UST ALAN-------------------------------------------------//

//-----------------------------------------------------GIRIS MENU------------------------------------------------------//
    // Giris Menu Tasarimi
    girisMenu();
    function girisMenu()
    {       
        if(!Baslama && root.has(".GirisMenu") || !Soru && root.has(".GirisMenu"))
        {
            root.append("<div class='GirisMenu'><div><h1 class='OyunAdi'>"+"KELIME OYUNU"+"</h1><button id='cndkStart'>"+"OYUNA  BASLA"+"</button><button id='SoruEkle'>"+"SORU EKLE"+"</button><button id='SkorTablosu'>"+"SKOR TABLOSU"+"</button><button id='kurallar'>"+"KURALLAR"+"</button><button id='hakkinda'>"+"HAKKINDA"+"</button></div></div>");

            // Oyun Baslama Tiklamasi
            $(document).on("click", "#cndkStart", function() {
                $('.GirisMenu').hide();
                $(".isimMenu").remove();
                root.append("<div class='isimMenu'><h1 class='OyunAdi2'>"+"KELIME OYUNU"+"</h1><input class='OyuncuAdi' id='OyuncuAdi' type='text' autocomplete='off' placeholder='Isminizi Giriniz...'></input><button id='devam'>"+"DEVAM"+"</button><button class='Geridon'><a href='index.html' >"+"ANA SAYFA"+"</a></button></div>");               
            });

            //Soru Ekleme Tiklamasi
            $(document).on("click", "#SoruEkle", function() {
                Soru=true;
                if(Soru)
                {
                    $('.GirisMenu').hide();
                    $('.UstAlan').hide();
                    root.append("<div class='SoruEkle'><div class='SoruEkle2'><h1 class='OyunAdi1'>"+"SORU VE CEVAP EKLEME FORMU"+"</h1><form id='SoruEkleForm' action='soruEkle.php' method='POST'><table class='SoruTable'><tr><td>"+"Soru:"+"</td></tr><tr><td><input class='soru' name='soru' id='soru' type='text' autocomplete='off' placeholder='Soruyu Giriniz...' required/></td></tr><tr><td>"+"Cevap:"+"</td></tr><tr><td><input class='cevap' name='cevap' id='cevap' type='text' autocomplete='off' placeholder='Cevabi Giriniz...' minlength='4' maxlength='10' required/></td></tr><tr><td colspan='2'><button class='SoruGonder' value='SORUYU GONDER'>"+"SORUYU GONDER"+"</button></td></tr></table></form><p>Soru yazmak icin Turk Dil Kurumu'nun <a href='https://sozluk.gov.tr/' target='_blank'> Guncel Turkce Sozlugu</a>'nden faydalanabilirsiniz.</p><button class='Geridon'><a href='index.html' >"+"ANA SAYFA"+"</a></button></div></div>");               
                } 
            });

            //Skor Tablosu Tiklamasi
            $(document).on("click", "#SkorTablosu", function() {
                $('.GirisMenu').hide();
                $('.UstAlan').hide();

                //https://stackoverflow.com/questions/17068121/ordering-json-data-in-a-table
                //https://stackoverflow.com/questions/46216482/json-to-html-table-in-ajax
                $.ajax({
                    url: "sonuclar.json",
                    dataType: 'json',
                    type: 'get',
                    cache:false,
                    success: function(data){
                        /*console.log(data);*/
                        var tr = '';

                            data.kisiler.sort(function(a,b) {  return parseFloat(b.Puani) - parseFloat(a.Puani) } );

                            var rank = 1;

                            for (var i = 0; i <data.kisiler.length; i++) {
                                tr = $('<tr/>');
                                tr.append("<td>" + rank + "</td>");
                                tr.append("<td>" + data.kisiler[i].Adi + "</td>");
                                tr.append("<td>" + data.kisiler[i].Puani + "</td>");
                                tr.append("<td>" + data.kisiler[i].KalanSure + "</td>");
                                tr.append("<td>" + data.kisiler[i].Tarih + "</td>");
                                tr.append("<td>" + data.kisiler[i].Zaman + "</td>");
                                $('#sortable').append(tr);
                                rank = rank +1;
                            }
                    },
                    error: function(d){
                        /*console.log("error");*/
                        alert("404. Please wait until the File is Loaded.");
                    }
                });  
                
                root.append("<div class='SkorTablosu'><div class='SkorTablosu2'><h1 class='OyunAdi4'>"+"SKOR TABLOSU"+"</h1><table id='sortable' ><tr><th></th><th>Oyuncu</th><th>Puan</th><th>Kalan Sure</th><th>Oyun Tarihi</th><th>Oyun Zamani</th></tr></table><button class='Geridon'><a href='index.html' >"+"ANA SAYFA"+"</a></button></div></div>");    
            });

            //Kurallar Tiklamasi
            $(document).on("click", "#kurallar", function() {
                $('.GirisMenu').hide();
                $('.UstAlan').hide();

                root.append("<div class='kurallardiv'><div class='kurallardiv2'><h1 class='OyunAdi3'>"+"KURALLAR"+"</h1><ul type='Disk'><li>"+"Her yarismaciya 4 dakikalik zaman dilimi icerisinde, 4, 5, 6, 7, 8, 9 ve 10 harfli sorulardan olusan, tumunden ikiser tane olmak uzere toplam 14 kelime yada kelime grubu tanimlamalari sorulur."+"</li><br><li>"+"Sorulan sorularin cevabi kac haneli ise yarismacinin alacagi puanda hane sayisinin carpanidir."+"</li><ul type='Disk'><li>"+"Yani 4 haneli cevapli sorudan yarismaci (harf almadigi taktirde) 400 puan alir. Ayni sekilde 5, 6, 7, 8, 9 ve 10 harfli sorularin cevaplari icinde 500-600-700-800-900 ve 1000 puan seklinde devam eder."+"</li></ul><br><li>"+"Sorulan her soruda yarismacilarin ipucu olmasi acisindan harf alma hakki bulunmaktadir."+"</li><ul type='Disk'><li>"+"Yarismacilarin aldigi her harf basina, sorulan o sorunun toplam odul puanindan 100 puan dusmektedir."+"</li><li>"+"Yarismaci dilerse, tek harf kalana kadar harf alabilir."+"</li></ul><br><li>"+"Yarismacilar, sorulan sorular icin diledikleri kadar tahminde bulunabilirler. Tahminlerinin gecerli sayilabilmesi icin Tahmin Et butonuna veya Enter tusuna basarak cevap vermeleri gerekmektedir. "+"</li><ul type='Disk'><li>"+"Yarismacilarin Tahmin Et butonu veya Enter tusu, hem soruyu cevaplamak icin hem de yarismaciya verilen sureyi durdurup zaman tasarrufu yapmasini saglamaktadir."+"</li><li>"+"Butona basildiktan sonra harf istemek yasaktir."+"</li></ul><br><li>"+"Yarismacilar Tahmin Et butonuna bastiktan sonra soruyu cevaplamak icin ek olarak 20 saniye sureleri bulunmaktadir."+"</li><br><li>"+"Yarismaci eger soruya yanlis cevap verirse, acilmamis harf sayisinin puani kadar toplam puanindan dusmektedir. "+"</li></ul><button class='Geridon'><a href='index.html' >"+"ANA SAYFA"+"</a></button></div></div>");
            });

            //Hakkinda Tiklamasi
            $(document).on("click", "#hakkinda", function() {
                $('.GirisMenu').hide();
                $('.UstAlan').hide();

                root.append("<div class='hakkindadiv'><div class='hakkindadiv2'><h1 class='OyunAdi4'>"+"HAKKINDA"+"</h1><h3>"+"2020-2021 Bahar Donemi Yazilim Gelistirme Laboratuvar-II Dersi Vize Projesidir."+"</h3><h3>"+"Kaynak Kodlar icin baglanti linki "+"<button class='github'><a href='https://github.com/elifseraybilgin' target='_blank' class='githuba'><i class='fa fa-github'></i></a></button></h3><h2>"+"Gelistirici"+"</h2><h2>"+"Elif Seray BILGIN"+"</h2><button class='Geridon'><a href='index.html' >"+"ANA SAYFA"+"</a></button></div></div>");
            });
        }
    }
    // Isimden sonra devam tiklamasi, Ad Kontrol ve Oyun baslangici
    $(document).on("click", "#devam", function() {
        Baslama = true;
        var adi = document.getElementById("OyuncuAdi").value;
        if(adi=="" ||adi==null){
           alert("Adinizi giriniz")
           return false;
        }
        else{
            if(Baslama)
            {
                $('.isimMenu').hide();
                getLevel(MevcutLevel);
            }
        }
    });
//-----------------------------------------------------GIRIS MENU------------------------------------------------------//

//--------------------------------------------------DOSYA BAGLANTISI---------------------------------------------------//
    // JSON Dosyasina Baglanti ve Random Soru ve Cevap Cekilmesi
    function getLevel(level)
    {
        $.ajax({
            dataType: 'JSON',
            url: "sorular.json",
            contentType: "application/json;charset=utf-8",
            //JSON Basariyla Yuklenmesi
            success: function (data) {
                var jsonLevel = data['level'+level];
                var MevcutLeveldosya = jsonLevel[Math.floor((Math.random() * jsonLevel.length))];
    
                // Ayni Sorunun Gelmemesi icin While komutu 
                while (KullanilanAnahtarKelime.includes(MevcutLeveldosya.answer.toUpperCase())) {
                        MevcutLeveldosya = jsonLevel[Math.floor((Math.random() * jsonLevel.length))];
                }
                KullanilanAnahtarKelime.push(MevcutLeveldosya.answer.toUpperCase());
                    
                // Soru ve Cevaplarin Atamasi
                MevcutAnahtarKelime = MevcutLeveldosya.answer.toUpperCase();
                MevcutSoru = MevcutLeveldosya.question;
    
                //Levelin Baslamasi
                LevelBaslamasi(level);
            }
        });
    }
//--------------------------------------------------DOSYA BAGLANTISI---------------------------------------------------//

//--------------------------------------------------LEVEL YUKLENMESI---------------------------------------------------//
    // Level Yuklenmesi
    function LevelBaslamasi(level)
    {
        root.append("<div class='cndkLevel cndkLevel"+level+"'></div>");
        //Levele Gore Kutu Sayisi
        for(i=0;i<MevcutAnahtarKelime.length;i++)
        {
            $(".cndkLevel"+level).append("<div class='HarfKutu'><input class='HarfKutu"+i+"' data-number="+i+" data-opened='false' maxlength='1' type='text' disabled='true'> </div>");
        }

        //Soru Arkaplani ve Mevcut Soru
        $(".cndkLevel").append("<div class='SoruArkaplan'><div class='Soru'>" + MevcutSoru + "</div></div>");

        // Mevcut Soru Sayisi, Toplam Soru Sayisi ve Mevcut Sorunun Puan degeri
        if($('.LevelBilgi').length <= 0)
        {
            root.append("<div class='LevelBilgi'><span class='cndkCurrentQuestion'>"+MevcutSoruSayisi+"/"+ToplamSoruSayisi+"</span><span class='cndkCurrentPoint'>"+(MevcutAnahtarKelime.length*100)+"</span></div>");
        }

        // Zaman Baslangici
        Tahmin = false;
        Durdurma = false;
        Sure.start();
        $(".HarfIste").attr("disabled",false);
        $(".TahminEt").attr("disabled",false);
        Pasif = false;        
    }
//--------------------------------------------------LEVEL YUKLENMESI---------------------------------------------------//

//-------------------------------------------------HARF KUTU ISLEMLERI-------------------------------------------------//
    //Harf Kutusu Icındeki Hareketler icin 
    function HKHareket(key)
        {
            if(key.code != "Backspace" && key.code != "ArrowLeft" && key.code != "ArrowRight" && key.code != "Space"){
                return true;
            }
            else
            {
                return false;
            }
    }

    //
    function harf_Duzelt(key)
    {
        key = key.replace("i", "İ");
        return key;
    }

    //Harf Kutusu Tusa Tiklandiginda  
    $(document).on("keydown", ".HarfKutu > input", function(key){
        // Tahmin Edilmediyse
        if(!Tahmin)
        {
            return false;
        }

        var aktifHarfKutusu = parseInt($(this).attr("data-number"));
        var odaklanilmisHarfKutusu = parseInt(aktifHarfKutusu+1);
        var aktifUzunluk = MevcutAnahtarKelime.length;

        // Default
        if(odaklanilmisHarfKutusu < aktifUzunluk && HKHareket(key))
        {
            setTimeout(function(){
                for(i=odaklanilmisHarfKutusu;i<MevcutAnahtarKelime.length;i++)
                {
                    var isOpened = $('.HarfKutu input[data-number="' + i + '"]').attr("data-opened");
                    if(isOpened == "false")
                    {
                        $('.HarfKutu input[data-number="' + i + '"]').delay(500).focus().delay(10).select();
                        break;
                    }
                }
            }, 100);
        }
        //Backspace Ile Geri Silme 
        else if(key.code == "Backspace")
        {
            setTimeout(function(){
                for(i=aktifHarfKutusu-1;i>=0;i--)
                {
                    var isOpened = $('.HarfKutu input[data-number="' + i + '"]').attr("data-opened");
                    if(isOpened == "false")
                    {
                        $('.HarfKutu input[data-number="' + i + '"]').delay(500).focus().delay(10).select();
                        break;
                    }
                }
            }, 10);
        }

        // Butun Harflerin Girilip Kelime Kontrolü
        setTimeout(function(){
            HarfKontrol();
        }, 50);
    });
    // On-click keywords
    $(document).on("click",".HarfKutu > input", function(){
        $(this).select();
    });

    // Butun Harflerin Dogrulugu Kontrolü
    function HarfKontrol()
    {
        var GirilenKelime = "";
        var GirilenKutuUzunlugu = 0;
        $(".cndkLevel" + MevcutLevel + " > .HarfKutu").each(function(){
            if($(this).find("input").val().length == 1)
            {
                GirilenKutuUzunlugu++;
            }
            GirilenKelime += $(this).find("input").val().toUpperCase();
        });

        // Girilen Kelimenin Mevcut Kelime kontolü
        if(GirilenKutuUzunlugu == $(".cndkLevel" + MevcutLevel + " > .HarfKutu").length)
        {
            if(GirilenKelime == MevcutAnahtarKelime)
            {
                Pasif = true;

                //Dogru cevapta ekstra surenin silinmesi
                $(".EkstraSure").remove();
                EkstraZaman = true;

                //Dogru cevapta dogru kutunun gelmesi
                $(".cndkLevel" + MevcutLevel + " > .HarfKutu input").parent().addClass("cndkBoxCorrect");
                $(".cndkLevel" + MevcutLevel + " > .HarfKutu input").prop("disabled",true);

                // Stop timer
                Durdurma = true;
                $(".HarfIste").attr("disabled",true);
                $(".TahminEt").attr("disabled",true);

                //Puanin hesaplanmasi ve Tekrardan yazilmasi
                $(".cndkLevel" + MevcutLevel + " > .HarfKutu input[data-opened='false']").each(function(){
                    Puan += 100;
                });
                $('.Puan > span').html("<em>" + Puani + "</em>" + Puan);

                //Eski level ve sorularin silinmesi ve Yeni Levelin gelmesi
                setTimeout(function(){
                    $(".cndkLevel").remove();
                    $(".LevelBilgi").remove();
                }, 2000);
                MevcutSoruSayisi++;
                if(MevcutSoruSayisi <= ToplamSoruSayisi)
                {
                    if(MevcutSoruSayisi%2 != 0)
                    {
                        MevcutLevel++;
                    }

                    setTimeout(function(){
                        $(".cndkLevel").remove();
                        getLevel(MevcutLevel);
                    }, 2500);
                }
                //Soru sayisi bittiyse Oyun Bitisi
                if(MevcutSoruSayisi>ToplamSoruSayisi)
                {
                    OyunBitti();
                }
                
            }
            else
            {
                // Yanlis Tahmin
                $(".cndkLevel" + MevcutLevel + " > .HarfKutu input").parent().addClass("cndkBoxIncorrect");
            }
        }
        else
        {
            $(".cndkLevel" + MevcutLevel + " > .HarfKutu input").parent().removeClass("cndkBoxCorrect");
            $(".cndkLevel" + MevcutLevel + " > .HarfKutu input").parent().removeClass("cndkBoxIncorrect");
        }
        
    }
    
    // Sure Icinde Tahmin Edilemeyen Kelimenin Acilmasi
    function KelimeyiTamamla()
    {
        for(i=0;i<MevcutAnahtarKelime.length;i++)
        {
            $(".cndkLevel" + MevcutLevel + " > .HarfKutu input:eq("+i+")").val(MevcutAnahtarKelime[i]);
            $(".cndkLevel" + MevcutLevel + " > .HarfKutu input:eq("+i+")").attr("disabled",true);
            $(".cndkLevel" + MevcutLevel + " > .HarfKutu input:eq("+i+")").parent().addClass("cndkBoxOpened");
            $(".cndkLevel" + MevcutLevel + " > .HarfKutu input:eq("+i+")").attr("data-opened","true");
        }
        //Mevcut Puanindan Soru Puanini Duser
        Puan -= parseInt($(".cndkCurrentPoint").text());
        $('.Puan > span').text(Puani + Puan);

        // Mevcut Leveli Siler Siradaki Levele Gecer
        setTimeout(function(){
            $(".cndkLevel").remove();
            $(".LevelBilgi").remove();
        }, 1500);
        MevcutSoruSayisi++;
        if(MevcutSoruSayisi <= ToplamSoruSayisi)
        {
            if(MevcutSoruSayisi%2 != 0)
            {
                MevcutLevel++;
            }

            setTimeout(function(){
                $(".cndkLevel").remove();
                getLevel(MevcutLevel);
            }, 2500);
        }
        //Soru sayisi bittiyse Oyun Bitisi
        if(MevcutSoruSayisi>ToplamSoruSayisi)
        {
            OyunBitti();
        }
    }
//-------------------------------------------------HARF KUTU ISLEMLERI-------------------------------------------------//

//------------------------------------------HARF ISTEME / TAHMİN ET BUTONLARI------------------------------------------// 
    // Harf Iste Butonuna Tiklanma Olayi
    $(document).on("click",".HarfIste", function(){
        HarfAc();
    });

    // Harf Acma Olayi
    function HarfAc()
    {
        if(!Tahmin && !Pasif)
        {
            var closedBoxes = $(".cndkLevel" + MevcutLevel + " > .HarfKutu input[data-opened='false']").length;
            if(closedBoxes > 1)
            {
                var chance = Math.floor( Math.random() * closedBoxes);
                var willBeOpenLetter = $(".cndkLevel" + MevcutLevel + " > .HarfKutu input[data-opened='false']:eq("+chance+")").attr("data-number");
                $(".cndkLevel" + MevcutLevel + " > .HarfKutu input[data-opened='false']:eq("+chance+")").val(MevcutAnahtarKelime[willBeOpenLetter]);
                $(".cndkLevel" + MevcutLevel + " > .HarfKutu input[data-opened='false']:eq("+chance+")").attr("disabled",true);
                $(".cndkLevel" + MevcutLevel + " > .HarfKutu input[data-opened='false']:eq("+chance+")").parent().addClass("cndkBoxOpened");
                $(".cndkLevel" + MevcutLevel + " > .HarfKutu input[data-opened='false']:eq("+chance+")").attr("data-opened","true");

                // Acilan Harfden Sonra Puani Guncelleme
                $(".cndkCurrentPoint").text(parseInt($(".cndkCurrentPoint").text())-100);                
            }
            else
            {
                $(".HarfIste").attr("disabled",true);
            }
        }
    }

    // Tahmin Et Butonuna Tiklanmasi
    $(document).on("click",".TahminEt", function(){
        Tahminet();
    });

    // Tahmin Etme Fonksiyonu
    function Tahminet()
    {
        if($(".EkstraSure").length == 0 && !Pasif)
        {
            $('.HarfKutu > input').prop("disabled", false);
            $('.HarfKutu').addClass("cndkBoxIsGuessing");
            $(".HarfIste").attr("disabled",true);
            $(".TahminEt").attr("disabled",true);
            Durdurma = true;
            Tahmin = true;

            // Tahmin Edilecek Kutulara Odaklanip Yazma
            $(".cndkLevel" + MevcutLevel + " > .HarfKutu input[data-opened='false']:eq(0)").focus();

            // Ekstra Sure Baslar
            $(".SureSayac").append("<span class='EkstraSure'>" + 20 + "</span>");
            EkstraSure.start();
        }
    }

    // Space ve Enter Tuslarina Tiklandiginda Calisan Fonksiyonlar (onkeyup())
    $(document).on("keyup", function(key){
        if(key.code == "Space")
        {
            HarfAc();
        }
    });
    $(document).on("keyup", function(key){
        if(key.code == "Enter")
        {
            Tahminet();
        }
    });
    
//------------------------------------------HARF ISTEME / TAHMİN ET BUTONLARI------------------------------------------//

//--------------------------------------------------OYUN BITIS EKRANI--------------------------------------------------//
    // Oyun Bitti
    function OyunBitti(){
        $(".cndkLevel").remove();
        Oadi=document.getElementById("OyuncuAdi").value.toUpperCase();
        root.append("<div class='OyunBitti'><div class='OyunBittiBorder'><h1>" + "OYUN BITTI !" + "</h1><form action='sonuclar.php' method='POST'><h3>" +"ADI :"+"<input id='oadi' name='oadi' readonly=readonly/><h3>" + Puani + "<input id='opuan' name='opuan' readonly=readonly/></h3><h3>" + "KALAN SURE :" +"<input id='okalansure' name='okalansure' readonly=readonly/></h3><h3>" + "OYUN TARIHI :" + "<input id='otarihi' name='otarihi' readonly=readonly/></h3><h3>" + "OYUN ZAMANI :" +"<input id='ozamani' name='ozamani' readonly=readonly/></h3><button class='sonuc'>" + "SONUCU KAYDET" + "</button></form><button class='yenidenOyna'>" + "ANA SAYFA" + "</button></div></div>");
        document.getElementById("oadi").value =Oadi ;
        document.getElementById("opuan").value =Puan ;
        document.getElementById("okalansure").value =OyunIciSure ;
        document.getElementById("otarihi").value =date ;
        document.getElementById("ozamani").value =time ;
    }
//--------------------------------------------------OYUN BITIS EKRANI--------------------------------------------------//

//--------------------------------------------------YENİDEN OYNA BUTON-------------------------------------------------//
    //Yeniden Oynama Tiklamasi
    $(document).on("click", ".yenidenOyna", function(){
        $(".cndkLevel").remove();
        $(".OyunBitti").remove();
        $('.Puan > span').text(Puani + "0");
        $('.Sure').text("00:00");

        oyunZamaniMS = 240000;
        Baslama = false;
        Puan = 0;
        MevcutSoruSayisi = 1;
        MevcutLevel = 1;
        document.getElementById("OyuncuAdi").value="";

        $('.GirisMenu').show();
    });
//--------------------------------------------------YENİDEN OYNA BUTON-------------------------------------------------//

//-----------------------------------------------------OYUN SURESI-----------------------------------------------------//
    // Oyun Suresi
    var Sure = function(){
        var timer = null;
        
        // Zamanin Baslamasi
        function start() {
            timer = setInterval(timeCount, 1000);
        }

        // Zamanin Durmasi
        function stop() {
            clearInterval(timer);
        }

        // Zaman Geri Sayim
        function timeCount(){
            if(!Durdurma)
            {
                if (oyunZamaniMS <= 0) {
                    stop();
                    OyunBitti();
                }
                else {
                    oyunZamaniMS = oyunZamaniMS - 1000;
                    OyunIciSure = "0" + Math.floor(oyunZamaniMS / 60000) + ":" + ((oyunZamaniMS % 60000) / 1000).toFixed(0);
                    $(".Sure").html(OyunIciSure);
                }
            }
            else
            {
                stop();
            }
        }
        return { start: start }      
    }();
//-----------------------------------------------------OYUN SURESI-----------------------------------------------------//

//-----------------------------------------------------EKSTRA SURE-----------------------------------------------------//
    // Ekstra Sure
    var EkstraSure = function(){
        var EkstraSureSayac = 20;
        var timer = null;
        
        // Sayac Baslamasi
        function start() {
            EkstraSureSayac = 20;
            timer = setInterval(timeCount, 1000);
         }

         // Zamanin Durmasi
         function stop() {
            clearInterval(timer);
         }

         // Ekstra Sure Geri Sayim
         function timeCount(){
            if(EkstraZaman){
                stop();
                EkstraZaman = false;
            }
            if (EkstraSureSayac <= 0) {
                stop();
                KelimeyiTamamla();
                $(".EkstraSure").remove();
            }
            else {
                EkstraSureSayac--;
                $(".EkstraSure").html(EkstraSureSayac);
            }
         }
         return { start: start }      
    }();
//-----------------------------------------------------EKSTRA SURE-----------------------------------------------------//
}

