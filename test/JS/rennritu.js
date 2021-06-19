
  console.log("方程式を満たすx,yを求めます。");

  //メインをスタート。まず二次元配列風にセル番号をつける↓
  let num1_00, num1_01, num1_10, num1_11;
  let num2_00, num2_10;
  let x,y;
  let num3_00, num3_01, num3_10, num3_11;
  let mod;

  let cache,data1;

  //とりあえず実行時入力ではなく、仮で数値を決める↓
  num1_00 = 2;
  num1_01 = 3;
  num1_10 = 7;
  num1_11 = 8;

  num2_00 = 1;
  num2_10 = 2;

  mod = 26;


  cache = num1_00 * num1_11 - num1_01 * num1_10;

  cache = findmin(cache);


  //ここでキャッシュの中身をデータ1へ引き継ぐ
  data1 = cache;


  // Test　拡張ユークリッドの結果を表示↓
  console.log("\n拡張ユークリッドの結果は、、")
  console.log(("x ≡"),modInverse(data1, mod),"(mod26)"); // 一時的に改変！！！！！！！！！
  //拡張ユークリッドの結果をキャッシュに代入↓
  cache = (modInverse(data1, mod));
　

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
      while(cache > mod)
        cache = cache - mod;
    }


    return cache;
  }





  //拡張ユークリッドをする関数↓
  function modInverse(a, m) 
  {
    //入力の検証
    [a, m] = [Number(a), Number(m)];
    
    if (Number.isNaN(a) || Number.isNaN(m)) 
      return NaN;

    a = (a % m + m) % m;
    if (!a || m < 2) 
      return NaN;

    //gcdを探すやつ
    const s = [];
    let b = m;

    while(b) 
    {
      [a, b] = [b, a % b];
      s.push({a, b});
    }

    //aが1ではない場合に真
    if (a !== 1)
      return NaN;

    //遡っていく
    let x_p = 1;
    let y_p = 0;
    for(let i = s.length - 2; i >= 0; --i) 
      [x_p, y_p] = [y_p,  x_p - y_p * Math.floor(s[i].a / s[i].b)];


    return (y_p % m + m) % m;
  }