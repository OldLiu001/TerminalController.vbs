var Terminal = new ActiveXObject('Terminal.Controller');
Terminal.SetPrinter(function (sControlSequence) {
	WScript.StdOut.Write(sControlSequence);
});

Terminal.HideCursor();

var BufW = Terminal.ColumnLength;
var BufH = Terminal.RowLength;

// Draw the Hanoi Tower




function PlayHanoi(n, a, b, c) {
	if (n == 1) {
		Terminal.PrintLn('Move disk 1 from ' + a + ' to ' + c);
		return;
	}
	PlayHanoi(n - 1, a, c, b);
	Terminal.PrintLn('Move disk ' + n + ' from ' + a + ' to ' + c);
	PlayHanoi(n - 1, b, a, c);
}