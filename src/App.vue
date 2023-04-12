<script setup>
import { ref } from "vue";
import * as dayjs from "dayjs";
const show = ref(false);
const currentDate = ref(dayjs().format("YYYY-M-D").split("-"));
// const currentDate = ref(["2000", "02", "02"]);
const minDate = new Date(1900, 0, 1);
const maxDate = new Date(2100, 0, 1);
const showDate = ref(dayjs().format("YYYY-M-D"));
const a1 = ref(0);
const a2 = ref(0);
const a3 = ref(0);
const b1 = ref(0);
const b2 = ref(0);
const b3 = ref(0);
const b4 = ref(0);
const b5 = ref(0);
const c1 = ref(0);
const c2 = ref(0);
const c3 = ref(0);
const c4 = ref(0);
const c5 = ref(0);
const d1 = ref(0);
const d2 = ref(0);
const confirmDate = ({ selectedValues }) => {
  tableData.value = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  generateData(selectedValues);
  showDate.value = selectedValues.join("-");
  show.value = false;
};
const tableData = ref([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
const arrSum = (arr) => {
  return arr.reduce((p, c) => {
    return p + c;
  });
};
const sepNum = (num) => {
  return String(num)
    .split("")
    .map((i) => Number(i));
};
const generateData = (arr) => {
  const numberDate = arr.map((item) => Number(item));
  const YearNums = String(numberDate[0])
    .split("")
    .map((i) => Number(i));
  const MonthNums = String(numberDate[1])
    .split("")
    .map((i) => Number(i));
  const DayNums = String(numberDate[2])
    .split("")
    .map((i) => Number(i));
  b1.value = arrSum(YearNums);
  b2.value = arrSum([...MonthNums, ...DayNums]);
  b3.value = b1.value + b2.value;
  b4.value = b3.value > 9 ? arrSum(sepNum(b3.value)) : 0;
  b5.value = b4.value > 9 ? arrSum(sepNum(b4.value)) : 0;
  a1.value = arrSum([...MonthNums, ...DayNums, b1.value]);
  a2.value = a1.value > 9 ? arrSum(sepNum(a1.value)) : 0;
  a3.value = a2.value > 9 ? arrSum(sepNum(a2.value)) : 0;
  c1.value = b1.value > 9 ? arrSum(sepNum(b1.value)) : b1.value;
  c2.value = b2.value > 9 ? arrSum(sepNum(b2.value)) : b2.value;
  c3.value = c1.value + c2.value;
  c4.value = c3.value > 9 ? arrSum(sepNum(c3.value)) : 0;
  c5.value = c4.value > 9 ? arrSum(sepNum(c4.value)) : 0;
  const d1Temp = String(Number(arr[0]) + b2.value);
  d1.value = arrSum(sepNum(d1Temp));
  d2.value = d1.value > 9 ? arrSum(sepNum(d1.value)) : 0;
  let rawList = [
    Number(arr[1]),
    Number(arr[2]),
    a1.value,
    a2.value,
    a3.value,
    b1.value,
    b2.value,
    b3.value,
    b4.value,
    b5.value,
    c1.value,
    c2.value,
    c3.value,
    c4.value,
    c5.value,
    d1.value,
    d2.value,
  ];
  rawList = rawList.filter((i) => i);
  console.log("raw-----", rawList);
  const totalStr =
    arr[0] +
    Number(arr[1]) +
    Number(arr[2]) +
    a1.value +
    (a2.value ? a2.value : "") +
    (a3.value ? a3.value : "") +
    b1.value +
    b2.value +
    b3.value +
    (b4.value ? b4.value : "") +
    (b5.value ? b5.value : "") +
    c1.value +
    c2.value +
    c3.value +
    (c4.value ? c4.value : "") +
    (c5.value ? c5.value : "") +
    d1.value +
    (d2.value ? d2.value : "");
  console.log(totalStr);
  const totalArr = totalStr.split("").map((i) => Number(i));
  console.log(totalArr);
  totalArr.forEach((item) => {
    if (!item) {
      tableData.value[9] = tableData.value[9] + 1;
    } else {
      tableData.value[item - 1] = tableData.value[item - 1] + 1;
    }
  });
  rawList.forEach((item) => {
    if (item % 11 === 0) {
      tableData.value[9] = tableData.value[9] + 1;
    }
  });
};
generateData(currentDate.value);
</script>

<template>
  <div class="container">
    <div class="head">
      <van-field
        v-model="showDate"
        is-link
        readonly
        name="picker"
        label="日期:"
        placeholder="点击选择日期"
        :label-width="40"
        @click="show = true"
      />
    </div>

    <div class="calc">
      <div>
        <span class="num">{{ currentDate[0] }}</span>
        <span class="num">{{ currentDate[1] - 0 }}</span>
        <span class="num">{{ currentDate[2] - 0 }}</span>
        <span class="num"
          >{{ a1
          }}<span v-if="a2"
            >/{{ a2 }}<span v-if="a3">/{{ a3 }}</span></span
          ></span
        >
      </div>
      <div>
        <span class="num">{{ b1 }}</span>
        <span class="num">{{ b2 }}</span>
        <span class="num"
          >{{ b3
          }}<span v-if="b4"
            >/{{ b4 }}<span v-if="b5">/{{ b5 }}</span></span
          ></span
        >
      </div>
      <div>
        <span class="num">{{ c1 }}</span>
        <span class="num">{{ c2 }}</span>
        <span class="num"
          >{{ c3
          }}<span v-if="c4"
            >/{{ c4 }}<span v-if="c5">/{{ c5 }}</span></span
          ></span
        >
      </div>
      <div>
        <span class="num"
          >{{ d1 }}<span v-if="d2">/{{ d2 }}</span></span
        >
      </div>
    </div>

    <div class="table">
      <div class="cell" v-for="(i, j) in tableData" :key="j">{{ i }}</div>
    </div>
    <van-popup v-model:show="show" position="bottom"
      ><van-date-picker
        v-model="currentDate"
        title="选择日期"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="confirmDate"
    /></van-popup>
  </div>
</template>

<style scoped>
.container {
  padding: 10px;
}
.head {
  border: 1px solid #ccc;
}
.table {
  margin: 0 auto;
  width: 180px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
.calc {
  margin: 10px 0;
}
.num {
  margin: 3px;
}
.cell {
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  box-sizing: border-box;
  background-color: #eaeaea;
}
.cell:nth-child(odd) {
  background-color: #e1e1e1;
}
.cell:last-child {
  background-color: #e1e1e1;
}
</style>
