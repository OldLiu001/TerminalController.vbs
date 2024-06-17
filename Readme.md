```
 ___ __, __, _, _ _ _, _  _, _,     _,  _, _, _ ___ __,  _, _,  _,  __, __,
  |  |_  |_) |\/| | |\ | /_\ |     / ` / \ |\ |  |  |_) / \ |   |   |_  |_)
  |  |   | \ |  | | | \| | | | ,   \ , \ / | \|  |  | \ \ / | , | , |   | \
  ~  ~~~ ~ ~ ~  ~ ~ ~  ~ ~ ~ ~~~    ~   ~  ~  ~  ~  ~ ~  ~  ~~~ ~~~ ~~~ ~ ~
```

A powerful, portable COM component written in *VBScript* to control Windows Terminal.

*JScript* is also available for use with this component.

Include color output, cursor control, and so on.

# View introduction in

- [Chinese](Readme_zh.md)
- [English](Readme.md)

# Getting Started

## Requirements

- Microsoft Windows Operating System
- Windows Terminal

## Installation

Run following commands as **administrator**:

```
git clone https://github.com/OldLiu001/TerminalController.vbs.git
cd TerminalController.vbs
regsvr32 TerminalController.wsc
```

**WARN: DO NOT REGISTER *TerminalController.wsc* BY RIGHT CLICKING ON IT.**

Then to create a instance of class, use following code:

*VBScript*

```
Set objTerminalController = CreateObject("Terminal.Controller")
```

*JScript*

```
var objTerminalController = new ActiveXObject("Terminal.Controller");
```

## Portability

A Portable version can help you publish your script to others.

### For **Visual Basic Script**

#### Method 1: Using **"Windows Script host File"**

Copy script file *TerminalController.vbs* to your script's parent folder.

Assume that your script's file name is *MyScript.vbs*, use following template code:


*Template.wsf*

```
<job id="MyScript">
	<script language="VBScript" src="TerminalController.vbs"/>
	<script language="VBScript" src="MyScript.vbs"/>
</job>
```

Save *Template.wsf* to folder where your script also in.

In another way, you can embedding script & library into a single *WSF*:

*Template_Embedded.wsf*

```
<job id="MyScript">
	<script language="VBScript">
		' contents of "TerminalController.vbs"
	</script>
	<script language="VBScript">
		' contents  of "MyScript.vbs"
	</script>
