var oTerminal = new ActiveXObject("Terminal.Controller");
oTerminal.Printer = function(sControlSequence) {
	WScript.StdOut.Write(sControlSequence);
}

var sText = "Microsoft Windows 2000";
oTerminal.ClearScreen();
oTerminal.MoveCursorTo(
	Math.floor(oTerminal.RowLength / 2),
	Math.floor((oTerminal.ColumnLength - sText.length) / 2)
);
WScript.Echo(sText)

oTerminal.MoveCursorToRow(oTerminal.RowLength);
WScript.StdOut.Write(
	(function (f) {
		return f(f);
	})(function (repeat) {
		return function(lngCount) {
			return lngCount == 0
				? ""
				: "=" + repeat(repeat)(lngCount - 1);
		};
	})(oTerminal.ColumnLength)
);

oTerminal.MoveCursorToRow(oTerminal.RowLength);
(function (f) {
	return f(f);
})(function (repeat) {
	return function(lngCount) {
		WScript.StdOut.Write(">");
		WScript.Sleep(10);
		lngCount != 1 ? repeat(repeat)(lngCount - 1) : 0;
	};
})(oTerminal.ColumnLength);

WScript.Sleep(3000);