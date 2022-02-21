let getRandomInt = function(min,max)
{
  return Math.round(Math.random()*(max+1-min)+min);
};

let validStrLen = function(str, maxLen)
{
  return str.length <= maxLen
};

getRandomInt(5,10);
validStrLen('qweqweqwee',10);
