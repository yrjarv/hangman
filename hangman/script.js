let word;
let dashes;
let alphabet = "abcdefghijklmnopqrstuvwxyz";
let wrongLetters = []

let informationEl;
let rulesEl;
let errorMessagesEl;
let gameViewEl;
let dashesEl;
let wrongLettersEl;
let rightEl;
let imgEl


/**
 * Runs when index.html is loaded.
 * Adds an eventlistener for any keypresses, selects a random word, and makes corresponding dashes
 * on the site.
 */
function load() {
  informationEl = document.getElementById("information");
  rulesEl = document.getElementById("rules");
  errorMessagesEl = document.getElementById("errorMessages");
  gameViewEl = document.getElementById("gameView");
  dashesEl = document.getElementById("dashes");
  wrongLettersEl = document.getElementById("wrongLetters");
  rightEl = document.getElementById("right");
  imgEl = document.querySelector("img")


  document.addEventListener("keypress", keyPressed)
  word = selectRandomWord()
  dashes = "";
  for (let i = 0; i < word.length; i++) {dashes += "_ "}
  dashesEl.innerText = dashes
  console.log(word) //DEBUG
}

/**
 * Sets the hangman image to imagename
 * @param {String} imagename Path to/name of image
 */
function setHangmanImage(imagename) {imgEl.setAttribute("src", "../files/"+imagename+".png")}

/**
 * Is called from eventListener created in load(). Decodes the keyCode to a letter, checks if the
 * letter is part of the english alphabet, then checks if the letter is part of the word.
 * Finally checks if more than 10 wrong letters (dead) or correct word (win), and if wrong letter
 * shows the user the amount of wrong letters and what letters they are
 * @param {*} e Element passed by eventListener
 */
function keyPressed(e) {
  errorMessagesEl.innerText = ""
  let letter = String.fromCharCode(e.keyCode).toLowerCase();
  if (word.includes(letter)) { //Checks if the letter guessed is correct
    for (let i = 0; i < word.length; i++) {
      if (word.charAt(i) === letter) {
        dashes = dashes.split('');
        dashes[i*2] = letter;
        dashes = dashes.join('');
        dashesEl.innerHTML = dashes
      }
    }
  }
  else {
    if (alphabet.includes(letter) && !wrongLetters.includes(letter)) { //If not already tried
      wrongLetters.push(letter)
      wrongLettersEl.innerText = wrongLetters.length + " wrong letter(s): "
      for (let i = 0; i < wrongLetters.length; i++) {  //Show wrong letters
        wrongLettersEl.innerText += (wrongLetters[i] + " ")
        setHangmanImage("hangman-" + wrongLetters.length)
      }
      if (wrongLetters.length >= 10) {dead()} //If 10 different wrong letters have been tried, the player loses
    }
    else { //Tell the user if it has already been tried
      errorMessagesEl.innerText = "You have already guessed this letter"
    }
  }
  if (!dashes.includes('_')) {win()} // If there are no dashes left, the user has won
}
/**
 * Selects a random word and returns it using the array of the most common words
 * @returns {string} A random word
 */
function selectRandomWord() {
  return WORDS[Math.floor(Math.random()*WORDS.length)]
}

/**
 * Runs when the player is "dead", i.e. has guessed more than 10 unique wrong letters.
 * Changes the image to show dead hangman, adds border, and removes the keypress eventListener.
 * Shows the correct word, and allows the user to restart the game by reloading the site.
 */
function dead() {
  setHangmanImage("hangman-dead")
  imgEl.setAttribute('style', 'border: 2px solid red');
  document.removeEventListener("keypress", keyPressed);
  errorMessagesEl.innerText = "You have tried too many times. The correct word was '" + word + 
    "'. Click to try again";
  document.addEventListener("click", function(){location.reload()});
  console.log("DEAD") //DEBUG
}

function win() {
  setHangmanImage("hangman-alive")
  imgEl.setAttribute('style', 'border: 2px solid green');
  document.removeEventListener("keypress", keyPressed);
  errorMessagesEl.innerText = "You win and saved the hangman! Click to ty again";
  document.addEventListener("click", function(){location.reload()})
}

