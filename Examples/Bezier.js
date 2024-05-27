//��ʼ����
var Terminal = new ActiveXObject('Terminal.Controller');
Terminal.SetPrinter(function (sControlSequence) {
	WScript.StdOut.Write(sControlSequence);
});

Terminal.HideCursor();
Terminal.SetTextColor('BrightGreen', 'Black');
Terminal.ClearScreen();

//��������
var lngBufferWidth = Math.floor(Terminal.ColumnLength / 2);    //����������
var lngBufferHeight = Terminal.RowLength - 1;   //����������
var lngPointNumber = 6; //���Ƶ���
var numMoveSpeed = 0.04;    //�ƶ����ܶ�
var lngLayer = 10;   //�켣��������
var lngSleep = 30;  //������ʱ

function Point(x, y) {
	this.x = x;
	this.y = y;
}

function run() {
	//�������������顣
	//arrBuffer[����������][�û�����������][�û�����������]
	var arrBuffer = new Array();
	for (var y = 0; y < lngBufferHeight; y++) {
		arrBuffer[y] = new Array();
		for (var x = 0; x < lngBufferWidth; x++) {
			arrBuffer[y][x] = '��';   //ȫ�ǿո�
		}
	}

	//�������Ƶ����顣
	//�����Ƶ�������켣���ӿ��Ƶ���������Ƶ㰴�ӹ켣�ƶ���
	//���ӹ켣��Ϊ���ױ��������ߡ�
	//arrPoints[0-3���켣���Ƶ�����][0-3�ÿ��Ƶ��Ӧ�Ĵӹ켣�Ĵӿ��Ƶ�,4�ÿ��Ƶ�]
	var arrPoints = new Array();
	for (var i = 0; i <= 3; i++) {
		arrPoints[i] = new Array();
	}
		

	//׼�����ơ�
	//��ʼ��������Ƶ㡣
	for (var i = 0; i <= 3; i++) {
		arrPoints[i][2] = NewControlPoint();
		arrPoints[i][3] = NewControlPoint();
	}
	var numServantT = 20011228 //4���ӹ켣ͳһ�Ĳ���t������1ʱ����������㲢��0��
	var lngUsingBufferIndex = 0;
	//�����ϵ���в���䡣
	var queueOldPoints = new Array()
	for (var i = 0; i <= lngLayer * lngPointNumber; i++) {
		queueOldPoints.push(new Point(-1, -1)); //�����Ч�㡣
	}


	//ѭ�����ơ�
	setInterval(function () {
		//�������Ƶ��ƶ���ɣ���������·����
		if (numServantT > 1) {
			numServantT = 0;
			for (var i = 0; i <= 3; i++) {
				//�����µĴӹ켣���Ͼɵġ�
				//�����ɹ켣�յ���Ϊ�¹켣��㡣
				arrPoints[i][0] = arrPoints[i][3];
				//�˴����µĿ��Ƶ�2��Ϊ�ɿ��Ƶ�3���ھɿ��Ƶ�4/�¿��Ƶ�1�ĶԳƵ㣬��������ƽ���ȡ�
				arrPoints[i][1] = new Point(
					2 * arrPoints[i][3].x - arrPoints[i][2].x,
					2 * arrPoints[i][3].y - arrPoints[i][2].y
				);
				//�����ӿ��Ƶ������á�
				for (var j = 2; j <= 3; j++) {
					arrPoints[i][j] = NewControlPoint();
				}
			}
		} else {
			numServantT += numMoveSpeed;
		}
		//��һ�������Ƶ㡣
		for (var i = 0; i <= 3; i++) {
			arrPoints[i][4] = ThirdOrderBezierCurve(
				numServantT,
				arrPoints[i][0],
				arrPoints[i][1],
				arrPoints[i][2],
				arrPoints[i][3]
			);
		}
		//���ƻ�������
		//�ӻ����������ϵ㡣
		for (var t = 0; t <= 1; t += 1 / (lngPointNumber - 1)) {
			var OldPoint = queueOldPoints.shift();
			if (OldPoint.x >= 0 && OldPoint.x < lngBufferWidth && OldPoint.y >= 0 && OldPoint.y < lngBufferHeight) {
				DrawPoint(arrBuffer, OldPoint, "��");
			}
		}
		//�����µ㵽��������
		for (var t = 0; t <= 1; t += 1 / (lngPointNumber - 1)) {
			var NewPoint = ThirdOrderBezierCurve(
				t,
				arrPoints[0][4],
				arrPoints[1][4],
				arrPoints[2][4],
				arrPoints[3][4]
			);
			//�����µ㲢��ӡ�
			if (NewPoint.x >= 0 && NewPoint.x < lngBufferWidth && NewPoint.y >= 0 && NewPoint.y < lngBufferHeight) {
				DrawPoint(arrBuffer, NewPoint, "���£ãģţƣǣȣɣʣˣ̣ͣΣϣУѣңӣԣգ֣ףأ٣�".charAt(RandomInteger(0,26)));
			}
			queueOldPoints.push(NewPoint);
		}

		//���ƽ����
		var strBuffer = '';
		for (var i = 0; i < lngBufferHeight; i++) {
			strBuffer += arrBuffer[i].join('') + '\n';
		}
		
		Terminal.MoveCursorTo(0, 0);
		WScript.StdOut.Write(strBuffer);
	}, lngSleep);
}

