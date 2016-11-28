// Le jeu
var game =
{
  loop: 0,
  cpu: false,
  crossOrCircle: true,
  casePush: [9, 9, 9, 9, 9, 9, 9, 9, 9],
  lineOrder: [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [6, 4, 2]],
  timer: 0,
  scoreP1: 0,
  scoreP2: 0,
  scoreCPU: 0,
  scoreNul: 0,

  // Début de la partie
  init: function()
  {
    // Initialisation
    this.crossOrCircle = true;
    this.loop = 0;
    document.getElementsByTagName('table')[0].onclick = function(e) { game.pushCrossOrCircle(e); };
    this.cpu = document.getElementById('cpu').checked;

    var td = document.getElementsByTagName('td');

    for(var i = 0; i < td.length; i++)
    {
      this.casePush[i] = 9;
      td[i].innerHTML = '';
    }

    document.getElementsByTagName('h2')[0].innerHTML = 'Au player 1 de jouer';
    document.getElementsByTagName('h2')[0].style.color = 'white';

    for (var i = 0; i < 9; i++)
    document.getElementsByTagName('td')[i].style.backgroundColor = 'transparent';
  },

  // Fin de la partie
  stop: function()
  {
    document.getElementsByTagName('table')[0].onclick = '';
  },

  // Ajout de la croix ou du rond
  pushCrossOrCircle: function(e)
  {
    var target = e.target ? e.target : e;

    if (this.casePush[target.id.replace(/[^0-9]+/, '')] == 9)
    {
      if (!this.crossOrCircle)
      {
        // Insertion du symbôle
        target.innerHTML = 'O';
        target.style.color = 'green';

        // Alternance
        this.casePush[target.id.replace(/[^0-9]+/, '')] = 1;
        this.crossOrCircle = 1;

        // A qui le tour
        document.getElementsByTagName('h2')[0].innerHTML = 'Au player 1 de jouer';

        // Contrôle des lignes gagnantes
        if (this.check()) return;
      }
      else
      {
        // Insertion du symbôle
        target.innerHTML = 'X';
        target.style.color = 'red';

        // Alternance
        this.casePush[target.id.replace(/[^0-9]+/, '')] = 0;
        this.crossOrCircle = 0;

        // A qui le tour
        document.getElementsByTagName('h2')[0].innerHTML = 'Au '+ (this.cpu ? 'CPU' : 'player 2') +' de jouer';

        // Contrôle des lignes gagnantes
        if (this.check()) return;

        // Au tour du CPU
        if (this.cpu)
        {
          this.stop();
          clearInterval(this.timer);
          this.timer = setTimeout(this.cpuBot, 2000, this);
        }
      }

      document.getElementsByTagName('h2')[0].style.color = 'white';
    }
  },

  // Contrôle des lignes gagnantes
  check: function()
  {
    // Test des lignes
    for (var i = 0; i < 8; i++)
    {
      var order = this.lineOrder[i];
      var testLine = this.casePush[order[0]] + this.casePush[order[1]] + this.casePush[order[2]];

      if (testLine == 0 || testLine == 3)
      {
        // Mise en évidence de la ligne gagnante
        var color = !testLine ? 'rgba(255, 0, 0, 0.2)' : 'rgba(0, 255, 0, 0.2)';
        for (var i2 = 0; i2 < 3; i2++)
        document.getElementsByTagName('td')[order[i2]].style.backgroundColor = color;

        // Arrêt du jeu
        this.stop();

        // Message du vainqueur
        if (testLine == 0)
        {
          var msg = 'Victoire du player 1 !!!';
          color = 'red';
          this.scoreP1++;
          document.getElementsByTagName('em')[0].innerHTML = this.scoreP1;
        }
        else
        {
          var msg = 'Victoire du '+ (this.cpu ? 'CPU' : 'player 2') +' !!!';
          color = 'green';

          if (this.cpu)
          {
            this.scoreCPU++;
            document.getElementsByTagName('em')[2].innerHTML = this.scoreCPU;
          }
          else
            {
              this.scoreP2++;
              document.getElementsByTagName('em')[1].innerHTML = this.scoreP2;
            }
        }

        document.getElementsByTagName('h2')[0].innerHTML = msg;
        document.getElementsByTagName('h2')[0].style.color = color;

        return true;
      }
    }

    // Match Nul
    this.loop++;

    if (this.loop >= 9)
    {
      document.getElementsByTagName('h2')[0].innerHTML = 'Match nul !!!';
      this.scoreNul++;
      document.getElementsByTagName('em')[3].innerHTML = this.scoreNul;
    }
  },

  // Au CPU de jouer
  cpuBot: function(This)
  {
    var i = Math.floor(Math.random() * 9);
    var td = document.getElementsByTagName('td')[i];

    if (This.casePush[i] == 9)
    {
      clearInterval(this.timer);
      This.pushCrossOrCircle(td);
      document.getElementsByTagName('table')[0].onclick = function(e) { game.pushCrossOrCircle(e); };
    }
    else
    This.cpuBot(This);
  }
}
