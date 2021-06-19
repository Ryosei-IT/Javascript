/* 
 * ========================================================================
 *         JavaScript 行列計算ライブラリ for 分数計算ライブラリ1.5
 * 
 *                                      製作・著作 るう(rew106@hotmail.com)
 * ========================================================================
 * 
 * 　このライブラリはライセンスフリーです。非商用に限り、使用、改変を自由と
 * します。二次配布、商用使用の際は、製作者までお問い合わせ下さい。また、
 * ご要望、バグ報告等もございましたら製作者までご報告下さい。
 * 　このライブラリの利用には「分数計算ライブラリ for JavaScript1.5」を同一
 * ディレクトリ内に置いておく必要があります。「分数計算ライブラリ for Java
 * Script1.5」をご利用にならない方は、「JavaScript 行列計算ライブラリ for 
 * JavaScript1.5」をご利用下さい。
 * 　なお、このライブラリはJavaScript1.5以上で動作します。未対応のブラウザ
 * では正しく動作しない恐れがありますのでご注意下さい。
 * 
 * ########################################################################
 * 
 * 更新履歴
 * ------------------------------------------------------------------------
 * 13/09/21  typo修正
 * 03/10/18  ミスを修正
 * 03/08/15  初期版リリース
 * 
 * ########################################################################
 * 
 * ------------------------------------------------------------------------
 * Matrix（行列）オブジェクト
 * ------------------------------------------------------------------------
 * Matrix(m, n) コンストラクタ
 *   m×nの行列を作成する。各要素は0で埋められる。
 * Matrix(a) コンストラクタ
 *   配列の配列から行列を作成する。[[a11, a12...], [a21, a22...]...]
 * m プロパティ
 *   行列の行数を返す。
 * n プロパティ
 *   行列の列数を返す。
 * [x][y] プロパティ
 *   行列のx行y列の値を保持する。
 * col(m) メソッド
 *   行列のm行目の行ベクトルを返す。
 * row(n) メソッド
 *   行列のn列目の列ベクトルを返す。
 * plus(A) メソッド
 *   行列にAを足して返す。
 * minus() メソッド
 *   行列の正負を反転させた値を返す。
 * minus(A) メソッド
 *   行列からAを引いて返す。
 * multiply(A) メソッド
 *   行列にAを掛けて返す。Aが行列ならAを右から掛ける。
 * inverse() メソッド
 *   逆行列を返す。
 * rowSwap(i, j) メソッド
 *   第i行と第j行を入れ替えた行列を返す。
 * rowAdd(i, j) メソッド
 *   第i行を第j行に足した行列を返す。
 * rowMultiply(i, k) メソッド
 *   第i行をk倍した行列を返す。
 * rowAddMultiply(i, k, j) メソッド
 *   第i行をk倍して第j行に足した行列を返す。
 * colSwap(i, j) メソッド
 *   第i行と第j行を入れ替えた行列を返す。
 * colAdd(i, j) メソッド
 *   第i行を第j行に足した行列を返す。
 * colMultiply(i, k) メソッド
 *   第i行をk倍した行列を返す。
 * colAddMultiply(i, k, j) メソッド
 *   第i行をk倍して第j行に足した行列を返す。
 * toString() メソッド
 *   分数を文字列に直す。
 * 
 * ------------------------------------------------------------------------
 * Matrix オブジェクトの static メソッド
 * ------------------------------------------------------------------------
 * E(n) メソッド
 *   n次の単位行列を返す。
 * det(A) メソッド
 *   行列Aの行列式を返す。
 * t(A) メソッド
 *   行列Aの転置行列を返す。
 * augment(A,B) メソッド
 *   行列Aと行列Bを連結して返す。
 * 
 * ------------------------------------------------------------------------
 */

document.write('<script src="frac-1.5.js" /></script>');

