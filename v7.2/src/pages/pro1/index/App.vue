<template>
  <div>
    <h1>这是APP page</h1>
    <div>
      <p>加载一张项目内的图片</p>
      <img :src="img2" alt="">
    </div>
  </div>
</template>

<script>
import img2 from './images/img2.jpg';

export default {
  data: function() {
    return {
      img2: img2
    }
  },
  mounted: function() {
    // $.post('/goodsh5/goodsinfodata', {
    //   goodsId: '978454005636530176',
    //   mchId: 'db7177d3-68f0-4e0c-a030-fc7877fa2ecd',
    //   isShare: false
    // }, function(res) {
    //   console.log(res)
    // })
  }
}
</script>

<style lang="scss">
  h1{
    color: #fff;
  }
</style>