</job>
```

Of course, you can only embed necessary part(s) of script into a *WSF*, we will talk about it no more.

To create a instance of the class:

```
Set objTerminalController = New TerminalController
```

#### Method 2: Using **"ExecuteGlobal"**

Copy script file *TerminalController.vbs* to your script's parent folder.

Append the following code to your script:

```
Sub Import(strFileName)
	With CreateObject("Scripting.FileSystemObject")
		ExecuteGlobal .OpenTextFile( _
			.GetParentFolderName( _
			.GetFile(WScript.ScriptFullName)) & _
			"\" & strFileName).ReadAll
	End With
End Sub
```

Then at the head of your script, use the following code to import this library:

```
Import "TerminalController.vbs"
```

To create a instance of the class:

```
Set objTerminalController = New TerminalController
```

#### Method 3: Embedding library into your script

Append *'TerminalController.vbs'* to your script.


To create a instance of the class:

```
Set objTerminalController = New TerminalController
```

### For **JScript**

Assume that your script's file name is *MyScript.js*.

Similar to *VBScript*, you can simply use the following templates.

*Template.wsf*

```
<job id="MyScript">
	<script language="VBScript" src="TerminalController.vbs"/>
	<script language="VBScript">
		Function GenerateObject(ByVal strClassName)
			Set GenerateObject = EVal("New " & strClassName)
		End Function
	</script>
	<script language="JScript" src="MyScript.js" />
</job>
```

*Template_Embedded.wsf*

```
<job id="MyScript">
	<script language="VBScript">
		' "TerminalController.vbs"'s content here
	</script>
	<script language="VBScript">
		Function GenerateObject(ByVal strClassName)
			Set GenerateObject = EVal("New " & strClassName)
		End Function
	</script>
	<script language="JScript">
		// "MyScript.js"'s content here
	</script>
</job>
```

To create a instance of the class:

```
var objTerminalController = GenerateObject("TerminalController");
```

## Usage

First, set a callback function to post the output to the terminal.

You can simply use the following code:

*VBScript*

```
Function Printer(ByVal strControlSequence)
	WScript.StdOut.Write strControlSequence
End Function
objTerminalController.SetPrinter GetRef("Printer")
```

*JScript*

```
objTerminalController.SetPrinter(function (strControlSequence) {
	WScript.StdOut.Write(strControlSequence);
});
```

Then you can use the following methods to control the terminal:

|Name|Argument(s)|Equivalent Control Sequence|Description|
|:----|:----|:----|:----|
|SaveCursorPosition|-|Chr(27) & "7"|Save the current cursor position|
|RestoreCursorPosition|-|Chr(27) & "8"|Restore the saved cursor position|
|HideCursor|-|Chr(27) & "[?25l"|Hide the cursor|
|ShowCursor|-|Chr(27) & "[?25h"|Show the cursor|
|SaveScreen|-|Chr(27) & "[?1049h"|Save the screen|
|RestoreScreen|-|Chr(27) & "[?1049l"|Restore the saved screen|
|ClearScreen|-|Chr(27) & "[2J"|Clear the screen|
|LimitScoll|lngTop, lngBottom|Chr(27) & "[" & lngTop & ";" & lngBottom & "r"|Limit the scoll|
|ReleseScoll|-|Chr(27) & "[r"|Release the scoll|
|MoveCursorToTopLeft|-|Chr(27) & "[H"|Move the cursor to the top left|
|MoveCursorTo|lngRow, lngColumn|Chr(27) & "[" & lngRow & ";" & lngColumn & "H"|Move the cursor to the specified position|
|MoveCursorToRow|lngRow|Chr(27) & "[" & lngRow & "H"|Move the cursor to the specified row|
|MoveCursorToColumn|lngColumn|Chr(27) & "[" & lngColumn & "G"|Move the cursor to the specified column|
|MoveCursorUp|lngCount|Chr(27) & "[" & lngCount & "A"|Move the cursor up|
|MoveCursorDown|lngCount|Chr(27) & "[" & lngCount & "B"|Move the cursor down|
|MoveCursorLeft|lngCount|Chr(27) & "[" & lngCount & "D"|Move the cursor left|
|MoveCursorRight|lngCount|Chr(27) & "[" & lngCount & "C"|Move the cursor right|
|SetTextStyle|strTextStyle|Chr(27) & "[" & strTextStyle & "m"|Set the text style|
|SetTextColor|strForeground, strBackground|Chr(27) & "[" & strForeground & ";" & strBackground & "m"|Set the text color|
|ResetTextAttributes|-|Chr(27) & "[0m"|Reset the text attributes|

Here are some properties to get some information about the terminal:

|Name|Type|Description|
|:----|:----|:----|
|RowLength|Long|The number of rows|
|ColumnLength|Long|The number of columns|

# References

Hungarian notation: *lng* **Long**, *str* **String**, *obj* **Object**, *arr* **Array**.

Colors: *Black*, *Red*, *Green*, *Yellow*, *Blue*, *Magenta*, *Cyan*, *White*, *BrightBlack*, *BrightRed*, *BrightGreen*, *BrightYellow*, *BrightBlue*, *BrightMagenta*, *BrightCyan*, *BrightWhite*, *Default*.

Styles: *Normal*, *Bold*, *Dim*, *Italic*, *Underline*, *Blink*, *Reverse*, *Invisible*, *Strikeout*.

# Examples

- [Colors.vbs](Examples/Colors.vbs) - test all colors in VBScript

- [Styles.wsf](Examples/Styles.wsf) - test all styles in VBScript

- [Rain.vbs](Examples/Rain.vbs) - code rain animation in VBScript

- [Startup.js](Examples/Startup.js) - Windows 2000 startup animation in JScript

- [LangtonAnt.js](Examples/LangtonAnt.js) - Langton's Ant in JScript

- [ConwayLife.wsf(TODO)](Examples/ConwayLife.wsf) - Conway's Game of Life in JScript

- [Bezier.js](Examples/Bezier.js) - Bezier curve animation in JScript

- [Hanoi.js](Examples/Hanoi.js) - Play Hanoi tower in JScript

# See Also

- [console-virtual-terminal-sequences](https://learn.microsoft.com/en-us/windows/console/console-virtual-terminal-sequences)

- [writing-a-tui-in-bash](https://github.com/dylanaraps/writing-a-tui-in-bash)

- [vt510](https://vt100.net/docs/vt510-rm/contents.html)
