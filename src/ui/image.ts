'use strict';

/**
 * Provide the hangman image as SVG.
 */
export default function getImage(): string {
  return `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" version="1.1" class="hangman__image" aria-hidden="true">
<title>Hangman</title>
<desc>Hangman stick figure image</desc>
<line class="hangman__part hangman__part--1" x1="50" x2="50" y1="350" y2="50"/>
<line class="hangman__part hangman__part--2" x1="50" x2="300" y1="50" y2="50"/>
<line class="hangman__part hangman__part--3" x1="50" x2="150" y1="150" y2="50"/>
<line class="hangman__part hangman__part--4" x1="300" x2="300" y1="50" y2="100"/>
<circle class="hangman__part hangman__part--5" cx="300" cy="125" r="25"/>
<line class="hangman__part hangman__part--6" x1="300" x2="300" y1="150" y2="220"/>
<line class="hangman__part hangman__part--7" x1="300" x2="255" y1="155" y2="170"/>
<line class="hangman__part hangman__part--8" x1="300" x2="345" y1="155" y2="170"/>
<line class="hangman__part hangman__part--9" x1="300" x2="280" y1="220" y2="300"/>
<line class="hangman__part hangman__part--10" x1="300" x2="320" y1="220" y2="300"/>
</svg>`;
}
