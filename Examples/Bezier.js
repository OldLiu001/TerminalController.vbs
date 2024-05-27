//初始化。
var Terminal = new ActiveXObject('Terminal.Controller');
Terminal.SetPrinter(function (sControlSequence) {
	WScript.StdOut.Write(sControlSequence);
});

Terminal.HideCursor();
Terminal.SetTextColor('BrightGreen', 'Black');
Terminal.ClearScreen();

//设置区。
var lngBufferWidth = Math.floor(Terminal.ColumnLength / 2);    //缓冲区列数
var lngBufferHeight = Terminal.RowLength - 1;   //缓冲区行数
var lngPointNumber = 6; //绘制点数
var numMoveSpeed = 0.04;    //移动紧密度
var lngLayer = 10;   //轨迹保留层数
var lngSleep = 30;  //绘制延时

function Point(x, y) {
	this.x = x;
	this.y = y;
}

function run() {
	//创建缓冲区数组。
	//arrBuffer[缓冲区索引][该缓冲区横坐标][该缓冲区纵坐标]
	var arrBuffer = new Array();
	for (var y = 0; y < lngBufferHeight; y++) {
		arrBuffer[y] = new Array();
		for (var x = 0; x < lngBufferWidth; x++) {
			arrBuffer[y][x] = '　';   //全角空格
		}
	}

	//创建控制点数组。
	//主控制点绘制主轨迹，从控制点控制主控制点按从轨迹移动。
	//主从轨迹均为三阶贝塞尔曲线。
	//arrPoints[0-3主轨迹控制点索引][0-3该控制点对应的从轨迹的从控制点,4该控制点]
	var arrPoints = new Array();
	for (var i = 0; i <= 3; i++) {
		arrPoints[i] = new Array();
	}
		

	//准备绘制。
	//初始化随机控制点。
	for (var i = 0; i <= 3; i++) {
		arrPoints[i][2] = NewControlPoint();
		arrPoints[i][3] = NewControlPoint();
	}
	var numServantT = 20011228 //4个从轨迹统一的参数t，超过1时会求新随机点并置0。
	var lngUsingBufferIndex = 0;
	//创建老点队列并填充。
	var queueOldPoints = new Array()
	for (var i = 0; i <= lngLayer * lngPointNumber; i++) {
		queueOldPoints.push(new Point(-1, -1)); //填充无效点。
	}


	//循环绘制。
	setInterval(function () {
		//若主控制点移动完成，则生成新路径。
		if (numServantT > 1) {
			numServantT = 0;
			for (var i = 0; i <= 3; i++) {
				//设置新的从轨迹接上旧的。
				//即将旧轨迹终点作为新轨迹起点。
				arrPoints[i][0] = arrPoints[i][3];
				//此处让新的控制点2作为旧控制点3关于旧控制点4/新控制点1的对称点，增加曲线平滑度。
				arrPoints[i][1] = new Point(
					2 * arrPoints[i][3].x - arrPoints[i][2].x,
					2 * arrPoints[i][3].y - arrPoints[i][2].y
				);
				//其它从控制点随机获得。
				for (var j = 2; j <= 3; j++) {
					arrPoints[i][j] = NewControlPoint();
				}
			}
		} else {
			numServantT += numMoveSpeed;
		}
		//算一下主控制点。
		for (var i = 0; i <= 3; i++) {
			arrPoints[i][4] = ThirdOrderBezierCurve(
				numServantT,
				arrPoints[i][0],
				arrPoints[i][1],
				arrPoints[i][2],
				arrPoints[i][3]
			);
		}
		//绘制缓冲区。
		//从缓冲区擦除老点。
		for (var t = 0; t <= 1; t += 1 / (lngPointNumber - 1)) {
			var OldPoint = queueOldPoints.shift();
			if (OldPoint.x >= 0 && OldPoint.x < lngBufferWidth && OldPoint.y >= 0 && OldPoint.y < lngBufferHeight) {
				DrawPoint(arrBuffer, OldPoint, "　");
			}
		}
		//绘制新点到缓冲区。
		for (var t = 0; t <= 1; t += 1 / (lngPointNumber - 1)) {
			var NewPoint = ThirdOrderBezierCurve(
				t,
				arrPoints[0][4],
				arrPoints[1][4],
				arrPoints[2][4],
				arrPoints[3][4]
			);
			//绘制新点并入队。
			if (NewPoint.x >= 0 && NewPoint.x < lngBufferWidth && NewPoint.y >= 0 && NewPoint.y < lngBufferHeight) {
				DrawPoint(arrBuffer, NewPoint, "ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ".charAt(RandomInteger(0,26)));
			}
			queueOldPoints.push(NewPoint);
		}

		//绘制结果。
		var strBuffer = '';
		for (var i = 0; i < lngBufferHeight; i++) {
			strBuffer += arrBuffer[i].join('') + '\n';
		}
		
		Terminal.MoveCursorTo(0, 0);
		WScript.StdOut.Write(strBuffer);
	}, lngSleep);
}

function ThirdOrderBezierCurve(t, p0, p1, p2, p3) {
	//三阶贝塞尔曲线计算函数。
	return new Point(
		p0.x * (1 - t) * (1 - t) * (1 - t) + 3 * p1.x * t * (1 - t) * (1 - t) + 3 * p2.x * t * t * (1 - t) + p3.x * t * t * t,
		p0.y * (1 - t) * (1 - t) * (1 - t) + 3 * p1.y * t * (1 - t) * (1 - t) + 3 * p2.y * t * t * (1 - t) + p3.y * t * t * t
	);
}

function DrawPoint(arrBuffer, objPoint, charText) {
	//在arrBuffer中画点。（其实就是修改数组）
	//alert(objPoint.y + ' ' + objPoint.x);
	arrBuffer[Math.floor(objPoint.y)][Math.floor(objPoint.x)] = charText;
	return;
}

function ArrayDeepCopy(obj) {
	//数组深拷贝函数（支持多维数组）。
	var out = [], i = 0, len = obj.length;
	for (; i < len; i++) {
		if (obj[i] instanceof Array) {
			out[i] = ArrayDeepCopy(obj[i]);
		}
		else out[i] = obj[i];
	}
	return out;
}

function NewControlPoint() {
	//获得新随机控制点。
	return NewRandomPoint(0,lngBufferWidth,0,lngBufferHeight);
	//24game的建议：将控制点范围限定在与缓冲区同心、宽高均为缓冲区宽高2/3的矩形内。
	//这样可以避免主轨迹溢出屏幕。
	//但由于对称，无法很好的限制，所以不采纳。
	//return NewRandomPoint(
	//    Math.floor(lngBufferWidth / 6),
	//    Math.floor(lngBufferWidth * 5 / 6),
	//    Math.floor(lngBufferHeight / 6), 
	//    Math.floor(lngBufferHeight * 5 / 6)
	//);
}

function NewRandomPoint(lngRangeXStart, lngRangeXEnd, lngRangeYStart, lngRangeYEnd) {
	//获得新随机点。
	return new Point(
		RandomInteger(lngRangeXStart, lngRangeXEnd),
		RandomInteger(lngRangeYStart, lngRangeYEnd)
	);
}

function RandomInteger(lngStart, lngEnd) {
	//获得以lngStart为下界（含lngStart），lngEnd为上界（不含lngEnd）的随机整数。
	return lngStart + Math.floor(Math.random() * (lngEnd - lngStart));
}

//setInterval函数的Polyfill。
function setInterval(f, intv) {
	for(;;) {
		f();
		WScript.Sleep(intv);
	}
}


run();