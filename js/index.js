let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

let fruits = JSON.parse(fruitsJSON);
let priority = ['желтый', 'светло-коричневый', 'розово-красный', 'фиолетовый', 'зеленый'];

//_____________________
// ОТОБРАЖЕНИЕ

function display(arr) {
  // TODO: формируем новый элемент <li>, как указано в разметке и добавляем на страницу
  let result = '';
  console.log('зашли в dysplay');
  let i = 0;
  let len = arr.length;
  let parent = document.querySelector('.fruits__list');
  while (i < len) {
    //создали элемент li
    let li = document.createElement('li');
    switch (arr[i].color) {
      case 'фиолетовый': li.className = 'fruit__item fruit_violet'; break;
      case 'зеленый': li.className = 'fruit__item fruit_green'; break;
      case 'розово-красный': li.className = 'fruit__item fruit_carmazin'; break;
      case 'желтый': li.className = 'fruit__item fruit_yellow'; break;
      case 'светло-коричневый': li.className = 'fruit__item fruit_lightbrown'; break;
    }
    parent.appendChild(li);

    // теперь у этого li набираем div и присваиваем им значения
    let div = document.createElement('div');
    div.className = 'fruit__info';
    li.appendChild(div);

    let divColor = document.createElement('div');
    divColor.innerHTML = arr[i].color;
    div.appendChild(divColor);

    let divKind = document.createElement('div');
    divKind.innerHTML = arr[i].kind;
    div.appendChild(divKind);

    let liWeigt = document.createElement('div');
    liWeigt.innerHTML = arr[i].weight;
    div.appendChild(liWeigt);
    i += 1;
  }
  console.log(fruits);

};


// первая отрисовка карточек
document.getElementById('d_btn').addEventListener('click', function () {
  display(fruits);
});


/*** ПЕРЕМЕШИВАНИЕ ***/
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешивание массива
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const shuffleFruits = () => {
  let result = [];
  let el = 0;

  while (fruits.length > 0) {
    iMinus = getRandomInt(0, fruits.length - 1);
    result[el] = fruits[iMinus];
    fruits.splice(iMinus, 1);
    el += 1;
  }
  fruits = result;
};
let oldResult = [];
shuffleButton.addEventListener('click', () => {
  oldResult = fruits; // здесь не работает, значение не сохраняется в oldResult
  console.log('до перемешивания',oldResult);
  shuffleFruits(fruits);
  console.log('после перемешивания fruits',fruits);
  oldResult == fruits ? alert('попробуйте еще раз') : display(fruits);
});


/*** ФИЛЬТРАЦИЯ ***/
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const filterMin = document.querySelector('.minweight__input'); // кнопка фильтрации
const filterMax = document.querySelector('.maxweight__input'); // кнопка фильтрации

function filterFruits(result) {
  fruits = result.filter(item => ((item.weight >= filterMin.value) && (item.weight <= filterMax.value)))
};

filterButton.addEventListener('click', () => {
  filterFruits(fruits);
  display(fruits);
});

const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

const comparationColor = (a, b) => {
  return priority.indexOf(a.color) > priority.indexOf(b.color) ? true : false;
};

function bubbleSort() {
  console.log('зашли в сортировку пузырьком');
  const n = fruits.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
      if (comparationColor(fruits[j], fruits[j + 1])) {
        let temp = fruits[j + 1];
        fruits[j + 1] = fruits[j];
        fruits[j] = temp;
      }
    }
  }
}

// алгоритм быстрой сортировки
function swap(firstIndex, secondIndex) {
  const temp = fruits[firstIndex];
  fruits[firstIndex] = fruits[secondIndex];
  fruits[secondIndex] = temp;
}

// функция разделитель
function partition(left, right) {
  let pivot = fruits[Math.floor((right + left) / 2)],
    i1 = left,
    j1 = right;
  while (i1 <= j1) {
    while (comparationColor(pivot, fruits[i1])) {
      i1++;
    }
    while (comparationColor(fruits[j1], pivot)) {
      j1--;
    }
    if (i1 <= j1) {
      swap(i1, j1);
      i1++;
      j1--;
    }
  }
  return i1;
}

// алгоритм быстрой сортировки
function quickSort(left, right) {
  let index;
  if (fruits.length > 1) {
    left = typeof left != "number" ? 0 : left;
    right = typeof right != "number" ? fruits.length - 1 : right;
    index = partition(left, right);
    if (left < index - 1) {
      quickSort(left, (index - 1));
    }
    if (index < right) {
      quickSort(index, right);
    }
  }
  console.log('зашли в быструю сортировку');
  return fruits;
}
// let k = 0;
//Быстрая сортировка 2
// function quickSort(array) {
//   console.log('зашли в быструю сортировку');
//   let n = array.length;
//   console.log('длина массива = ', n);
//   if (n <= 1) {
//     return array;
//   }

//   let first = array[0];
//   let left_arr = [];
//   let right_arr = [];
//   let result = [];

//   for (let i = 0; i < (n - 1); i++) {
//     if (comparationColor(first, array[i])) {
//       left_arr = array[i];
//     } else {
//       right_arr = array[i];
//       }
//   }

//   left_arr = quickSort(left_arr);
//   right_arr = quickSort(right_arr);
//   console.log(left_arr);
//   console.log(right_arr);
//   console.log('счетчик ',k++);
//   console.log('левая часть ', left_arr )
//   console.log('правая часть ', right_arr )
//   console.log('first ', first )
//   result = [...left_arr,...first,...right_arr]; 
//   return result;

// }

sortActionButton.addEventListener('click', () => {
  const start = new Date().getTime();
  sortKindLabel.textContent == 'bubbleSort' ? bubbleSort(fruits) : quickSort();;
  const end = new Date().getTime();
  sortTimeLabel.textContent = `${end - start} ms`;
  display(fruits);
});

// // выполняет сортировку и производит замер времени
// startSort(sort, arr, comparation) {
//   const start = new Date().getTime();
//   sort(arr, comparation);
//   const end = new Date().getTime();
//   sortTime = `${end - start} ms`;
// };

// // инициализация полей
sortKind = 'bubbleSort';
sortKindLabel.textContent = sortKind;
// sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
  // TODO: переключать значение sortKind между 'bubbleSort' / 'quickSort'
  sortKindLabel.textContent == 'bubbleSort' ? sortKindLabel.textContent = 'quickSort' : sortKindLabel.textContent = 'bubbleSort';
});

// sortActionButton.addEventListener('click', () => {
//   // TODO: вывести в sortTimeLabel значение 'sorting...'
//   const sort = sortAPI[sortKind];
//   sortAPI.startSort(sort, fruits, comparationColor);
//   display();
//   // TODO: вывести в sortTimeLabel значение sortTime
// // });

/*** ДОБАВИТЬ ФРУКТ ***/

const kindInput = document.querySelector('.kind__input'); // поле с названием вида
//const colorInput = document.querySelector('colorSelect').value; // поле с названием цвета
const colorInput = document.getElementById('colorSelect');; // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления

addActionButton.addEventListener('click', () => {
  console.log(kindInput.value, colorInput.value, weightInput.value);
  if ((kindInput.value == '') || (weightInput.value == '')) {
    alert('не хватает данных');
  } else {
    let newElement = { kind: kindInput.value, color: colorInput.value, weight: weightInput.value };
    fruits[fruits.length] = newElement;
    display(fruits);
  }
});