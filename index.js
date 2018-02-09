/*
1) Есть массив цифр по возрастанию [-2,0,1,2,3,4,5,8,9,11,13,15,18,22,25,28,29,30],
  необходимо написать функцию, которая принимает массив и возвращает результат, который выводит все цифры через запятую.
  Однако если цифры идут подряд, то вывести их диапазоном через тире, например 21,22,23,24 => 21-24.

-----
  2) const multidimensionalObject = {
  "User": 1,
  "Data": {
    "FirstName": "Anonimoys",
    "LastName": "AnonimoysLastName",
    "MiddleName": "AnonimoysMiddleName",
    "Role": [
      1, 2, 4, {
        "isOwner" : true
      },
      {
        "hidden" : null
      },
      {
        "visibleStat" : 'null'
      }
    ]
  },
  "Profile": [
    {
      "Check": true,
      "CheckRole": [
        1, 2, 34
      ]
    },
    {
      "Settings": {
        "Rider": [
          1, 2, 3, 4
        ],
        "Inside": {
          "In": true,
          "Out": null
        }
      }
    }
  ]
};

Есть многомерный объект он динамичен в формировании при каждом запросе,
  необходимо написать функцию которая преобразует его в плоский формат.
  Учесть именование ключей, если объект дочерний, чтобы
в итоге результирующее имя ключа содержало ключи всех объектов (не массивов) родителей в порядке вложенности,
  массивы остаются массивами если они содержат только примитивы

например {
  "Red" : 1,
    "Grey" : {
    "Task" : {
      "Dry": 1
    },
    "End" : {
      "Site" : null
    },
    "module": [
      20, 21, 23
    ]
  },
  "Type": [
    10, 16, 2048, {
      "IsSale" : false
    }
  ]
} => {
  "Red" : 1,
    "GreyTaskDry" : 1,
    "GreyEndSite" : null,
    "GreyModule" : [ 20, 21, 23 ],
    Type10 : 10,
    Type16 : 16,
    Type2048 : 2048,
    TypeIsSale : false
}
*/

const arr = [-2,0,1,2,3,4,5,8,9,11,13,15,18,22,25,28,29,30];


function reduce(arr) {
  let out = [];
  let accumulator = [];

  this.reformat = (arr) => {
    return `${arr.shift()}-${arr.pop()}`;
  };

  for (let i = 0; i < arr.length; i++) {
    const curr = arr[i];
    if (arr[i+1] - curr !== 1) {
      if (accumulator.length) {
        accumulator.push(curr);
        if (accumulator.length > 2) {
          out.push(this.reformat(accumulator));
        } else {
          out.push(...accumulator)
        }
        accumulator = [];
      } else {
        out.push(curr);
      }
    } else {
      accumulator.push(curr);
    }
  }

  return out;
}

console.log(reduce(arr));


// ============================================


const multidimensionalObject = {
  "User": 1,
  "Data": {
    "FirstName": "Anonimoys",
    "LastName": "AnonimoysLastName",
    "MiddleName": "AnonimoysMiddleName",
    "Role": [
      1, 2, 4, 'test', {
        "isOwner" : true
      },
      {
        "hidden" : null
      },
      {
        "visibleStat" : 'null'
      }
    ]
  },
  "Profile": [
    {
      "Check": true,
      "CheckRole": [
        1, 2, 34
      ]
    },
    {
      "Settings": {
        "Rider": [
          1, 2, 3, 4
        ],
        "Inside": {
          "In": true,
          "Out": null
        }
      }
    }
  ]
};



function restrict(obj) {
  let out = {};

  /**
   * Returns true if array doesn't contain any arrays or objects
   * @param arr
   * @returns {boolean}
   */
  this.withoutObjects = (arr) => {
    return !arr.filter(val => val.constructor === Object || val.constructor === Array).length;
  };

  /**
   * Sorts the elements of the array and calls 'checkIsHasContent'
   * If does not contain any array or object - exits the function and writes to the whole array
   * @param item
   * @param name
   */
  this.checkArray = (item, name) => {
    if (this.withoutObjects(item)) {
      return out[name] = item;
    }

    item.map(val => {
      if (val.constructor === Object || val.constructor === Array) {
        this.checkIsHasContent(val, name)
      } else {
        this.checkIsHasContent(val, name + val)
      }
    })
  };

  /**
   * Calls the 'checkIsHasContent' function for each object property
   * @param item
   * @param name
   */
  this.checkObject = (item, name) => {
    Object.keys(item).map(val => {
      this.checkIsHasContent(item[val], name + val);
    });
  };

  /**
   * Recursive function that track takes type
   * @param item
   * @param name
   */
  this.checkIsHasContent = (item, name = '') => {
    if (item === null) return item;

    if (item.constructor === Array) {
      this.checkArray(item, name)
    }
    else if (item.constructor === Object) {
      this.checkObject(item, name)
    }
    else {
      return out[name] = item;
    }
  };


  /**
   * Invoke function
   */
  this.checkIsHasContent(obj);

  return out;
}


console.log(restrict(multidimensionalObject));