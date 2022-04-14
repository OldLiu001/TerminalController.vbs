```
 ___ __, __, _, _ _ _, _  _, _,     _,  _, _, _ ___ __,  _, _,  _,  __, __,
  |  |_  |_) |\/| | |\ | /_\ |     / ` / \ |\ |  |  |_) / \ |   |   |_  |_)
  |  |   | \ |  | | | \| | | | ,   \ , \ / | \|  |  | \ \ / | , | , |   | \
  ~  ~~~ ~ ~ ~  ~ ~ ~  ~ ~ ~ ~~~    ~   ~  ~  ~  ~  ~ ~  ~  ~~~ ~~~ ~~~ ~ ~
```

为 *VBS*、*JScript* 而生，由 *VBS* 写就的 *COM* 组件。
实用且便携的 *Windows Terminal* 控制类，可实现彩色输出、光标控制等功能。

# 浏览

- [中文](Readme_zh.md)
- [英文](Readme.md)

# 开始

## 环境要求

- 视窗操作系统
- Windows Terminal

## 安装

以**管理员权限**运行以下命令：

```
git clone https://github.com/OldLiu001/TerminalController.vbs.git
cd TerminalController.vbs
regsvr32 TerminalController.wsc
```

**警告：不要使用右键菜单注册 *LinearAlgebra.wsc* 。**

使用下列代码创建类的实例：


*VBScript*

```
Set objTerminalController = CreateObject("Terminal.Controller")
```

*JScript*

```
var objTerminalController = new ActiveXObject("Terminal.Controller");
```


## 便携

复制脚本 *TerminalController.vbs* 到你的脚本所在文件夹下。

将下列代码添加至脚本末尾：

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

在脚本开头导入类库：

```
Import "TerminalController.vbs"
```

创建类的实例：

```
Set objTerminalController = New TerminalController
```

## 用法

首先设置处理输出的回调函数。

可直接使用下列代码：

*VBScript*

```
Function Printer(ByVal strControlSequence)
	WScript.StdOut.Write strControlSequence
End Function
Set objTerminalController.Printer = GetRef("Printer")
```

*JScript*

```
objTerminalController.Printer = function(strControlSequence) {
	WScript.StdOut.Write(strControlSequence);
}
```

然后可以使用下列的若干方法控制终端：

|名称|参数|等价控制序列|描述|
|:----|:----|:----|:----|
|SaveCursorPosition|-|Chr(27) & "7"|储存光标位置|
|RestoreCursorPosition|-|Chr(27) & "8"|恢复光标位置|
|HideCursor|-|Chr(27) & "[?25l"|隐藏光标|
|ShowCursor|-|Chr(27) & "[?25h"|显示光标|
|SaveScreen|-|Chr(27) & "[?1049h"|保存屏幕|
|RestoreScreen|-|Chr(27) & "[?1049l"|恢复屏幕|
|ClearScreen|-|Chr(27) & "[2J"|清除屏幕|
|LimitScoll|lngTop, lngBottom|Chr(27) & "[" & lngTop & ";" & lngBottom & "r"|限制滚动|
|ReleseScoll|-|Chr(27) & "[r"|释放滚动限制|
|MoveCursorToTopLeft|-|Chr(27) & "[H"|将光标移动至终端左上角|
|MoveCursorTo|lngRow, lngColumn|Chr(27) & "[" & lngRow & ";" & lngColumn & "H"|将光标移动至指定位置|
|MoveCursorToRow|lngRow|Chr(27) & "[" & lngRow & "H"|将光标移动至指定行|
|MoveCursorToColumn|lngColumn|Chr(27) & "[" & lngColumn & "G"|将光标移动至指定列|
|MoveCursorUp|lngCount|Chr(27) & "[" & lngCount & "A"|光标上移若干行|
|MoveCursorDown|lngCount|Chr(27) & "[" & lngCount & "B"|光标下移若干行|
|MoveCursorLeft|lngCount|Chr(27) & "[" & lngCount & "D"|光标左移若干字符|
|MoveCursorRight|lngCount|Chr(27) & "[" & lngCount & "C"|光标右移若干字符|
|SetTextStyle|strTextStyle|Chr(27) & "[" & strTextStyle & "m"|设置文本类型|
|SetTextColor|strForeground, strBackground|Chr(27) & "[" & strForeground & ";" & strBackground & "m"|设置文本颜色|
|ResetTextAttributes|-|Chr(27) & "[0m"|重置文本属性|

也有一些属性，可以获取终端的信息：

|名称|类型|描述|
|:----|:----|:----|
|RowLength|Long|终端的总列数|
|ColumnLength|Long|终端的总行数|

# 参考

命名规则：

|前缀|类型|
|:----|:----|
|lng|Long|
|str|String|
|obj|Object|
|arr|Array|

颜色可选值：黑 *Black*, 红 *Red*, 绿 *Green*, 黄 *Yellow*, 蓝 *Blue*, 品红 *Magenta*, 青 *Cyan*, 白 *White*, 亮黑 *BrightBlack*, 亮红 *BrightRed*, 亮绿 *BrightGreen*, 亮黄 *BrightYellow*, 亮蓝 *BrightBlue*, 亮品红 *BrightMagenta*, 亮青 *BrightCyan*, 亮白 *BrightWhite*, 默认 *Default*.

文本类型可选值：常规 *Normal*, 粗体 *Bold*, 暗淡 *Dim*, 斜体 *Italic*, 下划线 *Underline*, 闪烁 *Blink*, 反色 *Reverse*, 隐藏 *Invisible*, 删除线 *Strikeout*.

# 示例

- [Colors.vbs](Examples/Colors.vbs) - 测试所有颜色
- [Styles.vbs](Examples/Styles.vbs) - 测试所有文本类型
- [Rain.vbs](Examples/Rain.vbs) - 代码雨特效
- [Startup.js](Examples/Startup.js) - Windows 2000 启动特效（JScript）

# 参照

- [writing-a-tui-in-bash](https://github.com/dylanaraps/writing-a-tui-in-bash)
- [color.js](https://github.com/Marak/colors.js)
- [vt510](https://vt100.net/docs/vt510-rm/contents.html)