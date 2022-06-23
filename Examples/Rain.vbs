'Option Explicit
Const CHAR_MAP = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

Dim objTerminal
Set objTerminal = CreateObject("Terminal.Controller")
Function Printer(strControlSequence)
	WScript.StdOut.Write strControlSequence
End Function
objTerminal.SetPrinter GetRef("Printer")

objTerminal.HideCursor
objTerminal.SetTextColor "BrightGreen", "Black"
objTerminal.ClearScreen


Dim lngWidth, lngHeight
lngWidth = objTerminal.ColumnLength
lngHeight = objTerminal.RowLength - 1
strScreen = Replace(Space(lngHeight), " ", Space(lngWidth) & vbNewLine)
wsh.echo "a" + strScreen + "b"
'Class Raindrop

'msgbox Join(Split(String(lngWidth, " _"), "_"), ",")
Dim NowDown(),y(),Length()
ReDim NowDown(objTerminal.ColumnLength - 1),y(objTerminal.RowLength - 1 - 1),SpaceArray(objTerminal.ColumnLength - 1),Length(objTerminal.ColumnLength - 1)
For i = 1 To objTerminal.ColumnLength
	SpaceArray(i - 1) = " "
Next
For i = 1 To objTerminal.RowLength - 1
	y(i-1)=SpaceArray
Next
While True
	For i = 0 To UBound(NowDown)
		If NowDown(i) = Empty Then
			NowDown(i) = - Fix(Rnd * Height)
			Length(i) = Fix(Rnd * (Height / 3) * 2) + Fix(Height / 4)
		End If
		If NowDown(i) < Height And NowDown(i) >= 0 Then
			y(NowDown(i))(i) = Mid(CHAR_MAP,Fix(Rnd * Len(CHAR_MAP)) + 1,1)
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
	Dim i
	For i = 0 To UBound(Arr)
		GetStr = GetStr & Join(Arr(i),"") & vbNewLine
	Next
End Function