Set WshShell = WScript.CreateObject("WScript.Shell")
Comandline = "C:\Users\<user-name>\AppData\Roaming\Spotify\Spotify.exe"
WScript.sleep 500
CreateObject("WScript.Shell").Run("<spotify-share-link>")
WScript.sleep 5000
WshShell.SendKeys " "