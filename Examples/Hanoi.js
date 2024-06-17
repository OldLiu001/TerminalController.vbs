var Terminal = new ActiveXObject('Terminal.Controller');
Terminal.SetPrinter(function (sControlSequence) {
	WScript.StdOut.Write(sControlSequence);
});

Terminal.HideCursor();

var BufW = Terminal.ColumnLength;
var BufH = Terminal.RowLength;

// Draw the Hanoi Tower
//test the DrawTower function
WScript.Echo(DrawTower([0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]).join('\n'));
WScript.Echo(DrawTower([1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]).join('\n'));
WScript.Echo(DrawTower([0, 1, 0, 1], [1, 0, 1, 0], [0, 1, 0, 1]).join('\n'));





function DrawTower(a, b, c) {
	var TowerTemplate = [
		['     ©à     ', '     ©¦     '],
		['    ©¤©à©¤    ', '     ©¦     '],
		['   ©¤©¤©à©¤©¤   ', '     ©¦     '],
		['  ©¤©¤©¤©à©¤©¤©¤  ', '     ©¦     '],
		['¨\¨T¨T¨T¨T¨k¨T¨T¨T¨T¨_', '¨\¨T¨T¨T¨T¨k¨T¨T¨T¨T¨_']
	];

	var Tower = [];
	var Spaces = '  ';
	for (var i = 1; i <= 4; i++) {
		Tower.push(
			TowerTemplate[i - 1][a[i - 1]] + Spaces +
			TowerTemplate[i - 1][b[i - 1]] + Spaces +
			TowerTemplate[i - 1][c[i - 1]]);
	}
	// Append the base
	Tower.push(
		TowerTemplate[4][0] + Spaces +
		TowerTemplate[4][0] + Spaces +
		TowerTemplate[4][0]);
	return Tower;
}


function PlayHanoi(n, a, b, c) {
	if (n == 1) {
		Terminal.PrintLn('Move disk 1 from ' + a + ' to ' + c);
		return;
	}
	PlayHanoi(n - 1, a, c, b);
	Terminal.PrintLn('Move disk ' + n + ' from ' + a + ' to ' + c);
	PlayHanoi(n - 1, b, a, c);
}