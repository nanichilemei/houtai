export function mockData() {
  var data = []
  for (var i = 1; i <= 80; i++) {
    data.push({
      date: `data${i}`,
      orderNum: randomNum(5, 10),
      backNum: randomNum(0, 5)
    })
  }
  return data
}

function randomNum(start, end) {
  return Math.floor(Math.random() * (end - start)) + start
}

export function mockList() {
  var arr = []
  for (var i = 1; i < 11; i++) {
    arr.push({
      name: `物品${i}`,
      number: randomNum(10, 150),
      price: randomNum(10000, 999999)
    })
  }
  return arr
}
