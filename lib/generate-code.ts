function GenerateCode( length: number ) : string {

const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

let position = 0;

let result = "";

for ( let i = 0; i < length; i++ ) {
  

    position = Math.floor(Math.random() * characters.length);

    result += characters[position];

}
return result;
}

export function generateCode( lenght: number ) {
  return GenerateCode( lenght );
}