Set WshShell = WScript.CreateObject("WScript.Shell")
Comandline = "C:\Users\Carlos\AppData\Roaming\Spotify\Spotify.exe"
WScript.sleep 500
CreateObject("WScript.Shell").Run("spotify:playlist:3K8Gv0S4VdLTJixxr8owNg")
WScript.sleep 5000
WshShell.SendKeys " "