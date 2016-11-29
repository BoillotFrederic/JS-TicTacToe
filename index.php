<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Tic Tac Toe</title>
    <link rel="stylesheet" href="css/style.css">
    <script type="text/javascript" src="js/jScript.js"></script>
  </head>
  <body>
    <div>
      <h1>Tic Tac Toe</h1>
      <ul>
        <li>
          <span>Adversaire</span><br />
          VS player <input type="radio" name="type" checked="checked" />
          VS CPU <input type="radio" name="type" id="cpu" />
        </li>
        <li>
          <a href="javascript:game.init()">
            Lancer la partie
          </a>
        </li>
      </ul>
    </div>
    <div>
      <h2></h2>
      <table>
        <tr>
          <td id="case0"></td>
          <td id="case1"></td>
          <td id="case2"></td>
        </tr>
        <tr>
          <td id="case3"></td>
          <td id="case4"></td>
          <td id="case5"></td>
        </tr>
        <tr>
          <td id="case6"></td>
          <td id="case7"></td>
          <td id="case8"></td>
        </tr>
      </table>
    </div>
    <div>
      Player 1 : <em>0</em> |
      Player 2 : <em>0</em> |
      CPU : <em>0</em> |
      Match nul : <em>0</em>
    </div>
  </body>
</html>
