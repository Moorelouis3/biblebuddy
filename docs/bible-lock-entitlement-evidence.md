# Bible Lock: what was actually wrong

Resolved 2026-10-17, after about ten failed builds.

## The answer

Two files with the same name.

Apple's provisioning profile for `net.mybiblebuddy.app`, downloaded from the
portal, contains everything it should:

```
com.apple.developer.family-controls    true
com.apple.security.application-groups  group.net.mybiblebuddy.app
com.apple.developer.applesignin        Default
aps-environment                        production
```

The profile Codemagic put on the build machine, under the same name "Bible
Buddy App Store", contained `application-identifier` and `get-task-allow` and
nothing else.

So the archive was telling the truth - *its* profile had no Family Controls -
and the portal was telling the truth too. They were describing different files.

This is why nothing worked: regenerating the profile, enabling Family Controls
(Development) alongside (Distribution), deleting the profile so Apple built a
fresh one, and creating one by hand were all fixing a file the build never used.

## The fix

`ios-signing/Bible_Buddy_App_Store.mobileprovision` - Apple's real file - lives
in the repository, and `scripts/ios-install-profile.sh` clears the provisioning
profile directory and installs it before `xcode-project use-profiles` reads it.

A provisioning profile carries no private key. It is a signed list of what an
app may do, useless without the distribution certificate, which is not here.

Replace the file when it expires (**2027-10-13**): download it from the portal
and overwrite.

## How it was found

Louis opened the profile page in the browser and asked whether it helped. It
did: downloading that file and decoding it was the first time anyone had
compared what Apple issues against what the build receives.

The lesson is in the method. `xcode-project build-ipa` prints only "Failed to
archive", so the codemagic.yaml keeps a step that runs the commands by hand and
decodes every profile on the machine. Read that step before theorising; two
confident wrong diagnoses came from not having it.
