Set objTerminal = CreateObject("Terminal.Controller")
Function Printer(strControlSequence)
	WScript.StdOut.Write strControlSequence
End Function
Set objTerminal.Printer = GetRef("Printer")

objTerminal.SetTextStyle "Normal"
WScript.StdOut.WriteLine "Normal"
objTerminal.ResetTextAttributes
objTerminal.SetTextStyle "Bold"
WScript.StdOut.WriteLine "Bold"
objTerminal.ResetTextAttributes
objTerminal.SetTextStyle "Dim"
WScript.StdOut.WriteLine "Dim"
objTerminal.ResetTextAttributes
objTerminal.SetTextStyle "Italic"
WScript.StdOut.WriteLine "Italic"
objTerminal.ResetTextAttributes
objTerminal.SetTextStyle "Underline"
WScript.StdOut.WriteLine "Underline"
objTerminal.ResetTextAttributes
objTerminal.SetTextStyle "Blink"
WScript.StdOut.WriteLine "Blink"
objTerminal.ResetTextAttributes
objTerminal.SetTextStyle "Reverse"
WScript.StdOut.WriteLine "Reverse"
objTerminal.ResetTextAttributes
objTerminal.SetTextStyle "Invisible"
WScript.StdOut.WriteLine "Invisible"
objTerminal.ResetTextAttributes
objTerminal.SetTextStyle "Strikeout"
WScript.StdOut.WriteLine "Strikeout"
objTerminal.ResetTextAttributes