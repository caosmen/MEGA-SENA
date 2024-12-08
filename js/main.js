const generate = () => {
  const gamesCount = parseInt($('#games-count').find("option:selected").attr('value'), 10);
  const numbersCount = parseInt($('#numbers-count').find("option:selected").attr('value'), 10);
  const selectNumbers = $('#select-numbers').find("option:selected").attr('value');
  
  let selectedNumbers = [];
  if (selectNumbers === 'yes') {
    $('#numbers td.selected').each(function() {
      selectedNumbers.push($(this).text());
    });
  }

  if (selectedNumbers.length < numbersCount) {
    selectedNumbers = Array.from({ length: 60 }, (_, i) => (i + 1).toString().padStart(2, '0'));
  }
  
  const games = [];
  for (let gameIndex = 0; gameIndex < gamesCount; gameIndex++) {
    let game = [];
    let i = 0;

    while (i < numbersCount) {
      const randomIndex = Math.floor(Math.random() * selectedNumbers.length);
      const randomNum = selectedNumbers[randomIndex];

      if (!game.includes(randomNum)) {
        game.push(randomNum);
        i++;
      }
    }

    game.sort((a, b) => parseInt(a) - parseInt(b));
    games.push(game.join(', '));
  }

  const gamesContainer = $('#generated-games');
  gamesContainer.empty();

  games.forEach((game, gamesIndex) => {
    gamesContainer.append(`<p>${game}</p>`);
    if (gamesIndex < games.length - 1) {
      gamesContainer.append('<hr>');
    }
  });
};

const clearGames = () => {
  $('#numbers td').removeClass('selected');
  $('#games-count').val('1').trigger('change');
  $('#numbers-count').val('6').trigger('change');
  $('#select-numbers').val('yes').trigger('change');
  $('#generated-games').empty();
}

const createTable = () => {
  let number = 1;
  for (let i = 0; i < 6; i++) {
    let row = $('<tr></tr>');
    for (let j = 0; j < 10; j++) {
      row.append('<td>' + (number < 10 ? '0' + number : number) + '</td>');
      number++;
    }
    $('#numbers').append(row);
  }

  $('#numbers').on('click', 'td', function() {
    $(this).toggleClass('selected');
  });
}

$(document).on('change','#select-numbers',function(){
  const value = $(this).find("option:selected").attr('value');
  
  if (value === 'yes') {
    $('#numbers').show();
  } else {
    $('#numbers').hide();
  }
});

$(document).ready(function() {
  $('#games-count, #numbers-count, #select-numbers').select2({
    minimumResultsForSearch: -1,
    width: '75px'
  });

  createTable();
});