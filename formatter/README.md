# Formatter

String interpolation is handy for formatting a string once, but when you have to format
the same string many times, you need a function. Unfortunately, often it's pretty obvious
how that function is going to look, it's just going to access properties of the parameter
and insert them into a string.

Some languages (mostly Javascript, but maybe others) allow template strings to be used to
generate things that aren't strings, so let's use that to build a template tag into which
you interpolate functions, and it returns a function that calls those interpolated functions
on its arguments and interpolates them into those spots.