const WORDS = ["the","be","and","a","of","to","in","i","you","it","have","to","that","for","do","he","with","on","this","not","we","that","not","but","they","say","at","what","his","from","go","or","by","get","she","my","can","as","know","if","me","your","all","who","about","their","will","so","would","make","just","up","think","time","there","see","her","as","out","one","come","people","take","year","him","them","some","want","how","when","which","now","like","other","could","our","into","here","then","than","look","way","more","these","no","thing","well","because","also","two","use","tell","good","first","man","day","find","give","more","new","one","us","any","those","very","her","need","back","there","should","even","only","many","really","work","life","why","right","down","on","try","let","something","too","call","woman","may","still","through","mean","after","never","no","world","in","feel","yeah","great","last","child","oh","over","ask","when","as","school","state","much","talk","out","keep","leave","put","like","help","big","where","same","all","own","while","start","three","high","every","another","become","most","between","happen","family","over","president","old","yes","house","show","again","student","so","seem","might","part","hear","its","place","problem","where","believe","country","always","week","point","hand","off","play","turn","few","group","such","against","run","guy","about","case","question","work","night","live","game","number","write","bring","without","money","lot","most","book","system","government","next","city","company","story","today","job","move","must","bad","friend","during","begin","love","each","hold","different","american","little","before","ever","word","fact","right","read","anything","nothing","sure","small","month","program","maybe","right","under","business","home","kind","stop","pay","study","since","issue","name","idea","room","percent","far","away","law","actually","large","though","provide","lose","power","kid","war","understand","head","mother","real","best","team","eye","long","long","side","water","young","wait","okay","both","yet","after","meet","service","area","important","person","hey","thank","much","someone","end","change","however","only","around","hour","everything","national","four","line","girl","around","watch","until","father","sit","create","information","car","learn","least","already","kill","minute","party","include","stand","together","back","follow","health","remember","often","reason","speak","ago","set","black","member","community","once","social","news","allow","win","body","lead","continue","whether","enough","spend","level","able","political","almost","boy","university","before","stay","add","later","change","five","probably","center","among","face","public","die","food","else","history","buy","result","morning","off","parent","office","course","send","research","walk","door","white","several","court","home","grow","better","open","moment","including","consider","both","such","little","within","second","late","street","free","better","everyone","policy","table","sorry","care","low","human","please","hope","true","process","teacher","data","offer","death","whole","experience","plan","easy","education","build","expect","fall","himself","age","hard","sense","across","show","early","college","music","appear","mind","class","police","use","effect","season","tax","heart","son","art","possible","serve","break","although","end","market","even","air","force","require","foot","up","listen","agree","according","anyone","baby","wrong","love","cut","decide","republican","full","behind","pass","interest","sometimes","security","eat","report","control","rate","local","suggest","report","nation","sell","action","support","wife","decision","receive","value","base","pick","phone","thanks","event","drive","strong","reach","remain","explain","site","hit","pull","church","model","perhaps","relationship","six","fine","movie","field","raise","less","player","couple","million","themselves","record","especially","difference","light","development","federal","former","role","pretty","myself","view","price","effort","nice","quite","along","voice","finally","department","either","toward","leader","because","photo","wear","space","project","return","position","special","million","film","need","major","type","town","article","road","form","chance","drug","economic","situation","choose","practice","cause","happy","science","join","teach","early","develop","share","yourself","carry","clear","brother","matter","dead","image","star","cost","simply","post","society","picture","piece","paper","energy","personal","building","military","open","doctor","activity","exactly","american","media","miss","evidence","product","realize","save","arm","technology","catch","comment","look","term","color","cover","describe","guess","choice","source","mom","soon","director","international","rule","campaign","ground","election","face","uh","check","page","fight","itself","test","patient","produce","certain","whatever","half","video","support","throw","third","care","rest","recent","available","step","ready","opportunity","official","oil","call","organization","character","single","current","likely","county","future","dad","whose","less","shoot","industry","second","list","general","stuff","figure","attention","forget","risk","no","focus","short","fire","dog","red","hair","point","condition","wall","daughter","before","deal","author","truth","upon","husband","period","series","order","officer","close","land","note","computer","thought","economy","goal","bank","behavior","sound","deal","certainly","nearly","increase","act","north","well","blood","culture","medical","ok","everybody","top","difficult","close","language","window","response","population","lie","tree","park","worker","draw","plan","drop","push","earth","cause","per","private","tonight","race","than","letter","other","gun","simple","course","wonder","involve","hell","poor","each","answer","nature","administration","common","no","hard","message","song","enjoy","similar","congress","attack","past","hot","seek","amount","analysis","store","defense","bill","like","cell","away","performance","hospital","bed","board","protect","century","summer","material","individual","recently","example","represent","fill","state","place","animal","fail","factor","natural","sir","agency","usually","significant","help","ability","mile","statement","entire","democrat","floor","serious","career","dollar","vote","sex","compare","south","forward","subject","financial","identify","beautiful","decade","bit","reduce","sister","quality","quickly","act","press","worry","accept","enter","mention","sound","thus","plant","movement","scene","section","treatment","wish","benefit","interesting","west","candidate","approach","determine","resource","claim","answer","prove","sort","enough","size","somebody","knowledge","rather","hang","sport","tv","loss","argue","left","note","meeting","skill","card","feeling","despite","degree","crime","that","sign","occur","imagine","vote","near","king","box","present","figure","seven","foreign","laugh","disease","lady","beyond","discuss","finish","design","concern","ball","east","recognize","apply","prepare","network","huge","success","district","cup","name","physical","growth","rise","hi","standard","force","sign","fan","theory","staff","hurt","legal","september","set","outside","et","strategy","clearly","property","lay","final","authority","perfect","method","region","since","impact","indicate","safe","committee","supposed","dream","training","shit","central","option","eight","particularly","completely","opinion","main","ten","interview","exist","remove","dark","play","union","professor","pressure","purpose","stage","blue","herself","sun","pain","artist","employee","avoid","account","release","fund","environment","treat","specific","version","shot","hate","reality","visit","club","justice","river","brain","memory","rock","talk","camera","global","various","arrive","notice","bit","detail","challenge","argument","lot","nobody","weapon","best","station","island","absolutely","instead","discussion","instead","affect","design","little","anyway","respond","control","trouble","conversation","manage","close","date","public","army","top","post","charge","seat"]