function ThirdOrderBezierCurve(t, p0, p1, p2, p3) {
	//���ױ��������߼��㺯����
	return new Point(
		p0.x * (1 - t) * (1 - t) * (1 - t) + 3 * p1.x * t * (1 - t) * (1 - t) + 3 * p2.x * t * t * (1 - t) + p3.x * t * t * t,
		p0.y * (1 - t) * (1 - t) * (1 - t) + 3 * p1.y * t * (1 - t) * (1 - t) + 3 * p2.y * t * t * (1 - t) + p3.y * t * t * t
	);
}

function DrawPoint(arrBuffer, objPoint, charText) {
	//��arrBuffer�л��㡣����ʵ�����޸����飩
	//alert(objPoint.y + ' ' + objPoint.x);
	arrBuffer[Math.floor(objPoint.y)][Math.floor(objPoint.x)] = charText;
	return;
}

function ArrayDeepCopy(obj) {
	//�������������֧�ֶ�ά���飩��
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
	//�����������Ƶ㡣
	return NewRandomPoint(0,lngBufferWidth,0,lngBufferHeight);
	//24game�Ľ��飺�����Ƶ㷶Χ�޶����뻺����ͬ�ġ���߾�Ϊ���������2/3�ľ����ڡ�
	//�������Ա������켣�����Ļ��
	//�����ڶԳƣ��޷��ܺõ����ƣ����Բ����ɡ�
	//return NewRandomPoint(
	//    Math.floor(lngBufferWidth / 6),
	//    Math.floor(lngBufferWidth * 5 / 6),
	//    Math.floor(lngBufferHeight / 6), 
	//    Math.floor(lngBufferHeight * 5 / 6)
	//);
}

function NewRandomPoint(lngRangeXStart, lngRangeXEnd, lngRangeYStart, lngRangeYEnd) {
	//���������㡣
	return new Point(
		RandomInteger(lngRangeXStart, lngRangeXEnd),
		RandomInteger(lngRangeYStart, lngRangeYEnd)
	);
}

function RandomInteger(lngStart, lngEnd) {
	//�����lngStartΪ�½磨��lngStart����lngEndΪ�Ͻ磨����lngEnd�������������
	return lngStart + Math.floor(Math.random() * (lngEnd - lngStart));
}

//setInterval������Polyfill��
function setInterval(f, intv) {
	for(;;) {
		f();
		WScript.Sleep(intv);
	}
}


run();