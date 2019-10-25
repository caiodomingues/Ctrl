# Ctrl

Ctrl is a small node app that I made for study, using it in a combo with [Ex](https://github.com/caiodomingues/ex) client.

## Use Case

I have an old notebook with a broken screen and I barely use my TV, so I plugged the notebook in the TV and control the PC to do some basic tasks with this.

Now im listening to music or watching videos in my TV :D

### But why not doing Remote Access

Because creating things is funnier :D

## How to use

Copy the `config/app-example.json` as `app.json` and change to your settings. In `./config` there's a `startup.bat` file, copy this in the startup folder of your pc and change the path to the project root, you can find the folder on a Windows by hitting `ctrl+r` and `shell:startup`.

## Commands

They're divided into two steps:

`command:parameter`

- `chrome:url` = i'm using incognito mode to prevent some notifications blocking the screen.
- `youtube:video-url` = only use this when you want to fullscreen the video (doesn't work for playlists)
- `self:os-commands` = shutdown, reboot (or restart), abort (or cancel)
- `spotify:open` = will open spotify and play the desired playlist (of course you should be logged in)

## Notice

I haven't made this with the idea of making a repo, but, why not? So, bugs may happen, code may be bad and etc.
