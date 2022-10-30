var Terminal = new ActiveXObject('Terminal.Controller');
Terminal.SetPrinter(function (sControlSequence) {
	WScript.StdOut.Write(sControlSequence);
});

Terminal.HideCursor();
Terminal.SetTextColor('White', 'Black');
Terminal.ClearScreen();

var Block = {
    Black : '  ',
    White: String.fromCharCode(0x2588) + String.fromCharCode(0x2588)
}

var Buffer = {
    RowLength : 300,
    ColumnLength : 300
}
Buffer.Status = (function (nRowLength, nColumnLength) {
    var aStatus = [];
    for (var i = 0; i < nColumnLength; i++){
        aStatus[i] = [];
        for (var j = 0; j < nRowLength; j++)
            aStatus[i][j] = Block.Black;
    }
    return aStatus;
})(Buffer.RowLength, Buffer.ColumnLength);

var Screen = {
    RowLength : Terminal.RowLength,
    ColumnLength : Math.floor(Terminal.ColumnLength / 2),
    Step : 0
}
Screen.Position = { // Screen top left corner position in Buffer
    X : Math.floor(Buffer.ColumnLength / 2) - Math.floor(Screen.ColumnLength / 2),
    Y : Math.floor(Buffer.RowLength / 2) - Math.floor(Screen.RowLength / 2)
};
Screen.Draw = function (oPosition) {
    Terminal.MoveCursorTo(0,0);
    WScript.StdOut.Write('Step: ' + Screen.Step.toString());
    Screen.Step ++;
    if ( // Ant escaped from Screen
            oPosition.Y <= Screen.Position.Y + 1 ||
            oPosition.X <= Screen.Position.X ||
            oPosition.Y >= Screen.Position.Y + Screen.RowLength ||
            oPosition.X >= Screen.Position.X + Screen.ColumnLength
    ) {
        // Refresh Screen position.
        Screen.Position = {
            X : oPosition.X - Math.floor(Screen.ColumnLength / 2),
            Y: oPosition.Y - Math.floor(Screen.RowLength / 2)
        };
        // Redraw all Blocks.
        for(var y = 2; y < Screen.RowLength; y ++){
            for(var x = 0; x < Screen.ColumnLength; x ++){
                Terminal.MoveCursorTo(y, x * 2);
                WScript.StdOut.Write(Buffer.Status[Screen.Position.X + x][Screen.Position.Y + y]);
            }
        }
    } else {
        Terminal.MoveCursorTo(
                oPosition.Y - Screen.Position.Y,
                (oPosition.X - Screen.Position.X) * 2);
        WScript.StdOut.Write(Buffer.Status[oPosition.X][oPosition.Y]);
    }
}

var Direction = {
    Down : 0,
    Left : 1,
    Up : 2,
    Right : 3,
    TurnRight : function (i) {
        return (i + 1) % 4;
    },
    TurnLeft : function (i) {
        return (i + 3) % 4;
    }
}

var Ant = {
    Position : {
        X : Math.floor(Buffer.ColumnLength / 2),
        Y : Math.floor(Buffer.RowLength / 2)
    },
    Direction : Direction.Up
};
Ant.Move = function () {
    Ant.Position.Y = Ant.Position.Y + (
            Ant.Direction == Direction.Down ? 1 : (
                    Ant.Direction == Direction.Up ? -1 : 0));
    Ant.Position.X = Ant.Position.X + (
            Ant.Direction == Direction.Right ? 1 : (
                    Ant.Direction == Direction.Left ? -1 : 0));
};
Ant.Turn = function () {
    if (Buffer.Status[Ant.Position.X][Ant.Position.Y] == Block.Black) {
        Ant.Direction = Direction.TurnLeft(Ant.Direction);
        Buffer.Status[Ant.Position.X][Ant.Position.Y] = Block.White;
    } else {
        Ant.Direction = Direction.TurnRight(Ant.Direction);
        Buffer.Status[Ant.Position.X][Ant.Position.Y] = Block.Black;
    }
};

while (Screen.Step <= 13000) {
    Ant.Turn();
    Screen.Draw(Ant.Position);
    Ant.Move();
    WScript.Sleep(1);
}
