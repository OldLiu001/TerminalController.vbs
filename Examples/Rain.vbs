Option Explicit
Const CHAR_MAP = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

Dim objTerminal
Set objTerminal = CreateObject("Terminal.Controller")
Function Printer(strControlSequence)
	WScript.StdOut.Write strControlSequence
End Function
objTerminal.SetPrinter GetRef("Printer")

objTerminal.HideCursor
objTerminal.ClearScreen


Dim lngWidth, lngHeight
lngWidth = objTerminal.ColumnLength
lngHeight = objTerminal.RowLength
Dim alngRainDropLength(), alngRainDropHead(), alngRainDropTail(), astrRainDropHead()
ReDim alngRainDropLength(lngWidth - 1), alngRainDropHead(lngWidth - 1)
ReDim alngRainDropTail(lngWidth - 1), astrRainDropHead(lngWidth - 1)

Dim i
While True
	For i = 0 To lngWidth - 1
		'Generate rain drop
		If alngRainDropHead(i) = Empty Then
			alngRainDropHead(i) = - Fix(Rnd * lngHeight)
			alngRainDropLength(i) = Fix(Rnd * (lngHeight / 3) * 2) + Fix(lngHeight / 4)
		End If
		alngRainDropTail(i) = alngRainDropHead(i) - alngRainDropLength(i)

		'Draw rain drop
		If alngRainDropHead(i) <= lngHeight And alngRainDropHead(i) >= 1 Then
			objTerminal.SetTextColor "BrightGreen", "Black"
			objTerminal.MoveCursorTo alngRainDropHead(i), i
			WScript.StdOut.Write astrRainDropHead(i)
		End If
		If alngRainDropHead(i) < lngHeight And alngRainDropHead(i) >= 0 Then
			objTerminal.SetTextColor "BrightWhite", "Black"
			objTerminal.MoveCursorTo alngRainDropHead(i) + 1, i
			astrRainDropHead(i) = Mid(CHAR_MAP,Fix(Rnd * Len(CHAR_MAP)) + 1,1)
			WScript.StdOut.Write astrRainDropHead(i)
		End If
		If alngRainDropTail(i) < lngHeight And alngRainDropTail(i) >= 0 Then
			objTerminal.MoveCursorTo alngRainDropTail(i) + 1, i
			WScript.StdOut.Write " "
		End If

		'Clear rain drop
		If alngRainDropTail(i) + 1 = lngHeight Then
			alngRainDropHead(i) = Empty
		Else
			alngRainDropHead(i) = alngRainDropHead(i) + 1
		End If
	Next
	WScript.Sleep 10
WEnd