function Matrix(m, n) {
	if (n == undefined) {
		if (m instanceof Matrix) {
			this.m = m.m; this.n = m.n;
			for (var x = 1; x <= m.m; x++) {
				this[x] = new Object();
				for (var y = 1; y <= m.n; y++)
					this[x][y] = m[x][y];
			}
		} else {
			if (m.length == 0) return;
			this.m = m.length;
			this.n = m[0].length;
			for (var x = 0; x < this.m; x++) {
				this[x + 1] = new Object();
				for (var y = 0; y < this.n; y++)
					this[x + 1][y + 1] = new Frac(m[x][y]);
			}
		}
	} else {
		if (m <= 0 || n <= 0) return;
		this.m = m; this.n = n;
		for (var x = 1; x <= m; x++) {
			this[x] = new Object();
			for (var y = 1; y <= n; y++)
				this[x][y] = new Frac(0);
		}
	}
}

Matrix.prototype.col = function col(m) {
	for (var y = 1; y <= this.n; y++)
		k[1][y] = this[m][y];
	return k;
};

Matrix.prototype.row = function row(n) {
	var k = new Matrix(this.m, 1);
	for (var x = 1; x <= this.m; y++)
		k[x][1] = this[x][n];
	return k;
};

Matrix.prototype.plus = function plus(k) {
	if (this.m != k.m || this.n != k.n) return null;
	var m = new Matrix(this.m, this.n);
	for (var x = 1; x <= this.m; x++)
		for (var y = 1; y <= this.n; y++)
			m[x][y] = this[x][y].plus(k[x][y]);
	return m;
};

Matrix.prototype.minus = function minus(k) {
	var m = new Matrix(this.m, this.n);
	if (k == undefined)
		for (var x = 1; x <= this.m; x++)
			for (var y = 1; y <= this.n; y++)
				m[x][y] = this[x][y].minus();
	else {
		if (this.m != k.m || this.n != k.n) return null;
		for (var x = 1; x <= this.m; x++)
			for (var y = 1; y <= this.n; y++)
				m[x][y] = this[x][y].minus(k[x][y]);
	}
	return m;
};

Matrix.prototype.multiply = function multiply(k) {
	if (typeof(k) == "number") k = new Frac(k);
	if (k instanceof Frac) {
		var m = new Matrix(this);
		for (var x = 1; x <= this.m; x++)
			for (var y = 1; y <= this.n; y++)
				m[x][y] = this[x][y].multiply(k);
		return m;
	}
	if (this.n != k.m) return null;
	var m = new Matrix(this.m, k.n);
	for (var x = 1; x <= this.m; x++)
		for (var y = 1; y <= k.n; y++)
			for (var z = 1; z <= this.n; z++)
				m[x][y] = m[x][y].plus(this[x][z].multiply(k[z][y]));
	return m;
};

Matrix.prototype.inverse = function () {
	if (this.m != this.n) return null;
	var a = Matrix.augment(new Matrix(this), Matrix.E(this.m));
	for (var y = 1; y < a.m; y++) {
		var x = y;
		while (a[x][y].value() == 0 && x < a.m) x++;
		if (x == a.m && a[x][y].value() == 0) return null;
		if (x != y) {
			var o = a[y];
			a[y] = a[x];
			a[x] = o;
		}
		for (var k = y + 1; k <= a.m; k++) {
			var c = a[k][y].divide(a[y][y]);
			for (var z = y; z <= a.n; z++)
				a[k][z] = a[k][z].minus(a[y][z].multiply(c));
		}
	}
	for (var y = a.m; y >= 1; y--) {
		var c = a[y][y];
		for (var z = y; z <= a.n; z++)
			a[y][z] = a[y][z].divide(c);
		for (var k = y - 1; k >= 1; k--) {
			var c = a[k][y];
			for (var z = y; z <= a.n; z++)
				a[k][z] = a[k][z].minus(a[y][z].multiply(c));
		}
	}
	var n = new Matrix(this.m, this.n);
	for (var x = 1; x <= this.m; x++)
		for (var y = 1; y <= this.n; y++)
			n[x][y] = a[x][y + this.m];
	return n;
};

