Class TerminalController
	Private lngRow, lngColumn

	Private strEscapeCharacter
	
	Private objForegroundColor, objBackgroundColor, objStyles

	Private Print

	Private Sub Class_Initialize()
		strEscapeCharacter = Chr(27)

		Call GetTerminalSize()

		Set objForegroundColor = CreateObject("Scripting.Dictionary")
		Set objBackgroundColor = CreateObject("Scripting.Dictionary")
		Set objStyles = CreateObject("Scripting.Dictionary")

		With objForegroundColor
			.Add "Black", 30
			.Add "Red", 31
			.Add "Green", 32
			.Add "Yellow", 33
			.Add "Blue", 34
			.Add "Magenta", 35
			.Add "Cyan", 36
			.Add "White", 37

			.Add "BrightBlack", 90
			.Add "BrightRed", 91
			.Add "BrightGreen", 92
			.Add "BrightYellow", 93
			.Add "BrightBlue", 94
			.Add "BrightMagenta", 95
			.Add "BrightCyan", 96
			.Add "BrightWhite", 97

			.Add "Default", 39
		End With

		With objBackgroundColor
			.Add "Black", 40
			.Add "Red", 41
			.Add "Green", 42
			.Add "Yellow", 43
			.Add "Blue", 44
			.Add "Magenta", 45
			.Add "Cyan", 46
			.Add "White", 47

			.Add "BrightBlack", 100
			.Add "BrightRed", 101
			.Add "BrightGreen", 102
			.Add "BrightYellow", 103
			.Add "BrightBlue", 104
			.Add "BrightMagenta", 105
			.Add "BrightCyan", 106
			.Add "BrightWhite", 107

			.Add "Default", 49
		End With

		With objStyles
			.Add "Normal", 0
			.Add "Bold", 1
			.Add "Dim", 2
			.Add "Italic", 3
			.Add "Underline", 4
			.Add "Blink", 5
			.Add "Reverse", 7
			.Add "Invisible", 8
			.Add "Strikeout", 9
		End With
	End Sub

	Private Sub GetTerminalSize()
		Dim objRegExp
		Set objRegExp = New RegExp
		objRegExp.Pattern = "\d+"
		objRegExp.Global = True
		objRegExp.IgnoreCase = True
		Set objMaches = objRegExp.Execute( _
			CreateObject("WScript.Shell").Exec("mode.com con /status").StdOut.ReadAll())

		lngRow = CInt(objMaches(0).Value)
		lngColumn = CInt(objMaches(1).Value)
		Set objMaches = Nothing
		Set objRegExp = Nothing
	End Sub

	Public Property Get RowLength()
		RowLength = lngRow
	End Property

	Public Property Get ColumnLength()
		ColumnLength = lngColumn
	End Property

	Public Property Set Printer(ByRef objPrinter)
		Set Print = objPrinter
	End Property

	Private Function Escape(ByVal strText)
		Escape = Replace(strText, "\e", strEscapeCharacter)
		Escape = Replace(Escape, "\033", strEscapeCharacter)
	End Function

	Public Sub SaveCursorPosition()
		Print Escape("\e7")
	End Sub

	Public Sub RestoreCursorPosition()
		Print Escape("\e8")
	End Sub

	Public Sub HideCursor()
		Print Escape("\e[?25l")
	End Sub

	Public Sub ShowCursor()
		Print Escape("\e[?25h")
	End Sub

	Public Sub SaveScreen()
		Print Escape("\e[?1049h")
	End Sub

	Public Sub RestoreScreen()
		Print Escape("\e[?1049l")
	End Sub

	Public Sub ClearScreen()
		Print Escape("\e[2J")
	End Sub

	Public Sub LimitScroll(ByVal lngTop, ByVal lngBottom)
		Print Escape("\e[" & CStr(lngTop) & ";" & CStr(lngBottom) & "r")
	End Sub

	Public Sub ReleseScroll()
		Print Escape("\e[r")
	End Sub

	Public Sub MoveCursorToTopLeft()
		Print Escape("\e[H")
	End Sub

	Public Sub MoveCursorTo(ByVal lngRow, ByVal lngColumn)
		Print Escape("\e[" & CStr(lngRow) & ";" & CStr(lngColumn) & "H")
	End Sub

	Public Sub MoveCursorToRow(ByVal lngRow)
		Print Escape("\e[" & CStr(lngRow) & "H")
	End Sub

	Public Sub MoveCursorToColumn(ByVal lngColumn)
		Print Escape("\e[" & CStr(lngColumn) & "G")
	End Sub

	Public Sub MoveCursorUp(ByVal lngCount)
		If lngCount = Empty Then lngCount = 1
		Print Escape("\e[" & CStr(lngCount) & "A")
	End Sub

	Public Sub MoveCursorDown(ByVal lngCount)
		If lngCount = Empty Then lngCount = 1
		Print Escape("\e[" & CStr(lngCount) & "B")
	End Sub

	Public Sub MoveCursorRight(ByVal lngCount)
		If lngCount = Empty Then lngCount = 1
		Print Escape("\e[" & CStr(lngCount) & "C")
	End Sub

	Public Sub MoveCursorLeft(ByVal lngCount)
		If lngCount = Empty Then lngCount = 1
		Print Escape("\e[" & CStr(lngCount) & "D")
	End Sub

	Public Sub SetTextStyle(ByVal strStyle)
		Print Escape("\e[" & CStr(objStyles(strStyle)) & "m")
	End Sub

	Public Sub SetTextColor(ByVal strForegroundColor, ByVal strBackgroundColor)
		Print Escape("\e[" & _
			CStr(objBackgroundColor(strBackgroundColor)) & ";" & _
			CStr(objForegroundColor(strForegroundColor)) & "m")
	End Sub

	Public Sub ResetTextAttributes()
		Print Escape("\e[0m")
	End Sub
End Class