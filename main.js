window.onload = function () {

    document.getElementById("sign").onclick = function sign() {

        document.getElementById('para1').style.display = "inline";
        document.getElementById('para2').style.display = "none";

        document.getElementById('hint').style.display = "inline";
        document.getElementById('reset').style.display = "inline";
        document.getElementById('bodyBox').style.display = "none";

        document.getElementById('buttons').style.display = "inline";
        document.getElementById('mylives').style.display = "inline";

        document.getElementById('catagoryName').style.display = "inline";
        document.getElementById('clue').style.display = "inline";

        document.getElementById('hold').style.display = "inline";
        document.getElementById('stickman').style.display = "inline";

        myStickman = document.getElementById("stickman");
        context = myStickman.getContext('2d');
        context.clearRect(0, 0, 400, 400);

        // alert("hello");
        var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
            'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
            't', 'u', 'v', 'w', 'x', 'y', 'z'];

        var categories;         // Array of topics
        var chosenCategory;     // Selected catagory
        var getHint;          // Word getHint
        var word;              // Selected word
        var guess;             // Geuss
        var geusses = [];      // Stored geusses
        var lives;             // Lives
        var counter;           // Count correct geusses
        var space;              // Number of spaces in word '-'

        // Get elements
        var showLives = document.getElementById("mylives");
        var showCatagory = document.getElementById("scatagory");
        var getHint = document.getElementById("hint");
        var showClue = document.getElementById("clue");

        showClue.innerHTML = "";

        // create alphabet ul
        var buttons = function () {
            myButtons = document.getElementById('buttons');
            myButtons.innerHTML = "";
            letters = document.createElement('ul');

            for (var i = 0; i < alphabet.length; i++) {
                letters.id = 'alphabet';
                list = document.createElement('li');
                list.id = alphabet[i];
                list.innerHTML = alphabet[i];
                check();
                myButtons.appendChild(letters);
                letters.appendChild(list);
            }
        };


        // Select Catagory
        var selectCat = function () {
            // catagoryName.innerHTML = word;
            var div = document.getElementById("catagoryName");
            div.innerHTML = "";

            for (var i = 0; i < word.length; i++) {
                if (word[i] === "-") {
                    var myvariable = document.createTextNode(' - ');

                    div.appendChild(myvariable);
                } else {
                    var image = document.createElement("img");
                    image.src = "./images/" + word[i] + ".png";
                    //image.width="20";
                    image.height = "50";
                    div.appendChild(image);
                }
            }
        };

        // Create geusses ul
        result = function () {
            wordHolder = document.getElementById('hold');
            wordHolder.innerHTML = "";
            correct = document.createElement('ul');

            for (var i = 0; i < word.length; i++) {
                correct.setAttribute('id', 'my-word');
                guess = document.createElement('li');
                guess.setAttribute('class', 'guess');
                if (word[i] === "-") {
                    guess.innerHTML = "-";
                    space = 1;
                } else {
                    guess.innerHTML = "_";
                }

                geusses.push(guess);
                wordHolder.appendChild(correct);
                correct.appendChild(guess);
            }
        };

        // Show lives
        comments = function () {
            showLives.innerHTML = "You have " + lives + " lives";
            if (lives < 1) {
                showLives.innerHTML = "Game Over";
                // console.log(document.getElementById('z'))
                for (var i = 0; i < alphabet.length; i++) {
                    document.getElementById(alphabet[i]).onclick = null;
                }

            }
            for (var i = 0; i < geusses.length; i++) {
                if (counter + space === geusses.length) {
                    showLives.innerHTML = "You Win!";
                    for (var i = 0; i < alphabet.length; i++) {
                        document.getElementById(alphabet[i]).onclick = null;
                    }
                }
            }
        };

        // Animate man
        var animate = function () {
            var drawMe = lives;
            drawArray[drawMe]();
        };


        // Hangman
        canvas = function () {

            myStickman = document.getElementById("stickman");
            context = myStickman.getContext('2d');
            context.beginPath();
            context.strokeStyle = "#fff";
            context.lineWidth = 2;
        };

        head = function () {
            myStickman = document.getElementById("stickman");
            context = myStickman.getContext('2d');
            context.beginPath();
            context.arc(60, 25, 10, 0, Math.PI * 2, true);
            context.stroke();
        };

        draw = function ($pathFromx, $pathFromy, $pathTox, $pathToy) {

            context.moveTo($pathFromx, $pathFromy);
            context.lineTo($pathTox, $pathToy);
            context.stroke();
        };

        frame1 = function () {
            draw(0, 150, 150, 150);
        };

        frame2 = function () {
            draw(10, 0, 10, 600);
        };

        frame3 = function () {
            draw(0, 5, 70, 5);
        };

        frame4 = function () {
            draw(60, 5, 60, 15);
        };

        torso = function () {
            draw(60, 36, 60, 70);
        };

        rightArm = function () {
            draw(60, 46, 100, 50);
        };

        leftArm = function () {
            draw(60, 46, 20, 50);
        };

        rightLeg = function () {
            draw(60, 70, 100, 100);
        };

        leftLeg = function () {
            draw(60, 70, 20, 100);
        };

        drawArray = [rightLeg, leftLeg, rightArm, leftArm, torso, head, frame4, frame3, frame2, frame1];


        // OnClick Function
        check = function () {
            list.onclick = function () {
                var geuss = (this.innerHTML);
                this.setAttribute("class", "active");
                this.onclick = null;
                for (var i = 0; i < word.length; i++) {
                    if (word[i] === geuss) {
                        geusses[i].innerHTML = geuss;
                        counter += 1;
                    }
                }
                var j = (word.indexOf(geuss));
                if (j === -1) {
                    lives -= 1;
                    comments();
                    animate();
                } else {
                    comments();
                }
            }
        };


        // Play
        play = function () {
            categories = [
                ["everton", "liverpool", "swansea", "chelsea", "hull", "manchester-city", "newcastle-united"],
                ["alien", "dirty-harry", "gladiator", "finding-nemo", "jaws"],
                ["manchester", "milan", "madrid", "amsterdam", "prague"]
            ];

            chosenCategory = categories[Math.floor(Math.random() * categories.length)];
            word = chosenCategory[Math.floor(Math.random() * chosenCategory.length)];
            word = word.replace(/\s/g, "-");
            console.log(word);
            buttons();

            geusses = [];
            lives = 10;
            counter = 0;
            space = 0;
            result();
            comments();
            selectCat();
            canvas();
        };

        play();

        // Hint

        hint.onclick = function () {

            hints = [
                ["Based in Mersyside", "Based in Mersyside", "First Welsh team to reach the Premier Leauge", "Owned by A russian Billionaire", "Once managed by Phil Brown", "2013 FA Cup runners up", "Gazza's first club"],
                ["Science-Fiction horror film", "1971 American action film", "Historical drama", "Anamated Fish", "Giant great white shark"],
                ["Northern city in the UK", "Home of AC and Inter", "Spanish capital", "Netherlands capital", "Czech Republic capital"]
            ];

            var catagoryIndex = categories.indexOf(chosenCategory);
            var hintIndex = chosenCategory.indexOf(word);
            showClue.innerHTML = "Clue: - " + hints [catagoryIndex][hintIndex];
        };

        // Reset

        document.getElementById('reset').onclick = function () {
            correct.parentNode.removeChild(correct);
            letters.parentNode.removeChild(letters);
            showClue.innerHTML = "";
            context.clearRect(0, 0, 400, 400);
            play();
        }
    };

    document.getElementById("text").onclick = function sign() {

        document.getElementById('para1').style.display = "none";
        document.getElementById('para2').style.display = "inline";

        document.getElementById('hint').style.display = "none";
        document.getElementById('reset').style.display = "inline";
        document.getElementById('bodyBox').style.display = "none";


        document.getElementById('buttons').style.display = "inline";
        document.getElementById('mylives').style.display = "inline";

        document.getElementById('catagoryName').style.display = "inline";
        document.getElementById('clue').style.display = "none";

        document.getElementById('hold').style.display = "inline";
        document.getElementById('stickman').style.display = "inline";

        myStickman = document.getElementById("stickman");
        context = myStickman.getContext('2d');
        context.clearRect(0, 0, 400, 400);

        // alert("hello");
        var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
            'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
            't', 'u', 'v', 'w', 'x', 'y', 'z'];

        var categories;         // Array of topics
        var chosenCategory;     // Selected catagory
        var getHint;          // Word getHint
        var word;              // Selected word
        var guess;             // Geuss
        var geusses = [];      // Stored geusses
        var lives;             // Lives
        var counter;           // Count correct geusses
        var space;              // Number of spaces in word '-'

        // Get elements
        var showLives = document.getElementById("mylives");
        var showCatagory = document.getElementById("scatagory");
        var getHint = document.getElementById("hint");
        var showClue = document.getElementById("clue");

        showClue.innerHTML = "";

        function shuffle(array) {
            var currentIndex = array.length, temporaryValue, randomIndex;

            // While there remain elements to shuffle...
            while (0 !== currentIndex) {

                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                // And swap it with the current element.
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }

            return array;
        }

        // create alphabet ul
        var buttons = function () {
            myButtons = document.getElementById('buttons');
            myButtons.innerHTML = "";
            letters = document.createElement('ul');

            alpha = shuffle(alphabet);

            for (var i = 0; i < alpha.length; i++) {
                letters.id = 'alphabet';
                list = document.createElement('li');
                list.id = alphabet[i];
                list.innerHTML = "<img src=\"./images/" + alpha[i] + ".png\" width=\"30px\" height=\"30px\">";
                check();
                myButtons.appendChild(letters);
                letters.appendChild(list);
            }
        };


        // Select Catagory
        var selectCat = function () {
            // catagoryName.innerHTML = word;
            var div = document.getElementById("catagoryName");
            div.innerHTML = "";

            for (var i = 0; i < word.length; i++) {
                var myvariable = document.createTextNode(word[i]);

                div.appendChild(myvariable);
            }
        };

        // Create geusses ul
        result = function () {
            wordHolder = document.getElementById('hold');
            wordHolder.innerHTML = "";
            correct = document.createElement('ul');

            for (var i = 0; i < word.length; i++) {
                correct.setAttribute('id', 'my-word');
                guess = document.createElement('li');
                guess.setAttribute('class', 'guess');
                if (word[i] === "-") {
                    guess.innerHTML = "-";
                    space = 1;
                } else {
                    guess.innerHTML = "_";
                }

                geusses.push(guess);
                wordHolder.appendChild(correct);
                correct.appendChild(guess);
            }
        };

        // Show lives
        comments = function () {
            showLives.innerHTML = "You have " + lives + " lives";
            if (lives < 1) {
                showLives.innerHTML = "Game Over";
                for (var i = 0; i < alphabet.length; i++) {
                    document.getElementById(alphabet[i]).onclick = null;
                }
            }
            for (var i = 0; i < geusses.length; i++) {
                if (counter + space === geusses.length) {
                    showLives.innerHTML = "You Win!";
                    for (var i = 0; i < alphabet.length; i++) {
                        document.getElementById(alphabet[i]).onclick = null;
                    }
                }
            }
        };

        // Animate man
        var animate = function () {
            var drawMe = lives;
            drawArray[drawMe]();
        };


        // Hangman
        canvas = function () {

            myStickman = document.getElementById("stickman");
            context = myStickman.getContext('2d');
            context.beginPath();
            context.strokeStyle = "#fff";
            context.lineWidth = 2;
        };

        head = function () {
            myStickman = document.getElementById("stickman");
            context = myStickman.getContext('2d');
            context.beginPath();
            context.arc(60, 25, 10, 0, Math.PI * 2, true);
            context.stroke();
        };

        draw = function ($pathFromx, $pathFromy, $pathTox, $pathToy) {

            context.moveTo($pathFromx, $pathFromy);
            context.lineTo($pathTox, $pathToy);
            context.stroke();
        };

        frame1 = function () {
            draw(0, 150, 150, 150);
        };

        frame2 = function () {
            draw(10, 0, 10, 600);
        };

        frame3 = function () {
            draw(0, 5, 70, 5);
        };

        frame4 = function () {
            draw(60, 5, 60, 15);
        };

        torso = function () {
            draw(60, 36, 60, 70);
        };

        rightArm = function () {
            draw(60, 46, 100, 50);
        };

        leftArm = function () {
            draw(60, 46, 20, 50);
        };

        rightLeg = function () {
            draw(60, 70, 100, 100);
        };

        leftLeg = function () {
            draw(60, 70, 20, 100);
        };

        drawArray = [rightLeg, leftLeg, rightArm, leftArm, torso, head, frame4, frame3, frame2, frame1];


        // OnClick Function
        check = function () {
            list.onclick = function () {
                var geuss = (this.innerHTML);
                geuss = geuss[19];
                this.setAttribute("class", "active");
                this.onclick = null;
                for (var i = 0; i < word.length; i++) {
                    if (word[i] === geuss) {
                        geusses[i].innerHTML = "<img src=\"./images/" + geuss + ".png\" width=\"30px\" height=\"30px\">";
                        counter += 1;
                    }
                }
                var j = (word.indexOf(geuss));
                if (j === -1) {
                    lives -= 1;
                    comments();
                    animate();
                } else {
                    comments();
                }
            }
        };


        // Play
        play = function () {
            categories = [
                ["everton", "liverpool", "swansea", "chelsea", "hull", "manchester-city", "newcastle-united"],
                ["alien", "dirty-harry", "gladiator", "finding-nemo", "jaws"],
                ["manchester", "milan", "madrid", "amsterdam", "prague"]
            ];

            chosenCategory = categories[Math.floor(Math.random() * categories.length)];
            word = chosenCategory[Math.floor(Math.random() * chosenCategory.length)];
            word = word.replace(/\s/g, "-");
            console.log(word);
            buttons();

            geusses = [];
            lives = 10;
            counter = 0;
            space = 0;
            result();
            comments();
            selectCat();
            canvas();
        };

        play();

        // Hint

        hint.onclick = function () {

            hints = [
                ["Based in Mersyside", "Based in Mersyside", "First Welsh team to reach the Premier Leauge", "Owned by A russian Billionaire", "Once managed by Phil Brown", "2013 FA Cup runners up", "Gazza's first club"],
                ["Science-Fiction horror film", "1971 American action film", "Historical drama", "Anamated Fish", "Giant great white shark"],
                ["Northern city in the UK", "Home of AC and Inter", "Spanish capital", "Netherlands capital", "Czech Republic capital"]
            ];

            var catagoryIndex = categories.indexOf(chosenCategory);
            var hintIndex = chosenCategory.indexOf(word);
            showClue.innerHTML = "Clue: - " + hints [catagoryIndex][hintIndex];
        };

        // Reset

        document.getElementById('reset').onclick = function () {
            correct.parentNode.removeChild(correct);
            letters.parentNode.removeChild(letters);
            showClue.innerHTML = "";
            context.clearRect(0, 0, 400, 400);
            play();
        }
    };

    document.getElementById("animation").onclick = function sign() {

        document.getElementById('para1').style.display = "none";
        document.getElementById('para2').style.display = "none";

        document.getElementById('hint').style.display = "none";
        document.getElementById('reset').style.display = "none";

        document.getElementById('buttons').style.display = "none";
        document.getElementById('mylives').style.display = "none";

        document.getElementById('catagoryName').style.display = "none";
        document.getElementById('clue').style.display = "none";

        document.getElementById('hold').style.display = "none";
        document.getElementById('stickman').style.display = "none";
        document.getElementById('bodyBox').style.display = "inline";

        document.getElementById('play').onclick = function () {
            var word = document.getElementById("boxInput");
            //alert(word.value);

            word = word.value;


            var wordAnimation = document.getElementById("wordAnim");
            wordAnimation.innerHTML = "<img id='wordImg' src=\"./images/" + word[0] + ".png\" width=\"60px\" height=\"70px\">";


            var i = 1;
            count = 0;             //  set your counter to 1

            function myLoop() {           //  create a loop function
                setTimeout(function () {    //  call a 3s setTimeout when the loop is called

                    //  your code here
                    //count=0;
                    //  increment the counter
                    if (i < word.length) {
                        var wordAnimation = document.getElementById("wordAnim");
                        if (word[i] === ' ') {
                            wordAnimation.innerHTML = "<img id='wordImg' src=\"./images/space.png\" width=\"60px\" height=\"70px\">";

                        } else if (word[i - 1] === word[i] && count === 0) {
                            wordAnimation.innerHTML = "<span> </span>";
                            count = 1;
                            i--;
                        } else {
                            count = 0;
                            wordAnimation.innerHTML = "<img id='wordImg' src=\"./images/" + word[i] + ".png\" width=\"60px\" height=\"70px\">";
                            //wordAnimation.innerHTML="<span> </span>";
                        }


                        i++;
                        //  if the counter < 10, call the loop function
                        myLoop();             //  ..  again which will trigger another
                    }                        //  ..  setTimeout()
                }, 1000)
            }
            myLoop();
        };


        // alert("hello");
        var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
            'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
            't', 'u', 'v', 'w', 'x', 'y', 'z'];

        var categories;         // Array of topics
        var chosenCategory;     // Selected catagory
        var getHint;          // Word getHint
        var word;              // Selected word
        var guess;             // Geuss
        var geusses = [];      // Stored geusses
        var lives;             // Lives
        var counter;           // Count correct geusses
        var space;              // Number of spaces in word '-'

        // Get elements
        var showLives = document.getElementById("mylives");
        var showCatagory = document.getElementById("scatagory");
        var getHint = document.getElementById("hint");
        var showClue = document.getElementById("clue");

        showClue.innerHTML = "";

        // create alphabet ul
        var buttons = function () {
            myButtons = document.getElementById('buttons');
            myButtons.innerHTML = "";
            letters = document.createElement('ul');

            for (var i = 0; i < alphabet.length; i++) {
                letters.id = 'alphabet';
                list = document.createElement('li');
                list.id = alphabet[i];
                list.innerHTML = alphabet[i];
                check();
                myButtons.appendChild(letters);
                letters.appendChild(list);
            }
        };


        // Select Catagory
        var selectCat = function () {
            // catagoryName.innerHTML = word;
            var div = document.getElementById("catagoryName");
            div.innerHTML = "";

            for (var i = 0; i < word.length; i++) {
                if (word[i] === "-") {
                    var myvariable = document.createTextNode(' - ');

                    div.appendChild(myvariable);
                } else {
                    var image = document.createElement("img");
                    image.src = "./images/" + word[i] + ".png";
                    //image.width="20";
                    image.height = "50";
                    div.appendChild(image);
                }
            }
        };

        // Create geusses ul
        result = function () {
            wordHolder = document.getElementById('hold');
            wordHolder.innerHTML = "";
            correct = document.createElement('ul');

            for (var i = 0; i < word.length; i++) {
                correct.setAttribute('id', 'my-word');
                guess = document.createElement('li');
                guess.setAttribute('class', 'guess');
                if (word[i] === "-") {
                    guess.innerHTML = "-";
                    space = 1;
                } else {
                    guess.innerHTML = "_";
                }

                geusses.push(guess);
                wordHolder.appendChild(correct);
                correct.appendChild(guess);
            }
        };

        // Show lives
        comments = function () {
            showLives.innerHTML = "You have " + lives + " lives";
            if (lives < 1) {
                showLives.innerHTML = "Game Over";
                for (var i = 0; i < alphabet.length; i++) {
                    document.getElementById(alphabet[i]).onclick = null;
                }
            }
            for (var i = 0; i < geusses.length; i++) {
                if (counter + space === geusses.length) {
                    showLives.innerHTML = "You Win!";
                    for (var i = 0; i < alphabet.length; i++) {
                        document.getElementById(alphabet[i]).onclick = null;
                    }
                }
            }
        };

        // Animate man
        var animate = function () {
            var drawMe = lives;
            drawArray[drawMe]();
        };


        // Hangman
        canvas = function () {

            myStickman = document.getElementById("stickman");
            context = myStickman.getContext('2d');
            context.beginPath();
            context.strokeStyle = "#fff";
            context.lineWidth = 2;
        };

        head = function () {
            myStickman = document.getElementById("stickman");
            context = myStickman.getContext('2d');
            context.beginPath();
            context.arc(60, 25, 10, 0, Math.PI * 2, true);
            context.stroke();
        };

        draw = function ($pathFromx, $pathFromy, $pathTox, $pathToy) {

            context.moveTo($pathFromx, $pathFromy);
            context.lineTo($pathTox, $pathToy);
            context.stroke();
        };

        frame1 = function () {
            draw(0, 150, 150, 150);
        };

        frame2 = function () {
            draw(10, 0, 10, 600);
        };

        frame3 = function () {
            draw(0, 5, 70, 5);
        };

        frame4 = function () {
            draw(60, 5, 60, 15);
        };

        torso = function () {
            draw(60, 36, 60, 70);
        };

        rightArm = function () {
            draw(60, 46, 100, 50);
        };

        leftArm = function () {
            draw(60, 46, 20, 50);
        };

        rightLeg = function () {
            draw(60, 70, 100, 100);
        };

        leftLeg = function () {
            draw(60, 70, 20, 100);
        };

        drawArray = [rightLeg, leftLeg, rightArm, leftArm, torso, head, frame4, frame3, frame2, frame1];


        // OnClick Function
        check = function () {
            list.onclick = function () {
                var geuss = (this.innerHTML);
                this.setAttribute("class", "active");
                this.onclick = null;
                for (var i = 0; i < word.length; i++) {
                    if (word[i] === geuss) {
                        geusses[i].innerHTML = geuss;
                        counter += 1;
                    }
                }
                var j = (word.indexOf(geuss));
                if (j === -1) {
                    lives -= 1;
                    comments();
                    animate();
                } else {
                    comments();
                }
            }
        }


        // Play
        play = function () {
            categories = [
                ["everton", "liverpool", "swansea", "chelsea", "hull", "manchester-city", "newcastle-united"],
                ["alien", "dirty-harry", "gladiator", "finding-nemo", "jaws"],
                ["manchester", "milan", "madrid", "amsterdam", "prague"]
            ];

            chosenCategory = categories[Math.floor(Math.random() * categories.length)];
            word = chosenCategory[Math.floor(Math.random() * chosenCategory.length)];
            word = word.replace(/\s/g, "-");
            console.log(word);
            buttons();

            geusses = [];
            lives = 10;
            counter = 0;
            space = 0;
            result();
            comments();
            selectCat();
            canvas();
        };

        play();

        // Hint

        hint.onclick = function () {

            hints = [
                ["Based in Mersyside", "Based in Mersyside", "First Welsh team to reach the Premier Leauge", "Owned by A russian Billionaire", "Once managed by Phil Brown", "2013 FA Cup runners up", "Gazza's first club"],
                ["Science-Fiction horror film", "1971 American action film", "Historical drama", "Anamated Fish", "Giant great white shark"],
                ["Northern city in the UK", "Home of AC and Inter", "Spanish capital", "Netherlands capital", "Czech Republic capital"]
            ];

            var catagoryIndex = categories.indexOf(chosenCategory);
            var hintIndex = chosenCategory.indexOf(word);
            showClue.innerHTML = "Clue: - " + hints [catagoryIndex][hintIndex];
        };

        // Reset

        document.getElementById('reset').onclick = function () {
            correct.parentNode.removeChild(correct);
            letters.parentNode.removeChild(letters);
            showClue.innerHTML = "";
            context.clearRect(0, 0, 400, 400);
            play();
        }
    };


};


