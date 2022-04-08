Dim objTerminal
Set objTerminal = CreateObject("Terminal.Controller")
Function Printer(strControlSequence)
	WScript.StdOut.Write strControlSequence
End Function
Set objTerminal.Printer = GetRef("Printer")
Width = objTerminal.ColumnLength
Height = objTerminal.RowLength - 1
objTerminal.HideCursor
objTerminal.SetTextColor "BrightGreen", "Black"
objTerminal.ClearScreen

Const CharMap = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
Dim NowDown(),y(),Length()
ReDim NowDown(Width - 1),y(Height - 1),SpaceArray(Width - 1),Length(Width - 1)
For i = 1 To Width
	SpaceArray(i - 1) = " "
Next
For i = 1 To Height
	y(i-1)=SpaceArray
Next
While True
	For i = 0 To UBound(NowDown)
		If NowDown(i) = Empty Then
			NowDown(i) = - Fix(Rnd * Height)
			Length(i) = Fix(Rnd * (Height / 3) * 2) + Fix(Height / 4)
		End If
		If NowDown(i) < Height And NowDown(i) >= 0 Then
			y(NowDown(i))(i) = Mid(CharMap,Fix(Rnd * Len(CharMap)) + 1,1)
		End If
		If NowDown(i) - Length(i) >= 0 And NowDown(i) - Length(i) < Height Then
			y(NowDown(i) - Length(i))(i) = " "
		End If
		If NowDown(i) - Length(i) + 1 = Height Then
			NowDown(i) = Empty
		Else
			NowDown(i) = NowDown(i) + 1
		End If
	Next
	objTerminal.MoveCursorToTopLeft
	WScript.StdOut.Write GetStr(y)
	WScript.Sleep 10
Wend
Function GetStr(Arr)
	Dim Str
	Str = ""
	For i = 0 To UBound(Arr)
		Str = Str & Join(Arr(i),"") & vbNewLine
	Next
	GetStr = Str
End Function