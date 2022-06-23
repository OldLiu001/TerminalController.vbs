Set objTerminal = CreateObject("Terminal.Controller")
Function Printer(strControlSequence)
	WScript.StdOut.Write strControlSequence
End Function
objTerminal.SetPrinter GetRef("Printer")

'Foreground Colors
objTerminal.SetTextColor "Black", "Default"
WScript.Echo "Foreground: Black"
objTerminal.SetTextColor "Red", "Default"
WScript.Echo "Foreground: Red"
objTerminal.SetTextColor "Green", "Default"
WScript.Echo "Foreground: Green"
objTerminal.SetTextColor "Yellow", "Default"
WScript.Echo "Foreground: Yellow"
objTerminal.SetTextColor "Blue", "Default"
WScript.Echo "Foreground: Blue"
objTerminal.SetTextColor "Magenta", "Default"
WScript.Echo "Foreground: Magenta"
objTerminal.SetTextColor "Cyan", "Default"
WScript.Echo "Foreground: Cyan"
objTerminal.SetTextColor "White", "Default"
WScript.Echo "Foreground: White"
objTerminal.SetTextColor "BrightBlack", "Default"
WScript.Echo "Foreground: BrightBlack"
objTerminal.SetTextColor "BrightRed", "Default"
WScript.Echo "Foreground: BrightRed"
objTerminal.SetTextColor "BrightGreen", "Default"
WScript.Echo "Foreground: BrightGreen"
objTerminal.SetTextColor "BrightYellow", "Default"
WScript.Echo "Foreground: BrightYellow"
objTerminal.SetTextColor "BrightBlue", "Default"
WScript.Echo "Foreground: BrightBlue"
objTerminal.SetTextColor "BrightMagenta", "Default"
WScript.Echo "Foreground: BrightMagenta"
objTerminal.SetTextColor "BrightCyan", "Default"
WScript.Echo "Foreground: BrightCyan"
objTerminal.SetTextColor "BrightWhite", "Default"
WScript.Echo "Foreground: BrightWhite"
objTerminal.SetTextColor "Default", "Default"
WScript.Echo ""

'Background Colors
objTerminal.SetTextColor "Default", "Black"
WScript.StdOut.Write "Background: Black"
objTerminal.SetTextColor "Default", "Default"
WScript.StdOut.WriteBlankLines 1
objTerminal.SetTextColor "Default", "Red"
WScript.StdOut.Write "Background: Red"
objTerminal.SetTextColor "Default", "Default"
WScript.StdOut.WriteBlankLines 1
objTerminal.SetTextColor "Default", "Green"
WScript.StdOut.Write "Background: Green"
objTerminal.SetTextColor "Default", "Default"
WScript.StdOut.WriteBlankLines 1
objTerminal.SetTextColor "Default", "Yellow"
WScript.StdOut.Write "Background: Yellow"
objTerminal.SetTextColor "Default", "Default"
WScript.StdOut.WriteBlankLines 1
objTerminal.SetTextColor "Default", "Blue"
WScript.StdOut.Write "Background: Blue"
objTerminal.SetTextColor "Default", "Default"
WScript.StdOut.WriteBlankLines 1
objTerminal.SetTextColor "Default", "Magenta"
WScript.StdOut.Write "Background: Magenta"
objTerminal.SetTextColor "Default", "Default"
WScript.StdOut.WriteBlankLines 1
objTerminal.SetTextColor "Default", "Cyan"
WScript.StdOut.Write "Background: Cyan"
objTerminal.SetTextColor "Default", "Default"
WScript.StdOut.WriteBlankLines 1
objTerminal.SetTextColor "Default", "White"
WScript.StdOut.Write "Background: White"
objTerminal.SetTextColor "Default", "Default"
WScript.StdOut.WriteBlankLines 1
objTerminal.SetTextColor "Default", "BrightBlack"
WScript.StdOut.Write "Background: BrightBlack"
objTerminal.SetTextColor "Default", "Default"
WScript.StdOut.WriteBlankLines 1
objTerminal.SetTextColor "Default", "BrightRed"
WScript.StdOut.Write "Background: BrightRed"
objTerminal.SetTextColor "Default", "Default"
WScript.StdOut.WriteBlankLines 1
objTerminal.SetTextColor "Default", "BrightGreen"
WScript.StdOut.Write "Background: BrightGreen"
objTerminal.SetTextColor "Default", "Default"
WScript.StdOut.WriteBlankLines 1
objTerminal.SetTextColor "Default", "BrightYellow"
WScript.StdOut.Write "Background: BrightYellow"
objTerminal.SetTextColor "Default", "Default"
WScript.StdOut.WriteBlankLines 1
objTerminal.SetTextColor "Default", "BrightBlue"
WScript.StdOut.Write "Background: BrightBlue"
objTerminal.SetTextColor "Default", "Default"
WScript.StdOut.WriteBlankLines 1
objTerminal.SetTextColor "Default", "BrightMagenta"
WScript.StdOut.Write "Background: BrightMagenta"
objTerminal.SetTextColor "Default", "Default"
WScript.StdOut.WriteBlankLines 1
objTerminal.SetTextColor "Default", "BrightCyan"
WScript.StdOut.Write "Background: BrightCyan"
objTerminal.SetTextColor "Default", "Default"
WScript.StdOut.WriteBlankLines 1
objTerminal.SetTextColor "Default", "BrightWhite"
WScript.StdOut.Write "Background: BrightWhite"
objTerminal.SetTextColor "Default", "Default"
WScript.StdOut.WriteBlankLines 1