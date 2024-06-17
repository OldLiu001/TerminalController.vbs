var Terminal = new ActiveXObject('Terminal.Controller');
Terminal.SetPrinter(function (sControlSequence) {
	WScript.StdOut.Write(sControlSequence);
});

Terminal.HideCursor();
Terminal.SetTextColor('White', 'Black');
Terminal.ClearScreen();

var PrevState = [[1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]];
PlayHanoi(4, 0, 2, DeepCopy(PrevState));

function DeepCopy(State) {
	var Copy = [];
	for (var i = 0; i < 3; i++) {
		Copy.push(State[i].slice());
	}
	return Copy;
}

function DrawTower(a, b, c) {
	var TowerTemplate = [
		['     ©¦     ', '     ©à     '],
		['     ©¦     ', '    ©¤©à©¤    '],
		['     ©¦     ', '   ©¤©¤©à©¤©¤   '],
		['     ©¦     ', '  ©¤©¤©¤©à©¤©¤©¤  '],
		['¨\¨T¨T¨T¨T¨k¨T¨T¨T¨T¨_', '¨\¨T¨T¨T¨T¨k¨T¨T¨T¨T¨_']
	];
	var Spaces = '  ';

	var Tower = [];
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


function PlayHanoi(N, Src, Dst, State) {
	var Aux = 3 - Src - Dst;

	if (N == 1) {
		State[Dst][N - 1] = 1;
		State[Src][N - 1] = 0;
		DrawState(N, Src, Dst, State);
		return;
	}

	PlayHanoi(N - 1, Src, Aux, State);

	State[Dst][N - 1] = 1;
	State[Src][N - 1] = 0;
	DrawState(N, Src, Dst, State);
	
	PlayHanoi(N - 1, Aux, Dst, State);
}

function DrawState(N, Src, Dst, State) {
	Terminal.MoveCursorTo(0, 0);
	WScript.Echo('Move disk ' + N + ' from ' + (Src + 1) + ' to ' + (Dst + 1) + '.' + '\n');
	WScript.Echo(DrawTower(State[0], State[1], State[2]).join('\n') + '\n');
	WScript.Echo('Previous state:' + '\n');
	WScript.Echo(DrawTower(PrevState[0], PrevState[1], PrevState[2]).join('\n') + '\n');
	WScript.Sleep(1000);

	// Save the current state
	PrevState = DeepCopy(State);
}