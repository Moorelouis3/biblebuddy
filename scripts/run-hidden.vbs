' run-hidden.vbs - runs a command with no console window.
'
' Louis, 2026-11-13: "these windows pop up like 5 times an hour its very
' annoying can we make them stop popping up!!"
'
' His automation is all background work: pull, render, upload, post, write to
' a log. None of it needs a window. But a scheduled task that runs cmd.exe or
' powershell.exe while he is logged in gets a console allocated before any
' hidden flag can take effect, so it flashes up over whatever he is doing -
' and when something inside stops to report a conflict, it does not flash, it
' sits there until dismissed.
'
' wscript.exe has no console of its own, so launching through it means one is
' never created at all.
'
' Usage, from a scheduled task:
'   wscript.exe "...\run-hidden.vbs" "C:\path\to\thing.bat"
'   wscript.exe "...\run-hidden.vbs" "powershell.exe" "-File" "C:\path\x.ps1"
'
' The first argument is the program (a .bat and .cmd are run through the shell
' as-is); anything after it is passed along, each quoted, so a path with a
' space survives.
'
' Deliberately NOT solved by setting these tasks to "run whether user is
' logged on or not": that moves them out of his session, where git's stored
' credentials and the signed-in Chrome profile live, and a silent
' authentication failure is a worse problem than a visible window.
Option Explicit

Dim shell, args, command, i

Set shell = CreateObject("WScript.Shell")
Set args = WScript.Arguments

If args.Count = 0 Then
    WScript.Quit 1
End If

command = """" & args(0) & """"

For i = 1 To args.Count - 1
    command = command & " """ & args(i) & """"
Next

' 0 = hidden. False = do not wait, so the task completes and the work carries
' on behind it rather than Task Scheduler holding a slot open for hours.
shell.Run command, 0, False
