# Quick Guide to Regex
Regular expressions, more commonly known as regex, is a powerful way of describing patterns in strings.

It can be pretty complicated, so I wrote this quick guide as a form of note-taking while learning about regex myself.

## Usage in JavaScript
```javascript
// Instantiating a new regular expression
let regex = /123/;
let regexAlt = new RegExp('xyz');

// Testing for matches
regex.test('01234'); // -> true
regexAlt.test('abcxyzdef'); // -> true

// Extracting matches
regex.match('01234'); // -> ['123']
regexAlt.match('abcxyzdef'); // -> ['xyz']
```

## Characters
These special characters match specific character groups when used in a regular expression.

Character | Description
----------|-------------
`\d` | A digit character (0 - 9)
`\w` | A word character (alphanumeric)
`\s` | A whitespace character (space, tab, newline, carriage return)
`\D` | A non-digit character
`\W` | A non-word character
`\S` | A non-whitespace character

As illustrated, the uppercase counterparts of each special character have opposite meanings to the lowercase characters.

An example use would be expressing one's birth date in the format `DD-MMM-YYYY`:
```javascript
// A regular expression for matching a birth date
let regex = /\d\d-\w\w\w-\d\d\d\d/;
regex.test('01-Apr-1993'); // -> true
```

## Quantifiers
Repeating multiple special characters is pretty tedious. Thankfully, regex offers quantifiers as pattern _suffixes_ to specify how many times a pattern should be matched.

 Quantifier | Description
 ------------|------------
 `+` | One or more patterns
 `*` | Zero or more patterns
 `{2}` | Exactly twice
 `{2,5}` | Any number of times from 2 to 5, inclusive
 `{2,}` | 2 or more times
 `?` | Zero or one pattern (meaning optional)
 
 We can now simplify the regexp for a birth date as such:
```javascript
let regex = /\d{1,2}-\w{3}-\d{4}/;
regex.test('01-Apr-1993'); // -> true
regex.test('1-Apr-1993'); // -> true
```
 ## Character Classes
Suppose we want to match _any one_ of multiple patterns in a string. Character classes help with this.

Expression | Description
--------------|----------
`[0123456789]` | Any digit from 0 to 9
`[0-9]` | Any digit from 0 to 9
`[abcde]` | Any alphabet from a to e
`[a-e]` | Any alphabet from a to e
`[^0-9]` | Any character that isn't 0 to 9
`[^a-e]` | Any character that isn't a to e
