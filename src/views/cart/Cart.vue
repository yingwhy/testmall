<template>
  <div>
    <h2>购物车</h2>
    <table>
      <thead>
      <tr>
        <th></th>
        <th>书籍名称</th>
        <th>出版日期</th>
        <th>价格</th>
        <th>购买数量</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item,index) in books">
        <td>{{item.id}}</td>
        <td>{{item.name}}</td>
        <td>{{item.data}}</td>
        <td>{{item.price}}</td>
        <td>
          <button @click="increase(index)">+</button>
          {{item.count}}
          <button @click="decrease(index)" :disabled="item.count<=1">-</button>
        </td>
        <td><button @click="handleRomove(index)">移除</button></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    name: "Cart",
    data(){
      return{
        books:[
          {
            id:1,
            name:'《算法导论》',
            data:'2006-9',
            price:85.00,
            count:1,
          },
          {
            id:2,
            name:'《UNIX编程艺术》',
            data:'2006-2',
            price:59.00,
            count:1,
          },
          {
            id:3,
            name:'《编程珠玑》',
            data:'2008-10',
            price:39.00,
            count:1,
          },
          {
            id:4,
            name:'《代码大全》',
            data:'2006-3',
            price:128.00,
            count:1,
          }
        ]
      }
    },
    methods:{
      increase(index){
        this.books[index].count++
      },
      decrease(index){
        this.books[index].count--
      },
      handleRomove(index){
        this.books.splice(index,1)
      },
      countClick(index){
         if (this.books[index].count > 0);
         return false
      }
    }
  }
</script>

<style scoped>
table{
  border: 1px solid #e7e7e7;
  border-collapse: collapse;
}
  th,td{
    padding: 8px 16px;
    border:1px solid #e7e7e7;
  }
  th{
    background-color: #f6f6f6;
    color: #2c3e50;
    font-weight: 600;
  }
</style>
