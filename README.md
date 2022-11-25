# 🎄🎅🤶⛄🎁 Secret Santa SMS 🎁⛄🤶🎅🎄
It's the day after Thanksgiving and it is time to choose Secret Santas! You could draw names from a hat... but that is far too easy and boring! 

Amaze your in-laws and relatives by delivering the pairings anonomously as automated text messages via [Twilio](https://www.twilio.com/messaging/sms).

```console
$ yarn start --text
yarn run v1.22.10
$ tsc index.ts && node index.js --text
🎄🎅🤶⛄🎁 Welcome to Secret Santa! 🎁⛄🤶🎅🎄
✨📞 Sent text message to James 📞✨
✨📞 Sent text message to Evan 📞✨
✨📞 Sent text message to Sara 📞✨
✨📞 Sent text message to Nicole 📞✨
✨📞 Sent text message to Jordan 📞✨
✨📞 Sent text message to Lisa 📞✨
✨  Done in 2.94s.
```

![](./sms.jpg)

## Getting Started

This is a simple console app. Fork the repo and modify the list of names to match your own Secret Santa needs. 

Prereqs:
- typescript
- node

First install dependencies:

```
$ yarn install
```

Now modify the list of names:

```ts
// if you want to send messages, input names as "name:phoneNumber"
let secretSantas = [
    // an array is a couple, couples will not be matched
    ["James:+11234567890", "Lisa:+11234567890"], 
    ["Jordan:++11234567890", "Nicole:+11234567890"],
    ["Evan:+11234567890", "Sara:+11234567890"],
    // a string is just a person, no couple/spouse exclusion rules apply
    "Luna:+11234567890" 
];
```

Now you can do a dry run and print results to the console:

```
$ yarn start
yarn run v1.22.10
$ tsc index.ts && node index.js
🎄🎅🤶⛄🎁 Welcome to Secret Santa! 🎁⛄🤶🎅🎄
🎄🎅🤶⛄🎁 Nicole has Luna 🎄🎅🤶⛄🎁
🎄🎅🤶⛄🎁 Sara has Jordan 🎄🎅🤶⛄🎁
🎄🎅🤶⛄🎁 Evan has Nicole 🎄🎅🤶⛄🎁
🎄🎅🤶⛄🎁 Luna has Lisa 🎄🎅🤶⛄🎁
🎄🎅🤶⛄🎁 James has Evan 🎄🎅🤶⛄🎁
🎄🎅🤶⛄🎁 Lisa has Sara 🎄🎅🤶⛄🎁
🎄🎅🤶⛄🎁 Jordan has James 🎄🎅🤶⛄🎁
✨  Done in 2.39s.
```

Once you're happy with your sample pairings and setup, you'll need to specify some Twilio configuration and run the program with the `--text` flag to send messages:

```console
$ export TWILIO_ACCOUNT_SID="..."
$ export TWILIO_AUTH_TOKEN="..."
$ export TWILIO_PHONE="..."
$ yarn start --text
yarn run v1.22.10
$ tsc index.ts && node index.js --text
🎄🎅🤶⛄🎁 Welcome to Secret Santa! 🎁⛄🤶🎅🎄
✨📞 Sent text message to James 📞✨
✨📞 Sent text message to Evan 📞✨
✨📞 Sent text message to Sara 📞✨
✨📞 Sent text message to Nicole 📞✨
✨📞 Sent text message to Jordan 📞✨
✨📞 Sent text message to Lisa 📞✨
✨  Done in 2.94s.
```
