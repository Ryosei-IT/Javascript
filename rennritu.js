function rennritu()
{
  console.log("方程式を満たすx,yを求めます。");

  // //HTMLで指定したIDを読み取り、それぞれのテキストボックスで入力した値をJavaScript上で読み込む。
  //また、テキストボックスから読みだした値は数値として扱えないため、Number()を利用して明示的に型変換を行う↓
  let box1 = document.getElementById("number1"); //00は左上、01は右上、10は左下、11は右下となっている。
  let num1_00 = box1.value;
  num1_00 = Number(num1_00);

  let box2 = document.getElementById("number2");
  let num1_01 = box2.value;
  num1_01 = Number(num1_01);

  let box3 = document.getElementById("number3");
  let num1_10 = box3.value;
  num1_10 = Number(num1_10);

  let box4 = document.getElementById("number4");
  let num1_11 = box4.value;
  num1_11 = Number(num1_11);

  let box5 = document.getElementById("number5");
  let num2_00 = box5.value;
  num2_00 = Number(num2_00);

  let box6 = document.getElementById("number6");
  let num2_10 = box6.value;
  num2_20 = Number(num2_10);

  let box7 = document.getElementById("number7");
  let mod = box7.value;
  mod = Number(mod);

  let x,y;
  let num3_00, num3_01, num3_10, num3_11;

  let cache,data1;


  // //デバッグ用!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // console.log(num1_00,mod);

  cache = num1_00 * num1_11 - num1_01 * num1_10;
  cache = findmin(cache);


  //ここでキャッシュの中身をデータ1へ引き継ぐ
  data1 = cache;


  //拡張ユークリッドの結果を表示↓
  console.log("\n拡張ユークリッドの結果は、、")

  //拡張ユークリッドの結果をキャッシュに代入↓
  cache = (modInverse(data1, mod));
  console.log(("x ≡"),cache,"(mod",mod,")");

  //逆行列を求める↓
  num3_00 = cache * num1_11;
  num3_01 = cache * -(num1_01);
  num3_10 = cache * -(num1_10);
  num3_11 = cache * num1_00;


  //最小正剰余にします↓
  num3_00 = findmin(num3_00);
  num3_01 = findmin(num3_01);
  num3_10 = findmin(num3_10);
  num3_11 = findmin(num3_11);
  console.log("\n逆行列は、、")
  console.log(num3_00, num3_01, num3_10, num3_11);

  //方程式を満たすx,yを求めます↓
  x = num2_00 * num3_00 + num2_10 * num3_01;
  x = findmin(x);

  y = num2_00 * num3_10 + num2_10 * num3_11;
  y = findmin(y);

  console.log("\nx,yの答え↓")
  console.log(x,y);


  //HTML出力用　数字であれば出力。NaNであれば正しい値の入力を促す。
  var elem = document.getElementById("output");
  if(Number.isNaN(x) || Number.isNaN(y)){
    elem.innerHTML = "正しい値を入力してください。";
  }
  else{
    elem.innerHTML = "x,yの答えは、、("+x+","+y+")です。";
  }







//////////////////////　関数を定義します↓　/////////////////////////
    
  //最小正剰余を求める関数↓
  function findmin(cache)  
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
