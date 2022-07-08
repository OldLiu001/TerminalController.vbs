var Terminal = new ActiveXObject('Terminal.Controller');
Terminal.SetPrinter(function (sControlSequence) {
	WScript.StdOut.Write(sControlSequence);
});

Terminal.HideCursor();
Terminal.SetTextColor('White', 'Black');
Terminal.ClearScreen();

nXMax = Math.floor(Terminal.ColumnLength / 2);
nYMax = Terminal.RowLength - 1;

// WScript.Echo(nWidth, nHeight);

Color = {Black : '  ', White: String.fromCharCode(0x2588) + String.fromCharCode(0x2588)}

var aScreen = [];
for (var i = 0; i < nXMax; i++){
	aScreen[i] = [];
	for (var j = 0; j < nYMax; j++)
		aScreen[i][j] = Color.Black;
}

var Direction = {
	Down : 0,
	Left : 1,
	Up : 2,
	Right : 3,
	TurnRight : function (i) {return (i + 1) % 4;},
	TurnLeft : function (i) {return (i + 3) % 4;}
}

function Position(X, Y){
	this.X = X;
	this.Y = Y;
}

function MoveFoward(oPosition, oDirection){
	var X = oPosition.X + (
		oDirection == Direction.Down ? 1 : (
			oDirection == Direction.Up ? -1 : 0
		)
	)
	var Y = oPosition.Y + (
		oDirection == Direction.Right ? 1 : (
			oDirection == Direction.Left ? -1 : 0
		)
	)
	return new Position(X, Y);
}

var Ant = {
	Position : new Position(Math.floor(nXMax / 2), Math.floor(nYMax / 2)),
	Direction : Direction.Down
};

//Terminal.MoveCursorTo(Ant.Position.Y, Ant.Position.X * 2);
//WScript.StdOut.Write('AA');
//WScript.Sleep(4000);

//WScript.Echo(Ant.Direction, Ant.Position.X, Ant.Position.Y, Direction.TurnRight(Ant.Direction));

//AntMove(aScreen,Ant);

function AntMove(aScreen, oAnt) {
	//WScript.Echo(oAnt.Direction, oAnt.Position.X, oAnt.Position.Y, Direction.TurnRight(oAnt.Direction));
	//WScript.Echo('0');
	if (aScreen[oAnt.Position.X][oAnt.Position.Y] == Color.Black) {
		//WScript.Echo('1');
		oAnt.Direction = Direction.TurnRight(oAnt.Direction);
	} else {
		oAnt.Direction = Direction.TurnLeft(oAnt.Direction);
	}
	oAnt.Position = MoveFoward(oAnt.Position, oAnt.Direction);
	//return aScreen[oAnt.Position.X][oAnt.Position.Y] === Color.Black ? Color.White : Color.Black;
	return !aScreen[oAnt.Position.X][oAnt.Position.Y];
}

while (true
	//Ant.Position.X < nXMax &&
	//Ant.Position.Y < nYMax &&
	//Ant.Position.X >= 0 &&
	//Ant.Position.Y >= 0
) {
	Terminal.MoveCursorTo(Ant.Position.Y, Ant.Position.X * 2);
	aScreen[Ant.Position.X][Ant.Position.Y] = AntMove(aScreen, Ant);
	WScript.StdOut.Write(aScreen[Ant.Position.X][Ant.Position.Y] == true ? Color.White : Color.Black);
	WScript.Sleep(10);
}

//show 
