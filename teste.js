const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

let position = 0;

let result = "";

for ( let i = 0; i < 6; i++ ) {
  

    position = Math.floor(Math.random() * characters.length);

    result += characters[position];

}


console.log(result);