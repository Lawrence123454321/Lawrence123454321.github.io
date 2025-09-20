# [Advanced] FX-991cnx Calculator: Exploiting a ROP Vulnerability to Execute Arbitrary Code
## Before you begin, you need to know:
1. Please ensure you have read and understood the following:

[ROP Beginner](https://lliu.fun/Calculator/991CNX/ROP_Beginner.html) 2. All operations below, unless otherwise specified, are performed in linear and complex mode.

3. GitHub URL

[https://github.com/qiufuyu123/fxesplus](https://github.com/qiufuyu123/fxesplus)## 0. Review
In the previous article, we gained a preliminary understanding of the implementation principles of ROP and performed some practical exercises.

In this article, we will delve deeper into ROP and address some remaining questions from the previous article.

Before that, let's review the previous content and complete a few simple tasks to test your understanding!

### a. Single-line Text Display
Try to write ROP code to achieve the following effects:

1. **Display the text "you" on the second line**

(Please think for a moment and try to implement it yourself. The answer is below.)

---

Answer:

First, find the corresponding function for "you" in the secondary character table: **79 6F 75 —> tan( sinh-1 ln**

Now, let's select a string display function. As mentioned above, function 2:205C can display only one line of characters without displaying anything else (such as PRESS AC), and it does not return, so we'll use this function here.

Next, we'll find a way to set the number of lines displayed: **Second Line**

The second line, register r0, is set to **0x1(x), where x represents any hexadecimal value. **That is, the upper eight bits of the register are 1 (0-3 corresponds to lines 1-4).

Searching the character table, we find any The characters 0x1 (x) are special characters and cannot be typed at this time. We will use double-byte characters to create them (see the previous article).

As shown in the figure, we select the double-byte character FE 11 (i.e., pc>km in unit conversion).

Then, select the function address that sets register r0:

Select function 1:21A8 (Note that the effect here is pop er0. When writing the program, please note that you will need to complete the remaining byte, as er0 includes both registers r0 and r1.)

Finally, let's put this together:

x (multiplication) e e pc>km mti i 2 0

[A8 21 21 FE] (11 FD) [5C 20 32 30] (Note: 11 FD is the value written to er0, with 11 being written to r0.)

Then enter linear mode—> 100+9an mode, enter tan(sinh-1 ln i i i i i i i i i i i i i i i, then enter any 17-byte character, followed by x (multiplication sign) e e pc>km mti(shift+7+3+x) i 2 x (variable x, used to clear the screen for calc)

Press CALC Press =

### b. Display two lines of characters consecutively

Tip: Before all character display functions return, the address in er2 is automatically shifted backward.

---

I won't explain the detailed process here; please figure it out yourself:

<34 bytes> x (multiplication sign) e e pc>km 0 C e 2 0 x e e 0 i mti i 2 x

[A8 21 21 FE] (11 30) [AE 21 32 30] [A8 21 21 30] (21 FD) [5C 20 32 30]

(Set r0 to 11, i.e. the second line, display the characters. Set r0 to 21, i.e. the third line, display the characters and never return)

##
## 1. Inputting Invisible Characters
### a. Usage Scenario
As shown in the figure, it's inevitable that many addresses, such as **0x83**, corresponding to the character ('Int(')), cannot be typed directly. However, a considerable portion of our ROP addresses contain special characters.

Including during character display, if you want to display characters, **e (lowercase e)** A table lookup reveals that its corresponding first-level character is 0x65 (Neg symbol).

Therefore, we must address special character input.

### b. Principle (roughly)
Due to space limitations, I won't explain this in detail here. I'll briefly explain it here.

Inside the Casio calculator, in addition to the visible variables (A B C D E F x y M), there are several hidden variables, such as the character numbered 4D.

The value of this variable controls the calculator's history page buffer, which is the historical result that is retrieved each time you complete a calculation and press the **Up** key.

Theoretically, by assigning a value to this register, we can modify the history buffer. As long as the modified value is the special character we want to type, we can then use the history page to enter our desired character.

So, how do we type the 4D character and assign it a value?

### c. Character Converter (Very Important!!)
As we all know, the character encoding within the calculator is divided into single-byte and double-byte. Double-byte characters

Among double-byte characters, FE 77 is a special character (corresponding to Unit Conversion -> Page 2 -> lbf/in² > kPa).

When we use it to perform a unit conversion, for example,

1 lbf/in² > kPa

31 (FE 77)

Then pressing up to enter the history buffer triggers a bug.

The current input buffer will now look like this:

1 | (| indicates the cursor position)

31 FE (As you can see, half of the double-byte character is consumed, leaving only the FE byte.)

Using this feature, we can construct some special symbols:

For example, if we press the number 1 key, the code in the buffer will be

31 FE 31

Because of the double-byte FE marker, FE 31 will be interpreted as starting with FE. Double-Byte Character Processing

By looking up the table, we see:

Thus, we can see characters appear on the screen.

> To make it easier for everyone to reproduce, I've written the process below (I recommend you try implementing it yourself based on the previous content).
> SHITF,8,Down,2,7,Left,1,=,Up,Left,1

If we type a double-byte character, for example:

31 FE FD 18 (FD 18 is Rnd#, i.e., SHIFT+. (decimal point))

Then, the calculator will interpret it internally as follows:

31 (FE FD) 18

Note that 18 is recognized as a single-byte character. A table query shows it's an '@' symbol.


If we add a dot operation:

31 FE FD xx | 18 , inserting a single-byte character between FD and 18 (note the cursor position at this time).

We then press DEL to delete it.

31FE (FD xx) | 18 The calculator will interpret it as follows:

31 FE | 18 (after pressing DEL)

31 (FE 18) We have constructed a new double-byte character.

Of course, we can also immediately press a new single-byte character, such as the number 1. It should be easy to guess what will happen:

31 (FE 31) 18

> **Reproduction Steps:**
> **SHIFT,8,Down,2,7,Left,1,=,Up,Left,SHIFT,Decimal point,Left,Left,Left,Left (pay attention here!!!),9,DEL**
> **Press the number 1 again**
> **(As for why we need to press Left,Left,Left to move the cursor, it's because we're inserting a double-byte character, but the calculator still displays the double-byte character as two single bytes. Therefore, the cursor won't move when we press Left for the first time**

Try to refresh the hexadecimal symbols in the primary character table: A,B,C,E... corresponds to 3A 3B 3C 3D...:

31 (FE FD) 3A (FD 3A is the scientific constant re, SHIFT 7 3 7)

Move the cursor and swipe the B symbol again.

31 (FE FD) (FD 3B) | 3A

31 (FE FD) | (FD 3B) 3A

31 (FE FD) XX | (FD 3B) 3A

31 (FE FD) 3B | 3A

> To reproduce:
> SHIFT 8 Down 2 7 Left 1 = Up Left SHIFT 7 3 7 Left Left/Right SHIFT 7 3 8 Left 9 DEL

If done correctly, you can display all the following characters A-F:

> To reproduce:
> SHIFT 8 Down 2 7 Left 1 = Up Left
> SHIFT 7 3 C (key for variable c) Left Left/Right
> SHIFT 7 3 B (key for variable b) Left 9 DEL Left/Right
> SHIFT 7 3 A (key for variable a) Left 9 DEL Left and right
>SHIFT 7 3 9 9 Left 9 DEL Left/Right
> SHIFT 7 3 8 Left 9 DEL Left/Right
> SHIFT 7 3 7 Left 9 DEL

Here are some common character brushing methods:

SHIFT 7 3 7 —> Hexadecimal letter: A

SHIFT 7 3 8 —> … : B

….. 9 : C

….. Variable A ((-) key) : D

Variable B : E

Variable C : F

### e. Character glitching practice
1. Glitch out C 4: (Note: Only use the character converter to brush out C, then delete the extra characters and type again) 4)

> Reproduction Method:
> sft 8 down 2 7 left 1 = up left sft 7 3 9 left left right DEL DEL right 4

2. Execute C 4 D 1 (Execute C D first, then add 4 1)

---

Now that we have a character converter, do we already have the necessary capabilities to type special characters?

Theoretically, yes.

However, it's noticeable that this method of typing special characters is actually quite contrived.

Since not all double-byte characters can be typed, this method still has limitations and is time-consuming.

Next, returning to the previous section, we'll use the special variable 4D to write to the history buffer and flush special characters.

### f. Classic ·@· Flushing Characters
**Note! All operations below must be performed in linear mode.

Construct the following expression and use the calc button feature to assign values ​​to 4D variables (originally discovered on Tieba, see the article [https://www.zhihu.com/people/fc9c9fc37de03d9fb9d2e5d7595f65db](https://www.zhihu.com/people/fc9c9fc37de03d9fb9d2e5d7595f65db)).

x: @= 10000xx xx xx xx xx 23 (replace xx with the character's code in the primary character table).

For example,

x: @ = 10000A023 will produce the (or) symbol. Note that you don't have to use all five character codes; as long as the number of characters to be produced is less than or equal to four and The last character cannot contain a letter! (Of course, no matter how many characters there are, it must be followed by a '23'.)

Specific implementation:

Use the character converter to generate all the required letters (remember to follow the order). For example, here we generate two (or), which requires two A's. We generate two A's first, then @.

> sft 8 down 2 7 left 1 = up left sft 7 3 7 left left right sft 7 3 7 left 9 DEL left right (generating two A's)
> sft 7 4 8 left 9 DEL left right DEL DEL (generating 4 D's)

Then:

> x (variable x) alpha integral sign (type the `:` separator) right alpha calc 1 0 0 0 0 right 0 right 0 2 3
> calc, = , = , AC next

### g. Character Practice:
Display a Neg(symbol:

---

> Operation:
> sft 8 down 2 7 left 1 = up left sft 7 4 8 left left DEL DEL
> Type
> x:@=100006523
> calc = = AC down

### h. [Practice] Display "love you"
From the table, we know that the encoding for "love you" is:

sinh-1 sinh (cubic root symbol) Neg( i tan sinh-1 ln(

Combining the previous method, we can achieve this! (Leave this for your own exploration)

### 【! ! WARNING!! ! 】
In an mode, the last step, [AC] [Down], becomes: Press [Up] once.

## 2. Exploring Other Functions
### a. Striped Screen

The table is from my GitHub page; the repository address is at the end of the article.

First, as usual, enter 110an mode.

Then, using the method described above, flash the special character: 0xBE (should be an `@` symbol).

> Operation: sft 8 Down 2 7 Left 1 = Up Left
> sft 7 3 [Buttons in variable B (°' ")] Left Left Left
> sft 7 3 8 left 9 DEL
> left right sft 7 4 8 left 9 DEL
> left right DEL DEL Type x:@=10000BE23 calc = = up

**Note! The last step is to press `up` once! The last step in an mode is slightly different**

Then, press [=]

Symptom:

Cursor flickers

After pressing [SHIFT]

Cursor stops flickering, and the system freezes.

### b. Changing the stripe style:

It's very simple.

Before displaying the stripes, use the *e e function to set the value of register r1.

(As for which values ​​correspond to which patterns, I haven't specifically researched them. It seems to be related to the binary matrix. Interested readers can research it on their own.)

### c. Press the button once to change the pattern.

It's very simple, except we need to create two BE

This ROP is very simple and won't be explained here.

[https://www.zhihu.com/video/1636087432205553665](https://www.zhihu.com/video/1636087432205553665) Video Effect:

First, stripes are displayed. Pressing SHIFT displays a different stripe pattern.

### d. Display stripes, then display text.

A bit more challenging.

Note:

**After executing the display stripe function, register er2 will be modified. Therefore, in order to display text, we need to manually assign a value to register er2 after executing the display stripe function!**

Here, select this function to modify the value of er2.

Question:

What should the value of er2 be modified to?

Obviously, it should be modified to the address at the beginning of the input buffer, because the characters we want to display are in the first 17 bytes.

I've compiled the address: **0xD180**

**(Note the little-endian byte order conversion. In the GitHub repository, I've written everything in little-endian byte order, so you can use it directly without conversion.)**

Therefore, a ROP should look like this:

k 0 e 0 0 0 <80> <D1> 0 0 0 0

Set er0 to 0x3030, er2 to 0xD180, and er4 to 0x3030, er6 is 0x3030

Since we only care about the value of er2, the other values ​​can be set arbitrarily. Here, '0' (0x30) is used.

This ROP code sets the value of the ER2 register.

To summarize, we need a total of three special characters:

<BE> <80> <D1>

### e. Display stripes. Press the button to display "love you."

Similar to 'd', except the displayed character is replaced with "love you."

The first-level characters corresponding to "love you" are:

sinh-1 sinh cube root Neg(i tan sinh-1 ln i i i i i i i i

Special characters used:

<65> <BE> <80> <D1>

Sorry, **these characters can't be flashed**

**Why?**

Simple, let's go back to the conditions for flashing characters:

Obviously, our last character contains the letter (D1)!

However, you can try it. If you flash characters using this code, you'll find that when you press the ·Up· key, the special character doesn't appear.

Due to space limitations, this article won't discuss the underlying principles for now.

### f.How to solve this problem?
So, how do we achieve the complex operation shown in the video? (Obviously, the video uses a lot of special characters.)

We need some more advanced character-scraping methods.

Before discussing this, let's first take a deeper look at the an character.

## 4. Deep Understanding Stack Overflow
### a. Calculating the Stack Offset for the an Character
Have you ever wondered:

Why is it **110 characters + an****?

and not some other length of characters?

To answer this question, we need to start with the most basic stack overflow.

---

First of all, 110 bytes + an isn't actually the most basic stack overflow.

In the previous article, we mentioned:

After triggering 110 bytes + an, we must pad with 34 bytes of data before the remaining data is overwritten on the stack.

In fact, the most basic stack overflow is triggered by 76 bytes + an.

That is, if you enter 1 2 3 4 ... (76 digits) an, the stack overflow has already been triggered.

In this mode, the stack is overwritten starting from the first byte of the input area.

In other words, in this mode, we don't need to pad with 34 bytes of data; we can directly write to the ROP address:

### [Demo 1: 76 bytes an]
First, using the old method, after flashing the an character, enter 76 bytes before it (you can use 1 2 3 4 ...to count)

Then, press [=] and use the address 2:20FE (i.e., Pa > kgf/cm² 2 0 ).

Note! The address 2:205C cannot be used here.

Remember why?

Because the 5C in this address is made up of the double-byte character mti!

When we type: mti i 2 0, the hexadecimal value is as follows:

(FD) [5C 20 32 30] <-- The real address is 5C 20 32 30

Since this mode starts from the first byte of the input area, the bottom of the stack will be overwritten, so when returning, the CPU will execute:

[FD 5C 20 32] (30)

So the address is wrong.

You can see the effect.

Since the string address is still retrieved from register er2, and the value of register er2 is automatically set to the beginning of the input buffer after executing the smart_strcpy function, the actual string displayed is:

FE 5C 32 30

Corresponding secondary characters:

'(something)' '2' '0'

### [Limitations of 76-bytes mode?]

Unfortunately, this mode doesn't offer much.

Since the stack is overwritten starting with the first byte of the input area, this means that once even a single character is entered, the ROP begins when the [=] sign is pressed.

If we want to flash some invisible characters first, this mode won't work.

Because flashing invisible characters requires a character converter (SHIFT 8 down 2 7)

You'll also have to press the [=] sign (character converter) at least once.

However, in this mode, once you press the equals key, the ROP begins executing.

Unlike the 110-byte an, where we have 34 bytes to pad, as long as the input area doesn't exceed 34 bytes, we can press the [=] sign at will, as the ROP will be triggered after 34 bytes.

### b. Construct the desired stack offset:

You should have noticed some patterns:

76 bytes differ from 110 bytes by a few bytes:

That's right, **34 (110-76)**!

Did you notice? This corresponds exactly to the 34 bytes to be padded in the input buffer, and the ROP starts at **the 35th** byte!

This means that if you want the ROP to trigger at byte n in the input buffer,

then, you need to construct a (76 + n)-byte an.

### [Demo 1: Simplifying Single-Line Spelling]
We can simplify single-line character output like this:

We trigger 93 bytes an (93 = 76 + 17).

This means the ROP will begin immediately after we enter 17 characters (a line).

First, as usual, enter 93 characters, then the an character, and press the [=] sign (I won't demonstrate this step).

Then simply start entering the character you want to display (looking up the secondary character table), and as usual, Pa > f... 2 0

That's it... right?

---

**Wait! **

**Why doesn't it work? Why did it fail? **

### c. Why is the offset wrong?
If you input as described above, you will find that when you press the [=] sign, the ROP should theoretically execute and a line of characters should be displayed. But why does the calculator freeze?

Did we miscalculate the offset?

Of course not!

Think carefully, what went wrong?

---

The error lies in the address input!

Remember that in this calculator's CPU, the stack (address) is 2-byte aligned?

Recall what we input:

[xx xx] [xx xx] [xx xx] [xx xx] [xx xx] [xx xx] [xx xx] [xx xx] [xx FE] [20 32]

(<-- the first 17 characters -->)

That is, the value popped from the stack at this time is: [xx FE] [20 32]

Naturally, the address is wrong, and the calculator freezes.

The solution is also very simple:

Two methods:

1. Delete the last character (enter 16 characters before becoming the address)

2. Increment the offset by 1, 94 bytes, and then enter one more character.

I chose the latter option.

Therefore, we must note:

We must ensure that the offset before the ROP byte is an even number of bytes. Only then will the ROP be executed.

### [Demo (Application): Three-Line Spelling]

Strategy:

Exploiting 2:21AE(C e 2 0) displays the character and returns the address. Then, the 1:21A8 (\* e e) function sets the value of er0 and selects the number of rows.

The entire process should be as follows:

x (multiplication sign) e e in>cm (unit conversion, resulting in a character with the high-order bit set to 0) 0 (padding: er1 register) C e 2 0 x (multiplication sign) e e pc>cm (producing a character with the high-order bit set to 1) 0 C e 2 0 Pa>kgf/cm2 2 0 (This function outputs the character on the third row by default)

Implementation:

First, calculate the stack offset.

17 (number of characters in a row) \* 3 + 76 = 127

Obviously, **127 is an odd number and does not align to 2 bytes**

Therefore, we must enter 128 bytes for alignment (note that after entering three rows of characters, we need to enter an additional character).

Enter 128-byte an Pattern (100 characters, '+' sign, 27 characters, an)

Enter 3 lines of characters + ROP address

Note that there's an extra "x" character in the fourth line.

Then [CALC][=]

## 4. More Special Symbols **[Note:] Please perform the following operations in linear mode**

In the [Invisible Character Input] section, we discussed the most basic method for swiping special characters.

However, this method has a major problem: it can only swipe 4 special characters and is limited (the last character cannot contain a letter code).**

Similarly, the principle behind swiping special characters is quite complex, and due to space limitations, I will not discuss this in this article. This article focuses on ROP programming. If you are interested, I will write another article on the principles of characters when I have time.

For now, you only need to master the method:

### a. Formula
F. xx xx xx xx xx yy xx x10 xx (last 8 characters)

`@` = 1.0000 xx xx xx yy xx x10 xx (first 6 characters)

*Note: The yy mark cannot contain hexadecimal letters, and all 14 characters must be entered!

Using these two formulas, you can swipe 6 + 8 = 14 special characters

### b. Usage
First, determine the last 8 characters to flash.

For example, here we flash 8 Neg (0x65)

So, first use the character converter to flash 'F' (hexadecimal symbol F, not the variable F), and then construct:

F.65 65 65 65 65 65 65 x10 65

Then press `STO` `X` (variable x)

Then [AC]

Next, determine the first 6 characters to flash. We flash a few 2 (0x32)

Then, the process is similar to the traditional `@` flashing. Construct:

@ = 1.00003232323232x1032

Then, construct:

> x in>cm:
> x:
> x in>cm:
> @ = ......

Then, [CALC][=][=][=][=][AC][Next]

Then: (Important!!!)

Move the cursor to the end and delete a space character and an x ​​character.

Then, move the cursor to the middle, delete a space character, and then delete an @ character.

(Note! Get the order right, otherwise the characters will be misplaced and difficult to use!)

So, you have 14 special characters!

### c. Practice
Please create these special characters:

<80> <D1> <C4> <90> <D1> <BE>

---

First, construct the last 8 characters:

F. 80D1C490D13232x10 32

Then, construct the first 6:

@ = 1.000032323232BE x10 32

Same old: CALC, 4 times =, AC, next

After a series of deletions:

### d. Note: This method only works in certain modes.
This method of swiping characters does not work in 110an mode!

Symptom: Assigning a value to x will cause a crash.

However, it can be used in situations where the stack offset is relatively large.

For example, the most classic scenario:

100 digits, + sign, 9 digits, + sign, 13 digits, an symbol (124an mode)

First, enter this mode. It's not difficult; it just takes a few more steps than the traditional 110an mode. Simply follow the instructions above.

Then use this method to swipe characters.

**Note! In the last step, the [AC] [Down] key must be changed to: Press [Up] once.

We can now flash.

## 5. Advanced ROP (Multiple Special Character Functions)
Now, let's complete the remaining tasks:

First, list the characters to flash:

<65> <BE> <80> <D1>

We'll flash them all in the last eight characters.

0. Enter 124an mode (100 digits, + sign, 9 digits, + sign, 13 digits, an symbol, [=])

1. Construct:

F. 65 BE 80 D1 32 32 32 x10 32

STO x

2. Construction:

@ = 1.00003232323232 x10 32

calc , [=]\*4 , up

Delete extra characters

Delete the padding '2'.

Construct the "love you" character.

Padding 17 characters.

Since this pattern shifts the ROP position 14 bytes back compared to 110an, we need to add 14 characters.

Constructing the ROP:

Display the stripes and wait for SHIFT input, set the value of ER2, and display the characters.

(Note: the 'k' symbol is the K in engineering notation; type: OPTN 3 6)

Done!

[https://www.zhihu.com/video/1636106728273166337](https://www.zhihu.com/video/1636106728273166337)## 6. Achieve the effect of the opening video (with video tutorial) It's easy to see that there's only one step left until we reach the beginning of the video:

Detect the key press again and display another line of text.

First, whenever key detection is involved, the ER2 register must be manually re-assigned.

Let's do some calculations:

The first time ER2 is assigned, it's manually set to 0xD180.

So, suppose we type the 17 characters of the second line of text immediately following the first in the input area.

Note that the blue box indicates where the second line of text is stored.

Obviously, what is the address at the beginning of this data segment?

0xD180 + 17 ==> 0xD191

Okay, we got the address

Let's sort out the ideas:

First, display the stripes and wait for input, then set the value of the ER2 register to 0xD180 (and set the R0 register to select the number of rows), then use Ce20 to display the characters, then wait for SHIFT to be pressed, then set the value of the ER2 register to 0xD191 (and set the R0 register to select the next row), then use mti i 2 0 to display the characters

From this, write the ROP:

@(<BE>) e 2 0 k 0 e pc>km(second line) @(80) >t(D1) 0 0 0 0 C e 2 0 @(<C4>) e 2 0 k 0 e 0 i i Identity((91) >t(D1) 0 0 0 mti i 2 0

Also character encoding:

sinh-1 sinh 3rd root Neg( (<65>) i tan sinh-1 ln i i i i i i i i --> love you

E (variable E) sinh-1 e^( Neg( 3 this root Neg( e^( i i i i i i i i i i --> Forever

Extract special characters used

<65> <65> <65> <BE> <80> <D1> <C4> <91> <D1> There are 9 in total.

As usual, let's use the 124an mode.

Arrange them:

The last 8 characters of the construction are:

F.80D1C491D13232x1032

First 6 characters

@ = 1. 00006565656565BE x10 32 (Note that the BE position cannot be in the preceding position 65. See the position restriction mentioned earlier for details.)

Same as always, CALC, 4 down [=], [up]

Delete the characters in the red box.

Delete the extra "Neg" (

Spell out the first paragraph: "love you"

Spell out the second paragraph: `Forever`

Fill in 14 characters

CALC,【=】

[https://www.zhihu.com/video/1636112695039721472](https://www.zhihu.com/video/1636112695039721472)

---

## Full video tutorial (if you don't understand the above process, you can watch this)
Due to the difficulty in filming, some mistakes occurred.

[https://www.zhihu.com/video/1636115253342724097](https://www.zhihu.com/video/1636115253342724097)

---

GitHub Repository

[GitHub - qiufuyu123/fxesplus: FX-991cnx Reverse Engineering Tool/Collation](https://github.com/qiufuyu123/fxesplus)