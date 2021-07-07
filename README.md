__NB: THIS WAS A CTF HACK FROM A NUMBER OF YEARS AGO. I'm not going to work on
it, there's a good chance it doesn't function any more and I will not be 
providing any support - you're on your own!__

# brute-seco
> Funds are not safu

## What?

brute-seco is a simple script I wrote for the 44CON "44COIN" CTF in order to
break into an [Exodus](https://www.exodus.io/) cryptocurrency wallet (spoiler
alert: I didn't win because I am not good at wordlist). It's a pretty
rudimentary script which just uses Exodus' Electron app's node libraries to try
to decrypt the .seco files. As such, it is slow and requires a bit of tooling to
use.

## Caveats
1. It's sloooooow. Best used when you've got an idea of a small wordlist for the
   wallet (e.g. if you've forgotten *which* password or which variation was used
   to encrypt it.
2. It doesn't exit when it finds the right secret (yet), so you'll need to tail
   the console output
3. If you want to multithread it you'll have to use multiple processes by
   scripting. See [Parallelizing](#parallelizing) below
4. I am not a node developer, this was smashed together in about 20 minutes.
   I've now spent more time documenting it than writing it.

## Using

With `npm` pre-installed, to install in a local directory:

```
git clone git@github.com:oholiab/brute-seco
cd brute-seco
make
```

To run single-threaded on a wordlist `wordlist.txt` and wallet seed file
`seed.seco` (from the `exodus.wallet` subdirectory in Exodus' config directory):

```
node brute-seco.js seed.seco wordlist.txt
```

You will have to *watch the output* for "PASSWORD IS:"

## Parallelizing
When running this myself I took a wordlist, looked at the number of virtual
cores on my computer (I run htop and count them because I can never remember
which machines have hyperthreading) looked at the length of the wordlist, and
then divide up the wordlist into the number of cores using split with a line
length of `total length/number of vcores` rounded up:

```
split -l NUM_LINES rockyou.txt rockyoucores.txt
```

Note that this is a *bad example* because rockyou is ordered to have the more
common passwords first so only one core will be working on the most likely
passwords!

You can then do something like:

```
for i in rockyoucores.txta*; do node brute-seco.js ./seed.seco $i | tee $i-out &; done
```

And then in another terminal

```
xtail rockyoucores.txta*-out | grep "PASSWORD IS:"
```
