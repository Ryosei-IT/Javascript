function g_crypt(num)
{
  let pad;
  console.log("===行列を用いて文字列を暗号化・復号化する==="); //ターミナルコンパイル用ファイル名:node g_crypt2.js

  if(num == 1){
    pad = encript(); //連続して暗号化・復号化するときにのpadを復号化に渡す
  }
  else if(num == 2){
  decrypt(pad);
  }



  //暗号化用!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  function encript()
  {
    console.log("→暗号化します\n");
    let num4 = new Array(6); //行列計算用変数　0は上段左上1は右隣、、、3は左下となっている
    let num5 = new Array(6); //結果行列格納用変数　0は上段左上1は右隣、、、3は左下となっている
    let num6 = new Array(4); //暗号鍵を格納する変数　0は上段左上1は右隣、、、3は左下となっている

    let mod, i, r, pad,str ; //計算用変数

    let box6 = document.getElementById("number6"); 
    str = box6.value;

    let box0 = document.getElementById("number1");
    num6[0] = box0.value;
    num6[0] = Number(num6[0]);

    let box1 = document.getElementById("number2"); 
    num6[1] = box1.value;
    num6[1] = Number(num6[1]);

    let box2 = document.getElementById("number3"); 
    num6[2] = box2.value;
    num6[2] = Number(num6[2]);

    let box3 = document.getElementById("number4"); 
    num6[3] = box3.value;
    num6[3] = Number(num6[3]);

    let box4 = document.getElementById("number5");
    mod = box4.value;
    mod = Number(mod);

    console.log("入力した平文は、、[",str,"]\n");


    for(i = 0; i < 6; i++) //一時的に手動で数字を入れるため無効化!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    {
      num4[i] = str.charCodeAt(i);    //入力された文字列をASCIIコードに変換する 
  
      if(Number.isNaN(num4[i])){      //もし文字数が少なかったらスペースとしてパディングする
        num4[i] = 32;
        pad = i;
      }
      num4[i] = num4[i] - 32; //ASCIIコードのうち、0から32までは使わなくする。
    }
    
    console.log("文字列のASCIIコード変換後の数値は、、\n",num4,"\n");


    for(r = 0; r < 3; r++){ //行列の掛け算上段用
        num5[r] = num4[r] * num6[0] + num4[r+3] * num6[1];
    }

    for(r = 3; r < 6; r++){ //行列の掛け算下段用
        num5[r] = num4[r-3] * num6[2] + num4[r] * num6[3];
    }


    for(i = 0; i < 6; i++) //最小正剰余に変換
    {
      num5[i] = findmin(num5[i],mod);
      num5[i] = num5[i] + 32;
    }


    let tmp = num6[0] * num6[3] - num6[1] * num6[2];
    tmp = findmin(tmp,mod);
    let no = modInverse(tmp,mod);    //互いに素であるか、数字であるかなど判定//////////////////////////////


    tmp = 0; //空白カウンタを設定。初期値は0
    for(i = 0; i < 6; i++)
    {
      if(num5[i] == 32 ){
        tmp ++;
      }
    }

    if(tmp == 6 || Number.isNaN(no))
    {
      var elem1 = document.getElementById("output1");
      elem1.innerHTML = "互いに素でない可能性があります。";
    }
    else
    {
      for(i = 0; i < 6; i++){
        num5[i] = String.fromCharCode(num5[i]);    //文字列をASCIIコードに変換する 
      }
      var elem1 = document.getElementById("output1");
      elem1.innerHTML = "暗号文は、["+num5+"]です。";

      console.log("暗号文は、、\n",num5,"です。\n\n\n");
    }


    return pad; 
  }



  //復号用!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  function decrypt(pad)
  {
    console.log("→復号化します\n");
    let num7 = new Array(4); //元の暗号鍵格納用
    let num8 = new Array(4); //復号鍵格納用
    let num9 = new Array(6); //暗号化行列格納用
    let num10 = new Array(6); //復号行列格納用
    let mod, cache, tmp, i, r;
    
    let box12 = document.getElementById("number12"); 
    str = box12.value;

    let box7 = document.getElementById("number7");
    num7[0] = box7.value;
    num7[0] = Number(num7[0]);

    let box8 = document.getElementById("number8"); 
    num7[1] = box8.value;
    num7[1] = Number(num7[1]);

    let box9 = document.getElementById("number9"); 
    num7[2] = box9.value;
    num7[2] = Number(num7[2]);

    let box10 = document.getElementById("number10"); 
    num7[3] = box10.value;
    num7[3] = Number(num7[3]);

    let box11 = document.getElementById("number11");
    mod = box11.value;
    mod = Number(mod);


    for(i = 0; i < 6; i++) //一時的に手動で数字を入れるため無効化!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    {
      num9[i] = str.charCodeAt(i);    //入力された文字列をASCIIコードに変換する 
      num9[i] = num9[i] - 32; //ASCIIコードのうち、0から32までは使わなくする。
    }

    console.log(num9);

    tmp = num7[0] * num7[3] - num7[1] * num7[2];
    tmp = findmin(tmp,mod);

  
    console.log("\n拡張ユークリッドの結果は、、") //拡張ユークリッドの結果を表示
    cache = (modInverse(tmp, mod))
    console.log("x ≡",cache,"mod",mod,"\n");

  
    num8[0] = num7[3] * cache;  //拡張ユークリッドの結果を暗号鍵の反転&マイナスしてかける
    num8[1] = -(num7[1]) * cache;
    num8[2] = -(num7[2]) * cache;
    num8[3] = num7[0] * cache;


    for(i = 0; i < 4; i++){
        num8[i] = findmin(num8[i],mod);
    }
    

    console.log("復号鍵は、、\n「",num8[0],num8[1],"\n  ",num8[2],num8[3],"」mod",mod,"\n");


    for(r = 0; r < 3; r++){ //行列の掛け算上段用
        num10[r] = num9[r] * num8[0] + num9[r+3] * num8[1];
    }
    for(r = 3; r < 6; r++){ //行列の掛け算下段用
        num10[r] = num9[r-3] * num8[2] + num9[r] * num8[3];
    }


    for(i = 0; i < 6; i++) //最小正剰余に変換
    {
      if(pad == i){
        num10[i] = 32;
      }

      else
      {
        num10[i] = findmin(num10[i],mod);
        num10[i] = num10[i] + 32; //ASCIIコードのうち、0から32までは使わなくする。
      }
    }


    tmp = num7[0] * num7[3] - num7[1] * num7[2];
    tmp = findmin(tmp,mod);
    let no = modInverse(tmp,mod);    //互いに素であるか、数字であるかなど判定//////////////////////////////


    tmp = 0; //空白カウンタを設定。初期値は0
    for(i = 0; i < 6; i++)
    {
      if(num10[i] == 32 ){
        tmp ++;
      }
    }

    if(tmp == 6 || Number.isNaN(no))
    {
      var elem2 = document.getElementById("output2");
      elem2.innerHTML = "互いに素でない可能性があります。";
    }
    else
    {
      for(i = 0; i < 6; i++){
        num10[i] = String.fromCharCode(num10[i]);    //文字列をASCIIコードに変換する 
      }
      var elem2 = document.getElementById("output2");
      elem2.innerHTML = "復号文は、["+num10+"]です。";

      console.log("暗号文は、、\n",num10,"です。\n\n\n");
    }



  }

  //////////////////////　関数を定義します↓　/////////////////////////

  //最小正剰余を求める関数↓
  function findmin(cache,mod)  
  {
    //最小正剰余にする
    if(cache < 0)
    {
      while(cache < 0)
        cache = cache + mod;
    }

    else if(cache > mod)
    {
      while(cache >= mod)
        cache = cache - mod;
    }

    return cache;
  }




  //拡張ユークリッドをする関数↓
  function modInverse(a, m) 
  {
    //入力の検証
    [a, m] = [Number(a), Number(m)];
    
    if (Number.isNaN(a) || Number.isNaN(m)){
      return NaN;
    }

    a = (a % m + m) % m;
    if (!a || m < 2){
      return NaN;
    }

    //gcdを探すやつ
    const s = [];
    let b = m;

    while(b) 
    {
      [a, b] = [b, a % b];
      s.push({a, b});
    }

    //aが1ではない場合に真
    if (a !== 1){
      return NaN;
    }

    //遡っていく
    let x_p = 1;
    let y_p = 0;
    for(let i = s.length - 2; i >= 0; --i){
      [x_p, y_p] = [y_p,  x_p - y_p * Math.floor(s[i].a / s[i].b)];
    }

    return (y_p % m + m) % m;
  }
  
}