Matrix.prototype.rowSwap = function rowSwap(i, j) {
	var m = new Matrix(this);
	var o = m[i];
	m[i] = m[j];
	m[j] = o;
	return m;
};

Matrix.prototype.rowAdd = function rowAdd(i, j) {
	var m = new Matrix(this);
	for (var x = 1; x <= this.n; x++)
		m[i][x] = m[i][x].plus(m[j][x]);
	return m;
};

Matrix.prototype.rowMultiply = function rowMultiply(i, k) {
	var m = new Matrix(this);
	for (var x = 1; x <= this.n; x++)
		m[i][x] = m[i][x].multiply(k);
	return m;
};

Matrix.prototype.rowAddMultiply = function rowAddMultiply(i, k, j) {
	var m = new Matrix(this);
	for (var x = 1; x <= this.n; x++)
		m[j][x] = m[j][x].plus(m[i][x].multiply(k));
	return m;
};

Matrix.prototype.colSwap = function colSwap(i, j) {
	var m = new Matrix(this);
	for (var x = 1; x <= this.m; x++) {
		var v = m[x][j];
		m[x][j] = m[x][i];
		m[x][i] = v;
	}
	return m;
};

Matrix.prototype.colAdd = function colAdd(i, j) {
	var m = new Matrix(this);
	for (var x = 1; x <= this.m; x++)
		m[x][i] = m[x][i].plus(m[x][j]);
	return m;
};

Matrix.prototype.colMultiply = function colMultiply(i, k) {
	var m = new Matrix(this);
	for (var x = 1; x <= this.m; x++)
		m[x][i] = m[x][i].multiply(k);
	return m;
};

Matrix.prototype.colAddMultiply = function colAddMultiply(i, k, j) {
	var m = new Matrix(this);
	for (var x = 1; x <= this.m; x++)
		m[x][j] = m[x][j].plus(m[x][i].multiply(k));
	return m;
};

Matrix.prototype.toString = function () {
	var s = "[[" + this[1][1];
	for (var y = 2; y <= this.n; y++)
		s += ", " + this[1][y];
	s += "]";
	for (var x = 2; x <= this.m; x++) {
		s += ", [" + this[x][1];
		for (var y = 2; y <= this.n; y++)
			s += ", " + this[x][y];
		s += "]";
	}
	return s + "]";
};

Matrix.E = function E(n) {
	var e = new Matrix(n, n), o = new Frac(1);
	for (var x = 1; x <= n; x++)
		e[x][x] = o;
	return e;
};

Matrix.det = function det(A) {
	if (A.m != A.n) return null;
	var a = new Matrix(A), r = new Frac(1);
	for (var y = 1; y < a.m; y++) {
		var x = y;
		while (a[x][y].value() == 0 && x < a.m) x++;
		if (x == a.m && a[x][y].value() == 0) return 0;
		if (x != y) {
			var o = a[y];
			a[y] = a[x];
			a[x] = o;
			r = r.minus();
		}
		r = r.multiply(a[y][y]);
		for (var k = y + 1; k <= a.m; k++) {
			var c = a[k][y].divide(a[y][y]);
			for (var z = y; z <= a.m; z++)
				a[k][z] = a[k][z].minus(a[y][z].multiply(c));
		}
	}
	return r.multiply(a[a.m][a.m]);
};

Matrix.t = function t(A) {
	var m = new Matrix(A.n, A.m);
	for (var x = 1; x <= m.m; x++) {
		this[x] = new Object();
		for (var y = 1; y <= m.n; y++)
			m[x][y] = A[y][x];
	}
	return m;
};

Matrix.augment = function augment(A, B) {
	if (A.m != B.m) return null;
	var m = new Matrix(A);
	for (var x = 1; x <= A.m; x++)
		for (var y = 1; y <= B.n; y++)
			m[x][y + A.n] = B[x][y];
	m.n += B.n;
	return m;
};